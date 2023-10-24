/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: 'saltandpepper', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Salt and Pepper',
    particles: [],
    trailLength: 16,
    ratio: 0.5,
    radius: 20,

    setup(p, {}) {
      // TODO  - Create the initial particles
      this.particles = [];
      // How many?  Where?
      for (var i = 0; i < 10; i++) {
        // You can use a helper function, or setup here
        let pt = new Vector2D(
          Math.random() * p.width,
          Math.random() * p.height
        );

        // Helpful: a unique ID number
        pt.idNumber = this.particles.length;

        // Basic particle info
        pt.velocity = new Vector2D();
        pt.force = Vector2D.polar(100, Math.random() * 100);

        pt.wanderForce = new Vector2D();

        // Remember where you have been
        pt.trail = [];

        this.particles.push(pt);
      }
    },

    update(p, { deltaTime, time }) {
      // Set the forces
      this.particles.forEach((pt) => {
        // Calculate forces
        // TODO - your forces here

        // WANDER FORCE
        // Move around randomly
        let rateOfWanderChange = 0.1;
        // let angle = 40*p.noise(pt.idNumber)
        // let angle = 40*p.noise(time*rateOfWanderChange)
        let angle = 40 * p.noise(time * rateOfWanderChange, pt.idNumber * 0.01);
        pt.wanderForce.setToPolar(100, angle);

        // Add up all the forces
        pt.force.setToAdd(pt.wanderForce);
      });

      // Move the particles
      this.particles.forEach((pt) => {
        // This stays the same for most particle systems
        // They all follow the same
        // - add-acceleration-to-velocity
        // - add-velocity-to-position
        // routine

        // Apply the force to the velocity
        pt.velocity.addMultiple(pt.force, deltaTime);

        // Apply the velocity to the position
        pt.addMultiple(pt.velocity, deltaTime);
      });

      // Post movement
      this.particles.forEach((pt) => {
        // TODO  (optional) Do something with the particles after moving
        let border = 20;
        pt.wrap(-border, -border, p.width + border, p.height + border);

        // SPEED LIMIT
        pt.velocity.constrain(20, 140);

        // Remember this position!
        // Make a copy, and add it to my trail
        const copy = pt.clone();
        copy.pieces = pt.pieces?.map((p) => [...p]);
        pt.trail.unshift(copy);

        // Cut off everything but the last N points in the trail
        pt.trail = pt.trail.slice(0, this.trailLength);

        pt.pieces = [];
        for (let i = 0; i < 10; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * this.radius;
          const x = Math.cos(angle) * dist;
          const y = Math.sin(angle) * dist;

          pt.pieces.push([Math.random(), x, y]);
        }
      });
    },

    draw(p, { drawDebugInfo }) {
      this.particles.forEach((pt) => {
        // TODO - Draw the particles
        p.noStroke();
        // TODO - Draw debug info for each particle
        p.fill(100, 0.3);

        pt.trail.forEach((pt2) => {
          pt2.pieces?.forEach((piece) => {
            p.fill(piece[0] < this.ratio ? 255 : 0, 1);
            p.circle(pt2.x + piece[1], pt2.y + piece[2], 2);
          });
        });

        p.push();
        p.translate(...pt);

        pt.pieces.forEach((piece) => {
          p.fill(piece[0] < this.ratio ? 255 : 0, 1);
          p.circle(piece[1], piece[2], 2);
        });

        p.pop();

        if (drawDebugInfo) {
          p.fill(100);
          p.textSize(16);
          p.text(`id ${pt.idNumber} trail ${pt.trail.length}`, ...pt);

          p.strokeWeight(1);
          pt.drawArrow(p, {
            // These functions draw arrows from the point along some vector v
            multiplyLength: 0.5,
            v: pt.force,
            color: [217, 91, 60],
            startOffset: 20,
          });

          pt.drawArrow(p, {
            multiplyLength: 0.5,
            v: pt.velocity,
            color: [0, 84, 60],
            startOffset: 20,
            normalOffset: 5,
          });
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
          <td>Trail Length</td>
          <td>
            <input 
              type="range"
              min="0"
              max="128"
              step="1"
              v-model.number="system.trailLength"
            />
          </td>
        </tr>
        <tr>
          <td>Salt to Pepper Ratio</td>
          <td>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.1"
              v-model.number="system.ratio"
            />
          </td>
        </tr>
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
