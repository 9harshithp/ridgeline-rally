"use strict";
const $ = (id) => document.getElementById(id);
const paths = {
  flag: "M4 21V3m0 1c5-4 9 4 16 0v10c-7 4-11-4-16 0m5-10v5h5V5m0 4v5m-10-5h5v4",
  wrench: "M14 4a6 6 0 0 0-7 7L2 17l4 4 6-6a6 6 0 0 0 8-8l-4 4-4-4 4-4z",
  map: "m2 5 6-2 8 3 6-2v15l-6 2-8-3-6 2zm6-2v15m8-12v15",
  sound: "M3 9h4l5-5v16l-5-5H3zm13-2c3 2 3 8 0 10m3-13c5 4 5 12 0 16",
  mute: "M3 9h4l5-5v16l-5-5H3zm13 0 6 6m0-6-6 6",
  help: "M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 2v1M12 2a10 10 0 1 0 .01 0",
  trophy:
    "M7 3h10v6c0 5-2 7-5 7s-5-2-5-7zm0 2H3v3c0 3 2 5 5 5m9-8h4v3c0 3-2 5-5 5m-4 3v4m-5 1h10",
  fuel: "M4 21V3h10v18m-12 0h14M6 6h6v5H6zm9 4h2l1 2v5c0 2 3 2 3 0V9l-4-5",
  distance: "M2 17 8 7l4 6 3-4 7 8zM7 10l2 1m6 1 2 1",
  play: "M5 2v20l16-10z",
  pause: "M5 4h4v16H5zm10 0h4v16h-4z",
  keyboard:
    "M2 5h20v14H2zm3 4h1m3 0h1m3 0h1m3 0h1M5 12h1m3 0h1m3 0h1m3 0h1m-10 3h8",
  car: "M2 16V9h6l2-4h5l3 4h3v7h-2m-5 0H8m-4-1a2 2 0 1 0 4 0 2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
};

function icon(n) {
  return (
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="' +
    (["play", "pause"].includes(n) ? "currentColor" : "none") +
    '" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' +
    paths[n] +
    '"/></svg>'
  );
}

document
  .querySelectorAll("[data-i]")
  .forEach((e) => (e.innerHTML = icon(e.dataset.i)));

// Draw header logo
{
  const g = $("logo").getContext("2d");
  ART.rect(g, 31, 1, 10, 10, "#ffbb58");
  ART.poly(
    g,
    [
      [0, 29],
      [15, 9],
      [21, 16],
      [29, 5],
      [49, 30],
    ],
    "#ffb451",
  );
  ART.poly(
    g,
    [
      [6, 27],
      [15, 15],
      [20, 20],
      [27, 13],
      [31, 16],
      [37, 17],
      [44, 27],
    ],
    "#272b2a",
  );
  ART.poly(
    g,
    [
      [12, 24],
      [16, 18],
      [21, 23],
      [29, 12],
      [35, 19],
      [29, 16],
      [21, 28],
    ],
    "#f3e9ce",
  );
  ART.rect(g, 6, 31, 37, 2, "#ad7443");
}

// ==================== TRACK DEFINITIONS (6 Maps) ====================
const tracks = [
  {
    id: "canyon",
    name: "Copper Canyon",
    length: 1200,
    grade: "Rolling desert hills",
    price: 0,
    gravity: 244,
    friction: 1.0,
    palette: 0,
    desc: "Gentle rolling dunes with warm canyon breezes.",
  },
  {
    id: "ridge",
    name: "Dusk Ridge",
    length: 1600,
    grade: "Steep climbs & rocky drops",
    price: 150,
    gravity: 248,
    friction: 0.96,
    palette: 1,
    desc: "Sharp twilight peaks with demanding elevation shifts.",
  },
  {
    id: "alpine",
    name: "Alpine Crest",
    length: 2000,
    grade: "Icy peaks & slippery snow",
    price: 400,
    gravity: 242,
    friction: 0.74,
    palette: 2,
    desc: "Slick icy surfaces where tire grip and throttle feathering are key.",
  },
  {
    id: "volcano",
    name: "Volcanic Hollow",
    length: 2500,
    grade: "Extreme slopes & molten hazards",
    price: 900,
    gravity: 265,
    friction: 1.05,
    palette: 3,
    desc: "Fiery basalt ravines with heavy gravity and punishing climbs.",
  },
  {
    id: "lunar",
    name: "Lunar Crater",
    length: 3000,
    grade: "Low gravity & massive air leaps",
    price: 1800,
    gravity: 125,
    friction: 0.88,
    palette: 4,
    desc: "Floating moon physics! Colossal jumps and acrobatic stunts.",
  },
  {
    id: "swamp",
    name: "Mud Bog",
    length: 3500,
    grade: "Deep bog drag & relentless ravines",
    price: 3000,
    gravity: 252,
    friction: 0.82,
    palette: 5,
    desc: "Murky sludge that demands massive horsepower and sturdy clearance.",
  },
];

