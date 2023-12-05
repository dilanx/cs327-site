//  -- KATE TODO - get old mask working with new code

// Cyberpunk DJ mask.  Could make the ears vibrate with music
/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  const LETTERS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

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
    name: 'keyboard', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    letters: [],
    lastTouch: 0,
    lastLetter: '',
    count: 1,
    delay: 1000,
    size: 32,
    text: '',
    textLength: 10,

    //=========================================================================================
    setup({ p }) {
      // Runs when you start this mask
      console.log('START MASK - ', this.name);

      this.speechSynthesis = window.speechSynthesis;

      for (let i = 0; i < 26; i++) {
        const x = 50 + 100 * (i % 5);
        const y = 50 + 50 * Math.floor(i / 5);
        this.letters.push({
          letter: LETTERS[i],
          x,
          y,
        });
      }
    },

    drawBackground({ p }) {
      p.background(0, 0, 100);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },

    setupFace({ p, face }) {
      // Any data that you need on each face
    },

    drawHand({ p, hand }) {
      let t = p.millis() * 0.001;

      CONTOURS.fingers.forEach((finger, fingerIndex) => {
        p.stroke(0, 0, 0);
        p.strokeWeight(20);
        hand.drawContour({
          p,
          // contour: [0].concat(finger),
          contour: finger,
        });
      });

      // Look at all landmarks

      //       hand.landmarks.forEach((pt, index) =>{
      //         p.fill(100)
      //         p.text(index, ...pt)
      //       })
      const pointer = hand.landmarks[8];
      for (const letter of this.letters) {
        if (p.dist(...pointer, letter.x, letter.y) < 20) {
          if (p.millis() - this.lastTouch > this.delay) {
            console.log('letter', letter.letter);
            const utterance = new SpeechSynthesisUtterance(
              letter.letter.toLowerCase()
            );
            console.log(this.speechSynthesis);
            this.speechSynthesis.speak(utterance);
            this.lastTouch = p.millis();
            this.lastLetter = letter.letter;
            this.text += letter.letter;
            if (this.text.length > this.textLength) {
              this.text = this.text.slice(-this.textLength);
            }
          }
        }
      }
    },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
      // Do something for each side

      // Inside your draw loop or where you want to display emojis around the head
      for (var i = 0; i < this.count; i++) {
        const pct = (i / this.count + t * 20 * 0.01) % 1;
        const angle = pct * Math.PI * 2;

        const radius = 160;
        const x = face.center.x + radius * Math.cos(angle);
        const y = face.center.y + radius * Math.sin(angle);
        p.fill(0);
        p.stroke(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(32);
        p.text(this.lastLetter, x, y);
      }

      face.forEachSide((sideContours, sideIndex) => {
        // Draw the three ear points
        p.noStroke();

        // Draw the face background by filling in between the face side and the centerline
        // side.index is either 1 or -1, so we can use that to change color between sides
        p.fill(0, 0, 100);
        face.drawContour({
          p,
          contour: sideContours.faceRings[0],
          contour1: CONTOURS.centerLine,
        });

        p.noStroke();

        // // Draw multiple strips around the face
        for (var i = 0; i < 2; i++) {
          p.fill(0);
          face.drawContour({
            p,
            contour: sideContours.faceRings[i],
            contour1: sideContours.faceRings[i + 1],
          });
        }
      });

      // Draw the eye on either side
      face.forEachSide((sideContours, sideIndex) => {
        p.fill(0);
        p.strokeWeight(3);
        p.stroke(0);
        face.drawContour({
          p,
          contour: sideContours.eyeRings[2],
          close: true,
        });
      });

      face.drawContour({
        p,
        contour: CONTOURS.centerLine.slice(0, 14),
      });

      face.drawContour({
        p,
        contour: CONTOURS.centerLine.slice(20),
      });

      p.noFill();

      // Draw the mouth lines
      CONTOURS.mouth.slice(2).forEach((mouthLine, mouthIndex) => {
        face.drawContour({
          p,
          contour: mouthLine.slice(0),
          close: true,
        });
      });
    },

    drawAll({ p }) {
      for (var i = 0; i < 26; i++) {
        p.textSize(32);
        p.stroke(0);
        p.strokeWeight(1);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.NORMAL);
        // draw text with 5 letters per line
        p.text(this.letters[i].letter, this.letters[i].x, this.letters[i].y);
      }

      p.textSize(32);
      p.textAlign(p.LEFT, p.BOTTOM);
      p.textStyle(p.NORMAL);
      p.text(this.text, 20, 390);
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
        <div>count: <input type="range" v-model="mask.count" min="1" max="32" step="1" /></div>
        <div>delay: <input type="range" v-model="mask.delay" min="500" max="2000" step="100" /></div>
        <div>show length: <input type="range" v-model="mask.textLength" min="4" max="16" step="1" /></div>
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
