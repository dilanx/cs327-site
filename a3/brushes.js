const WIDTH = 800;
const HEIGHT = 500;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;
const STARTING_COLOR0 = [142, 77, 73];
const STARTING_COLOR1 = [0, 94, 82];
const STARTING_BRUSH_SIZE = 1;

const emojis = [
  '😳',
  '🥺',
  '😭',
  '😛',
  '😈',
  '😡',
  '👹',
  '🥵',
  '😋',
  '😀',
  '😔',
  '😞',
];

let brushes = [
  {
    icon: 'pencil.svg',
    label: 'Wild Pencil',
    mouseDragged(p, { color0, brushSize }) {
      const color = p.color(...color0);
      // randomize color a bit
      color.levels[0] += p.random(-100, 100);
      color.levels[1] += p.random(-100, 100);
      color.levels[2] += p.random(-100, 100);
      p.stroke(color);

      p.strokeWeight(brushSize * 3);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    },
  },
  {
    icon: 'emoji.svg',
    label: 'Emoji',
    mouseDragged(p, { color0, color1, brushSize }) {
      const emoji = p.random(emojis);
      p.textSize(Math.sqrt(brushSize) * 10);

      p.text(
        emoji,
        p.mouseX + p.random(-brushSize * 50, brushSize * 50),
        p.mouseY + p.random(-brushSize * 50, brushSize * 50)
      );
    },
  },
  {
    icon: 'circle-outline.svg',
    label: 'Spline',
    vertices: [],
    mouseDragged(p, { color0, color1, brushSize }) {
      p.stroke(color0);
      p.noFill();
      p.strokeWeight(brushSize * 3);
      p.beginShape();
      for (const vertex of this.vertices) {
        p.curveVertex(...vertex);
      }
      p.endShape();

      this.vertices.push([p.mouseX, p.mouseY]);

      if (this.vertices.length > 5000) {
        this.vertices.shift();
      }
    },
  },
  {
    icon: 'circle-fill.svg',
    label: 'Spline Fill',
    vertices: [],
    mouseDragged(p, { color0, color1, brushSize }) {
      p.stroke(color0);
      p.fill(color1);
      p.strokeWeight(brushSize * 3);
      p.beginShape();
      for (const vertex of this.vertices) {
        p.curveVertex(...vertex);
      }
      p.endShape();

      this.vertices.push([p.mouseX, p.mouseY]);

      if (this.vertices.length > 5000) {
        this.vertices.shift();
      }
    },
  },
  {
    icon: 'eraser.svg',
    label: 'Eraser',
    eraser: true,
    mouseDragged(p, { brushSize }) {
      p.stroke(0, 0, 0);
      p.strokeWeight(brushSize * 8);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    },
  },
];
