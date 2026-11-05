import type { ProjectId } from "@/data/resume";
import { font, roundRect } from "../canvasTexture";

export type MonitorScreen = { kind: "home" } | { kind: "project"; id: ProjectId };
export type ScreenMode = "light" | "dark";

type Ink = {
  page: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  quiet: string;
  accent: string;
  onAccent: string;
};

const W = 2048;
const H = 1152;
const SIDE = 264;
const TOP = 112;

const inks: Record<ScreenMode, Ink> = {
  light: {
    page: "#f6f6f4",
    surface: "#ffffff",
    border: "#e6e4df",
    text: "#1f2024",
    muted: "#5c5e66",
    quiet: "#8a8c94",
    accent: "#4a00ff",
    onAccent: "#ffffff",
  },
  dark: {
    page: "#121318",
    surface: "#1b1d23",
    border: "#2a2d35",
    text: "#ecedf0",
    muted: "#a3a6b0",
    quiet: "#6f7380",
    accent: "#7a6bff",
    onAccent: "#ecedf0",
  },
};

function fillRound(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string) {
  roundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function text(
  ctx: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  size: number,
  weight: 400 | 500 | 600,
  color: string,
  kind: "sans" | "mono" = "sans",
  align: CanvasTextAlign = "left",
) {
  ctx.font = font(size, weight, kind);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
}

function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function button(ctx: CanvasRenderingContext2D, label: string, x: number, y: number, w: number, ink: Ink, primary = false) {
  fillRound(ctx, x, y, w, 58, 11, primary ? ink.accent : ink.surface, primary ? undefined : ink.border);
  text(ctx, label, x + w / 2, y + 30, 30, 600, primary ? ink.onAccent : ink.text, "sans", "center");
}

function card(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, ink: Ink) {
  fillRound(ctx, x, y, w, h, 12, ink.surface, ink.border);
}

const navLabels = ["Overview", "Components", "Attendance", "Analytics", "Operations"];

function chrome(ctx: CanvasRenderingContext2D, ink: Ink, title: string, selected: string) {
  ctx.fillStyle = ink.page;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = ink.surface;
  ctx.fillRect(0, 0, SIDE, H);
  line(ctx, SIDE, 0, SIDE, H, ink.border);
  line(ctx, SIDE, TOP, W, TOP, ink.border);

  // Three quiet marks make a recognisable app identity without another colour.
  dot(ctx, 54, 55, 12, ink.accent);
  dot(ctx, 83, 55, 12, ink.border);
  dot(ctx, 112, 55, 12, ink.border);

  navLabels.forEach((label, index) => {
    const y = 154 + index * 78;
    const active = label === selected;
    if (active) {
      fillRound(ctx, 22, y - 28, 220, 58, 10, ink.page);
      ctx.fillStyle = ink.accent;
      ctx.fillRect(22, y - 15, 4, 30);
    }
    dot(ctx, 53, y, 6, active ? ink.accent : ink.quiet);
    text(ctx, label, 76, y, 30, active ? 600 : 500, active ? ink.text : ink.muted);
  });
  text(ctx, title, 316, 57, 44, 600, ink.text);
}

function drawHome(ctx: CanvasRenderingContext2D, ink: Ink) {
  chrome(ctx, ink, "Portfolio", "Overview");
  card(ctx, 312, 150, 1688, 938, ink);
  ctx.fillStyle = ink.page;
  ctx.fillRect(314, 152, 1684, 78);
  line(ctx, 314, 230, 1998, 230, ink.border);
  fillRound(ctx, 348, 172, 230, 58, 10, ink.surface, ink.border);
  dot(ctx, 376, 201, 6, ink.accent);
  text(ctx, "page.tsx", 400, 201, 31, 500, ink.text, "mono");

  const code: Array<[string, number]> = [
    ['<Portfolio owner="Passon Rattanakongton">', 0],
    ["<Home />", 1],
    ["<Work />", 1],
    ["<Experience />", 1],
    ["<Education />", 1],
    ["<Skills />", 1],
    ["<Contact />", 1],
    ["</Portfolio>", 0],
  ];
  code.forEach(([value, indent], index) => {
    const y = 304 + index * 88;
    text(ctx, String(index + 1), 374, y, 31, 400, ink.quiet, "mono", "right");
    const color = value.startsWith("<") ? ink.text : ink.muted;
    text(ctx, value, 430 + indent * 54, y, 38, 400, color, "mono");
  });
  ctx.fillStyle = ink.accent;
  ctx.fillRect(485, 972, 4, 44);
}

function drawComponents(ctx: CanvasRenderingContext2D, ink: Ink) {
  chrome(ctx, ink, "Component gallery", "Components");
  text(ctx, "Reusable building blocks", 312, 169, 34, 400, ink.muted);

  card(ctx, 312, 218, 788, 286, ink);
  text(ctx, "Buttons", 350, 268, 44, 600, ink.text);
  button(ctx, "Primary", 350, 326, 184, ink, true);
  button(ctx, "Secondary", 556, 326, 210, ink);
  text(ctx, "Ghost", 864, 356, 30, 600, ink.muted, "sans", "center");
  text(ctx, "Toggle", 350, 448, 30, 500, ink.muted);
  fillRound(ctx, 472, 430, 78, 38, 20, ink.accent);
  dot(ctx, 528, 449, 14, ink.surface);
  text(ctx, "Enabled", 572, 449, 30, 400, ink.text);

  card(ctx, 1124, 218, 876, 286, ink);
  text(ctx, "Text input", 1162, 268, 44, 600, ink.text);
  fillRound(ctx, 1162, 320, 800, 70, 10, ink.page, ink.border);
  text(ctx, "Search components", 1190, 356, 31, 400, ink.quiet);
  text(ctx, "Tabs", 1162, 449, 30, 500, ink.muted);
  ["Preview", "Code", "Details"].forEach((label, index) => {
    const x = 1280 + index * 170;
    text(ctx, label, x, 449, 30, index === 0 ? 600 : 500, index === 0 ? ink.accent : ink.muted);
    if (index === 0) line(ctx, x - 4, 473, x + 106, 473, ink.accent, 4);
  });

  card(ctx, 312, 532, 788, 520, ink);
  text(ctx, "Modal preview", 350, 582, 44, 600, ink.text);
  fillRound(ctx, 430, 638, 550, 344, 12, ink.page, ink.border);
  text(ctx, "Save changes", 474, 700, 44, 600, ink.text);
  text(ctx, "Review your details before saving.", 474, 752, 30, 400, ink.muted);
  line(ctx, 430, 820, 980, 820, ink.border);
  button(ctx, "Cancel", 614, 862, 142, ink);
  button(ctx, "Save", 778, 862, 158, ink, true);

  card(ctx, 1124, 532, 876, 520, ink);
  text(ctx, "Table row", 1162, 582, 44, 600, ink.text);
  text(ctx, "Component", 1162, 646, 30, 500, ink.quiet);
  text(ctx, "Status", 1648, 646, 30, 500, ink.quiet);
  line(ctx, 1162, 680, 1962, 680, ink.border);
  text(ctx, "Data table", 1162, 736, 32, 500, ink.text);
  dot(ctx, 1658, 736, 7, ink.accent);
  text(ctx, "Ready", 1680, 736, 30, 400, ink.muted);
  line(ctx, 1162, 790, 1962, 790, ink.border);
  text(ctx, "Select", 1162, 846, 32, 500, ink.text);
  dot(ctx, 1658, 846, 7, ink.quiet);
  text(ctx, "Draft", 1680, 846, 30, 400, ink.muted);
}

type Attendance = [string, string, string, "On time" | "Late" | "Absent"];

function drawAttendance(ctx: CanvasRenderingContext2D, ink: Ink) {
  chrome(ctx, ink, "Attendance · 5 Nov 2026", "Attendance");
  const stats: Array<[string, string]> = [["Present", "5"], ["Late", "1"], ["Absent", "1"]];
  stats.forEach(([label, value], index) => {
    const x = 312 + index * 282;
    card(ctx, x, 150, 258, 142, ink);
    text(ctx, label, x + 30, 190, 30, 500, ink.muted);
    text(ctx, value, x + 30, 248, 48, 600, index === 0 ? ink.accent : ink.text, "mono");
  });
  button(ctx, "Export report", 1698, 187, 302, ink, true);

  card(ctx, 312, 326, 1688, 726, ink);
  const columns = [["Employee", 350], ["Check-in", 1030], ["Check-out", 1308], ["Status", 1596]] as const;
  columns.forEach(([label, x]) => text(ctx, label, x, 380, 30, 500, ink.quiet));
  line(ctx, 350, 418, 1962, 418, ink.border);
  const rows: Attendance[] = [
    ["Narin Srisuk", "08:48", "17:36", "On time"],
    ["Pimchanok Dee", "09:12", "18:04", "Late"],
    ["Kittisak Arun", "08:55", "17:43", "On time"],
    ["Mali Chaiyo", "08:51", "17:39", "On time"],
    ["Thanawat Boon", "—", "—", "Absent"],
    ["Anong Kerdkaew", "08:46", "17:31", "On time"],
  ];
  rows.forEach(([name, start, end, status], index) => {
    const y = 474 + index * 92;
    text(ctx, name, 350, y, 32, 500, ink.text);
    text(ctx, start, 1030, y, 31, 400, start === "—" ? ink.quiet : ink.text, "mono");
    text(ctx, end, 1308, y, 31, 400, end === "—" ? ink.quiet : ink.text, "mono");
    dot(ctx, 1604, y, 7, status === "Late" ? ink.accent : status === "Absent" ? ink.quiet : ink.muted);
    text(ctx, status, 1628, y, 30, 500, status === "Late" ? ink.accent : ink.muted);
    if (index < rows.length - 1) line(ctx, 350, y + 45, 1962, y + 45, ink.border);
  });
}

function drawAdmin(ctx: CanvasRenderingContext2D, ink: Ink) {
  chrome(ctx, ink, "Admin dashboard", "Analytics");
  const stats: Array<[string, string]> = [["Users", "12,480"], ["Products", "328"], ["Data records", "84,920"]];
  stats.forEach(([label, value], index) => {
    const x = 312 + index * 562;
    card(ctx, x, 150, 536, 158, ink);
    text(ctx, label, x + 32, 193, 30, 500, ink.muted);
    text(ctx, value, x + 32, 258, 48, 600, index === 0 ? ink.accent : ink.text, "mono");
  });

  card(ctx, 312, 342, 1100, 710, ink);
  text(ctx, "Platform activity", 350, 394, 44, 600, ink.text);
  const chart = { x: 420, y: 474, w: 920, h: 466 };
  [0, 1, 2, 3, 4].forEach((i) => {
    const y = chart.y + (chart.h / 4) * i;
    line(ctx, chart.x, y, chart.x + chart.w, y, ink.border);
    text(ctx, String(100 - i * 25), chart.x - 28, y, 30, 400, ink.quiet, "mono", "right");
  });
  ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].forEach((month, index) => {
    text(ctx, month, chart.x + index * (chart.w / 6), 980, 30, 400, ink.quiet, "mono", "center");
  });
  const values = [82, 67, 72, 48, 56, 31, 18];
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = chart.x + index * (chart.w / 6);
    const y = chart.y + (value / 100) * chart.h;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = ink.accent;
  ctx.lineWidth = 7;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  card(ctx, 1436, 342, 564, 710, ink);
  text(ctx, "Recent users", 1474, 394, 44, 600, ink.text);
  [["Suda W.", "Editor"], ["Nop P.", "Admin"], ["Meena K.", "Viewer"], ["Arthit T.", "Editor"]].forEach(([name, role], index) => {
    const y = 494 + index * 126;
    dot(ctx, 1500, y, 18, index === 1 ? ink.accent : ink.border);
    text(ctx, name, 1538, y - 15, 32, 500, ink.text);
    text(ctx, role, 1538, y + 27, 30, 400, ink.muted);
    if (index < 3) line(ctx, 1474, y + 64, 1962, y + 64, ink.border);
  });
}

