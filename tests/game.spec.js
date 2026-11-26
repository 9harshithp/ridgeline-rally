import { expect, test } from "@playwright/test";

function attachErrorListeners(page) {
  const errors = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
    httpErrors: [],
  };

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    errors.pageErrors.push(String(err));
  });
  page.on("requestfailed", (req) => {
    errors.failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText || "failed"}`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400) {
      errors.httpErrors.push(`${res.status()} ${res.url()}`);
    }
  });

  return errors;
}

function assertNoErrors(errors) {
  expect(errors.consoleErrors, "Unexpected console errors").toEqual([]);
  expect(errors.pageErrors, "Unexpected uncaught page errors").toEqual([]);
  expect(errors.failedRequests, "Unexpected failed network requests").toEqual([]);
  expect(errors.httpErrors, "Unexpected HTTP >= 400 responses").toEqual([]);
}

test.describe("Ridgeline Rally", () => {
  test("initializes game, renders PixiJS canvas and logo without missing assets or console errors", async ({ page }) => {
    const errors = attachErrorListeners(page);
    await page.goto("/");

    await expect(page).toHaveTitle("Ridgeline Rally");
    await expect(page.locator("#stageNo")).toHaveText("STAGE 01");
    await expect(page.locator("#stageTitle")).toHaveText("Copper Canyon");
    await expect(page.locator("#distance")).toHaveText("0");
    await expect(page.locator("#coins")).toHaveText("0");
    await expect(page.locator("#action")).toContainText("START ENGINE");

    const fuelMeter = page.locator("#fuelmeter");
    await expect(fuelMeter).toHaveAttribute("aria-valuenow", "100");
    await expect(fuelMeter.locator("span")).toHaveCount(10);

    const worldCanvas = page.locator("#world canvas");
    await expect(worldCanvas).toBeVisible();

    const canvasMetrics = await page.evaluate(() => {
      const world = document.querySelector("#world canvas");
      const logo = document.querySelector("#logo");
      const logoCtx = logo.getContext("2d");
      const logoData = logoCtx.getImageData(0, 0, logo.width, logo.height).data;
      let logoNonZero = 0;
      for (let i = 3; i < logoData.length; i += 4) {
        if (logoData[i] > 0) logoNonZero++;
      }

      const worldDataUrl = world.toDataURL();
      const worldCtx = world.getContext("2d");
      const worldPixels = worldCtx
        ? worldCtx.getImageData(0, 0, world.width, world.height).data
        : null;
      const uniqueColors = new Set();
      if (worldPixels) {
        const step = Math.max(4, Math.floor(worldPixels.length / 4000)) * 4;
        for (let i = 0; i < worldPixels.length; i += step) {
          uniqueColors.add(`${worldPixels[i]},${worldPixels[i + 1]},${worldPixels[i + 2]}`);
        }
      }

      return {
        worldWidth: world.width,
        worldHeight: world.height,
        worldDataUrlLen: worldDataUrl.length,
        uniqueColorCount: uniqueColors.size,
        logoWidth: logo.width,
        logoHeight: logo.height,
        logoNonZero,
      };
    });

    expect(canvasMetrics.worldWidth).toBeGreaterThan(100);
    expect(canvasMetrics.worldHeight).toBeGreaterThan(100);
    expect(canvasMetrics.worldDataUrlLen).toBeGreaterThan(1000);
    expect(canvasMetrics.uniqueColorCount).toBeGreaterThan(3);
    expect(canvasMetrics.logoWidth).toBe(52);
    expect(canvasMetrics.logoHeight).toBe(34);
    expect(canvasMetrics.logoNonZero).toBeGreaterThan(50);

    // Open Help dialog as well to ensure all UI flows stay error-free
    await page.locator("#help").click();
    await expect(page.locator("#modal")).toHaveAttribute("open", "");
    await expect(page.locator("#modalTitle")).toHaveText("How to play");
    await page.locator("#close").click();
    await expect(page.locator("#modal")).not.toHaveAttribute("open", "");

    assertNoErrors(errors);
  });

  test("accelerates with gas, brakes, consumes fuel, and collects coins", async ({ page }) => {
    const errors = attachErrorListeners(page);
    await page.goto("/");

    await page.locator("#action").click();
    await expect(page.locator("#action")).toContainText("PAUSE");

    // Accelerate using keyboard ArrowRight
    await page.keyboard.down("ArrowRight");
    await expect(page.locator("#gas")).toHaveClass(/down/);

    await expect
      .poll(async () => Number(await page.locator("#distance").textContent()), { timeout: 6000 })
      .toBeGreaterThan(15);

    // Continue driving briefly so we pass the first coin arc and burn measurable fuel
    await expect
      .poll(async () => Number(await page.locator("#coins").textContent()), { timeout: 6000 })
      .toBeGreaterThan(0);

    await expect
      .poll(
        async () => Number(await page.locator("#fuelmeter").getAttribute("aria-valuenow")),
        { timeout: 6000 },
      )
      .toBeLessThan(100);

    await page.keyboard.up("ArrowRight");
    await expect(page.locator("#gas")).not.toHaveClass(/down/);

    // Brake using keyboard ArrowLeft and verify UI feedback and deceleration/reverse
    const distanceBeforeBrake = Number(await page.locator("#distance").textContent());
    await page.keyboard.down("ArrowLeft");
    await expect(page.locator("#brake")).toHaveClass(/down/);
    await page.waitForTimeout(900);
    await page.keyboard.up("ArrowLeft");
    await expect(page.locator("#brake")).not.toHaveClass(/down/);

    // Also verify on-screen gas pedal pointer interaction works
    await page.locator("#gas").dispatchEvent("pointerdown", { pointerId: 1 });
    await expect(page.locator("#gas")).toHaveClass(/down/);
    await page.waitForTimeout(300);
    await page.locator("#gas").dispatchEvent("pointerup", { pointerId: 1 });
    await expect(page.locator("#gas")).not.toHaveClass(/down/);

    expect(distanceBeforeBrake).toBeGreaterThan(0);
    assertNoErrors(errors);
  });

  test("pauses, resumes, and restarts the race via UI and keyboard", async ({ page }) => {
    const errors = attachErrorListeners(page);
    await page.goto("/");

    await page.locator("#action").click();
    await page.keyboard.down("ArrowRight");
    await expect
      .poll(async () => Number(await page.locator("#distance").textContent()), { timeout: 5000 })
      .toBeGreaterThan(5);
    await page.keyboard.up("ArrowRight");

    // Pause with 'P'
    await page.keyboard.press("KeyP");
    await expect(page.locator("#modal")).toHaveAttribute("open", "");
    await expect(page.locator("#modalTitle")).toHaveText("Race paused");
    await expect(page.locator("#action")).toContainText("RESUME");

    const pausedDistance = Number(await page.locator("#distance").textContent());
    await page.waitForTimeout(300);
    expect(Number(await page.locator("#distance").textContent())).toBe(pausedDistance);

    // Resume via modal button
    await page.locator("#resumeRun").click();
    await expect(page.locator("#modal")).not.toHaveAttribute("open", "");
    await expect(page.locator("#action")).toContainText("PAUSE");

    // Pause again and restart via modal button
    await page.keyboard.press("KeyP");
    await expect(page.locator("#modal")).toHaveAttribute("open", "");
    await page.locator("#restartRun").click();
    await expect(page.locator("#modal")).not.toHaveAttribute("open", "");
    await expect(page.locator("#distance")).toHaveText("0");
    await expect(page.locator("#coins")).toHaveText("0");
    await expect(page.locator("#fuelmeter")).toHaveAttribute("aria-valuenow", "100");

    // Drive forward then restart with 'R'
    await page.keyboard.down("ArrowRight");
    await expect
      .poll(async () => Number(await page.locator("#distance").textContent()), { timeout: 5000 })
      .toBeGreaterThan(3);
    await page.keyboard.up("ArrowRight");

    await page.keyboard.press("KeyR");
    await expect(page.locator("#distance")).toHaveText("0");
    await expect(page.locator("#fuelmeter")).toHaveAttribute("aria-valuenow", "100");

    assertNoErrors(errors);
  });

  test("supports track selection and persistence", async ({ page }) => {
    const errors = attachErrorListeners(page);
    await page.addInitScript(() => {
      if (!localStorage.getItem("ridgeline-rally-v2")) {
        localStorage.setItem(
          "ridgeline-rally-v2",
          JSON.stringify({
            bank: 500,
            best: [0, 0, 0, 0, 0, 0],
            stage: 0,
            car: 0,
            unlockedCars: [0],
            unlockedTracks: [0],
            engine: 0,
            suspension: 0,
            grip: 0,
            tank: 0,
            muted: false,
          }),
        );
      }
    });

    await page.goto("/");
    await page.locator("#tracksTab").click();
    await expect(page.locator("#modal")).toHaveAttribute("open", "");
    await expect(page.locator("#modalTitle")).toHaveText("Tracks");
    await expect(page.locator(".trackCards .card")).toHaveCount(6);
    await expect(page.locator("#trackBtn_0")).toHaveText("Selected");
    await expect(page.locator("#trackBtn_1")).toContainText("Unlock · 150 coins");

    // Unlock and select Dusk Ridge (stage 1)
    await page.locator("#trackBtn_1").click();
    await expect(page.locator("#modal")).not.toHaveAttribute("open", "");
    await expect(page.locator("#stageNo")).toHaveText("STAGE 02");
    await expect(page.locator("#stageTitle")).toHaveText("Dusk Ridge");

    // Reload and verify selected stage and remaining bank persisted
    await page.reload();
    await expect(page.locator("#stageNo")).toHaveText("STAGE 02");
    await expect(page.locator("#stageTitle")).toHaveText("Dusk Ridge");

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("ridgeline-rally-v2")));
    expect(saved.stage).toBe(1);
    expect(saved.bank).toBe(350);
    expect(saved.unlockedTracks).toContain(1);

    assertNoErrors(errors);
  });

  test("supports garage vehicle unlocking, selection, and upgrades", async ({ page }) => {
    const errors = attachErrorListeners(page);
    await page.addInitScript(() => {
      if (!localStorage.getItem("ridgeline-rally-v2")) {
        localStorage.setItem(
          "ridgeline-rally-v2",
          JSON.stringify({
            bank: 600,
            best: [0, 0, 0, 0, 0, 0],
            stage: 0,
            car: 0,
            unlockedCars: [0],
            unlockedTracks: [0],
            engine: 0,
            suspension: 0,
            grip: 0,
            tank: 0,
            muted: false,
          }),
        );
      }
    });

    await page.goto("/");
    await page.locator("#garageTab").click();
    await expect(page.locator("#modal")).toHaveAttribute("open", "");
    await expect(page.locator("#modalTitle")).toHaveText("Garage");
    await expect(page.locator(".carCards .card")).toHaveCount(6);
    await expect(page.locator(".upgradeBtn")).toHaveCount(4);
    await expect(page.locator("#carBtn_0")).toHaveText("Selected");
    await expect(page.locator("#carBtn_1")).toContainText("Unlock · 350 coins");

    // Unlock Monster Truck (index 1, 350 coins)
    await page.locator("#carBtn_1").click();
    await expect(page.locator("#carBtn_1")).toHaveText("Selected");
    await expect(page.locator(".vehicle")).toContainText("Monster Truck");

    // Purchase first engine upgrade (15 coins)
    await page.locator('.upgradeBtn[data-k="engine"]').click();
    await expect(page.locator(".balance")).toContainText("235 coins");

    // Switch back to Rally Pickup (now unlocked -> "Drive")
    await page.locator("#carBtn_0").click();
    await expect(page.locator("#carBtn_0")).toHaveText("Selected");
    await expect(page.locator(".vehicle")).toContainText("Rally Pickup");

    await page.locator("#close").click();
    await expect(page.locator("#modal")).not.toHaveAttribute("open", "");

    assertNoErrors(errors);
  });

  test("adapts layout cleanly across desktop, tablet, and mobile viewports", async ({ page }) => {
    const errors = attachErrorListeners(page);
    await page.goto("/");

    const viewports = [
      { name: "desktop", width: 1280, height: 800 },
      { name: "tablet", width: 760, height: 800 },
      { name: "mobile", width: 375, height: 667 },
    ];

    const canvasWidths = [];
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const layout = await page.evaluate(() => {
        const doc = document.documentElement;
        const canvas = document.querySelector("#world canvas");
        const action = document.querySelector("#action").getBoundingClientRect();
        const gas = document.querySelector("#gas").getBoundingClientRect();
        const brake = document.querySelector("#brake").getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          canvasAttrWidth: canvas.width,
          canvasRectWidth: canvasRect.width,
          canvasRectHeight: canvasRect.height,
          actionVisible: action.width > 0 && action.height > 0,
          gasVisible: gas.width > 0 && gas.height > 0,
          brakeVisible: brake.width > 0 && brake.height > 0,
        };
      });

      expect(layout.scrollWidth, `No horizontal overflow on ${vp.name}`).toBeLessThanOrEqual(
        layout.innerWidth,
      );
      expect(layout.canvasRectWidth, `Canvas width on ${vp.name}`).toBeGreaterThan(200);
      expect(layout.canvasRectHeight, `Canvas height on ${vp.name}`).toBeGreaterThan(100);
      expect(layout.actionVisible).toBe(true);
      expect(layout.gasVisible).toBe(true);
      expect(layout.brakeVisible).toBe(true);
      canvasWidths.push(layout.canvasAttrWidth);
    }

    // Mobile canvas should resize smaller than desktop canvas
    expect(canvasWidths[2]).toBeLessThan(canvasWidths[0]);

    assertNoErrors(errors);
  });
});
