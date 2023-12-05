//  -- KATE TODO - get old mask working with new code

// Cyberpunk DJ mask.  Could make the ears vibrate with music
/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  // STEAL THIS FUNCTION
  function drawInNeonColors({ p, color, width, fxn }) {
    // Handy function to draw neon!
    p.noFill();
    p.strokeWeight(width * 2);
    p.stroke(color[0], color[1], color[2], 0.3);
    fxn();

    p.strokeWeight(width);
    p.stroke(color[0], color[1], color[2] + 10, 0.3);
    fxn();

    p.strokeWeight(width * 0.6);
    p.stroke(color[0], color[1], color[2] + 30, 1);
    fxn();
    p.strokeWeight(1);
  }

  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: 'draw', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    size: 20,
    trailLength: 100,
    color: 50,

    drawPoints: [],

    //=========================================================================================
    setup({ p }) {
      // Runs when you start this mask
      console.log('START MASK - ', this.name);
    },

    drawBackground({ p }) {
      p.background(0, 0, 0, 0.3);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
      this.drawPoints = [];
    },

    setupFace({ p, face }) {},

    drawHand({ p, hand }) {
      let t = p.millis() * 0.001;

      CONTOURS.fingers.forEach((finger, fingerIndex) => {
        drawInNeonColors({
          p,
          color: [142, 69, 58],
          width: 35,
          fxn: () => {
            hand.drawContour({
              p,
              // contour: [0].concat(finger),
              contour: finger,
            });
          },
        });
      });

      // Look at all landmarks

      // hand.landmarks.forEach((pt, index) => {
      //   p.fill(100);
      //   p.text(index, ...pt);
      // });

      const pointer = hand.landmarks[8];
      this.drawPoints.push(new Vector2D(...pointer));
      if (this.drawPoints.length > this.trailLength) this.drawPoints.shift();

      p.noStroke();
      p.fill(this.color, 100, 50);
      this.drawPoints.forEach((pt, index) => {
        p.circle(pt.x, pt.y, this.size);
      });
    },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
      // Do something for each side

      // Make an outline but also make it weird
      let outlineCount = 1;
      for (var i = 0; i < outlineCount; i++) {
        let pct = (i / outlineCount + t * 0.5) % 1;

        let faceContour = CONTOURS.sides[0].faceRings[0].concat(
          CONTOURS.sides[1].faceRings[0].slice().reverse()
        );

        p.noFill();
        p.strokeWeight(20);
        p.stroke(this.color, 100, 50, 100);
        face.drawContour({
          p,
          // the finalPoint gets moved into position
          transformPoint: (finalPoint, basePoint, index) => {
            finalPoint.setToLerp(
              face.center,
              basePoint,
              0.8 + pct + pct * p.noise(t + index * 0.4 + pct)
            );
          },
          useCurveVertices: true,
          contour: faceContour,
          close: true,
        });
      }

      face.forEachSide((sideContours, sideIndex) => {
        // Draw the three ear points
        p.noStroke();

        // Draw the face background by filling in between the face side and the centerline
        // side.index is either 1 or -1, so we can use that to change color between sides
        p.fill(142, 69, 58);
        face.drawContour({
          p,
          contour: sideContours.faceRings[0],
          contour1: CONTOURS.centerLine,
        });

        p.noStroke();

        // // Draw multiple strips around the face
        for (var i = 0; i < 2; i++) {
          p.fill(142, 69, 58);
          face.drawContour({
            p,
            contour: sideContours.faceRings[i],
            contour1: sideContours.faceRings[i + 1],
          });
        }
      });
      // Draw the eye on either side
      face.forEachSide((sideContours, sideIndex) => {
        // Draw the eye lines
        sideContours.eyeRings.forEach((eyeRing, eyeIndex) => {
          drawInNeonColors({
            p,
            color: [142, 69, 58],
            width: 5,
            fxn: () => {
              face.drawContour({
                p,
                contour: eyeRing,
                close: true,
              });
            },
          });
        });
      });

      // Draw the center line to the nose
      drawInNeonColors({
        p,
        color: [142, 69, 58],
        width: 5,
        fxn: () => {
          face.drawContour({
            p,
            contour: CONTOURS.centerLine.slice(0, 14),
          });
        },
      });

      // Draw the center line to below the mouthe
      drawInNeonColors({
        p,
        color: [142, 69, 58],
        width: 5,
        fxn: () => {
          face.drawContour({
            p,
            contour: CONTOURS.centerLine.slice(20),
          });
        },
      });

      p.noFill();
      // Draw the mouth lines
      CONTOURS.mouth.slice(2).forEach((mouthLine, mouthIndex) => {
        // Neon style
        drawInNeonColors({
          p,
          color: [142, 69, 58],
          width: 5,
          fxn: () => {
            face.drawContour({
              p,
              contour: mouthLine.slice(0),
              close: true,
            });
          },
        });
      });
    },
  };

  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  Vue.component(`input-${mask.name}`, {
    // Custom inputs for this bot
    template: `<div>
		
			<div>
        <div>size: <input type="range" v-model="mask.size" min="1" max="100" step="1" /></div>
        <div>trail length: <input type="range" v-model="mask.trailLength" min="50" max="500" step="1" /></div>
        <div>color: <input type="range" v-model="mask.color" min="0" max="360" step="1" /></div>
			</div>
		</div>`,

    // Custom data for these controls
    data() {
      return {};
    },
    props: { mask: { required: true, type: Object } }, // We need to have bot
  });

  masks.push(mask);
})();
