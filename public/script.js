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
    let frequency = 20;

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
        let colors = ["#dc1008"];
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

    function createCanvas({ width, height }) {
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext("2d");
      return {
        canvas,
        context,
      };
    }

    function writeText(canvas, ctx, text) {
      const responsiveWidth = 820;
      if (canvas.width <= responsiveWidth) {
        let size = 5;
        ctx.font = `${size}rem Gotham-Thin`;
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 100);
      }
      if (canvas.width > responsiveWidth) {
        let size = 8;
        ctx.font = `${size}rem Gotham-Thin`;
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 175);
      }
      ctx.fillStyle = "#111111";
    }

    function maskCanvas() {
      c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
      c3.context.globalCompositeOperation = "source-atop";
      c3.context.drawImage(c1.canvas, 0, 0);
      blur(c1.canvas, c1.context, 2);
    }

    function blur(canvas, ctx, amt) {
      ctx.filter = `blur(${amt}px)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";
    }

    const dimensions_c1 = c1.canvas;
    const ctx_c1 = c1.context;

    function populate() {
      particles.push(
        new Particle(ctx_c1, {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        })
      );
    }

    function clear() {
      ctx_c1.globalAlpha = 0.03;
      ctx_c1.fillStyle = "#333333";
      ctx_c1.fillRect(0, 0, dimensions_c1.width, dimensions_c1.height);
      ctx_c1.globalAlpha = 1;
    }

    function update() {
      clear();
      particles = particles.filter((particle) => particle.move());
      maskCanvas();
      requestAnimationFrame(update.bind(this));
    }

    update();
  });
