const myFont = new FontFace("myFont", "url(../assets/fonts/Gotham-Medium.otf)");

// DANLUBBERS
myFont
  .load()
  .then((font) => {
    document.fonts.add(font);
  })
  .then(() => {
    const canvas = document.querySelector("canvas");
    const heightRatio = 1.5;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = canvas.width * heightRatio; // Responsive Canvas

    // handle mouse interactions
    const mouse = {
      x: null,
      y: null,
      radius: 150,
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    let particleArray = [];

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
      // ctx.globalAlpha = 0.7;
      ctx.fillStyle = gradient;
    };

    // if (canvas.width > 1600) {
    //   changeGradientWidthC(250);
    //   ctx.font = "20px myFont";
    // }
    // if (canvas.width < 1600 && canvas.width > 1200) {
    //   changeGradientWidthC(200);
    //   ctx.font = "10px myFont";
    // }
    // if (canvas.width < 1200) {
    //   changeGradientWidthC(160);
    //   ctx.font = "10px myFont";
    // }

    ctx.font = "20px myFont";
    ctx.textAlign = "center";
    ctx.fillText("DANLUBBERS", 80, 75);
    // ctx.fillText("DANLUBBERS", canvas.width / 2, canvas.height / 2 - 175);

    // ctx.textAlign = "center";
    // ctx.font = "20px Verdana";
    // ctx.fillText("DANLUBBERS", 100, 25);
    const textCoords = ctx.getImageData(-5, 20, 200, 100);
    console.log("textCoords.data", textCoords);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radiusSize = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1; // changes movement speed of particles
      }

      draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radiusSize, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let distanceX = mouse.x - this.x;
        let distanceY = mouse.y - this.y;
        let distanceBetweenXandY = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
        let forceDirectionX = distanceX / distanceBetweenXandY;
        let forceDirectionY = distanceY / distanceBetweenXandY;
        let maxDistance = mouse.radius;
        // Ex. maxDistance = 100; distanceBetweenXandY = 20
        // force = 0.8 'particle current speed is now 20% slower
        let force = (maxDistance - distanceBetweenXandY) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distanceBetweenXandY < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // this.x is not equal too this.baseX which is particle original position
          if (this.x !== this.baseX) {
            // Return particle to original position
            let distanceX = this.x - this.baseX;
            this.x -= distanceX / 10; // divided by 10 slows down the speed at which particles return to original position
          }
          if (this.y !== this.baseY) {
            // Return particle to original position
            let distanceY = this.y - this.baseY;
            this.y -= distanceY / 10;
          }
          // this.radiusSize = 1;
        }
      }
    }

    const init = () => {
      particleArray = [];

      for (let y = 0; y < textCoords.height; y++) {
        for (let x = 0; x < textCoords.width; x++) {
          let fiftyPercentOpacity = 128;
          let alpha = y * 4 * textCoords.width + x * 4 + 3; // loop over array, skip 3, always check 4th to get alpha from rgba

          if (textCoords.data[alpha] > fiftyPercentOpacity) {
            let positionX = x;
            let positionY = y;
            particleArray.push(new Particle(positionX * 10, positionY * 10));
          }
        }
      }

      /* SETUP for random particle generation */
      // let howManyParticles = 500;
      // for (let i = 0; i < howManyParticles; i++) {
      //   let x = Math.random() * canvas.width;
      //   let y = Math.random() * canvas.height;

      //   particleArray.push(new Particle(x, y));
      // }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      requestAnimationFrame(animate);
    };
    animate();
  });

// Photography / Retouching
// myFont.load().then((font) => {
//   document.fonts.add(font);
//   ctx.globalAlpha = 0.6;
//   ctx.fillStyle = "white";
//   if (canvas.width > 1600) {
//     ctx.font = "50px myFont";
//   }
//   if (canvas.width < 1600 && canvas.width > 1200) {
//     ctx.font = "40px myFont";
//   }
//   if (canvas.width < 1200) {
//     ctx.font = "30px myFont";
//   }
//   ctx.textAlign = "right";
//   ctx.fillText(
//     "Photography / Retouching",
//     canvas.width / 2,
//     canvas.height / 2 - 100
//   );
// });

// Web Development
// myFont.load().then((font) => {
//   document.fonts.add(font);
//   ctx.globalAlpha = 0.6;
//   ctx.fillStyle = "white";
//   if (canvas.width > 1600) {
//     ctx.font = "50px myFont";
//   }
//   if (canvas.width < 1600 && canvas.width > 1200) {
//     ctx.font = "40px myFont";
//   }
//   if (canvas.width < 1200) {
//     ctx.font = "30px myFont";
//   }
//   ctx.textAlign = "left";
//   ctx.fillText(
//     "Web Development",
//     canvas.width / 2 + 100,
//     canvas.height / 2 - 100
//   );
// });

// ctx.strokeStyle = "white";
// ctx.strokeRect(250, 200, 800, 400);
