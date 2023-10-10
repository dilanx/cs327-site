const WIDTH = 300;
const HEIGHT = 300;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;

const background = '#262626';

const colors = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#facc15',
  '#a3e635',
  '#4ade80',
  '#34d399',
  '#2dd4bf',
  '#22d3ee',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#c084fc',
  '#e879f9',
  '#f472b6',
  '#fb7185',
];

const beatform = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // e
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // +
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // a
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // e
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // +
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // a
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // e
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // +
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // a
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // e
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // +
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // a
];

function set(i, j, value) {
  if (beatform[i]?.[j] !== undefined) {
    beatform[i][j] = value;
  }
}

function buildWaveform() {
  for (let i = 0; i < beatform.length; i++) {
    for (let j = 0; j < beatform[i].length; j++) {
      if (beatform[i][j] === 1) {
        set(i, j - 2, 0.25);
        set(i, j - 1, 0.5);
        set(i, j + 1, 0.5);
        set(i, j + 2, 0.25);

        set(i + 1, j - 2, 0.25);
        set(i + 1, j - 1, 0.5);
        set(i + 1, j, 0.75);
        set(i + 1, j + 1, 0.5);
        set(i + 1, j + 2, 0.25);

        set(i + 2, j - 1, 0.25);
        set(i + 2, j, 0.5);
        set(i + 2, j + 1, 0.25);

        set(i + 3, j, 0.25);
      }
    }
  }
}

buildWaveform();