// ==================== VEHICLE DEFINITIONS (6 Cars) ====================
const vehicles = [
  {
    id: "pickup",
    name: "Rally Pickup",
    price: 0,
    desc: "Well-balanced starter 4x4 with steady suspension.",
    artFn: () => ART.truck(),
    wheelType: "default",
    wheelOffsets: [-21, 21],
    wheelY: 3,
    wheelRadius: 9,
    bodyOffset: { x: -38, y: -30 },
    stats: { speed: 3, torque: 3, stability: 4, air: 3 },
    power: 76,
    topSpeed: 162,
    mass: 1.0,
    spring: 115,
    damping: 11,
    airTorque: 6.4,
    fuelCapacity: 1.0,
  },
  {
    id: "monster",
    name: "Monster Truck",
    price: 350,
    desc: "Giant high-tread tires and heavy lift. Smashes over obstacles with ease!",
    artFn: () => ART.monsterTruck(),
    wheelType: "monster",
    wheelOffsets: [-24, 24],
    wheelY: 7,
    wheelRadius: 13,
    bodyOffset: { x: -42, y: -36 },
    stats: { speed: 3, torque: 5, stability: 4, air: 2 },
    power: 92,
    topSpeed: 154,
    mass: 1.35,
    spring: 140,
    damping: 15,
    airTorque: 5.2,
    fuelCapacity: 1.15,
  },
  {
    id: "buggy",
    name: "Dune Buggy",
    price: 750,
    desc: "Lightweight tubular sand racer with insane air tilt and flip speed.",
    artFn: () => ART.buggy(),
    wheelType: "default",
    wheelOffsets: [-22, 20],
    wheelY: 2,
    wheelRadius: 9.5,
    bodyOffset: { x: -38, y: -28 },
    stats: { speed: 4, torque: 3, stability: 3, air: 5 },
    power: 84,
    topSpeed: 172,
    mass: 0.82,
    spring: 105,
    damping: 9,
    airTorque: 9.2,
    fuelCapacity: 0.95,
  },
  {
    id: "supercar",
    name: "Turbo Wedge",
    price: 1500,
    desc: "Blistering top speed and razor acceleration on smooth inclines.",
    artFn: () => ART.supercar(),
    wheelType: "supercar",
    wheelOffsets: [-23, 23],
    wheelY: 1,
    wheelRadius: 8.5,
    bodyOffset: { x: -40, y: -24 },
    stats: { speed: 5, torque: 4, stability: 2, air: 3 },
    power: 105,
    topSpeed: 215,
    mass: 0.94,
    spring: 130,
    damping: 12,
    airTorque: 6.8,
    fuelCapacity: 0.9,
  },
  {
    id: "tank",
    name: "Heavy Tank",
    price: 2500,
    desc: "Unstoppable climbing torque and iron armor. Plows right through rocks and crates!",
    artFn: () => ART.tank(),
    wheelType: "tank",
    wheelOffsets: [-25, 25],
    wheelY: 2,
    wheelRadius: 9,
    bodyOffset: { x: -41, y: -30 },
    stats: { speed: 2, torque: 5, stability: 5, air: 1 },
    power: 110,
    topSpeed: 145,
    mass: 1.6,
    spring: 160,
    damping: 18,
    airTorque: 4.0,
    fuelCapacity: 1.3,
  },
  {
    id: "quad",
    name: "Stunt Quad",
    price: 3800,
    desc: "Ultra-agile ATV built for spectacular backflips and aerial mastery.",
    artFn: () => ART.quad(),
    wheelType: "quad",
    wheelOffsets: [-17, 17],
    wheelY: 3,
    wheelRadius: 8.5,
    bodyOffset: { x: -34, y: -33 },
    stats: { speed: 4, torque: 4, stability: 3, air: 5 },
    power: 88,
    topSpeed: 180,
    mass: 0.78,
    spring: 110,
    damping: 10,
    airTorque: 9.8,
    fuelCapacity: 0.85,
  },
];

const upgrades = [
  ["engine", "Engine", "More torque on steep climbs and faster acceleration"],
  ["grip", "Tires", "More grip, traction and landing stability"],
  ["tank", "Fuel Tank", "Larger capacity and longer distance between stops"],
  ["suspension", "Suspension", "Better shock absorption over rough terrain and obstacles"],
];

let save = {
  bank: 0,
  stage: 0,
  car: 0,
  unlockedTracks: [0],
  unlockedCars: [0],
  best: [0, 0, 0, 0, 0, 0],
  engine: 0,
  grip: 0,
  tank: 0,
  suspension: 0,
  sound: true,
};

try {
  const loaded = JSON.parse(localStorage.getItem("ridgeline-rally-v2")) || {};
  Object.assign(save, loaded);
  if (!Array.isArray(save.unlockedTracks)) save.unlockedTracks = [0];
  if (!Array.isArray(save.unlockedCars)) save.unlockedCars = [0];
  if (!Array.isArray(save.best)) save.best = [0, 0, 0, 0, 0, 0];
  while (save.best.length < tracks.length) save.best.push(0);
} catch {}

const persist = () => {
  try {
    localStorage.setItem("ridgeline-rally-v2", JSON.stringify(save));
  } catch {}
};

const startX = 145,
  pxm = 9,
  track = () => tracks[save.stage],
  currentVehicle = () => vehicles[save.car];

// ==================== PROCEDURAL TERRAIN GENERATOR ====================
// Generates unique, challenging terrain per stage that gets progressively harder with distance!
function ground(x) {
  let t = x - startX;
  if (t < 0) return 122;
  const s = save.stage;
  const distKm = t / 900; // progressive distance scale

  // Base elevation curve
  let y = 122;

  // Gentle primary rolling hills
  y += 24 * Math.sin(t / 96 + 0.1);
  y += 18 * Math.sin(t / 54 + 0.6);

  // Stage-specific wave profiles
  if (s === 0) {
    // Copper Canyon: Smooth rolling dunes, manageable inclines
    y += 14 * Math.sin(t / 72);
    y += Math.min(1.8, distKm) * (26 * Math.sin(t / 145) + 14 * Math.sin(t / 38));
  } else if (s === 1) {
    // Dusk Ridge: Steeper ridges, technical dips
    y += 22 * Math.sin(t / 60) + 12 * Math.sin(t / 32);
    y += Math.min(2.2, distKm) * (34 * Math.sin(t / 125) + 18 * Math.cos(t / 42));
  } else if (s === 2) {
    // Alpine Crest: Sharp jagged peaks and valleys
    y += 26 * Math.sin(t / 52) + 16 * Math.sin(t / 28);
    y += Math.min(2.5, distKm) * (38 * Math.sin(t / 110) + 22 * Math.sin(t / 36));
    // Jagged moguls
    y += 8 * Math.cos(t / 16);
  } else if (s === 3) {
    // Volcanic Hollow: Brutal steep craters and sudden drop-offs
    y += 32 * Math.sin(t / 68) + 18 * Math.sin(t / 34);
    y += Math.min(2.8, distKm) * (44 * Math.sin(t / 105) + 24 * Math.cos(t / 45));
    // Magma ravine dips every ~600px
    let rav = Math.sin(t / 280);
    if (rav > 0.85) y += (rav - 0.85) * 120;
  } else if (s === 4) {
    // Lunar Crater: Massive sweeping parabolic craters for enormous leaps
    y += 45 * Math.sin(t / 180) + 28 * Math.sin(t / 85);
    y += Math.min(3.0, distKm) * (52 * Math.sin(t / 220) + 15 * Math.sin(t / 40));
  } else if (s === 5) {
    // Mud Bog: Rhythmic undulating dips and root moguls
    y += 28 * Math.sin(t / 64) + 16 * Math.sin(t / 30);
    y += Math.min(3.2, distKm) * (36 * Math.sin(t / 95) + 22 * Math.sin(t / 24));
  }

  // High-distance difficulty ramp (past 500m / 4500px): terrain gets even more technical!
  if (t > 4500) {
    let hard = Math.min(2.0, (t - 4500) / 4500);
    y += hard * (24 * Math.sin(t / 82) + 15 * Math.sin(t / 27));
  }

  return y;
}

let car,
  mode = "ready",
  distance = 0,
  furthest = 0,
  runCoins = 0,
  taken = new Set(),
  smashedCrates = new Set(),
  elapsed = 0,
  w = 600,
  h = 230,
  cx = 0,
  cy = 0,
  spin = 0,
  grace = 0,
  toastTime = 0,
  activeDialog = "",
  resumeOnClose = false;

