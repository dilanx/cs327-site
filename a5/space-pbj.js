/* globals Vue, systems, Vector2D */

(function () {
  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */

    dimensions: [
      'breadSize',
      'breadSpacing',
      'breadDensity',
      'peanutButterAmount',
      'jellyAmount',
      'jellyFlavor',
    ],
    hide: false,
    name: 'pbj', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'PB&J',

    landmarks: [
      {
        name: 'grape jelly',
        dna: [0.5, 0.15, 0.5, 0.75, 0.75, 0.71],
      },
      {
        name: 'pb addict',
        dna: [1.0, 0.5, 0.0, 1.0, 0.0, 0.0],
      },
      {
        name: 'breadless',
        dna: [0.5, 0.15, 0.0, 1.0, 1.0, 0.71],
      },
      {
        name: 'pb and mustard',
        dna: [0.5, 0.15, 0.5, 0.75, 0.75, 0.16],
      },
      {
        name: 'plain bread',
        dna: [0.75, 0.25, 1.0, 0.0, 0.0, 0.0],
      },
    ],

    //==================================================================
    // POPULATION  AS A WHOLE

    setup({ p, individuals, deltaTime, time }) {
      // Create initial population
    },

    draw({ p, individuals, deltaTime, time }) {
      p.background('#fffbeb');
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

      const breadSize = p.map(dim.breadSize, 0, 1, 8, 64);
      const breadSpacing = p.map(dim.breadSpacing, 0, 1, 0, 100);
      const breadDensity = p.map(dim.breadDensity, 0, 1, 0.25, 1);
      const peanutButterAmountX = dim.peanutButterAmount * breadSize;
      const peanutButterAmountY = dim.peanutButterAmount * (breadSize / 2);
      const jellyAmountX = dim.jellyAmount * breadSize;
      const jellyAmountY = dim.jellyAmount * (breadSize / 2);
      const jellyFlavor = p.map(dim.jellyFlavor, 0, 1, 0, 360);

      const breadColor = p.color('#fde68a');
      breadColor.setAlpha(breadDensity);

      p.translate(0, -100);
      p.noStroke();

      p.translate(0, breadSpacing / 2);
      p.fill(breadColor);
      p.quad(-breadSize, 0, 0, breadSize / 2, breadSize, 0, 0, -breadSize / 2);
      p.fill('#a16207');
      p.quad(
        -peanutButterAmountX,
        0,
        0,
        -peanutButterAmountY,
        peanutButterAmountX,
        0,
        0,
        peanutButterAmountY
      );

      p.translate(0, -breadSpacing);
      p.fill(jellyFlavor, 100, 50);
      p.quad(
        -jellyAmountX,
        0,
        0,
        -jellyAmountY,
        jellyAmountX,
        0,
        0,
        jellyAmountY
      );
      p.fill(breadColor);
      p.quad(-breadSize, 0, 0, breadSize / 2, breadSize, 0, 0, -breadSize / 2);

      p.pop();
    },
  };

  latentSpaces.push(space);
})();
