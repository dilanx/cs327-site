/**
 * Starter code
 *
 */
/* globals Vue, STARTING_COLOR0, STARTING_COLOR1, STARTING_BRUSH_SIZE, WIDTH, HEIGHT, p5 */

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  // We have all the elements, get one with id "app"

  new Vue({
    template: `
      <div id="app">
        <div
          ref="canvas"
          :style="'cursor: url(./icons/' + activeBrush.icon + '), default;'"
        />
        
        <div class="tools">
          <div class="brushes">
            <button
              v-for="brush in displayBrushes"
              @click="setTool(brush)"
              class="button"
              :class="{active: brush === activeBrush}"
            >
              <img :src="'./icons/' + brush.icon" :alt="brush.label + ' icon'" />
              <span>{{brush.label}}</span>
            </button>
          </div>
          <div class="divider" />
          <div class="brushes">
            <button
              v-for="brush in displayErasers"
              @click="setTool(brush)"
              class="button"
              :class="{active: brush === activeBrush}"
            >
              <img :src="'./icons/' + brush.icon" :alt="brush.label + ' icon'" />
              <span>{{brush.label}}</span>
            </button>
          </div>
          <div class="divider" />
          <div class="settings">
            <color-picker v-model="settings.color0" />
            <color-picker v-model="settings.color1" />
            <input
              type="range"
              v-model="settings.brushSize"
              max=10
              step=".5"
              class="slider"
            />
          </div>
        </div>
      </div>
    `,
    mounted() {
      // Create the P5 element
      new p5((p) => {
        // Save p to the Vue element, so we have access in other methods
        this.p = p;
        // We have a new "p" object representing the sketch
        p.frameRate(60);

        p.setup = () => {
          p.createCanvas(WIDTH, HEIGHT);
          p.colorMode(p.HSL);
          p.ellipseMode(p.RADIUS);
          this.activeBrush.setup?.(p, this.settings);
        };

        p.draw = () => {
          this.activeBrush.draw?.(p, this.settings);
        };

        // https://p5js.org/examples/input-mouse-functions.html
        p.mouseDragged = () =>
          this.activeBrush.mouseDragged?.(p, this.settings);
        p.mousePressed = () =>
          this.activeBrush.mousePressed?.(p, this.settings);
        p.mouseReleased = () =>
          this.activeBrush.mouseReleased?.(p, this.settings);
      }, this.$refs.canvas);
    },

    computed: {
      displayBrushes() {
        return this.brushes.filter((b) => !b.hide && !b.eraser);
      },
      displayErasers() {
        return this.brushes.filter((b) => !b.hide && b.eraser);
      },
    },

    methods: {
      setTool(brush) {
        console.log('Set brush', brush);
        this.activeBrush = brush;
        this.activeBrush.setup?.(this.p, this.settings);
      },
    },
    data() {
      return {
        brushes,
        activeBrush: brushes.filter((b) => !b.hide)[0],
        settings: {
          brushSize: STARTING_BRUSH_SIZE,
          color0: STARTING_COLOR0.slice(),
          color1: STARTING_COLOR1.slice(),
        },
      };
    },
    el: '#app',
  });
});
