/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: 'kiwi', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Kiwi',

    particles: [],
    emotion: 1,

    wanderStrength: 100,
    gravityStrength: 100,
    borderStrength: 100,
    mouseStrength: 100,
    drag: 0.1,
    color0: [100, 100, 50],

    setup(p, {}) {
      // TODO  - Create the initial particles
      // How many?  Where?
      this.particles = [];
      for (let i = 0; i < 24; i++) {
        let pt = new Vector2D(
          Math.random() * p.width,
          Math.random() * p.height
        );

        // Helpful: a link back to the rest of the particles
        pt.particles = this.particles;
        // Helpful: a unique ID number
        pt.idNumber = this.particles.length;

        // Basic particle info
        pt.velocity = new Vector2D();
        pt.force = new Vector2D();

        // Custom forces
        pt.gravityForce = new Vector2D();
        pt.wanderForce = new Vector2D();
        pt.borderForce = new Vector2D();
        pt.mouseForce = new Vector2D();

        // You could also give each point a color, a mass, a radius,
        // ... an emoji, a lifespan, a mood, an orbiting moon, a trail of past positions ...
        // What does this particle need to do its job?

        this.particles.push(pt);
      }
    },

    update(p, { deltaTime, time }) {
      let center = new Vector2D(p.width / 2, p.height / 2);

      // Set the forces
      this.particles.forEach((pt) => {
        // Calculate forces
        pt.gravityForce.setTo(0, this.gravityStrength);

        // WANDER FORCE
        // Move around randomly
        let rateOfWanderChange = 0.1;
        // let angle = 40*p.noise(pt.idNumber)
        // let angle = 40*p.noise(time*rateOfWanderChange)
        let angle = 40 * p.noise(time * rateOfWanderChange, pt.idNumber * 0.01);
        pt.wanderForce.setToPolar(this.wanderStrength, angle);

        // BORDER FORCE
        let directionToCenter = Vector2D.sub(center, pt);
        let dist = directionToCenter.magnitude;
        // How much should the border affect us?
        // Maybe not at all if we are close enough, then linearly after that
        let borderAmount = Math.max(0, dist - 200);
        borderAmount *= 0.1;

        // Increasing the force exponentially as you go farther out makdes it feel "bouncy"
        borderAmount = 0.2 * Math.pow(borderAmount, 2);
        // Increasing the force by a root as you go farther out makdes it feel "squishy"
        // borderAmount = Math.pow(borderAmount, 0.2);

        // Ok, now make a force in this direction, at this magnitude (divide by the original magnitued)
        pt.borderForce.setToMultiple(
          (borderAmount * this.borderStrength) / dist,
          directionToCenter
        );

        // MOUSE FORCE
        let mousePos = new Vector2D(p.mouseX, p.mouseY);
        let directionToMouse = Vector2D.sub(mousePos, pt);
        pt.mouseForce.setToMultiple(1, directionToMouse);

        // Add up all the forces
        pt.force.setToAdd(
          pt.gravityForce,
          pt.mouseForce,
          pt.borderForce,
          pt.wanderForce
        );
      });

      // Move the particles
      this.particles.forEach((pt) => {
        // Apply the force to the velocity

        pt.velocity.addMultiple(pt.force, deltaTime);

        // Apply the velocity to the position
        pt.addMultiple(pt.velocity, deltaTime);

        // Do you want to slow them down? You can limit speeds in lots of ways:
        // Apply a drag force (ie, lose more speed the faster you are going)
        pt.velocity.mult(1 - this.drag);

        // Apply a maximum (or minimum speed limit)
        // e.g. this makes particles move at a constant rate
        // pt.velocity.constrain(100, 100)
      });
    },

    draw(p, { drawDebugInfo }) {
      this.particles.forEach((pt) => {
        p.push();
        p.translate(...pt);
        p.strokeWeight(6);
        p.stroke('#78350f');
        p.fill('#84cc16');
        p.ellipse(0, 0, 20, 24);

        p.noStroke();
        p.fill('#ffffff');
        p.circle(0, 10, 6);

        p.fill('#000000');
        p.circle(-5, -10, 2);
        p.circle(5, -10, 2);

        p.strokeWeight(1);
        p.stroke('#ef4444');
        p.noFill();
        const emotionCurve = this.emotion ? this.emotion * -20 : -5;
        p.curve(-6, emotionCurve, -3, -5, 3, -5, 6, emotionCurve);

        p.stroke('#000000');
        for (let i = 0; i < 7; i++) {
          const angle = -(Math.PI / 6) * i;
          const ax = Math.cos(angle) * 8;
          const ay = Math.sin(angle) * 8 + 10;
          const bx = Math.cos(angle) * 10;
          const by = Math.sin(angle) * 10 + 10;

          p.line(ax, ay, bx, by);
        }

        p.pop();
      });

      if (drawDebugInfo) {
        this.particles.forEach((pt) => {
          // Draw helpful debugging info here
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

          p.textSize(24);
          switch (this.emotion) {
            case -1:
              p.text('😭', ...pt);
              break;
            case 0:
              p.text('😐', ...pt);
              break;
            case 1:
              p.text('😀', ...pt);
              break;
          }
        });
      }
    },
  };

  /*
   * Controls for this system
   */

  Vue.component(`controls-${system.name}`, {
    template: `
		  <table>
        <tr>
          <td>Emotion</td>
          <td>
            <input 
              type="range"
              min="-1"
              max="1"
              step="1"
              v-model.number="system.emotion"
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