const sketches = [
  {
    name: 'dispersion',
    show: true,
    rectangles: [],
    draw(p) {
      p.background(background);
      if (p.random() < 0.1) {
        const rectangle = {
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(50, 100),
          speedX: p.random(-2, 2),
          speedY: p.random(-2, 2),
          color: p.color(p.random(colors)),
          startTime: p.millis(),
        };
        this.rectangles.push(rectangle);
      }

      for (let i = this.rectangles.length - 1; i >= 0; i--) {
        const rectangle = this.rectangles[i];
        rectangle.x += rectangle.speedX;
        rectangle.y += rectangle.speedY;

        const elapsedTime = p.millis() - rectangle.startTime;

        if (elapsedTime > 1000) {
          rectangle.x += rectangle.speedX;
          rectangle.y += rectangle.speedY;
          rectangle.size -= 1;
          rectangle.color.setAlpha(p.map(rectangle.size, 0, 100, 0, 255));

          if (rectangle.size <= 0) {
            this.rectangles.splice(i, 1);
          }
        }

        p.noStroke();
        p.fill(rectangle.color);
        p.rectMode(p.CENTER);
        p.rect(rectangle.x, rectangle.y, rectangle.size, rectangle.size, 24);

        if (
          rectangle.x < -rectangle.size ||
          rectangle.x > p.width + rectangle.size ||
          rectangle.y < -rectangle.size ||
          rectangle.y > p.height + rectangle.size
        ) {
          this.rectangles.splice(i, 1);
        }
      }
    },
  },
  {
    name: 'rainy day',
    show: true,
    clouds: [],
    rain: [],
    setup(p) {
      for (let i = 0; i < p.width / 10; i++) {
        this.clouds.push({
          x: i * 10,
          y: p.random(0, 20),
        });
      }
    },
    draw(p) {
      p.background('#000033');

      if (p.random() < 0.75) {
        const drop = {
          x: p.random(p.width),
          y: 10,
          speedY: p.random(5, 20),
          color: p.color('#60a5fa'),
        };
        this.rain.push(drop);
      }

      for (let i = this.rain.length - 1; i >= 0; i--) {
        const drop = this.rain[i];
        drop.y += drop.speedY;

        p.noStroke();
        p.fill(drop.color);
        p.rect(drop.x, drop.y, 2, 20);

        if (drop.y > p.height + drop.size) {
          this.rain.splice(i, 1);
        }
      }

      p.noStroke();
      p.fill('#808080');
      for (const cloud of this.clouds) {
        p.ellipse(cloud.x, cloud.y, 50);
      }
    },
  },
  {
    name: 'self portrait',
    show: true,
    points: 20,
    radius: 80,
    offset: 1000,
    zOffset: 1000,
    draw(p) {
      p.push();

      p.background('#1a1a1a');
      p.noStroke();
      p.fill('#b26634');

      p.translate(p.width / 2, p.height / 2);

      p.beginShape();
      for (let a = 0; a < 2 * Math.PI; a += 0.01) {
        let x = this.radius * p.cos(a);
        let y = this.radius * p.sin(a);
        const noiseX = (this.offset + x) / 80;
        const noiseY = (this.offset + y) / 80;

        x +=
          p.noise(noiseX, noiseY, this.zOffset) * (this.radius / 2) * p.cos(a);
        y +=
          p.noise(noiseX, noiseY, this.zOffset) * (this.radius / 2) * p.sin(a);
        p.vertex(x, y);
      }
      p.endShape();

      p.fill('#000000');
      p.circle(-this.radius / 2, -this.radius / 3, 20);
      p.circle(this.radius / 2, -this.radius / 3, 20);

      p.noFill();
      p.stroke('#000000');
      p.strokeWeight(4);
      p.arc(0, this.radius / 3, this.radius, this.radius, 0, Math.PI);

      p.pop();

      this.zOffset += 0.01;
      if (this.zOffset > 10000) {
        this.zOffset = 1000;
      }
    },
  },
  {
    name: 'blink',
    show: true,
    blink: 0,
    space: 0,
    blinking: false,
    tearY: 0,
    tearSpeed: 1,
    draw(p) {
      p.push();
      p.background('#ffffff');
      p.noStroke();
      p.fill('#000000');

      if (p.random() < 0.01) {
        this.tearY = 0;
        this.tearSpeed = 1;
      }

      if (this.tearY < p.height + 20) {
        this.tearY += this.tearSpeed;
        this.tearSpeed += 1;
      }

      if (p.millis() - this.blink > this.space) {
        p.fill('#ffffff');
        p.ellipse(p.width / 2, p.height / 2, 100, 200, 2);
        this.blink = p.millis();
        this.space = p.random(500, 4000);
        this.blinking = true;
      }

      if (this.blinking) {
        if (p.millis() - this.blink > 100) {
          this.blinking = false;
        }
        p.rect(p.width / 2 - 75, p.height / 2 - 10, 150, 20, 8);
      } else {
        p.ellipse(p.width / 2, p.height / 2, 100, 200, 2);
      }

      p.textSize(64);
      p.text('💧', p.width / 2, p.height / 2 + 50 + this.tearY);

      p.pop();
    },
  },
  {
    name: 'sick beat',
    show: true,
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
    draw(p) {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.background('#052e16');
      p.fill('#ffffff');

      const t = (((p.frameCount * 2) / this.loopLength) % 1) * 16;
      const i1 = Math.floor(t);
      const i2 = Math.ceil(t);
      const f = t - i1;
      for (let i = 0; i < 20; i++) {
        const noiseFactor = 1;
        const h1 =
          Math.max(10, beatform[i1]?.[i] * 100 || 0) +
          p.random(-noiseFactor, noiseFactor);
        const h2 =
          Math.max(10, beatform[i2]?.[i] * 100 || 0) +
          p.random(-noiseFactor, noiseFactor);
        const h = p.lerp(h1, h2, f);
        p.rect(i * 10 - 100, -(h / 2), 10, h);
      }

      p.pop();
    },
  },
  {
    name: 'countdown',
    show: true,
    x: 0,
    y: 0,
    xSpeed: 0,
    ySpeed: 0,
    start: 0,
    setup(p) {
      this.x = p.width / 2;
      this.y = p.height / 2;
      this.xSpeed = 5;
      this.ySpeed = 4;
      this.start = p.millis();
      p.background('#f0f0f0');
    },
    draw(p) {
      p.fill(p.random(colors));
      p.textSize(32);
      p.text(20 - Math.floor((p.millis() - this.start) / 1000), this.x, this.y);
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x > p.width || this.x < 0) {
        this.xSpeed *= -1;
      }

      if (this.y > p.height || this.y < 0) {
        this.ySpeed *= -1;
      }

      if (p.millis() - this.start > 20000) {
        p.background('#f0f0f0');
        this.start = p.millis();
      }
    },
  },
];
