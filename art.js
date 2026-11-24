// Pixel-art textures are drawn at their native resolution and scaled by PixiJS.
const ART = (() => {
  const palettes = [
    // 0: Copper Canyon (Desert)
    {
      sky: ["#81c9d4", "#9ed5d7", "#b8dfd9", "#d8e6d2", "#efdfbd"],
      far: ["#e9b9a0", "#d7a18e", "#c58a79"],
      near: ["#d78a62", "#bb6950", "#a45a47", "#e69e72"],
      ground: [
        "#f6bd75",
        "#da9353",
        "#bf7445",
        "#9e5b3e",
        "#754638",
        "#573b33",
      ],
      plant: ["#396a57", "#538365", "#7c9a69"],
    },
    // 1: Dusk Ridge (Twilight)
    {
      sky: ["#9197ce", "#b7afd8", "#d4bed8", "#ebc9d6", "#ffdfc7"],
      far: ["#ccb0bd", "#b799b0", "#957f9e"],
      near: ["#a47887", "#8b657b", "#765872", "#bf939b"],
      ground: [
        "#e0b691",
        "#b48a81",
        "#9c7077",
        "#805b65",
        "#694d59",
        "#483f4e",
      ],
      plant: ["#395c5b", "#527774", "#709892"],
    },
    // 2: Alpine Crest (Snow / Ice)
    {
      sky: ["#86bfd1", "#a5cedb", "#b7d7dd", "#d7e5df", "#f0ecdb"],
      far: ["#bad1cf", "#a1b9bb", "#869faa"],
      near: ["#96abaa", "#768d94", "#627882", "#d5e0d7"],
      ground: [
        "#f0f6fa",
        "#d5e3ec",
        "#aabbb7",
        "#7e949c",
        "#576b72",
        "#3c4c54",
      ],
      plant: ["#2c4d43", "#3d685b", "#5e8c7c"],
    },
    // 3: Volcanic Hollow (Lava / Ash)
    {
      sky: ["#1c131d", "#361824", "#5e1d24", "#8c2a24", "#c44c27"],
      far: ["#3f1b24", "#52242c", "#2d161d"],
      near: ["#632525", "#47181c", "#872f23", "#a84024"],
      ground: [
        "#3a3335",
        "#2d2729",
        "#241d20",
        "#4a1c1d",
        "#7d2319",
        "#1a1416",
      ],
      plant: ["#a1281a", "#e84e1b", "#ff9021"],
    },
    // 4: Lunar Crater (Space / Moon)
    {
      sky: ["#070a14", "#0c1020", "#12182c", "#172037", "#1e2842"],
      far: ["#2d3548", "#232a3a", "#1a1f2b"],
      near: ["#47526b", "#384157", "#2b3244", "#586684"],
      ground: [
        "#c2c8d2",
        "#9aa2b0",
        "#747d8e",
        "#535b6b",
        "#3b414e",
        "#252933",
      ],
      plant: ["#38d9d4", "#5eead4", "#a5f3fc"],
    },
    // 5: Mud Bog (Swamp / Mire)
    {
      sky: ["#4a5943", "#627254", "#7b8867", "#989f78", "#b8b68c"],
      far: ["#455038", "#38422d", "#2d3424"],
      near: ["#5b6b47", "#485637", "#39452b", "#6e7e57"],
      ground: [
        "#5a4d38",
        "#463c2c",
        "#382e21",
        "#2a2218",
        "#2f3b25",
        "#1e2417",
      ],
      plant: ["#324626", "#4d6b38", "#72964e"],
    },
  ];

  const canvas = (w, h) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  };

  function rect(g, x, y, w, h, col) {
    g.fillStyle = col;
    g.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h));
  }

  function poly(g, pts, c) {
    const ys = pts.map((p) => p[1]);
    for (let y = Math.floor(Math.min(...ys)); y < Math.max(...ys); y++) {
      let cuts = [];
      for (let j = 0; j < pts.length; j++) {
        const a = pts[j],
          b = pts[(j + 1) % pts.length];
        if ((a[1] <= y && y < b[1]) || (b[1] <= y && y < a[1]))
          cuts.push(a[0] + ((y - a[1]) * (b[0] - a[0])) / (b[1] - a[1]));
      }
      cuts.sort((a, b) => a - b);
      for (let j = 0; j + 1 < cuts.length; j += 2)
        rect(g, cuts[j], y, Math.max(1, cuts[j + 1] - cuts[j]), 1, c);
    }
  }

  const noise = (n) => {
    const a = Math.sin(n * 78.233 + 43.2) * 43758.5453;
    return a - Math.floor(a);
  };

  function sky(w, h, p, stage = 0) {
    const c = canvas(w, h),
      g = c.getContext("2d");
    p.sky.forEach((s, i) =>
      rect(g, 0, Math.floor(h * [0, 0.19, 0.33, 0.48, 0.59][i]), w, h, s),
    );

    // Celestial body:
    if (stage === 4) {
      // Moon stage: starry space + glowing Earth
      for (let i = 0; i < 90; i++) {
        let sx = Math.floor(noise(i * 17) * w),
          sy = Math.floor(noise(i * 31 + 5) * h * 0.7),
          br = noise(i * 7);
        rect(g, sx, sy, 1, 1, br > 0.8 ? "#ffffff" : br > 0.4 ? "#a2c4e8" : "#5d7396");
      }
      // Glowing Earth in space
      const ex = Math.floor(w * 0.75), ey = Math.floor(h * 0.24), er = 16;
      for (let j = -er; j <= er; j++) {
        let dx = Math.floor(Math.sqrt(er * er - j * j));
        rect(g, ex - dx, ey + j, dx * 2, 1, "#1c4e80");
      }
      // Continents on earth
      rect(g, ex - 6, ey - 7, 7, 5, "#438c56");
      rect(g, ex - 1, ey - 3, 9, 6, "#55a36b");
      rect(g, ex - 8, ey + 2, 8, 5, "#3b7e4e");
      rect(g, ex + 2, ey + 7, 6, 4, "#dbe7f2");
      rect(g, ex - 7, ey - 12, 12, 3, "#eaf3fa");
    } else if (stage === 3) {
      // Volcanic stage: Blood moon + ash particles
      const x = Math.floor(w * 0.68), y = Math.floor(h * 0.25), r = 18;
      for (let j = -r; j <= r; j++) {
        let dx = Math.floor(Math.sqrt(r * r - j * j));
        rect(g, x - dx, y + j, dx * 2, 1, j > 0 ? "#8c1f1f" : "#d94126");
      }
      // Rising embers
      for (let i = 0; i < 35; i++) {
        let ex = noise(i * 13) * w,
          ey = h * (0.05 + noise(i + 44) * 0.7);
        rect(g, ex, ey, 2, 2, noise(i) > 0.5 ? "#ffaa33" : "#ff4422");
      }
    } else {
      // Sun
      const x = Math.floor(w * 0.71),
        y = Math.floor(h * 0.235),
        r = Math.min(23, Math.round(h * 0.112));
      for (let j = -r; j <= r; j++) {
        let dx = Math.floor(Math.sqrt(r * r - j * j) / 2) * 2;
        rect(
          g,
          x - dx,
          y + j,
          dx * 2,
          1,
          j > r * 0.58 ? "#ffd699" : j > r * 0.2 ? "#ffe7ac" : "#fff0c7",
        );
      }
      // Clouds
      const cloud = (cx, cy, s) => {
        for (const [dx, dy, a, b] of [
          [0, 10, 51, 3],
          [4, 7, 42, 4],
          [10, 4, 13, 5],
          [19, 0, 10, 8],
          [29, 3, 7, 6],
          [37, 6, 6, 4],
          [49, 11, 8, 2],
        ])
          rect(g, cx + dx * s, cy + dy * s, a * s, b * s, stage === 5 ? "#879983" : "#ebf2df");
        rect(g, cx + 7 * s, cy + 13 * s, 45 * s, s, stage === 5 ? "#5b6d57" : "#cee6dc");
      };
      cloud(w * 0.12, h * 0.16, 0.84);
      cloud(w * 0.47, h * 0.105, 0.65);
      cloud(w * 0.83, h * 0.225, 0.99);
      cloud(-12, h * 0.32, 0.62);
    }
    return c;
  }

  function mesas(h, stage, layer) {
    const w = 832,
      c = canvas(w, h),
      g = c.getContext("2d"),
      p = palettes[stage % palettes.length],
      base = h * (layer === 0 ? 0.75 : 0.81),
      amp = h * (layer === 0 ? 0.17 : 0.17);

    let pnts = [[0, base]];
    for (let k = 0; k <= w; k += 5) {
      let height =
        (Math.sin(k / (layer === 0 ? 42 : 56) + layer) +
          Math.sin(k / 21) * 0.24 +
          1.4) *
        amp *
        0.42;
      pnts.push([k, Math.round((base - height) / 2) * 2]);
    }
    poly(g, [...pnts, [w, h], [0, h]], layer === 0 ? p.far[1] : p.near[1]);

    if (stage === 2) {
      // Snowy peaks
      for (let k = -90; k < w; k += 96) {
        let peak = base - h * (0.24 + 0.14 * noise(k));
        poly(g, [[k, base], [k + 56, peak], [k + 128, base]], layer ? p.near[0] : p.far[0]);
        poly(g, [
          [k + 56, peak],
          [k + 78, peak + 20],
          [k + 62, peak + 14],
          [k + 52, peak + 19],
          [k + 40, peak + 18],
        ], "#edf1df");
      }
    } else if (stage === 3) {
      // Volcanic jagged peaks with glowing tips
      for (let k = -80; k < w; k += 110) {
        let peak = base - h * (0.28 + 0.15 * noise(k + 3));
        poly(g, [[k, base], [k + 50, peak], [k + 115, base]], layer ? p.near[0] : p.far[0]);
        poly(g, [
          [k + 45, peak],
          [k + 55, peak],
          [k + 62, peak + 12],
          [k + 40, peak + 10],
        ], "#ff5522");
      }
    } else if (stage === 4) {
      // Lunar crater rims
      for (let k = -60; k < w; k += 85) {
        let peak = base - h * (0.16 + 0.12 * noise(k + 7));
        poly(g, [
          [k, base],
          [k + 30, peak],
          [k + 45, peak + 6],
          [k + 60, peak],
          [k + 90, base],
        ], layer ? p.near[0] : p.far[0]);
      }
    } else {
      // Buttes / Mesas
      function butte(x, wide, high, seed) {
        const cols = layer === 0 ? p.far : p.near,
          top = base - high;
        const outline = [
          [0, 1],
          [0.12, 0.86],
          [0.21, 0.74],
          [0.24, 0.48],
          [0.29, 0.47],
          [0.31, 0.23],
          [0.34, 0.23],
          [0.35, 0.055],
          [0.39, 0.055],
          [0.39, 0],
          [0.7, 0],
          [0.7, 0.04],
          [0.76, 0.04],
          [0.77, 0.27],
          [0.82, 0.27],
          [0.83, 0.57],
          [0.88, 0.6],
          [0.91, 0.82],
          [1, 1],
        ].map(([a, b]) => [x + a * wide, top + b * high]);
        poly(g, outline, cols[0]);
      }
      const defs = layer === 0
        ? [[-40, 115, 0.3], [140, 186, 0.32], [350, 139, 0.26], [585, 165, 0.24]]
        : [[-58, 127, 0.32], [207, 115, 0.44], [409, 147, 0.3], [635, 160, 0.37]];
      defs.forEach(([x, bw, f], i) => butte(x, bw, f * h, i * 13));
    }

    for (let i = 0; i < 180; i++) {
      let x = noise(i + 7) * w,
        y = base + noise(i + 30) * (h - base);
      rect(g, x, y, 2 + noise(i + 103) * 12, 1, layer ? p.near[0] : p.far[0]);
    }
    return c;
  }

  function plant(g, x, y, size, p, stage) {
    const r = (a, b, pw, ph, col) =>
      rect(g, x + a * size, y + b * size, pw * size, ph * size, col);

    if (stage === 2) {
      // Pine tree
      poly(g, [
        [x - 7 * size, y - 3 * size],
        [x, y - 26 * size],
        [x + 7 * size, y - 3 * size],
      ], p.plant[0]);
      poly(g, [
        [x - 5 * size, y - 10 * size],
        [x, y - 26 * size],
        [x + 5 * size, y - 10 * size],
      ], p.plant[1]);
      r(-1, -5, 2, 5, "#4a3328");
    } else if (stage === 3) {
      // Volcanic rock / magma spire
      poly(g, [
        [x - 5 * size, y],
        [x - 1 * size, y - 20 * size],
        [x + 4 * size, y],
      ], "#2b1c20");
      r(-1, -18, 2, 8, p.plant[1]);
      r(-2, -8, 4, 3, p.plant[0]);
    } else if (stage === 4) {
      // Lunar beacon / antenna
      r(-1, -22, 2, 22, "#747d8e");
      r(-3, -25, 6, 3, "#5eead4");
      r(-1, -27, 2, 2, "#ffffff");
      r(-4, -1, 8, 2, "#3b414e");
    } else if (stage === 5) {
      // Swamp willow / gnarled root
      r(-2, -22, 4, 22, "#32271c");
      r(-6, -16, 12, 3, "#425528");
      r(-8, -26, 16, 5, p.plant[0]);
      r(-5, -28, 10, 3, p.plant[1]);
    } else {
      // Cactus
      r(-2, -24, 5, 24, p.plant[0]);
      r(-1, -26, 3, 2, p.plant[0]);
      r(-1, -24, 2, 23, p.plant[1]);
      r(-7, -15, 3, 7, p.plant[1]);
      r(-7, -9, 6, 3, p.plant[0]);
      r(2, -14, 6, 3, p.plant[0]);
      r(6, -21, 3, 8, p.plant[0]);
      r(6, -20, 1, 7, p.plant[2]);
      r(-7, -15, 1, 6, p.plant[2]);
    }
  }

  function tile(start, height, ground, stage) {
    const w = 256,
      c = canvas(w, height),
      g = c.getContext("2d"),
      p = palettes[stage % palettes.length],
      cl = p.ground;

    for (let x = 0; x < w; x += 2) {
      let wx = start + x,
        y = ground(wx);
      rect(g, x, y, 2, height - y, cl[5]);
      let depth = 0;
      for (const [j, thick] of [3, 5, 8, 13, 20].entries()) {
        const len =
          thick +
          (j === 0
            ? 0
            : Math.round(
                (Math.sin(wx / (11 + j * 4) + j) * 2 + Math.cos(wx / 29) * 2) *
                  (j * 0.43),
              ));
        rect(g, x, y + depth, 2, len, cl[j]);
        depth += len;
      }
    }

    for (let i = Math.floor(start / 5); i < (start + w) / 5; i++) {
      let wx = i * 5 + noise(i) * 4,
        x = wx - start,
        y = ground(wx),
        d = noise(i + 100);
      rect(g, x, y + 2, 1 + noise(i + 9) * 3, 1, cl[1]);
      for (let j = 0; j < 4; j++) {
        let depth = 8 + noise(i + j * 330) * 85;
        rect(
          g,
          x + noise(i + j) * 4,
          y + depth,
          2 + noise(i + j * 21) * 6,
          1 + (depth > 30 ? 1 : 0),
          cl[Math.min(5, Math.floor(depth / 16) + 1)],
        );
      }
      if (d > 0.78) {
        const a = 3 + noise(i * 2) * 4;
        poly(
          g,
          [
            [x - a, y],
            [x - a / 2, y - a * 0.7],
            [x + a * 0.15, y - a * 0.86],
            [x + a, y],
          ],
          cl[3],
        );
        rect(g, x - a / 2, y - a * 0.65, a * 0.7, 1, cl[0]);
      }
    }

    for (
      let i = Math.floor((start - 15) / 104);
      i <= Math.ceil((start + w + 15) / 104);
      i++
    ) {
      let wx = i * 104 + 17 + noise(i + 763) * 32;
      if (Math.abs(wx - 145) < 50) continue;
      plant(g, wx - start, ground(wx), 0.55 + noise(i + 335) * 0.53, p, stage);
    }
    return c;
  }

  // ==================== VEHICLE ART ====================
  // 1. Rally Pickup (Balanced standard truck)
  function truck() {
    const c = canvas(78, 41),
      g = c.getContext("2d"),
      r = (x, y, w, h, s) => rect(g, x, y, w, h, s),
      o = "#302d30";
    r(13, 11, 3, 14, o);
    r(16, 8, 11, 3, o);
    r(23, 6, 7, 3, o);
    r(27, 5, 21, 3, o);
    poly(
      g,
      [
        [16, 21],
        [23, 7],
        [46, 7],
        [53, 19],
        [67, 21],
        [71, 24],
        [71, 30],
        [65, 33],
        [10, 33],
        [6, 29],
        [6, 19],
      ],
      o,
    );
    poly(g, [[25, 9], [44, 9], [50, 19], [21, 19]], "#a5d4d2");
    poly(g, [[30, 9], [38, 9], [29, 19], [23, 19]], "#e0efe0");
    r(35, 9, 2, 12, o);
    // Driver
    r(38, 13, 6, 6, "#9e532e");
    r(38, 13, 6, 3, "#e9a66f");
    r(37, 11, 6, 3, "#f0ddbd");
    r(41, 12, 4, 2, "#334147");
    r(41, 17, 4, 3, "#8e5340");
    // Body & bed
    r(4, 18, 15, 10, o);
    r(4, 17, 17, 3, "#ed7535");
    r(6, 19, 13, 4, "#ff9747");
    r(6, 23, 13, 5, "#be482a");
    poly(
      g,
      [
        [19, 19],
        [48, 19],
        [56, 18],
        [68, 20],
        [71, 23],
        [70, 29],
        [64, 31],
        [17, 30],
      ],
      "#db5b2e",
    );
    r(20, 19, 30, 3, "#ff9b4b");
    r(51, 19, 15, 2, "#ffc470");
    r(19, 25, 30, 3, "#a93c2b");
    r(25, 23, 19, 6, "#f8e5bf");
    r(23, 8, 24, 2, "#fb9447");
    r(24, 6, 23, 2, "#f16d32");
    r(23, 4, 25, 2, o);
    [24, 31, 38, 45].forEach((x) => {
      r(x, 1, 5, 4, o);
      r(x + 1, 1, 3, 2, "#ffdd94");
    });
    // Decals & details
    r(29, 24, 3, 4, o);
    r(30, 25, 1, 2, "#f8e5bf");
    r(34, 24, 4, 1, o);
    r(36, 25, 1, 3, o);
    r(11, 22, 8, 1, "#ffdd8a");
    r(64, 21, 6, 3, "#fff1b1");
    r(66, 25, 6, 3, o);
    r(70, 24, 3, 4, "#6d6b5d");
    r(68, 30, 7, 3, o);
    r(3, 27, 8, 3, "#7a7771");
    r(2, 25, 3, 3, "#ae3328");
    r(20, 31, 36, 4, o);
    r(31, 32, 14, 1, "#848176");
    for (let x of [17, 59]) {
      poly(g, [[x - 10, 32], [x - 10, 27], [x - 5, 23], [x + 5, 23], [x + 10, 28], [x + 10, 32]], o);
      r(x - 5, 23, 10, 2, "#99482d");
    }
    return c;
  }

  // 2. Monster Truck (High lift, massive suspension and shock absorbers)
  function monsterTruck() {
    const c = canvas(84, 48),
      g = c.getContext("2d"),
      r = (x, y, w, h, s) => rect(g, x, y, w, h, s),
      o = "#1e1e24";
    // Heavy suspension linkages & shocks
    r(15, 28, 5, 16, "#c0392b");
    r(17, 28, 2, 16, "#e74c3c");
    r(61, 28, 5, 16, "#c0392b");
    r(63, 28, 2, 16, "#e74c3c");
    // Sway bars & subframe
    r(20, 34, 41, 5, "#34495e");
    r(22, 36, 37, 2, "#7f8c8d");
    // Roll cage & roof lights
    r(20, 3, 36, 3, o);
    [24, 32, 40, 48].forEach((x) => {
      r(x, 0, 5, 4, o);
      r(x + 1, 0, 3, 2, "#00f0ff");
    });
    // Cabin & windows
    poly(g, [[16, 17], [22, 4], [52, 4], [58, 17], [16, 17]], o);
    poly(g, [[24, 6], [50, 6], [54, 16], [20, 16]], "#81d4fa");
    // Helmet
    r(34, 9, 7, 7, "#f1c40f");
    r(37, 10, 4, 3, "#2c3e50");
    // Body (cyan & flame stripes)
    poly(g, [
      [8, 17],
      [18, 16],
      [56, 16],
      [68, 19],
      [78, 22],
      [78, 29],
      [6, 29],
      [6, 20],
    ], "#00bcd4");
    // Highlights & flames
    r(10, 18, 48, 4, "#26c6da");
    r(14, 22, 40, 3, "#ffd600");
    r(18, 25, 34, 2, "#ff6d00");
    // Front aggressive bullbar
    r(74, 18, 6, 13, "#7f8c8d");
    r(76, 20, 4, 9, "#bdc3c7");
    r(71, 21, 4, 3, "#fffde7");
    // Wheel arches
    for (let x of [18, 64]) {
      poly(g, [[x - 12, 30], [x - 10, 24], [x + 10, 24], [x + 12, 30]], o);
    }
    return c;
  }

  // 3. Dune Buggy (Tubular roll frame, exposed rear V8 engine, lime green)
  function buggy() {
    const c = canvas(76, 38),
      g = c.getContext("2d"),
      r = (x, y, w, h, s) => rect(g, x, y, w, h, s),
      t = "#2d3436"; // tube color
    // Exposed rear engine & exhaust pipes
    r(4, 14, 12, 14, "#636e72");
    r(2, 10, 5, 8, "#b2bec3");
    r(1, 8, 3, 4, "#ff7675"); // glowing exhaust tip
    r(6, 17, 8, 4, "#d63031");
    // Tubular roll cage structure
    poly(g, [[14, 23], [24, 7], [46, 7], [64, 22], [70, 26], [14, 26]], t);
    // Open cockpit interior
    poly(g, [[26, 9], [44, 9], [48, 21], [22, 21]], "#74b9ff");
    // Driver with visor
    r(30, 12, 8, 8, "#e17055");
    r(33, 14, 5, 3, "#2d3436");
    // Lime green side panel
    poly(g, [[16, 22], [42, 22], [52, 21], [68, 25], [64, 29], [16, 29]], "#00b894");
    r(20, 24, 30, 3, "#55efc4");
    r(32, 24, 8, 2, "#2d3436"); // racing decal
    // Front wing / bumper
    r(64, 26, 8, 4, "#dfe6e9");
    r(66, 24, 3, 2, "#ffeaa7"); // headlamp
    // Wheel arches / mounts
    r(14, 26, 8, 4, t);
    r(54, 26, 8, 4, t);
    return c;
  }

  // 4. Supercar / Turbo Wedge (Aerodynamic crimson racer with rear spoiler)
  function supercar() {
    const c = canvas(80, 32),
      g = c.getContext("2d"),
      r = (x, y, w, h, s) => rect(g, x, y, w, h, s),
      o = "#1a1a1a";
    // Rear high wing / spoiler
    r(4, 3, 12, 3, "#d63031");
    r(7, 6, 3, 10, o);
    r(13, 6, 3, 10, o);
    // Sleek low aerodynamic body
    poly(g, [
      [10, 22],
      [14, 15],
      [28, 8],
      [48, 8],
      [68, 17],
      [77, 21],
      [77, 26],
      [10, 26],
    ], "#d63031");
    // Windshield (tinted dark mirror glass)
    poly(g, [[30, 9], [46, 9], [56, 17], [26, 17]], "#0984e3");
    poly(g, [[35, 10], [44, 10], [38, 16], [32, 16]], "#74b9ff");
    // Driver helmet inside
    r(35, 12, 5, 4, "#fdcb6e");
    // Body accent lines
    r(14, 18, 54, 2, "#ff7675");
    r(20, 22, 46, 3, "#e17055");
    r(12, 24, 62, 2, o); // side skirt
    // Front lights
    r(70, 18, 5, 2, "#ffeaa7");
    r(72, 21, 4, 2, "#ffffff");
    // Rear exhaust flame
    r(2, 23, 5, 3, "#00cec9");
    return c;
  }

  // 5. Heavy Tank / Crawler (Armored olive hull, cannon barrel, hatch)
  function tank() {
    const c = canvas(82, 42),
      g = c.getContext("2d"),
      r = (x, y, w, h, s) => rect(g, x, y, w, h, s),
      o = "#1e272c";
    // Armored main turret
    poly(g, [[22, 18], [28, 8], [52, 8], [58, 18]], "#4a5a3a");
    r(26, 9, 26, 2, "#687f52");
    // Commander cupola & hatch
    r(32, 5, 12, 4, o);
    r(34, 3, 8, 3, "#586944");
    // Tank cannon barrel
    r(56, 11, 24, 4, "#3d4b30");
    r(76, 10, 5, 6, "#2e3924"); // muzzle brake
    // Armored hull
    poly(g, [
      [8, 28],
      [12, 19],
      [68, 19],
      [76, 25],
      [76, 29],
      [8, 29],
    ], "#3d4b30");
    r(12, 20, 56, 3, "#586944");
    r(10, 27, 65, 3, o);
    // Track guard & side armor plates
    r(10, 26, 64, 4, "#4a5a3a");
    for (let i = 0; i < 5; i++) {
      r(16 + i * 11, 27, 2, 2, "#1e272c"); // armor rivets
    }
    return c;
  }

  // 6. Stunt Quad Bike (Nimble 4-wheel ATV with leaning rider)
  function quad() {
    const c = canvas(68, 44),
      g = c.getContext("2d"),
      r = (x, y, w, h, s) => rect(g, x, y, w, h, s),
      o = "#222226";
    // Rider in racing gear
    r(26, 2, 9, 9, "#e67e22"); // helmet
    r(30, 4, 5, 3, "#111111"); // visor
    r(22, 11, 14, 12, "#34495e"); // racing jacket
    r(24, 13, 10, 3, "#f39c12"); // stripe
    r(18, 20, 10, 9, "#2c3e50"); // legs
    // Handlebars
    r(40, 14, 3, 10, "#95a5a6");
    r(38, 12, 7, 3, o);
    // Quad ATV body (sport orange)
    poly(g, [
      [8, 27],
      [14, 20],
      [34, 21],
      [44, 18],
      [58, 22],
      [62, 28],
      [8, 28],
    ], "#e67e22");
    r(14, 21, 30, 3, "#f39c12");
    r(46, 20, 12, 3, "#d35400");
    r(58, 22, 4, 3, "#f1c40f"); // headlight
    // Front bull bumper & rear rack
    r(59, 25, 6, 6, "#7f8c8d");
    r(8, 22, 6, 4, "#7f8c8d");
    return c;
  }

  // ==================== WHEEL ART ====================
  function wheel(type = "default") {
    let size = 20;
    if (type === "monster") size = 28;
    else if (type === "buggy_rear") size = 24;
    else if (type === "buggy_front") size = 16;
    else if (type === "supercar") size = 18;
    else if (type === "tank") size = 18;
    else if (type === "quad") size = 18;

    const c = canvas(size, size),
      g = c.getContext("2d"),
      half = size / 2;

    if (type === "monster") {
      // Massive deep tread monster tire with chrome beadlock
      [
        [0, 4, 20, "#181a1b"],
        [2, 4, 16, "#2c3033"],
        [5, 3, 12, "#181a1b"],
        [7, 2, 8, "#d1d8e0"], // beadlock rim
        [9, 1, 6, "#e74c3c"], // red center hub
        [11, 0, 4, "#2c3033"],
      ].forEach(([m, b, s, col]) => {
        rect(g, m + b, m, s, size - 2 * m, col);
        rect(g, m, m + b, size - 2 * m, s, col);
      });
      // Outer knobby lugs
      for (let i = 0; i < 4; i++) {
        rect(g, 2 + i * 7, 0, 3, 2, "#3d4347");
        rect(g, 2 + i * 7, size - 2, 3, 2, "#181a1b");
      }
    } else if (type === "supercar") {
      // Low-profile slick with gold star alloy rim
      [
        [0, 3, 12, "#151618"],
        [2, 2, 10, "#2a2d30"],
        [4, 1, 8, "#f1c40f"], // gold rim
        [6, 1, 4, "#d4ac0d"],
        [8, 0, 2, "#111111"],
      ].forEach(([m, b, s, col]) => {
        rect(g, m + b, m, s, size - 2 * m, col);
        rect(g, m, m + b, size - 2 * m, s, col);
      });
    } else if (type === "tank") {
      // Heavy iron roadwheel with bolts
      [
        [0, 3, 12, "#2b3226"],
        [2, 2, 10, "#4a563f"],
        [4, 2, 8, "#323a2a"],
        [6, 1, 4, "#7a8a6c"],
      ].forEach(([m, b, s, col]) => {
        rect(g, m + b, m, s, size - 2 * m, col);
        rect(g, m, m + b, size - 2 * m, s, col);
      });
      rect(g, 7, 7, 4, 4, "#181e15");
    } else {
      // Standard rally wheel
      [
        [0, 3, 14, "#25282a"],
        [2, 3, 10, "#414448"],
        [4, 2, 8, "#24282b"],
        [6, 1, 6, "#99958a"],
        [8, 0, 4, "#464747"],
      ].forEach(([m, b, s, col]) => {
        rect(g, m + b, m, s, size - 2 * m, col);
        rect(g, m, m + b, size - 2 * m, s, col);
      });
      rect(g, half - 1, half - 2, 2, 3, "#d1c0a2");
    }
    return c;
  }

  // ==================== COIN ART (1, 5, 10, 50, 100) ====================
  function coin(value) {
    let w = 15, h = 17;
    if (value === 5) { w = 16; h = 18; }
    else if (value === 10) { w = 18; h = 20; }
    else if (value === 50) { w = 20; h = 22; }
    else if (value === 100) { w = 22; h = 24; }

    const c = canvas(w, h),
      g = c.getContext("2d"),
      r = (x, y, pw, ph, col) => rect(g, x, y, pw, ph, col);

    if (value === 1) {
      // Bronze Coin (Value 1)
      poly(g, [
        [3, 0], [w - 4, 0], [w - 1, 3], [w - 1, h - 4], [w - 4, h - 1], [3, h - 1], [0, h - 4], [0, 3],
      ], "#6e3c1a");
      poly(g, [
        [4, 1], [w - 5, 1], [w - 2, 4], [w - 2, h - 5], [w - 5, h - 2], [4, h - 2], [1, h - 5], [1, 4],
      ], "#c87637");
      r(3, 2, w - 6, 2, "#f4a261");
      r(2, 4, 2, h - 8, "#f4a261");
      // "1" digit
      r(Math.floor(w / 2), 4, 2, h - 8, "#fff3d4");
      r(Math.floor(w / 2) - 2, 6, 2, 2, "#fff3d4");
      r(Math.floor(w / 2) - 3, h - 5, 6, 2, "#fff3d4");
    } else if (value === 5) {
      // Silver Coin (Value 5)
      poly(g, [
        [3, 0], [w - 4, 0], [w - 1, 3], [w - 1, h - 4], [w - 4, h - 1], [3, h - 1], [0, h - 4], [0, 3],
      ], "#4a5568");
      poly(g, [
        [4, 1], [w - 5, 1], [w - 2, 4], [w - 2, h - 5], [w - 5, h - 2], [4, h - 2], [1, h - 5], [1, 4],
      ], "#a0aec0");
      r(3, 2, w - 6, 2, "#edf2f7");
      r(2, 4, 2, h - 8, "#edf2f7");
      // "5" digit
      let cx = Math.floor(w / 2) - 3;
      r(cx, 4, 6, 2, "#ffffff");
      r(cx, 6, 2, 3, "#ffffff");
      r(cx, 8, 6, 2, "#ffffff");
      r(cx + 4, 9, 2, 3, "#ffffff");
      r(cx, 11, 6, 2, "#ffffff");
    } else if (value === 10) {
      // Gold Coin (Value 10)
      poly(g, [
        [4, 0], [w - 5, 0], [w - 1, 4], [w - 1, h - 5], [w - 5, h - 1], [4, h - 1], [0, h - 5], [0, 4],
      ], "#926300");
      poly(g, [
        [5, 1], [w - 6, 1], [w - 2, 5], [w - 2, h - 6], [w - 6, h - 2], [5, h - 2], [1, h - 6], [1, 5],
      ], "#ffc72c");
      r(4, 2, w - 8, 2, "#fff69b");
      r(2, 4, 2, h - 8, "#fff69b");
      r(w - 4, 5, 2, h - 9, "#d69200");
      // "10" digits
      let cx = Math.floor(w / 2) - 4;
      // 1
      r(cx, 5, 2, 9, "#ffffff");
      // 0
      r(cx + 4, 5, 5, 2, "#ffffff");
      r(cx + 4, 7, 2, 5, "#ffffff");
      r(cx + 7, 7, 2, 5, "#ffffff");
      r(cx + 4, 12, 5, 2, "#ffffff");
    } else if (value === 50) {
      // Ruby Gem Coin (Value 50)
      poly(g, [
        [5, 0], [w - 6, 0], [w - 1, 6], [Math.floor(w / 2), h - 1], [0, 6],
      ], "#59071a");
      poly(g, [
        [6, 1], [w - 7, 1], [w - 2, 6], [Math.floor(w / 2), h - 2], [1, 6],
      ], "#d61f4a");
      // Facets
      poly(g, [[6, 1], [w - 7, 1], [w - 4, 6], [3, 6]], "#ff4d79");
      poly(g, [[3, 6], [w - 4, 6], [Math.floor(w / 2), h - 3]], "#ff7597");
      r(Math.floor(w / 2) - 2, 3, 5, 2, "#ffffff"); // sparkle
      // "50"
      let cx = Math.floor(w / 2) - 4;
      r(cx, 8, 4, 1, "#ffffff");
      r(cx, 9, 1, 2, "#ffffff");
      r(cx, 11, 4, 1, "#ffffff");
      r(cx + 5, 8, 4, 4, "#ffffff");
      r(cx + 6, 9, 2, 2, "#d61f4a");
    } else if (value === 100) {
      // Diamond Gem Coin (Value 100)
      poly(g, [
        [Math.floor(w / 2), 0],
        [w - 1, Math.floor(h * 0.4)],
        [Math.floor(w / 2), h - 1],
        [0, Math.floor(h * 0.4)],
      ], "#064663");
      poly(g, [
        [Math.floor(w / 2), 2],
        [w - 3, Math.floor(h * 0.4)],
        [Math.floor(w / 2), h - 3],
        [2, Math.floor(h * 0.4)],
      ], "#00bcd4");
      // Diamond crown facets
      poly(g, [
        [Math.floor(w / 2), 2],
        [w - 5, Math.floor(h * 0.4)],
        [Math.floor(w / 2), Math.floor(h * 0.6)],
        [4, Math.floor(h * 0.4)],
      ], "#80deea");
      // Sparkling center & shine
      r(Math.floor(w / 2) - 1, 3, 3, 3, "#ffffff");
      r(Math.floor(w / 2) - 4, Math.floor(h * 0.4) - 1, 9, 2, "#e0f7fa");
      // "100"
      let cx = Math.floor(w / 2) - 5;
      r(cx, Math.floor(h * 0.65), 2, 4, "#ffffff");
      r(cx + 4, Math.floor(h * 0.65), 3, 4, "#ffffff");
      r(cx + 5, Math.floor(h * 0.65) + 1, 1, 2, "#00bcd4");
      r(cx + 8, Math.floor(h * 0.65), 3, 4, "#ffffff");
      r(cx + 9, Math.floor(h * 0.65) + 1, 1, 2, "#00bcd4");
    }
    return c;
  }

  // ==================== OBSTACLE ART ====================
  // Boulder / Rock
  function boulder(size = 24) {
    const c = canvas(size, size),
      g = c.getContext("2d"),
      half = size / 2;
    poly(g, [
      [half * 0.3, 2],
      [half * 1.5, 1],
      [size - 2, half * 0.7],
      [size - 1, half * 1.5],
      [half * 1.4, size - 1],
      [half * 0.4, size - 2],
      [1, half * 1.3],
      [2, half * 0.6],
    ], "#3e424b");
    poly(g, [
      [half * 0.4, 4],
      [half * 1.4, 3],
      [half * 1.7, half * 0.8],
      [half * 1.1, half * 1.2],
      [half * 0.4, half * 1.0],
      [3, half * 0.7],
    ], "#6b7280");
    rect(g, half * 0.7, 5, half * 0.5, 2, "#9ca3af");
    rect(g, 4, half * 1.3, half * 0.8, 2, "#24272e");
    return c;
  }

  // Breakable Wooden Crate
  function crate() {
    const c = canvas(22, 22),
      g = c.getContext("2d"),
      r = (x, y, w, h, col) => rect(g, x, y, w, h, col);
    r(0, 0, 22, 22, "#4a2810");
    r(1, 1, 20, 20, "#9c5a2b");
    r(2, 2, 18, 18, "#b9733e");
    // Diagonal brace
    poly(g, [[2, 2], [5, 2], [20, 17], [20, 20], [17, 20], [2, 5]], "#87481f");
    // Border rim
    r(0, 0, 22, 3, "#5e3214");
    r(0, 19, 22, 3, "#3d1e08");
    r(0, 0, 3, 22, "#6e3b18");
    r(19, 0, 3, 22, "#3d1e08");
    // Rivets / nails
    r(1, 1, 2, 2, "#221105");
    r(19, 1, 2, 2, "#221105");
    r(1, 19, 2, 2, "#221105");
    r(19, 19, 2, 2, "#221105");
    return c;
  }

  // Wooden Springboard / Ramp
  function ramp() {
    const c = canvas(42, 22),
      g = c.getContext("2d");
    poly(g, [[0, 21], [40, 3], [41, 6], [41, 21]], "#3d220f");
    poly(g, [[1, 20], [39, 4], [40, 20]], "#9c5a2b");
    // Yellow & black hazard stripes along incline
    for (let i = 0; i < 4; i++) {
      poly(g, [
        [6 + i * 8, 18 - i * 3.5],
        [10 + i * 8, 16 - i * 3.5],
        [10 + i * 8, 20],
        [6 + i * 8, 20],
      ], i % 2 === 0 ? "#f1c40f" : "#222222");
    }
    return c;
  }

  // Log / Tree Trunk
  function log() {
    const c = canvas(34, 16),
      g = c.getContext("2d"),
      r = (x, y, w, h, col) => rect(g, x, y, w, h, col);
    r(3, 4, 28, 9, "#3e2716");
    r(4, 3, 26, 2, "#5d3a22");
    r(4, 5, 26, 6, "#6b4428");
    // Cut tree end
    poly(g, [[0, 8], [3, 4], [5, 8], [3, 12]], "#8c6239");
    r(2, 7, 2, 2, "#4a2f18");
    // Moss patches
    r(9, 3, 6, 2, "#4e6e34");
    r(20, 3, 8, 2, "#385324");
    return c;
  }

  return {
    palettes,
    canvas,
    rect,
    poly,
    noise,
    sky,
    mesas,
    tile,
    truck,
    monsterTruck,
    buggy,
    supercar,
    tank,
    quad,
    wheel,
    coin,
    boulder,
    crate,
    ramp,
    log,
  };
})();