// Stunt tracking
let airTime = 0,
  accumulatedRotation = 0,
  lastAngle = 0,
  wasInAir = false;

// Milestones tracking
let reachedMilestones = new Set();

// Dynamic obstacle physics states
let dynamicBoulders = []; // [{ id, x, y, vx, vy, radius }]

const inputs = { gas: new Set(), brake: new Set() };
let ctx, osc, volume;

// ==================== AUDIO SYNTHESIS ====================
function soundInit() {
  try {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      osc = ctx.createOscillator();
      volume = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 47;
      volume.gain.value = 0;
      osc.connect(volume);
      volume.connect(ctx.destination);
      osc.start();
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
  } catch {}
}

function ping(freq, len = 0.12, type = "square") {
  if (!ctx || !save.sound) return;
  try {
    const o = ctx.createOscillator(),
      a = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    a.gain.setValueAtTime(0.04, ctx.currentTime);
    a.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + len);
    o.connect(a);
    a.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + len);
  } catch {}
}

// Special coin audio fanfare based on denomination (1, 5, 10, 50, 100)
function playCoinSound(value) {
  if (!ctx || !save.sound) return;
  try {
    if (value === 1) {
      ping(540, 0.08, "square");
    } else if (value === 5) {
      ping(680, 0.1, "triangle");
      setTimeout(() => ping(860, 0.1, "triangle"), 30);
    } else if (value === 10) {
      ping(780, 0.12, "triangle");
      setTimeout(() => ping(1040, 0.15, "triangle"), 45);
    } else if (value === 50) {
      // Ruby fanfare
      ping(880, 0.15, "sine");
      setTimeout(() => ping(1175, 0.15, "sine"), 60);
      setTimeout(() => ping(1480, 0.22, "sine"), 120);
    } else if (value === 100) {
      // Grand diamond sparkle chord
      ping(988, 0.16, "triangle");
      setTimeout(() => ping(1318, 0.18, "triangle"), 50);
      setTimeout(() => ping(1568, 0.2, "triangle"), 100);
      setTimeout(() => ping(1975, 0.28, "sine"), 150);
    }
  } catch {}
}

function playCrashSound() {
  if (!ctx || !save.sound) return;
  try {
    // Low frequency crunch for breaking crates / hitting obstacles
    const o = ctx.createOscillator(),
      a = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(140, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.18);
    a.gain.setValueAtTime(0.06, ctx.currentTime);
    a.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    o.connect(a);
    a.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.18);
  } catch {}
}

function playRampSound() {
  if (!ctx || !save.sound) return;
  try {
    const o = ctx.createOscillator(),
      a = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(320, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.22);
    a.gain.setValueAtTime(0.05, ctx.currentTime);
    a.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    o.connect(a);
    a.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.22);
  } catch {}
}

function motor() {
  if (ctx && osc) {
    const v = currentVehicle();
    volume.gain.setTargetAtTime(
      mode === "running" && save.sound ? 0.028 : 0,
      ctx.currentTime,
      0.05,
    );
    // Vehicle-specific pitch tuning (Monster/Tank lower, Supercar/Buggy higher)
    const baseFreq = v.id === "monster" ? 28 : v.id === "tank" ? 25 : v.id === "supercar" ? 48 : 38;
    osc.frequency.setTargetAtTime(
      baseFreq + Math.abs(car ? car.vx : 0) * 0.38 + (inputs.gas.size ? 14 : 0),
      ctx.currentTime,
      0.07,
    );
  }
}

function updateSound() {
  let a = $("audio");
  a.innerHTML = icon(save.sound ? "sound" : "mute");
  a.setAttribute("aria-label", save.sound ? "Mute sound" : "Enable sound");
  a.setAttribute("aria-pressed", String(save.sound));
}

$("audio").onclick = () => {
  soundInit();
  save.sound = !save.sound;
  persist();
  updateSound();
  motor();
};
updateSound();

// ==================== PIXI INITIALIZATION ====================
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
  width: w,
  height: h,
  forceCanvas: true,
  antialias: false,
  backgroundColor: 0x94d0d3,
  roundPixels: true,
});
$("world").append(app.view);
app.view.setAttribute(
  "aria-label",
  "Side view of your hill-climb vehicle on the course",
);

function sprite(canvas) {
  let s = PIXI.Sprite.from(canvas);
  s.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  return s;
}

const skyLayer = new PIXI.Container(),
  terrainLayer = new PIXI.Container(),
  objects = new PIXI.Container(),
  vehicle = new PIXI.Container(),
  fxLayer = new PIXI.Container();

app.stage.addChild(skyLayer, terrainLayer, objects, vehicle, fxLayer);

let currentTruckSprite = null;
let wheels = [];

function rebuildVehicleSprite() {
  vehicle.removeChildren();
  const v = currentVehicle();
  currentTruckSprite = sprite(v.artFn());
  currentTruckSprite.position.set(v.bodyOffset.x, v.bodyOffset.y);
  vehicle.addChild(currentTruckSprite);

  wheels = v.wheelOffsets.map((ox) => {
    let wh = sprite(ART.wheel(v.wheelType));
    wh.anchor.set(0.5);
    wh.position.set(ox, v.wheelY);
    vehicle.addChild(wh);
    return wh;
  });
}

rebuildVehicleSprite();

const tiles = new Map(),
  pickupSprites = new Map();
let mountains = [];

function clearTiles() {
  for (let s of tiles.values()) s.destroy({ texture: true, baseTexture: true });
  tiles.clear();
  for (let s of pickupSprites.values()) s.destroy();
  pickupSprites.clear();
}

function resize() {
  const box = $("screen").getBoundingClientRect(),
    scale = Math.max(1.55, Math.min(2.6, box.height / 200));
  w = Math.max(130, Math.round(box.width / scale));
  h = Math.round(box.height / scale);
  app.renderer.resize(w, h);
  const old = skyLayer.removeChildren();
  for (const s of old) s.destroy({ texture: true, baseTexture: true });
  skyLayer.addChild(sprite(ART.sky(w, h, ART.palettes[save.stage], save.stage)));
  mountains = [0, 1].map((i) => {
    const tex = PIXI.Texture.from(ART.mesas(h, save.stage, i));
    tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    const s = new PIXI.TilingSprite(tex, w, h);
    skyLayer.addChild(s);
    return s;
  });
  draw(true);
}

