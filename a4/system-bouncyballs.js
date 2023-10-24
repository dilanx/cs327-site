/* globals Vue, systems, Vector2D */

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

(function () {
  let system = {
    hide: false,
    name: 'bouncyballs', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Bouncy Balls',
    particles: [],
    amount: 24,
    radius: 10,

    createBall(p) {
      const pt = new Vector2D(
        Math.random() * p.width,
        Math.random() * p.height
      );

      // Helpful: a unique ID number
      pt.idNumber = this.particles.length;

      // Basic particle info
      pt.velocity = new Vector2D(
        Math.random() * 100 + 20,
        Math.random() * 100 + 20
      );

      pt.color = p.random(colors);

      this.particles.push(pt);
    },

    setup(p) {
      // TODO  - Create the initial particles
      this.particles = [];
      // How many?  Where?
      for (let i = 0; i < this.amount; i++) {
        this.createBall(p);
      }
    },

    update(p, { deltaTime }) {
      // Update number of particles

      if (this.particles.length < this.amount) {
        for (let i = 0; i < this.amount - this.particles.length; i++) {
          this.createBall(p);
        }
      }

      if (this.particles.length > this.amount) {
        this.particles.splice(this.amount);
      }

      // Move the particles
      this.particles.forEach((pt) => {
        const next = pt.clone().addMultiple(pt.velocity, deltaTime);
        this.particles.forEach((pt2) => {
          if (pt === pt2) return;

          const next2 = pt2.clone().addMultiple(pt2.velocity, deltaTime);
          if (next.getDistanceTo(next2) < this.radius * 2) {
            const temp = pt.velocity.clone();
            pt.velocity.setTo(...pt2.velocity);
            pt2.velocity.setTo(...temp);
            pt.collide = 10;
            pt2.collide = 10;
          }
        });

        if (next.x - this.radius < 0 || next.x + this.radius > p.width) {
          pt.velocity.x *= -1;
          pt.collide = -10;
        }

        if (next.y - this.radius < 0 || next.y + this.radius > p.height) {
          pt.velocity.y *= -1;
          pt.collide = -10;
        }

        // Apply the velocity to the position
        pt.addMultiple(pt.velocity, deltaTime);
      });
    },

    draw(p, { drawDebugInfo }) {
      this.particles.forEach((pt) => {
        p.push();
        p.translate(...pt);
        p.noStroke();
        p.fill(pt.color);
        p.circle(0, 0, this.radius * 2);
        p.pop();

        if (drawDebugInfo) {
          p.strokeWeight(1);
          pt.drawArrow(p, {
            multiplyLength: 0.5,
            v: pt.velocity,
            color: [0, 84, 60],
            startOffset: 20,
            normalOffset: 5,
          });

          if (pt.collide !== 0) {
            p.strokeWeight(3);
            if (pt.collide > 0) {
              p.stroke('#f97316');
            } else {
              p.stroke('#eab308');
            }
            p.noFill();
            p.circle(...pt, this.radius * 2);
          }
        }

        if (pt.collide > 0) {
          pt.collide--;
        }

        if (pt.collide < 0) {
          pt.collide++;
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
          <td>Number of Balls</td>
          <td>
            <input 
              type="range"
              min="1"
              max="64"
              step="1"
              v-model.number="system.amount"
            />
          </td>
        </tr>
        <tr>
          <td>Ball Radius</td>
          <td>
            <input 
              type="range"
              min="1"
              max="32"
              step="1"
              v-model.number="system.radius"
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
