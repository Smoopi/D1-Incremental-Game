import exampleIconUrl from "./77-779651_bunch-of-cars-png-transparent-png.png";
import "./style.css";

document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.fontFamily = "sans-serif";
document.body.style.backgroundColor = "#f4f5f7";

document.body.innerHTML = `
  <img src="${exampleIconUrl}" class="icon" id="engine" alt="Engine Icon" />
`;

let horsepower: number = 0;

const PRICE_MULTIPLIER = 1.15;

interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  button?: HTMLButtonElement;
}

const availableItems: Item[] = [
  { name: "Pit Crew", cost: 10, rate: 0.1, owned: 0 },
  { name: "Mechanics", cost: 100, rate: 2.0, owned: 0 },
  { name: "Race Engineers", cost: 1000, rate: 50.0, owned: 0 },
];

function formatHP(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
function formatRate(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
function formatCost(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.style.fontSize = "2rem";
counterDiv.style.marginBottom = "20px";
counterDiv.style.color = "#1f2d3d";

function renderCounter(): void {
  counterDiv.textContent = `${formatHP(horsepower)} Horsepower`;
}

document.body.prepend(counterDiv);
renderCounter();

const engineImg = document.querySelector<HTMLImageElement>("#engine");
if (!engineImg) throw new Error("Engine image not found");

engineImg.style.width = "200px";
engineImg.style.height = "200px";
engineImg.style.cursor = "pointer";
engineImg.style.transition = "transform 0.1s ease";
engineImg.style.border = "none";
engineImg.style.outline = "none";
engineImg.style.display = "block";

engineImg.addEventListener("click", () => {
  horsepower += 1;
  renderCounter();
  renderAllButtons();
  renderStatus();

  engineImg.style.transform = "scale(0.9)";
  setTimeout(() => (engineImg.style.transform = ""), 100);
});

function makeButton(): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.style.marginTop = "12px";
  btn.style.padding = "10px 16px";
  btn.style.fontSize = "1rem";
  btn.style.borderRadius = "8px";
  btn.style.border = "1px solid #9aa5b1";
  btn.style.background = "#e6edf5";
  btn.style.cursor = "pointer";
  btn.disabled = true;
  return btn;
}

for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  const btn = makeButton();
  if (i === 0) btn.style.marginTop = "24px";
  item.button = btn;
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    if (horsepower < item.cost) return;
    horsepower -= item.cost;
    item.owned += 1;
    item.cost *= PRICE_MULTIPLIER;

    renderCounter();
    renderAllButtons();
    renderStatus();
  });
}

function renderButton(item: Item): void {
  if (!item.button) return;
  item.button.textContent = `Hire ${item.name} (+${
    formatRate(item.rate)
  } hp/sec) — Cost: ${formatCost(item.cost)} hp — Owned: ${item.owned}`;
  const canAfford = horsepower >= item.cost;
  item.button.disabled = !canAfford;
  item.button.style.opacity = canAfford ? "1" : "0.6";
}

function renderAllButtons(): void {
  for (const item of availableItems) renderButton(item);
}

const statusDiv = document.createElement("div");
statusDiv.id = "status";
statusDiv.style.marginTop = "16px";
statusDiv.style.fontSize = "1rem";
statusDiv.style.color = "#334e68";
statusDiv.style.textAlign = "center";
document.body.appendChild(statusDiv);

const growthDiv = document.createElement("div");
growthDiv.id = "growth";
growthDiv.style.marginBottom = "6px";
statusDiv.appendChild(growthDiv);

const ownedDiv = document.createElement("div");
ownedDiv.id = "owned";
statusDiv.appendChild(ownedDiv);

function totalGrowthPerSecond(): number {
  return availableItems.reduce((sum, it) => sum + it.rate * it.owned, 0);
}

function renderStatus(): void {
  const gps = totalGrowthPerSecond();
  growthDiv.textContent = `Output: ${formatRate(gps)} hp/sec`;

  const ownedStr = availableItems
    .map((it) => `${it.name}: ${it.owned}`)
    .join(", ");
  ownedDiv.textContent = `Owned — ${ownedStr}`;
}

renderAllButtons();
renderStatus();

let lastTime: number | null = null;

function loop(now: number) {
  if (lastTime === null) {
    lastTime = now;
  } else {
    const deltaSec = (now - lastTime) / 1000;

    const gps = totalGrowthPerSecond();
    if (gps > 0) {
      horsepower += gps * deltaSec;
    }

    renderCounter();
    renderAllButtons();
    renderStatus();

    lastTime = now;
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
