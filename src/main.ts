import exampleIconUrl from "./pngtree-cartoon-cookies-png-image_6516299.png";
import "./style.css";

document.body.innerHTML = `
  <p>Click the cookie: <img src="${exampleIconUrl}" class="icon" id="cookie" /></p>
`;

const cookieImg = document.querySelector<HTMLImageElement>("#cookie");
if (!cookieImg) {
  throw new Error("Cookie image not found");
}

cookieImg.style.cursor = "pointer";

cookieImg.addEventListener("click", () => {
  console.log("Cookie clicked! (Step 1 test)");

  cookieImg.style.transform = "scale(0.95)";
  setTimeout(() => {
    cookieImg.style.transform = "";
  }, 100);
});