// ==================== ITEM & COIN TEXTURES ====================
// Generates textures for items: fuel, finish, coin1, coin5, coin10, coin50, coin100, crate, boulder, ramp, log
function createItemTexture(kind) {
  if (kind === "fuel") {
    const c = ART.canvas(16, 18),
      g = c.getContext("2d"),
      r = (x, y, w, h, col) => ART.rect(g, x, y, w, h, col);
    r(2, 5, 13, 12, "#6d3d31");
    r(3, 6, 11, 10, "#df5434");
    r(5, 1, 7, 5, "#703932");
    r(7, 2, 3, 2, "#bdd0b9");
    r(11, 3, 4, 2, "#433a35");
    r(7, 8, 3, 6, "#ffe5aa");
    r(5, 10, 7, 2, "#ffe5aa");
    return PIXI.Texture.from(c);
  } else if (kind === "finish") {
    const c = ART.canvas(30, 45),
      g = c.getContext("2d"),
      r = (x, y, w, h, col) => ART.rect(g, x, y, w, h, col);
    r(1, 0, 2, 45, "#453a33");
    r(3, 1, 24, 16, "#f3e5c7");
    for (let j = 0; j < 4; j++)
      for (let i = 0; i < 6; i++)
        if ((i + j) % 2 === 0) r(3 + i * 4, 1 + j * 4, 4, 4, "#3c3935");
    return PIXI.Texture.from(c);
  } else if (kind === "coin1") {
    return PIXI.Texture.from(ART.coin(1));
  } else if (kind === "coin5") {
    return PIXI.Texture.from(ART.coin(5));
  } else if (kind === "coin10") {
    return PIXI.Texture.from(ART.coin(10));
  } else if (kind === "coin50") {
    return PIXI.Texture.from(ART.coin(50));
  } else if (kind === "coin100") {
    return PIXI.Texture.from(ART.coin(100));
  } else if (kind === "crate") {
    return PIXI.Texture.from(ART.crate());
  } else if (kind === "boulder") {
    return PIXI.Texture.from(ART.boulder(24));
  } else if (kind === "ramp") {
    return PIXI.Texture.from(ART.ramp());
  } else if (kind === "log") {
    return PIXI.Texture.from(ART.log());
  }
  return null;
}

const itemTex = {
  fuel: createItemTexture("fuel"),
  finish: createItemTexture("finish"),
  coin1: createItemTexture("coin1"),
  coin5: createItemTexture("coin5"),
  coin10: createItemTexture("coin10"),
  coin50: createItemTexture("coin50"),
  coin100: createItemTexture("coin100"),
  crate: createItemTexture("crate"),
  boulder: createItemTexture("boulder"),
  ramp: createItemTexture("ramp"),
  log: createItemTexture("log"),
};

// ==================== PROCEDURAL ITEMS & OBSTACLES ====================
// Distributes coins (1, 5, 10, 50, 100), fuel canisters, and obstacles based on distance
function itemsIn(a, b) {
  const list = [],
    end = startX + track().length * pxm;

  // 1. COIN ARCS (Cluster groups every ~260px)
  for (
    let group = Math.max(0, Math.floor((a - 380) / 260));
    group <= Math.ceil(b / 260);
    group++
  ) {
    let groupX = startX + 110 + group * 260;
    let distMeters = Math.floor((groupX - startX) / pxm);

    // Determine coin denomination by distance:
    // 0-250m: 1s and 5s
    // 250-600m: 5s, 10s, occasional 50
    // 600-1200m: 10s, 50s
    // 1200m+: 50s and gleaming 100s!
    let val = 1;
    if (distMeters < 250) {
      val = group % 3 === 0 ? 5 : 1;
    } else if (distMeters < 600) {
      val = group % 5 === 0 ? 50 : group % 2 === 0 ? 10 : 5;
    } else if (distMeters < 1200) {
      val = group % 4 === 0 ? 50 : group % 6 === 0 ? 100 : 10;
    } else {
      val = group % 3 === 0 ? 100 : 50;
    }

    const coinKind = "coin" + val;
    const count = 4;
    for (let j = 0; j < count; j++) {
      let x = groupX + j * 22;
      if (x >= a && x <= b && x < end - 40) {
        list.push({
          id: "c" + group + "-" + j,
          x,
          y: ground(x) - 24 - Math.sin((j * Math.PI) / (count - 1)) * 14,
          kind: coinKind,
          value: val,
        });
      }
    }
  }

  // 2. FUEL CANISTERS (Spaced progressively further apart to increase challenge!)
  // Can 1: ~140m, Can 2: ~360m, Can 3: ~680m, Can 4: ~1080m, Can 5: ~1580m, Can 6: ~2180m, Can 7: ~2880m
  const fuelDistances = [140, 360, 680, 1080, 1580, 2180, 2880, 3600];
  for (let k = 0; k < fuelDistances.length; k++) {
    let x = startX + fuelDistances[k] * pxm;
    if (x >= a && x <= b && x < end - 30) {
      list.push({ id: "f" + k, x, y: ground(x) - 17, kind: "fuel" });
    }
  }

  // 3. OBSTACLES: Ramps, Crates, Boulders, Logs
  for (
    let obIndex = Math.max(1, Math.floor((a - startX) / 380));
    startX + obIndex * 380 <= b;
    obIndex++
  ) {
    let ox = startX + obIndex * 380 + (ART.noise(obIndex * 71) * 60);
    if (ox >= a && ox <= b && ox < end - 60) {
      let obType = obIndex % 4;
      if (obType === 0) {
        // Breakable Crate
        list.push({ id: "ob_crate_" + obIndex, x: ox, y: ground(ox) - 13, kind: "crate", isObstacle: true });
      } else if (obType === 1) {
        // Boulder
        list.push({ id: "ob_boulder_" + obIndex, x: ox, y: ground(ox) - 13, kind: "boulder", isObstacle: true });
      } else if (obType === 2) {
        // Springboard Ramp
        list.push({ id: "ob_ramp_" + obIndex, x: ox, y: ground(ox) - 12, kind: "ramp", isObstacle: true });
      } else if (obType === 3) {
        // Log
        list.push({ id: "ob_log_" + obIndex, x: ox, y: ground(ox) - 9, kind: "log", isObstacle: true });
      }
    }
  }

  // 4. FINISH LINE
  if (end >= a && end <= b) {
    list.push({ id: "end", x: end, y: ground(end) - 22, kind: "finish" });
  }

  return list;
}

// ==================== FLOATING NOTIFICATIONS / FX ====================
const floatingTexts = [];

function spawnFloatingText(text, x, y, color = "#ffcf33") {
  const pixiText = new PIXI.Text(text, {
    fontFamily: "Pixel",
    fontSize: 12,
    fill: color,
    stroke: "#111111",
    strokeThickness: 3,
    align: "center",
  });
  pixiText.anchor.set(0.5);
  pixiText.position.set(x, y);
  fxLayer.addChild(pixiText);
  floatingTexts.push({
    sprite: pixiText,
    vx: (Math.random() - 0.5) * 8,
    vy: -28,
    life: 0.9,
    maxLife: 0.9,
  });
}

