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
const UPGRADE_COST = 10;
let upgradesOwned = 0;

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
  updatePurchaseButton();

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

function renderPurchaseLabel(): void {
  purchaseBtn.textContent =
    `Buy Pit Crew (+1 car/sec) — Cost: ${UPGRADE_COST} ${
      carLabel(UPGRADE_COST)
    } — Owned: ${upgradesOwned}`;
}

function updatePurchaseButton(): void {
  purchaseBtn.disabled = cars < UPGRADE_COST;
  purchaseBtn.style.opacity = purchaseBtn.disabled ? "0.6" : "1";
}

renderPurchaseLabel();
updatePurchaseButton();
document.body.appendChild(purchaseBtn);

purchaseBtn.addEventListener("click", () => {
  if (cars < UPGRADE_COST) return;
  cars -= UPGRADE_COST;
  upgradesOwned += 1;
  growthPerSecond += 1;

  renderCounter();
  renderPurchaseLabel();
  updatePurchaseButton();
});

let lastTime: number | null = null;

function loop(now: number) {
  if (lastTime === null) {
    lastTime = now;
  } else {
    const deltaSec = (now - lastTime) / 1000;
    if (growthPerSecond > 0) {
      cars += growthPerSecond * deltaSec;
      renderCounter();
      updatePurchaseButton();
    }
    lastTime = now;
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
