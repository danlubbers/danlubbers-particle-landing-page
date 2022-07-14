const newFont = new FontFace(
  "Gotham-Thin",
  `url("/assets/fonts/Gotham-Thin.otf")`
);

newFont
  .load()
  .then((font) => {
    document.fonts.add(font);
  })
  .then(() => {
    let particles = [];
    let frequency = 40;
    // Populate particles
    setInterval(() => populate(), frequency);

    let c1 = createCanvas({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    let c2 = createCanvas({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    let c3 = createCanvas({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    let tela = c1.canvas;
    let canvas = c1.context;

    document.querySelector("body").appendChild(c3.canvas);

    writeText(c2.canvas, c2.context, "DANLUBBERS");

    class Particle {
      constructor(canvas, options) {
        this.canvas = canvas;
        this.x = options.x;
        this.y = options.y;
        this.s = 3 + Math.random();
        this.a = 0;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.radius = 0.5 + Math.random() * 20;
        this.color = this.randomColor();
      }

      randomColor() {
        let colors = ["#a52a25"];
        return colors[this.randomIntFromInterval(0, colors.length - 1)];
      }

      randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      render() {
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.canvas.lineWidth = 2;
        this.canvas.fillStyle = this.color;
        this.canvas.fill();
        this.canvas.closePath();
      }

      move() {
        //this.swapColor()
        this.x += Math.cos(this.a) * this.s;
        this.y += Math.sin(this.a) * this.s;
        this.a += Math.random() * 0.8 - 0.4;

        if (this.x < 0 || this.x > this.w - this.radius) {
          return false;
        }

        if (this.y < 0 || this.y > this.h - this.radius) {
          return false;
        }
        this.render();
        return true;
      }
    }

    function createCanvas(properties) {
      let canvas = document.createElement("canvas");
      canvas.width = properties.width;
      canvas.height = properties.height;
      let context = canvas.getContext("2d");
      return {
        canvas,
        context,
      };
    }

    function writeText(canvas, context, text) {
      let size = 8;
      context.font = `${size}rem Gotham-Thin`;
      context.fillStyle = "#111111";
      context.textAlign = "center";
      context.fillText(text, canvas.width / 2, canvas.height / 2 - 175);
    }

    function maskCanvas() {
      c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
      c3.context.globalCompositeOperation = "source-atop";
      c3.context.drawImage(c1.canvas, 0, 0);
      blur(c1.context, c1.canvas, 2);
    }

    function blur(ctx, canvas, amt) {
      ctx.filter = `blur(${amt}px)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";
    }

    /*
     * Function to clear layer canvas
     * @num:number number of particles
     */
    function populate() {
      particles.push(
        new Particle(canvas, {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        })
      );
    }

    function clear() {
      canvas.globalAlpha = 0.03;
      canvas.fillStyle = "#111111";
      canvas.fillRect(0, 0, tela.width, tela.height);
      canvas.globalAlpha = 1;
    }

    function update() {
      clear();
      particles = particles.filter((p) => p.move());
      maskCanvas();
      requestAnimationFrame(update.bind(this));
    }

    update();
  });

// Buttons
// document.querySelector("#photography").addEventListener("click", () => {
//   console.log("hit");
// });