function updateFloatingTexts(dt) {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.life -= dt;
    ft.sprite.x += ft.vx * dt;
    ft.sprite.y += ft.vy * dt;
    ft.sprite.alpha = Math.max(0, ft.life / ft.maxLife);
    if (ft.life <= 0) {
      ft.sprite.destroy();
      floatingTexts.splice(i, 1);
    }
  }
}

// ==================== RENDERING / CAMERA ====================
function draw(snap = false) {
  if (!car) return;
  const tx = car.x - Math.min(w * 0.29, 175),
    ty = ground(car.x) - h * 0.74;
  cx = snap ? tx : cx + (tx - cx) * 0.16;
  cy = snap ? ty : cy + (ty - cy) * 0.08;
  const x0 = Math.round(cx),
    y0 = Math.round(cy);

  mountains.forEach(
    (s, i) => (s.tilePosition.x = Math.round(-(x0 + 55) * (0.1 + i * 0.14))),
  );

  terrainLayer.position.set(-x0, -y0);
  let lo = Math.floor(x0 / 256),
    hi = Math.floor((x0 + w) / 256);

  for (let i = lo; i <= hi; i++)
    if (!tiles.has(i)) {
      let s = sprite(ART.tile(i * 256, 540, ground, save.stage));
      s.x = i * 256;
      terrainLayer.addChild(s);
      tiles.set(i, s);
    }

  for (const [i, s] of tiles)
    if (i < lo || i > hi) {
      s.destroy({ texture: true, baseTexture: true });
      tiles.delete(i);
    }

  const visible = new Set();
  for (const it of itemsIn(x0 - 40, x0 + w + 40)) {
    if (taken.has(it.id)) continue;
    visible.add(it.id);
    let s = pickupSprites.get(it.id);
    if (!s) {
      s = new PIXI.Sprite(itemTex[it.kind] || itemTex.coin1);
      s.anchor.set(0.5);
      objects.addChild(s);
      pickupSprites.set(it.id, s);
    }
    const isCoin = it.kind.startsWith("coin");
    s.position.set(
      Math.round(it.x - x0),
      Math.round(
        it.y -
          y0 +
          (isCoin ? Math.sin(elapsed * 3.5 + it.x * 0.03) * 1.5 : 0),
      ),
    );
  }

  for (const [id, s] of pickupSprites)
    if (!visible.has(id)) {
      s.destroy();
      pickupSprites.delete(id);
    }

  vehicle.position.set(Math.round(car.x - x0), Math.round(car.y - y0));
  vehicle.rotation = car.angle;
  wheels.forEach((wh) => (wh.rotation = spin));

  // Position fxLayer relative to camera
  fxLayer.position.set(-x0, -y0);
}

let renderedMode;

function syncHud() {
  const fields = {
    stageTitle: track().name,
    stageNo: "STAGE 0" + (save.stage + 1),
    best: save.best[save.stage],
    distance,
    coins: runCoins,
  };
  for (const [id, value] of Object.entries(fields)) {
    const node = $(id);
    if (node && node.textContent !== String(value)) node.textContent = value;
  }
  const fuel = Math.round(car.fuel),
    meter = $("fuelmeter");
  if (
    meter.getAttribute("aria-valuenow") !== String(fuel) ||
    !meter.dataset.ready
  ) {
    [...meter.children].forEach((s, i) =>
      s.classList.toggle("empty", i >= Math.ceil(car.fuel / 10)),
    );
    meter.setAttribute("aria-valuenow", fuel);
    meter.dataset.ready = "true";
  }
  if (renderedMode !== mode) {
    $("action").innerHTML =
      icon(mode === "running" ? "pause" : "play") +
      "<span>" +
      {
        ready: "START ENGINE",
        running: "PAUSE",
        paused: "RESUME",
        over: "RACE AGAIN",
      }[mode] +
      "</span>";
    renderedMode = mode;
  }

  // Update footer vehicle name
  const vehEl = document.querySelector(".vehicle");
  if (vehEl) {
    vehEl.innerHTML = '<i data-i="car"></i> ' + currentVehicle().name;
    const ci = vehEl.querySelector("i");
    if (ci && !ci.querySelector("svg")) ci.innerHTML = icon("car");
  }
}

for (let i = 0; i < 10; i++)
  $("fuelmeter").append(document.createElement("span"));

function release() {
  for (let k of ["gas", "brake"]) {
    inputs[k].clear();
    $(k).classList.remove("down");
  }
}

function reset() {
  release();
  const v = currentVehicle();
  const startAng = Math.atan((ground(startX + 21) - ground(startX - 21)) / 42);
  car = {
    x: startX,
    y: ground(startX) - 12 - (v.wheelRadius - 9),
    vx: 0,
    vy: 0,
    angle: startAng,
    omega: 0,
    fuel: 100,
  };
  distance = 0;
  furthest = 0;
  runCoins = 0;
  taken.clear();
  smashedCrates.clear();
  reachedMilestones.clear();
  dynamicBoulders = [];
  mode = "ready";
  elapsed = 0;
  grace = 0;
  spin = 0;
  airTime = 0;
  accumulatedRotation = 0;
  lastAngle = startAng;
  wasInAir = false;

  // Clear floating texts
  for (const ft of floatingTexts) ft.sprite.destroy();
  floatingTexts.length = 0;

  $("feedback").textContent = "";
  rebuildVehicleSprite();
  clearTiles();
  syncHud();
  draw(true);
  motor();
}

function start() {
  soundInit();
  if (mode === "over") reset();
  mode = "running";
  syncHud();
  motor();
}

function pause() {
  if (mode === "running") {
    mode = "paused";
    release();
    syncHud();
    motor();
  }
}

function checkpoint() {
  if (furthest > save.best[save.stage]) {
    save.best[save.stage] = furthest;
    persist();
  }
}

function finish(reason) {
  mode = "over";
  release();
  checkpoint();
  if (reason === "Finish line!") {
    const stageBonus = 100 + save.stage * 50;
    save.bank += stageBonus;
    persist();
    ping(840, 0.35);
    toast("STAGE COMPLETE! +" + stageBonus + " COINS");
  } else {
    ping(130, 0.2);
  }
  syncHud();
  motor();
  openDialog("result", reason);
}

