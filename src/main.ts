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

interface UpgradeItem {
  name: string;
  description: string;
  cost: number;
  rate: number;
  owned: number;
  button?: HTMLButtonElement;
}

const availableItems: UpgradeItem[] = [
  {
    name: "Pit Crew",
    description: "Quicker tire swaps and refuels — find free hp in the pits.",
    cost: 10,
    rate: 0.1,
    owned: 0,
  },
  {
    name: "Mechanics",
    description: "Keep engines tuned and leaks sealed. Reliability = speed.",
    cost: 100,
    rate: 2.0,
    owned: 0,
  },
  {
    name: "Race Engineers",
    description: "Telemetry + strategy = faster laps without more fuel.",
    cost: 1000,
    rate: 50.0,
    owned: 0,
  },
  {
    name: "Aero Package",
    description: "Carbon fiber wings & undertray tweaks to cut drag.",
    cost: 500,
    rate: 10.0,
    owned: 0,
  },
  {
    name: "Wind Tunnel",
    description: "Rent tunnel hours to chase perfect downforce balance.",
    cost: 5000,
    rate: 120.0,
    owned: 0,
  },
];

function formatHP(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
function formatRate(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
function formatCost(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
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

const engineImage = document.querySelector<HTMLImageElement>("#engine");
if (!engineImage) throw new Error("Engine image not found");

engineImage.style.width = "200px";
engineImage.style.height = "200px";
engineImage.style.cursor = "pointer";
engineImage.style.transition = "transform 0.1s ease";
engineImage.style.border = "none";
engineImage.style.outline = "none";
engineImage.style.display = "block";

engineImage.addEventListener("click", () => {
  horsepower += 1;
  renderCounter();
  renderAllButtons();
  renderStatus();

  engineImage.style.transform = "scale(0.9)";
  setTimeout(() => {
    engineImage.style.transform = "";
  }, 100);
});

function createPurchaseButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.style.marginTop = "12px";
  button.style.padding = "10px 16px";
  button.style.fontSize = "1rem";
  button.style.borderRadius = "8px";
  button.style.border = "1px solid #9aa5b1";
  button.style.background = "#e6edf5";
  button.style.cursor = "pointer";
  button.disabled = true;
  return button;
}

for (let index = 0; index < availableItems.length; index++) {
  const item = availableItems[index];
  const button = createPurchaseButton();
  if (index === 0) button.style.marginTop = "24px";
  item.button = button;
  button.title = item.description;
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (horsepower < item.cost) return;
    horsepower -= item.cost;
    item.owned += 1;
    item.cost *= PRICE_MULTIPLIER;

    renderCounter();
    renderAllButtons();
    renderStatus();
  });
}

function renderButton(item: UpgradeItem): void {
  if (!item.button) return;
  item.button.textContent = `Hire ${item.name} (+${
    formatRate(
      item.rate,
    )
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

const outputRateDiv = document.createElement("div");
outputRateDiv.id = "growth";
outputRateDiv.style.marginBottom = "6px";
statusDiv.appendChild(outputRateDiv);

const ownedDiv = document.createElement("div");
ownedDiv.id = "owned";
statusDiv.appendChild(ownedDiv);

function calculateHorsepowerPerSecond(): number {
  return availableItems.reduce(
    (sum: number, upgradeItem: UpgradeItem) =>
      sum + upgradeItem.rate * upgradeItem.owned,
    0,
  );
}

function renderStatus(): void {
  const horsepowerPerSecond = calculateHorsepowerPerSecond();
  outputRateDiv.textContent = `Output: ${
    formatRate(horsepowerPerSecond)
  } hp/sec`;

  const ownedSummary = availableItems
    .map((upgradeItem) => `${upgradeItem.name}: ${upgradeItem.owned}`)
    .join(", ");
  ownedDiv.textContent = `Owned — ${ownedSummary}`;
}

renderAllButtons();
renderStatus();

let lastTimestampMs: number | null = null;

function gameLoop(timestampMs: number): void {
  if (lastTimestampMs === null) {
    lastTimestampMs = timestampMs;
  } else {
    const deltaSeconds = (timestampMs - lastTimestampMs) / 1000;

    const horsepowerPerSecond = calculateHorsepowerPerSecond();
    if (horsepowerPerSecond > 0) {
      horsepower += horsepowerPerSecond * deltaSeconds;
    }

    renderCounter();
    renderAllButtons();
    renderStatus();

    lastTimestampMs = timestampMs;
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
