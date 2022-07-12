const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// handle mouse interactions
const mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse.x, mouse.y);
});

const myFont = new FontFace("myFont", "url(../assets/fonts/Gotham-Thin.otf)");

// DANLUBBERS
myFont.load().then((font) => {
  document.fonts.add(font);

  const changeGradientWidthC = (widthDiff) => {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width - widthDiff,
      0
    );
    gradient.addColorStop(0, "grey");
    gradient.addColorStop(0.5, "grey");
    gradient.addColorStop(0.5, "red");
    gradient.addColorStop(1, "red");
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = gradient;
  };

  if (canvas.width > 1600) {
    changeGradientWidthC(250);
    ctx.font = "100px myFont";
  }
  if (canvas.width < 1600 && canvas.width > 1200) {
    changeGradientWidthC(200);
    ctx.font = "75px myFont";
  }
  if (canvas.width < 1200) {
    changeGradientWidthC(160);
    ctx.font = "60px myFont";
  }
  ctx.textAlign = "center";
  ctx.fillText("DANLUBBERS", canvas.width / 2, canvas.height / 2 - 175);
});

// Photography / Retouching
myFont.load().then((font) => {
  document.fonts.add(font);
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "white";
  if (canvas.width > 1600) {
    ctx.font = "50px myFont";
  }
  if (canvas.width < 1600 && canvas.width > 1200) {
    ctx.font = "40px myFont";
  }
  if (canvas.width < 1200) {
    ctx.font = "30px myFont";
  }
  ctx.textAlign = "right";
  ctx.fillText(
    "Photography / Retouching",
    canvas.width / 2,
    canvas.height / 2 - 100
  );
});

// Web Development
myFont.load().then((font) => {
  document.fonts.add(font);
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "white";
  if (canvas.width > 1600) {
    ctx.font = "50px myFont";
  }
  if (canvas.width < 1600 && canvas.width > 1200) {
    ctx.font = "40px myFont";
  }
  if (canvas.width < 1200) {
    ctx.font = "30px myFont";
  }
  ctx.textAlign = "left";
  ctx.fillText(
    "Web Development",
    canvas.width / 2 + 100,
    canvas.height / 2 - 100
  );
});
