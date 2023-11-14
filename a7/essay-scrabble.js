/* globals Vue, p5 */

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// A reusable component for pokemon names in a little div
Vue.component('scrabble-piece', {
  template: `
    <div class="scrabble-piece">
      <p class="letter">{{letter.letter?.toUpperCase()}}</p>
      <p class="points">{{letter?.points}}</p>
    </div>
  `,
  props: ['letter'],
});

// Component for the pokemon essay
Vue.component('essay-scrabble', {
  template: `	
    <article>
      <section v-if="true">
        <div class="viz">
          <scrabble-piece
            v-for="letter in textToScrabble('scrabble').data"
            :letter="letter"
          />
        </div>
        <p>
          Scrabble is a word game where players form words on a game board using letter tiles. Each player starts with a set number of tiles and takes turns forming words on the board. Each tile is assigned a specific point value, and players accumulate points based on the letters they use and the placement of their words. The game ends when all tiles have been played or when no more words can be formed. The player with the highest score at the end wins. Limited quantities of certain letters, like the coveted blank tiles, affect the likelihood of forming specific words. Players must balance their tile choices strategically to maximize their scores and improve their chances of creating meaningful words.
        </p>
      </section>

      <section v-if="true">
        <div class="viz">
          <div class="showcase">
            <scrabble-piece
              :letter="currentLetter"
            />
            <div class="letter-info">
              <p>POINTS</p>
              <div class="value">
                <div class="point" v-for="n in currentLetter.points"></div>
              </div>
            </div>

            <div class="letter-info">
              <p>TILES</p>
              <div class="value">
                <div class="tile" v-for="n in currentLetter.tiles"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="button-container">
          <button
            class="button letter"
            :class="{ active: currentLetter.letter === letter }"
            v-for="letter in alphabet"
            @click="currentLetter = textToScrabble(letter).data[0]"
          >
            {{letter.toUpperCase()}}
          </button>
        </div>
        <p>
          Scrabble features letter tiles with individual point values and quantities. Each tile carries a distinct point value, which ranges from 1 to 10, representing its relative difficulty in gameplay. Moreover, the game box contains a specific number of tiles for each letter. These factors greatly influence scores and word possibilities. High-value tiles, such as "Q" and "Z," contribute more points, while common letters like "E" and "S" have lower values.
        </p>
      </section>
      
       
      <!-- SECTION#3 A bar graph of each type -->
      <section>
        <div class="viz">
          <scrabble-piece v-for="letter in textInputScrabble?.data" :letter="letter" />
          <div class="word-info">
            <p class="wi-key">POINTS</p>
            <p class="wi-value">
              {{textInputScrabble?.points || 0}}
            </p>
            <p class="wi-key">CHANCE</p>
            <p class="wi-value">
              {{((textInputScrabble?.chance || 1) * 100).toFixed(12)}}%
            </p>
          </div>
        </div> 

        <input
          type="text"
          class="text-input"
          @keyup.enter="sendText"
          :value="textInput"
          @input="handleInput($event.target.value)"
          placeholder="Scrabble word..."
        />

        <p>
        </p>
        <p>
          In Scrabble, the combination of point values, tile quantities, and individual word knowledge creates an exciting blend of skill and chance. Players must balance their understanding of word formations, strategic placement, and tile distribution to optimize their scores. While luck plays a role in the tiles drawn, seasoned players can mitigate these chance elements by employing clever tactics and utilizing their vocabulary skills. Scrabble provides a dynamic and intellectually stimulating experience that rewards both strategic thinking and linguistic abilities.
        </p>
      </section>
    </article>`,

  methods: {
    handleInput(text) {
      text = text.replace(/[^a-z]/gi, '');
      this.textInput = text;
      this.textInputScrabble = this.textToScrabble(text);
    },

    textToScrabble(text) {
      let points = 0;
      let chance = 1;
      const data = text
        .toLowerCase()
        .split('')
        .map((letter) => {
          const p = this.scrabble.letters?.[letter]?.points || 0;
          const t = this.scrabble.letters?.[letter]?.tiles || 0;
          points += p;
          chance *= t / this.tileSum;
          return {
            letter,
            points: p,
            tiles: t,
          };
        });
      return {
        data,
        points,
        chance,
      };
    },
  },

  data() {
    // LOAD SOME LOCAL JSON DATA
    // Fetch the JSON data from the URL
    var scrabbleUrl = 'data/scrabble.json';
    fetch(scrabbleUrl)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Now 'data' is a JavaScript object containing the parsed JSON data
        console.log(data);
        // THIS RUNS AFTER THE DATA FUNCTION ENDS SO I CANT PASS STUFF BACK
        // I have pokemon data now, I'm adding it to the list
        this.scrabble = data;
        this.currentLetter = this.textToScrabble('a').data[0];
        this.tileSum = Object.values(this.scrabble.letters).reduce(
          (acc, letter) => acc + letter.tiles,
          0
        );
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });

    return {
      selectedType: 'normal',
      scrabble: {},
      currentLetter: {},
      textInput: '',
      textInputScrabble: {},
    };
  },
});
