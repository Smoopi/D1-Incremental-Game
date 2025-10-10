import exampleIconUrl from "./images.png";
import "./style.css";

// Style the body for perfect centering
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.fontFamily = "sans-serif";
document.body.style.backgroundColor = "#fef9f2";

document.body.innerHTML = `
  <img src="${exampleIconUrl}" class="icon" id="cookie" />
`;

let cookies: number = 0;

const growthPerSecond = 1;

const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.style.fontSize = "2rem";
counterDiv.style.marginBottom = "20px";
counterDiv.style.color = "#5a3e1b";

function cookieLabel(n: number): string {
  return n === 1 ? "cookie" : "cookies";
}

function formatCookies(n: number): string {
  const isInt = Number.isInteger(n);
  return isInt ? String(n) : n.toFixed(1);
}

function renderCounter(): void {
  counterDiv.textContent = `${formatCookies(cookies)} ${
    cookieLabel(Math.round(cookies))
  }`;
}

document.body.prepend(counterDiv);
renderCounter();

const cookieImg = document.querySelector<HTMLImageElement>("#cookie");
if (!cookieImg) throw new Error("Cookie image not found");

cookieImg.style.width = "200px";
cookieImg.style.height = "200px";
cookieImg.style.cursor = "pointer";
cookieImg.style.transition = "transform 0.1s ease";
cookieImg.style.border = "none";
cookieImg.style.outline = "none";
cookieImg.style.display = "block";

cookieImg.addEventListener("click", () => {
  cookies += 1;
  renderCounter();

  cookieImg.style.transform = "scale(0.9)";
  setTimeout(() => {
    cookieImg.style.transform = "";
  }, 100);
});

let lastTime: number | null = null;

function loop(now: number) {
  if (lastTime === null) {
    lastTime = now;
  } else {
    const deltaSec = (now - lastTime) / 1000;
    cookies += growthPerSecond * deltaSec;
    renderCounter();
    lastTime = now;
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