// ==================== PHYSICS & SIMULATION ====================
function step(dt) {
  const gas = Number(inputs.gas.size > 0),
    brake = Number(inputs.brake.size > 0),
    c = car,
    v = currentVehicle(),
    tr = track(),
    cs = Math.cos(c.angle),
    sn = Math.sin(c.angle);

  // Track gravity & vehicle mass
  let forceY = tr.gravity * v.mass,
    torque = 0,
    traction = 0,
    slope = 0;

  // Suspension & wheel contact points
  for (let dx of v.wheelOffsets) {
    let ax = dx * cs - v.wheelY * sn,
      ay = dx * sn + v.wheelY * cs,
      wx = c.x + ax,
      wy = c.y + ay,
      pen = wy + v.wheelRadius - ground(wx);

    if (pen > 0) {
      let m = (ground(wx + 1) - ground(wx - 1)) / 2;
      let compressionRate = c.vy + c.omega * ax - m * c.vx;
      let suspensionBonus = 1 + save.suspension * 0.18;
      let spring = Math.min(
        1350,
        Math.max(
          0,
          pen * (v.spring * suspensionBonus) +
            compressionRate * (v.damping + save.grip * 1.5),
        ),
      );
      forceY -= spring;
      torque -= (spring * ax) / 480;
      traction++;
      slope += m;
    }
  }

  // Wheel contact & acceleration
  let accel = -c.vx * 0.12;
  const gripTotal = tr.friction * (1 + save.grip * 0.2);

  if (traction > 0) {
    slope /= traction;
    const enginePower = v.power + save.engine * 18;
    accel +=
      gas * enginePower * gripTotal -
      brake * (c.vx > 3 ? 155 : 46) * gripTotal +
      (slope * 115) / (1 + slope * slope);

    if (!gas && !brake) accel -= c.vx * 0.34;
    torque -= c.omega * (3.2 + save.grip * 0.5);

    // Stunt check upon landing
    if (wasInAir) {
      // Check for backflips / frontflips
      const fullRotations = Math.floor(Math.abs(accumulatedRotation) / (Math.PI * 1.85));
      if (fullRotations >= 1) {
        const isBackflip = accumulatedRotation < 0;
        const flipReward = fullRotations * 50;
        runCoins += flipReward;
        save.bank += flipReward;
        persist();
        const flipName = isBackflip ? "BACKFLIP!" : "FRONTFLIP!";
        toast(flipName + " +" + flipReward + " COINS");
        spawnFloatingText("+" + flipReward + " " + flipName, c.x, c.y - 40, "#ff3b68");
        playCoinSound(50);
      } else if (airTime > 1.25) {
        // Air Time Bonus
        const airReward = 20;
        runCoins += airReward;
        save.bank += airReward;
        persist();
        toast("BIG AIR! +" + airReward + " COINS");
        spawnFloatingText("+20 BIG AIR", c.x, c.y - 35, "#00f0ff");
        playCoinSound(10);
      }
      airTime = 0;
      accumulatedRotation = 0;
      wasInAir = false;
    }
  } else {
    // In air: stunt rotation controls and tracking
    wasInAir = true;
    airTime += dt;
    const airRotSpeed = v.airTorque;
    torque += (brake - gas) * airRotSpeed - c.omega * 0.55;

    // Track rotation angle
    let deltaAngle = c.angle - lastAngle;
    if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
    if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;
    accumulatedRotation += deltaAngle;
  }

  lastAngle = c.angle;

  const maxFwdSpeed = v.topSpeed + save.engine * 16;
  c.vx = Math.max(-38, Math.min(maxFwdSpeed, c.vx + accel * dt));
  c.vy += forceY * dt;
  c.omega = Math.max(-6.5, Math.min(6.5, c.omega + torque * dt));
  c.x = Math.max(startX - 25, c.x + c.vx * dt);
  c.y += c.vy * dt;
  c.angle += c.omega * dt;
  spin += (c.vx * dt) / (v.wheelRadius || 9);
  elapsed += dt;

  // Progressive fuel burn (increases slightly as distance increases)
  const distScale = 1 + Math.min(0.5, distance / 1500);
  const baseBurn = (1.35 + gas * 0.65) * distScale;
  const tankEfficiency = v.fuelCapacity * (1 + save.tank * 0.25);
  c.fuel = Math.max(0, c.fuel - (dt * baseBurn) / tankEfficiency);

  distance = Math.max(0, Math.floor((c.x - startX) / pxm));
  furthest = Math.max(furthest, distance);

  // Distance Milestones Rewards (250m, 500m, 1000m, 1500m, 2000m, 2500m, 3000m)
  const milestoneList = [
    [250, 50],
    [500, 100],
    [1000, 250],
    [1500, 500],
    [2000, 1000],
    [2500, 1500],
    [3000, 2000],
  ];
  for (const [mDist, mBonus] of milestoneList) {
    if (distance >= mDist && !reachedMilestones.has(mDist)) {
      reachedMilestones.add(mDist);
      runCoins += mBonus;
      save.bank += mBonus;
      persist();
      toast("MILESTONE " + mDist + "m! +" + mBonus + " COINS");
      spawnFloatingText("+" + mBonus + " MILESTONE!", c.x, c.y - 45, "#ffd700");
      playCoinSound(100);
    }
  }

  // Item & obstacle collision detections
  for (const it of itemsIn(c.x - 38, c.x + 38)) {
    if (it.kind === "finish" || taken.has(it.id)) continue;

    // Check vertical proximity
    const dy = Math.abs(c.y - it.y);
    if (dy > 30) continue;

    if (it.kind.startsWith("coin")) {
      taken.add(it.id);
      const val = it.value || 1;
      runCoins += val;
      save.bank += val;
      persist();

      // Denomination colors
      const coinColors = {
        1: "#f4a261",
        5: "#e2e8f0",
        10: "#ffcf33",
        50: "#ff3b68",
        100: "#00f0ff",
      };
      spawnFloatingText("+" + val, it.x, it.y - 12, coinColors[val] || "#ffcf33");
      playCoinSound(val);
    } else if (it.kind === "fuel") {
      taken.add(it.id);
      c.fuel = 100;
      toast("TANK FILLED");
      spawnFloatingText("TANK FULL", it.x, it.y - 14, "#4ade80");
      ping(510, 0.22);
    } else if (it.kind === "crate") {
      // Smashable crate
      taken.add(it.id);
      playCrashSound();
      const bonus = 10;
      runCoins += bonus;
      save.bank += bonus;
      persist();
      toast("CRATE SMASHED! +" + bonus);
      spawnFloatingText("+" + bonus + " CRATE", it.x, it.y - 14, "#b9733e");
      // Resistance depends on vehicle mass
      if (v.mass < 1.1) c.vx *= 0.88;
    } else if (it.kind === "ramp") {
      // Springboard ramp launches car upwards!
      if (c.vx > 15 && !taken.has(it.id)) {
        taken.add(it.id);
        c.vy = -185 * (1.1 - v.mass * 0.15);
        c.vx = Math.min(c.vx * 1.15, 230);
        c.omega += 1.8;
        playRampSound();
        spawnFloatingText("BOOST JUMP!", it.x, it.y - 20, "#ffdd44");
      }
    } else if (it.kind === "boulder") {
      // Boulder collision
      if (!taken.has(it.id)) {
        taken.add(it.id);
        playCrashSound();
        // Heavy vehicles (Tank / Monster Truck) crush right through!
        if (v.id === "tank" || v.id === "monster") {
          spawnFloatingText("BOULDER CRUSHED!", it.x, it.y - 16, "#e2e8f0");
          c.vx *= 0.94;
        } else {
          // Lighter vehicles bounce back
          spawnFloatingText("BOULDER HIT!", it.x, it.y - 16, "#e2e8f0");
          c.vx *= 0.65;
          c.vy -= 40;
          c.omega += 1.2;
        }
      }
    } else if (it.kind === "log") {
      // Log hurdle
      if (!taken.has(it.id)) {
        taken.add(it.id);
        playCrashSound();
        c.vy -= 35;
        if (v.mass < 1.2) c.vx *= 0.82;
      }
    }
  }

  // Update floating text animation
  updateFloatingTexts(dt);

  // Rollover and out-of-fuel failure checks
  const roofX = c.x + 18 * Math.sin(c.angle),
    roofY = c.y - 18 * Math.cos(c.angle);
  grace =
    roofY >= ground(roofX) - 1 && Math.cos(c.angle) < 0.28 ? grace + dt : 0;

  if (grace > 0.12 || c.y > ground(c.x) + 38) finish("Rolled over");
  else if (c.fuel <= 0) finish("Out of fuel");
  else if (distance >= track().length) finish("Finish line!");
}

