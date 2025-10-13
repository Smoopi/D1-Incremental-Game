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
let growthPerSecond: number = 0;

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

function hpLabel(n: number): string {
  return n === 1 ? "Horsepower" : "Horsepower";
}

function formatHP(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatRate(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatCost(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function renderCounter(): void {
  counterDiv.textContent = `${formatHP(horsepower)} ${
    hpLabel(Math.round(horsepower))
  }`;
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
  updatePurchaseButtonA();
  updatePurchaseButtonB();
  updatePurchaseButtonC();
  renderStatus();

  engineImg.style.transform = "scale(0.9)";
  setTimeout(() => {
    engineImg.style.transform = "";
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
  purchaseBtn.textContent = `Hire Pit Crew (+${
    formatRate(RATE_A)
  } hp/sec) — Cost: ${formatCost(costA)} hp — Owned: ${upgradesOwnedA}`;
}

function updatePurchaseButtonA(): void {
  purchaseBtn.disabled = horsepower < costA;
  purchaseBtn.style.opacity = purchaseBtn.disabled ? "0.6" : "1";
}

function renderPurchaseLabelB(): void {
  purchaseBtnB.textContent = `Add Mechanics (+${
    formatRate(RATE_B)
  } hp/sec) — Cost: ${formatCost(costB)} hp — Owned: ${upgradesOwnedB}`;
}

function updatePurchaseButtonB(): void {
  purchaseBtnB.disabled = horsepower < costB;
  purchaseBtnB.style.opacity = purchaseBtnB.disabled ? "0.6" : "1";
}

function renderPurchaseLabelC(): void {
  purchaseBtnC.textContent = `Hire Race Engineers (+${
    formatRate(RATE_C)
  } hp/sec) — Cost: ${formatCost(costC)} hp — Owned: ${upgradesOwnedC}`;
}

function updatePurchaseButtonC(): void {
  purchaseBtnC.disabled = horsepower < costC;
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
  if (horsepower < costA) return;
  horsepower -= costA;
  upgradesOwnedA += 1;
  growthPerSecond += RATE_A;
  costA *= PRICE_MULTIPLIER;
  renderCounter();
  renderPurchaseLabel();
  updatePurchaseButtonA();
  renderStatus();
});

purchaseBtnB.addEventListener("click", () => {
  if (horsepower < costB) return;
  horsepower -= costB;
  upgradesOwnedB += 1;
  growthPerSecond += RATE_B;
  costB *= PRICE_MULTIPLIER;
  renderCounter();
  renderPurchaseLabelB();
  updatePurchaseButtonB();
  renderStatus();
});

purchaseBtnC.addEventListener("click", () => {
  if (horsepower < costC) return;
  horsepower -= costC;
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
  growthDiv.textContent = `Output: ${formatRate(growthPerSecond)} hp/sec`;
  ownedDiv.textContent =
    `Owned — Pit Crew: ${upgradesOwnedA}, Mechanics: ${upgradesOwnedB}, Race Engineers: ${upgradesOwnedC}`;
}

renderStatus();

let lastTime: number | null = null;

function loop(now: number) {
  if (lastTime === null) {
    lastTime = now;
  } else {
    const deltaSec = (now - lastTime) / 1000;

    if (growthPerSecond > 0) {
      horsepower += growthPerSecond * deltaSec;
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