function drawData(ctx: CanvasRenderingContext2D, ink: Ink) {
  chrome(ctx, ink, "Data management", "Operations");
  text(ctx, "Structured data", 312, 169, 34, 400, ink.muted);
  button(ctx, "Import CSV", 1562, 144, 210, ink, true);
  button(ctx, "Export", 1792, 144, 208, ink);

  card(ctx, 312, 232, 1688, 126, ink);
  fillRound(ctx, 344, 264, 66, 62, 10, ink.page, ink.border);
  text(ctx, "CSV", 377, 296, 30, 600, ink.accent, "mono", "center");
  text(ctx, "members_nov_2026.csv", 440, 282, 32, 500, ink.text, "mono");
  text(ctx, "Ready to import", 440, 324, 30, 400, ink.muted);
  button(ctx, "Upload", 1780, 266, 182, ink);

  card(ctx, 312, 390, 1688, 612, ink);
  [["Name", 350], ["Email", 780], ["Role", 1470], ["Updated", 1744]].forEach(([label, x]) =>
    text(ctx, label as string, x as number, 442, 30, 500, ink.quiet),
  );
  line(ctx, 350, 478, 1962, 478, ink.border);
  const rows = [
    ["Kanya S.", "kanya@example.co.th", "Admin", "5 Nov 2026"],
    ["Somchai P.", "somchai@example.co.th", "Editor", "5 Nov 2026"],
    ["Warin T.", "warin@example.co.th", "Viewer", "4 Nov 2026"],
    ["Ploy N.", "ploy@example.co.th", "Editor", "3 Nov 2026"],
  ];
  rows.forEach(([name, email, role, updated], index) => {
    const y = 536 + index * 102;
    text(ctx, name, 350, y, 32, 500, ink.text);
    text(ctx, email, 780, y, 30, 400, ink.muted);
    text(ctx, role, 1470, y, 30, 500, ink.muted);
    text(ctx, updated, 1744, y, 30, 400, ink.muted);
    if (index < rows.length - 1) line(ctx, 350, y + 50, 1962, y + 50, ink.border);
  });
  text(ctx, "1–4 of 24", 350, 950, 30, 400, ink.muted, "mono");
  button(ctx, "Previous", 1582, 916, 180, ink);
  fillRound(ctx, 1780, 916, 58, 58, 10, ink.accent);
  text(ctx, "1", 1809, 946, 30, 600, ink.onAccent, "mono", "center");
  button(ctx, "Next", 1854, 916, 108, ink);
}