function toast(s) {
  $("feedback").textContent = s;
  toastTime = elapsed + 1.25;
}

let acc = 0,
  hudTime = 0;

app.ticker.add(() => {
  if (mode !== "running") {
    acc = 0;
    return;
  }
  acc += Math.min(app.ticker.deltaMS / 1000, 0.08);
  while (acc >= 1 / 120 && mode === "running") {
    step(1 / 120);
    acc -= 1 / 120;
  }
  draw();
  if (elapsed > toastTime) $("feedback").textContent = "";
  if (elapsed - hudTime > 0.09 || elapsed < hudTime) {
    syncHud();
    hudTime = elapsed;
    motor();
  }
});

function trigger(k, token, down) {
  if (down) {
    if ($("modal").open) return;
    if (mode === "ready") start();
    if (mode !== "running") return;
    inputs[k].add(token);
  } else inputs[k].delete(token);
  $(k).classList.toggle("down", inputs[k].size > 0);
}

for (const k of ["brake", "gas"]) {
  const b = $(k);
  b.onpointerdown = (e) => {
    e.preventDefault();
    b.setPointerCapture(e.pointerId);
    trigger(k, e.pointerId, true);
  };
  b.onpointerup =
    b.onpointercancel =
    b.onlostpointercapture =
      (e) => trigger(k, e.pointerId, false);
  b.oncontextmenu = (e) => e.preventDefault();
}

function action() {
  if (mode === "running") {
    openDialog("pause");
  } else start();
}

$("action").onclick = action;

const mapping = {
  ArrowLeft: "brake",
  KeyA: "brake",
  ArrowRight: "gas",
  KeyD: "gas",
};

window.addEventListener("keydown", (e) => {
  if (
    $("modal").open &&
    activeDialog === "pause" &&
    !e.repeat &&
    e.code === "KeyP"
  ) {
    e.preventDefault();
    closeDialog();
    return;
  }
  if ($("modal").open || e.ctrlKey || e.altKey || e.metaKey) return;
  if (mapping[e.code]) {
    e.preventDefault();
    if (!e.repeat) trigger(mapping[e.code], e.code, true);
  } else if (
    !e.repeat &&
    e.code === "KeyP" &&
    ["paused", "running"].includes(mode)
  ) {
    e.preventDefault();
    action();
  } else if (!e.repeat && e.code === "KeyR") {
    e.preventDefault();
    checkpoint();
    reset();
    start();
  }
});

window.addEventListener("keyup", (e) => {
  if (mapping[e.code]) trigger(mapping[e.code], e.code, false);
});

window.addEventListener("pagehide", checkpoint);
window.addEventListener("blur", () => {
  release();
  pause();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    release();
    pause();
    checkpoint();
  }
});

const mb = $("modalBody"),
  modal = $("modal");

function closeDialog() {
  if (modal.open) modal.close();
  if (resumeOnClose && mode === "paused") start();
  resumeOnClose = false;
  activeDialog = "";
  $("raceTab").classList.add("active");
  $("garageTab").classList.remove("active");
  $("tracksTab").classList.remove("active");
}

modal.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeDialog();
});

$("close").onclick = closeDialog;

modal.onclick = (e) => {
  const r = modal.getBoundingClientRect();
  if (
    e.target === modal &&
    (e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom)
  )
    closeDialog();
};

