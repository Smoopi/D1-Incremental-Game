import exampleIconUrl from "./77-779651_bunch-of-cars-png-transparent-png.png";
import "./style.css";

document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.fontFamily = "sans-serif";
document.body.style.backgroundColor = "#f5f7fa";

document.body.innerHTML = `
  <img src="${exampleIconUrl}" class="icon" id="car" />
`;

let cars: number = 0;
let growthPerSecond: number = 0;

// --- Step 7: costs now dynamic ---
let costA: number = 10;
let costB: number = 100;
let costC: number = 1000;

const RATE_A = 0.1;
const RATE_B = 2.0;
const RATE_C = 50.0;

const PRICE_MULTIPLIER = 1.15;

let upgradesOwnedA = 0;
let upgradesOwnedB = 0;
let upgradesOwnedC = 0;

const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.style.fontSize = "2rem";
counterDiv.style.marginBottom = "20px";
counterDiv.style.color = "#1f2d3d";

function carLabel(n: number): string {
  return n === 1 ? "car" : "cars";
}

function formatCars(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatRate(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatCost(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function renderCounter(): void {
  counterDiv.textContent = `${formatCars(cars)} ${carLabel(Math.round(cars))}`;
}

document.body.prepend(counterDiv);
renderCounter();

const carImg = document.querySelector<HTMLImageElement>("#car");
if (!carImg) throw new Error("Car image not found");

carImg.style.width = "200px";
carImg.style.height = "200px";
carImg.style.cursor = "pointer";
carImg.style.transition = "transform 0.1s ease";
carImg.style.border = "none";
carImg.style.outline = "none";
carImg.style.display = "block";

carImg.addEventListener("click", () => {
  cars += 1;
  renderCounter();
  updatePurchaseButtonA();
  updatePurchaseButtonB();
  updatePurchaseButtonC();
  renderStatus();

  carImg.style.transform = "scale(0.9)";
  setTimeout(() => {
    carImg.style.transform = "";
  }, 100);
});

const purchaseBtn = document.createElement("button");
purchaseBtn.id = "upgrade-btn";
purchaseBtn.style.marginTop = "24px";
purchaseBtn.style.padding = "10px 16px";
purchaseBtn.style.fontSize = "1rem";
purchaseBtn.style.borderRadius = "8px";
purchaseBtn.style.border = "1px solid #9aa5b1";
purchaseBtn.style.background = "#e6edf5";
purchaseBtn.style.cursor = "pointer";
purchaseBtn.disabled = true;

const purchaseBtnB = document.createElement("button");
purchaseBtnB.id = "upgrade-btn-b";
purchaseBtnB.style.marginTop = "12px";
purchaseBtnB.style.padding = "10px 16px";
purchaseBtnB.style.fontSize = "1rem";
purchaseBtnB.style.borderRadius = "8px";
purchaseBtnB.style.border = "1px solid #9aa5b1";
purchaseBtnB.style.background = "#e6edf5";
purchaseBtnB.style.cursor = "pointer";
purchaseBtnB.disabled = true;

const purchaseBtnC = document.createElement("button");
purchaseBtnC.id = "upgrade-btn-c";
purchaseBtnC.style.marginTop = "12px";
purchaseBtnC.style.padding = "10px 16px";
purchaseBtnC.style.fontSize = "1rem";
purchaseBtnC.style.borderRadius = "8px";
purchaseBtnC.style.border = "1px solid #9aa5b1";
purchaseBtnC.style.background = "#e6edf5";
purchaseBtnC.style.cursor = "pointer";
purchaseBtnC.disabled = true;

function renderPurchaseLabel(): void {
  purchaseBtn.textContent =
    `Buy Pit Crew (+${formatRate(RATE_A)} ${carLabel(2)}/sec) — Cost: ${formatCost(costA)} ${carLabel(costA)} — Owned: ${upgradesOwnedA}`;
}

function updatePurchaseButtonA(): void {
  purchaseBtn.disabled = cars < costA;
  purchaseBtn.style.opacity = purchaseBtn.disabled ? "0.6" : "1";
}

function renderPurchaseLabelB(): void {
  purchaseBtnB.textContent =
    `Buy Mechanics (+${formatRate(RATE_B)} ${carLabel(2)}/sec) — Cost: ${formatCost(costB)} ${carLabel(costB)} — Owned: ${upgradesOwnedB}`;
}

function updatePurchaseButtonB(): void {
  purchaseBtnB.disabled = cars < costB;
  purchaseBtnB.style.opacity = purchaseBtnB.disabled ? "0.6" : "1";
}

function renderPurchaseLabelC(): void {
  purchaseBtnC.textContent =
    `Buy Engineers (+${formatRate(RATE_C)} ${carLabel(2)}/sec) — Cost: ${formatCost(costC)} ${carLabel(costC)} — Owned: ${upgradesOwnedC}`;
}

function updatePurchaseButtonC(): void {
  purchaseBtnC.disabled = cars < costC;
  purchaseBtnC.style.opacity = purchaseBtnC.disabled ? "0.6" : "1";
}

renderPurchaseLabel();
updatePurchaseButtonA();
document.body.appendChild(purchaseBtn);

renderPurchaseLabelB();
updatePurchaseButtonB();
document.body.appendChild(purchaseBtnB);

renderPurchaseLabelC();
updatePurchaseButtonC();
document.body.appendChild(purchaseBtnC);

purchaseBtn.addEventListener("click", () => {
  if (cars < costA) return;
  cars -= costA;
  upgradesOwnedA += 1;
  growthPerSecond += RATE_A;

  // Step 7: increase cost by 15%
  costA *= PRICE_MULTIPLIER;

  renderCounter();
  renderPurchaseLabel();
  updatePurchaseButtonA();
  renderStatus();
});

purchaseBtnB.addEventListener("click", () => {
  if (cars < costB) return;
  cars -= costB;
  upgradesOwnedB += 1;
  growthPerSecond += RATE_B;

  costB *= PRICE_MULTIPLIER;

  renderCounter();
  renderPurchaseLabelB();
  updatePurchaseButtonB();
  renderStatus();
});

purchaseBtnC.addEventListener("click", () => {
  if (cars < costC) return;
  cars -= costC;
  upgradesOwnedC += 1;
  growthPerSecond += RATE_C;

  costC *= PRICE_MULTIPLIER;

  renderCounter();
  renderPurchaseLabelC();
  updatePurchaseButtonC();
  renderStatus();
});

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

function renderStatus(): void {
  growthDiv.textContent = `Growth: ${formatRate(growthPerSecond)} ${carLabel(2)}/sec`;
  ownedDiv.textContent = `Owned — Pit Crew: ${upgradesOwnedA}, Mechanics: ${upgradesOwnedB}, Engineers: ${upgradesOwnedC}`;
}

renderStatus();

let lastTime: number | null = null;

function loop(now: number) {
  if (lastTime === null) {
    lastTime = now;
  } else {
    const deltaSec = (now - lastTime) / 1000;

    if (growthPerSecond > 0) {
      cars += growthPerSecond * deltaSec;
    }

    renderCounter();
    updatePurchaseButtonA();
    updatePurchaseButtonB();
    updatePurchaseButtonC();
    renderStatus();

    lastTime = now;
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);