function drawOms(ctx: CanvasRenderingContext2D, ink: Ink) {
  chrome(ctx, ink, "Orders", "Operations");
  card(ctx, 312, 150, 950, 902, ink);
  text(ctx, "Order list", 350, 204, 44, 600, ink.text);
  text(ctx, "Customer", 682, 264, 30, 500, ink.quiet);
  text(ctx, "Total", 1050, 264, 30, 500, ink.quiet);
  line(ctx, 350, 302, 1224, 302, ink.border);
  const orders = [
    ["#OM-24871", "Nattaya Ch.", "฿4,280", "Packed"],
    ["#OM-24870", "Chaiwat K.", "฿1,950", "Created"],
    ["#OM-24869", "Rinrada S.", "฿8,640", "Shipped"],
    ["#OM-24868", "Peerawat N.", "฿3,120", "Delivered"],
    ["#OM-24867", "Orasa T.", "฿2,790", "Delivered"],
  ];
  orders.forEach(([id, customer, total, status], index) => {
    const y = 366 + index * 130;
    if (index === 0) fillRound(ctx, 334, y - 52, 906, 106, 10, ink.page);
    text(ctx, id, 350, y - 14, 32, 600, index === 0 ? ink.accent : ink.text, "mono");
    text(ctx, status, 350, y + 29, 30, 400, ink.muted);
    text(ctx, customer, 682, y, 31, 500, ink.text);
    text(ctx, total, 1050, y, 31, 500, ink.text, "mono");
    if (index < orders.length - 1) line(ctx, 350, y + 65, 1224, y + 65, ink.border);
  });

  card(ctx, 1286, 150, 714, 902, ink);
  text(ctx, "#OM-24871", 1324, 208, 44, 600, ink.text, "mono");
  text(ctx, "Nattaya Ch.", 1324, 266, 31, 400, ink.muted);
  text(ctx, "฿4,280", 1962, 208, 44, 600, ink.accent, "mono", "right");
  line(ctx, 1324, 314, 1962, 314, ink.border);
  text(ctx, "Fulfillment", 1324, 374, 44, 600, ink.text);
  const steps = ["Created", "Packed", "Shipped", "Delivered"];
  steps.forEach((label, index) => {
    const y = 456 + index * 126;
    const reached = index <= 1;
    if (index < steps.length - 1) line(ctx, 1350, y + 20, 1350, y + 106, reached ? ink.accent : ink.border, 5);
    dot(ctx, 1350, y, 13, reached ? ink.accent : ink.border);
    text(ctx, label, 1392, y, 32, reached ? 600 : 500, reached ? ink.text : ink.muted);
    if (index === 1) text(ctx, "Selected", 1908, y, 30, 500, ink.accent, "sans", "right");
  });
}

const projectDrawers: Record<ProjectId, (ctx: CanvasRenderingContext2D, ink: Ink) => void> = {
  "component-library": drawComponents,
  "hr-checkin": drawAttendance,
  "admin-dashboard": drawAdmin,
  "data-management": drawData,
  oms: drawOms,
};

export function drawScreen(ctx: CanvasRenderingContext2D, w: number, h: number, screen: MonitorScreen, mode: ScreenMode) {
  ctx.save();
  ctx.scale(w / W, h / H);
  const ink = inks[mode];
  if (screen.kind === "home") drawHome(ctx, ink);
  else projectDrawers[screen.id](ctx, ink);
  ctx.restore();
}