// ==================== DIALOGS & MENUS ====================
function openDialog(type, reason) {
  if (!modal.open) {
    resumeOnClose = mode === "running";
    pause();
    modal.showModal();
  }
  activeDialog = type;
  ["race", "garage", "tracks"].forEach((t) =>
    $(t + "Tab").classList.toggle(
      "active",
      type === t || (t === "race" && !["garage", "tracks"].includes(type)),
    ),
  );

  if (type === "pause") {
    $("modalTitle").textContent = "Race paused";
    mb.innerHTML =
      "<p>" +
      track().name +
      " · " +
      distance +
      ' m</p><button class="dialogBtn" id="resumeRun">Resume race</button><button class="dialogBtn" id="restartRun">Restart race</button>';
    $("resumeRun").onclick = closeDialog;
    $("restartRun").onclick = () => {
      resumeOnClose = false;
      closeDialog();
      checkpoint();
      reset();
      start();
    };
  }

  if (type === "garage") {
    $("modalTitle").textContent = "Garage";
    let html = '<p class="balance">Coin balance · <b>' + save.bank + " coins</b></p>";

    // 1. VEHICLE SELECTOR SECTION
    html += '<h3 class="sectionHeader">SELECT VEHICLE</h3>';
    html += '<div class="carCards">';
    vehicles.forEach((veh, idx) => {
      const isUnlocked = save.unlockedCars.includes(idx);
      const isSelected = save.car === idx;
      html +=
        '<div class="card ' +
        (isSelected ? "selectedCard" : "") +
        '">' +
        '<div class="cardHead"><b>' +
        veh.name +
        "</b>" +
        (isSelected ? '<span class="badge activeBadge">Active</span>' : "") +
        "</div>" +
        '<p class="cardDesc">' +
        veh.desc +
        "</p>" +
        '<div class="statsBar"><small>SPD</small><div class="barPip">' +
        "▮".repeat(veh.stats.speed) +
        "▯".repeat(5 - veh.stats.speed) +
        '</div><small>TRQ</small><div class="barPip">' +
        "▮".repeat(veh.stats.torque) +
        "▯".repeat(5 - veh.stats.torque) +
        '</div><small>AIR</small><div class="barPip">' +
        "▮".repeat(veh.stats.air) +
        "▯".repeat(5 - veh.stats.air) +
        "</div></div>" +
        '<button class="actionBtn" id="carBtn_' +
        idx +
        '" ' +
        (!isUnlocked && save.bank < veh.price ? "disabled" : "") +
        ">" +
        (isSelected
          ? "Selected"
          : isUnlocked
            ? "Drive"
            : "Unlock · " + veh.price + " coins") +
        "</button></div>";
    });
    html += "</div>";

    // 2. UPGRADES SECTION
    html += '<h3 class="sectionHeader">TUNE & UPGRADE</h3>';
    for (const [k, name, desc] of upgrades) {
      const level = save[k] || 0,
        price = 15 * (level + 1) * (level + 1);
      html +=
        '<div class="row"><div><b>' +
        name +
        "</b> · " +
        level +
        "/5<small>" +
        desc +
        "</small></div><button class='upgradeBtn' data-k='" +
        k +
        "' " +
        (level >= 5 || save.bank < price ? "disabled" : "") +
        ">" +
        (level >= 5 ? "MAX" : price + " coins") +
        "</button></div>";
    }

    mb.innerHTML = html;

    // Attach Vehicle Click Handlers
    vehicles.forEach((veh, idx) => {
      const btn = $("carBtn_" + idx);
      if (!btn) return;
      btn.onclick = () => {
        const isUnlocked = save.unlockedCars.includes(idx);
        if (!isUnlocked) {
          if (save.bank >= veh.price) {
            save.bank -= veh.price;
            save.unlockedCars.push(idx);
            save.car = idx;
            persist();
            ping(900, 0.2);
            reset();
            openDialog("garage");
          }
        } else {
          save.car = idx;
          persist();
          ping(650, 0.12);
          reset();
          openDialog("garage");
        }
      };
    });

    // Attach Upgrade Click Handlers
    mb.querySelectorAll(".upgradeBtn").forEach((b) => {
      b.onclick = () => {
        const k = b.dataset.k;
        const level = save[k] || 0;
        const price = 15 * (level + 1) * (level + 1);
        if (level < 5 && save.bank >= price) {
          save.bank -= price;
          save[k] = level + 1;
          persist();
          ping(780, 0.15);
          openDialog("garage");
        }
      };
    });
  }

  if (type === "tracks") {
    $("modalTitle").textContent = "Tracks";
    let html = '<p class="balance">Coin balance · <b>' + save.bank + " coins</b></p>";
    html += '<div class="trackCards">';
    tracks.forEach((t, i) => {
      const isUnlocked = save.unlockedTracks.includes(i);
      const isSelected = save.stage === i;
      html +=
        '<div class="card ' +
        (isSelected ? "selectedCard" : "") +
        '">' +
        '<div class="cardHead"><b>' +
        t.name +
        "</b>" +
        (isSelected ? '<span class="badge activeBadge">Racing</span>' : "") +
        "</div>" +
        '<p class="cardDesc">' +
        t.desc +
        "</p>" +
        '<div class="trackMeta"><small>' +
        t.grade +
        " · " +
        t.length +
        " m</small>" +
        "<small>Best: <b>" +
        (save.best[i] || 0) +
        " m</b></small></div>" +
        '<button class="actionBtn" id="trackBtn_' +
        i +
        '" ' +
        (!isUnlocked && save.bank < t.price ? "disabled" : "") +
        ">" +
        (isSelected
          ? "Selected"
          : isUnlocked
            ? "Race Here"
            : "Unlock · " + t.price + " coins") +
        "</button></div>";
    });
    html += "</div>";
    mb.innerHTML = html;

    tracks.forEach((t, i) => {
      const btn = $("trackBtn_" + i);
      if (!btn) return;
      btn.onclick = () => {
        const isUnlocked = save.unlockedTracks.includes(i);
        if (!isUnlocked) {
          if (save.bank >= t.price) {
            save.bank -= t.price;
            save.unlockedTracks.push(i);
            save.stage = i;
            persist();
            ping(900, 0.2);
            resumeOnClose = false;
            reset();
            resize();
            closeDialog();
          }
        } else {
          if (i !== save.stage) {
            checkpoint();
            save.stage = i;
            persist();
            resumeOnClose = false;
            reset();
            resize();
          }
          closeDialog();
        }
      };
    });
  }

  if (type === "help") {
    $("modalTitle").textContent = "How to play";
    mb.innerHTML =
      '<div class="helptext">' +
      "<p><b>RACE FOR DISTANCE:</b> Reach the checkered flag or drive as far as possible! Collect tiered coins, avoid obstacles, and keep your fuel tank filled.</p>" +
      "<p><b>COIN TIERS:</b><br/>" +
      "• Bronze (+1) & Silver (+5): Early terrain.<br/>" +
      "• Gold (+10) & Ruby (+50): Mid-range & jump peaks.<br/>" +
      "• Diamond (+100): High distance (1200m+) & perilous leaps!</p>" +
      "<p><b>STUNT BONUSES:</b> Pull off backflips or frontflips in mid-air (+50 coins) and launch off springboard ramps for massive air time!</p>" +
      "<p><b>OBSTACLES:</b> Smash through wooden crates (+10 bonus!), crush or dodge boulders, and leap over logs.</p>" +
      "<p><kbd>→</kbd> or <kbd>D</kbd> · Gas / Lean back in air.<br/>" +
      "<kbd>←</kbd> or <kbd>A</kbd> · Brake / Reverse / Lean forward in air.<br/>" +
      "<kbd>P</kbd> Pause · <kbd>R</kbd> Restart</p></div>";
  }

  if (type === "result") {
    $("modalTitle").textContent = reason;
    mb.innerHTML =
      "<p>" +
      track().name +
      ' · <b style="color:var(--gold);">' +
      currentVehicle().name +
      '</b></p><div class="row">Distance <b>' +
      distance +
      ' m</b></div><div class="row">Coins collected <b>' +
      runCoins +
      " coins</b></div>" +
      (reason === "Finish line!"
        ? '<div class="row">Finish bonus <b>' + (100 + save.stage * 50) + " coins</b></div>"
        : "") +
      '<button class="dialogBtn">Race again</button>';
    mb.querySelector("button").onclick = () => {
      closeDialog();
      reset();
      start();
    };
  }
}

$("raceTab").onclick = closeDialog;
$("garageTab").onclick = () => openDialog("garage");
$("tracksTab").onclick = () => openDialog("tracks");
$("help").onclick = () => openDialog("help");

reset();
resize();
new ResizeObserver(resize).observe($("screen"));
