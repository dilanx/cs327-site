/* globals Vue, systems, Vector2D */

(function () {
  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */

    dimensions: [
      'size',
      'anger',
      'bounceSize',
      'bounceSpeed',
      'angle',
      'stemHue',
    ],
    hide: false,
    name: 'pumpkins', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Pumpkins',

    landmarks: [
      {
        name: 'classic',
        dna: [0.5, 0.25, 0.5, 0.0, 0.5, 0.32],
      },
      {
        name: 'chonky',
        dna: [1.0, 0.5, 0.5, 0.0, 0.5, 0.75],
      },
      {
        name: 'nervous',
        dna: [0.5, 0.0, 0.1, 1.0, 0.0, 0.5],
      },
      {
        name: 'angry',
        dna: [0.25, 1.0, 1.0, 0.75, 1.0, 1.0],
      },
      {
        name: 'tiny',
        dna: [0.0, 0.5, 1.0, 0.0, 0.5, 0.25],
      },
    ],

    //==================================================================
    // POPULATION  AS A WHOLE

    setup({ p, individuals, deltaTime, time }) {
      // Create initial population
    },

    draw({ p, individuals, deltaTime, time }) {
      p.background('#1e1b4b');
    },

    //==================================================================
    // INDIVIDUAL

    setupIndividual(individual, { p }) {
      // Setup an individual,
      // if you need to initialize any variables for an individual
      // Note that their DNA may change after this, so only use it for non-DNA stuff
      // e.g, give each rectangle a position we can move around later (good for particles)
      // individual.position = new Vector2D()
    },

    updateIndividual(individual, { p, time, deltaTime }) {},

    drawIndividual(individual, { p, time, deltaTime }) {
      // HELPER
      // Make a dictionary of all the DNA dimensions,
      // -  this makes them easier to look up hen drawing
      // even though we need to keep the dna itself as an array of floats for other reasons
      let dim = {};
      this.dimensions.forEach((dimName, index) => {
        dim[dimName] = individual.dna[index];
      });

      // We also have a basePosition and baseScale if you want your
      // individuals to be at a particular place
      p.push();
      p.translate(...individual.basePosition);
      p.scale(individual.baseScale);

      const size = p.map(dim.size, 0, 1, 8, 32);
      const anger = p.map(dim.anger, 0, 1, -2, 2);
      const bounceSize = p.map(dim.bounceSize, 0, 1, 4, 36);
      const bounceSpeed = p.map(dim.bounceSpeed, 0, 1, 4, 12);
      const yBounce = -bounceSize * Math.abs(Math.sin(time * bounceSpeed));
      const angle = p.map(dim.angle, 0, 1, -0.5, 0.5);
      const stemHue = p.map(dim.stemHue, 0, 1, 0, 360);

      p.translate(0, yBounce - 20);
      p.rotate(angle);

      p.stroke(stemHue, 100, 50);
      p.strokeWeight(4);
      p.noFill();
      p.curve(0, 0, 0, -size * 1.4, 4, -size * 1.6, 8, -size * 1.2);

      p.stroke('#000000');
      p.strokeWeight(1);
      p.fill('#f97316');
      p.ellipse(-size * 0.75, 0, size, size * 1.4);
      p.ellipse(size * 0.75, 0, size, size * 1.4);
      p.ellipse(0, 0, size, size * 1.4);

      p.noFill();
      p.stroke('#000000');
      p.strokeWeight(2);
      p.line(-4, 4, -4, -4);
      p.line(4, 4, 4, -4);

      p.strokeWeight(2);
      p.line(-2, -10 + anger, -8, -10 - anger);
      p.line(2, -10 + anger, 8, -10 - anger);

      p.pop();
    },
  };

  latentSpaces.push(space);
})();
