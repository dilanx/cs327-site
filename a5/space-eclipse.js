/* globals Vue, systems, Vector2D */

(function () {
  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */

    dimensions: ['sunSize', 'sunX', 'sunY', 'moonSize', 'moonX', 'moonY'],
    hide: false,
    name: 'eclipse', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Eclipse',

    landmarks: [
      {
        name: 'eclipse',
        dna: [0.5, 0.5, 0.5, 0.4, 0.5, 0.5],
      },
      {
        name: 'orbit',
        dna: [0.16, 0.5, 0.5, 0.0, 1.0, 1.0],
      },
      {
        name: 'no sun',
        dna: [0, 0.5, 0.5, 1, 0.5, 0.5],
      },
      {
        name: 'tiny moon',
        dna: [1, 0.5, 0.5, 0, 0.5, 0.5],
      },
      {
        name: 'both',
        dna: [0.5, 0.25, 0.25, 0.5, 0.75, 0.75],
      },
    ],

    //==================================================================
    // POPULATION  AS A WHOLE

    setup({ p, individuals, deltaTime, time }) {
      // Create initial population
    },

    draw({ p, individuals, deltaTime, time }) {
      p.background('#172554');
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

      const sunSize = p.map(dim.sunSize, 0, 1, 8, 48);
      const sunX = p.map(dim.sunX, 0, 1, -20, 20);
      const sunY = p.map(dim.sunY, 0, 1, -20, 20);
      const moonSize = p.map(dim.moonSize, 0, 1, 8, 48);
      const moonX = p.map(dim.moonX, 0, 1, -20, 20);
      const moonY = p.map(dim.moonY, 0, 1, -20, 20);

      p.translate(0, -100);
      p.noStroke();
      p.fill('#ffff00');
      p.circle(sunX, sunY, sunSize);
      p.fill('#d0d0d0');
      p.circle(moonX, moonY, moonSize);

      p.pop();
    },
  };

  latentSpaces.push(space);
})();
