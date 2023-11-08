document.addEventListener('DOMContentLoaded', (event) => {
  new Vue({
    template: `
      <div id="sketches">
        <div v-for="(sketch, index) in activeSketches" class="sketch">
          <div :ref="'canvas' + index" class="canvas"></div>
          <h2>{{sketch.name}}</h2>
			    <button @click="saveSketch(sketch)">
            <i class="fas fa-download"></i>
          </button>
		    </div>
		  </div>
    `,
    methods: {
      saveSketch(sketch) {
        sketch.p.saveGif(
          sketch.name + '.gif',
          sketch.loopLength || DEFAULT_LOOP_LENGTH_IN_FRAMES,
          { units: 'frames' }
        );
      },
    },
    computed: {
      activeSketches() {
        return this.sketches.filter((s) => s.show);
      },

      holderStyle() {
        return {
          'grid-template-columns': `repeat(auto-fill, minmax(${WIDTH}px, 1fr))`,
        };
      },
    },

    mounted() {
      // For each sketch, make a p5 instance
      this.activeSketches.forEach((sketch, index) => {
        new p5(
          (p) => {
            p.frameRate(30);

            // We have a new "p" object representing the sketch
            sketch.p = p;

            p.setup = () => {
              let dim = [WIDTH, HEIGHT];
              p.createCanvas(...dim);

              p.colorMode(p.HSL);

              sketch.setup?.(p);
            };

            p.draw = () => sketch.draw(p);
          },
          this.$refs['canvas' + index][0]
        );
      });
    },

    data() {
      return { sketches };
    },
    el: '#sketches',
  });
});
