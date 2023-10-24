/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: 'sun', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Sun',
    particles: [],
    radius: 64,
    detail: 48,
    opacity: 0.05,

    setup(p) {
      // TODO  - Create the initial particles
      this.particles = [];
      // How many?  Where?
      this.particles.push(new Vector2D(p.width - 96, 96));
    },

    update(p) {},

    mousePressed(p) {
      this.particles.push(new Vector2D(p.mouseX, p.mouseY));
    },

    draw(p, { drawDebugInfo }) {
      this.particles.forEach((pt) => {
        p.strokeWeight(1);
        if (drawDebugInfo) {
          p.stroke('#14b8a6');
        } else {
          p.noStroke();
        }
        p.fill(53, 98, 77, this.opacity);
        for (let i = 0; i < this.detail; i++) {
          p.circle(...pt, this.radius * ((this.detail - i) / this.detail));
        }
      });
    },
  };

  /*
   * Controls for this system
   */

  Vue.component(`controls-${system.name}`, {
    template: `
		  <table>
        <tr>
          <td>Radius</td>
          <td>
            <input 
              type="range"
              min="1"
              max="128"
              step="1"
              v-model.number="system.radius"
            />
          </td>
        </tr>
        <tr>
          <td>Detail</td>
          <td>
            <input 
              type="range"
              min="1"
              max="64"
              step="1"
              v-model.number="system.detail"
            />
          </td>
        </tr>
        <tr>
          <td>Translucency</td>
          <td>
            <input 
              type="range"
              min="0.05"
              max="1"
              step="0.05"
              v-model.number="system.opacity"
            />
          </td>
        </tr>
      </table>
		`,
    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();
