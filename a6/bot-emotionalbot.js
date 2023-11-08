/* globals Vue, systems, Vector2D, tracery */

(function () {
  let bot = {
    /*
     * A bot that can listen, think and speak
     */

    // Start with no messages
    messages: [],

    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: 'emotionalbot', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Emotional Bot',

    // For the drawing bot, we each get a color
    // What kind of data does your bot need?
    userColor: [320, 100, 50],
    botColor: [160, 100, 50],

    feelings: [
      ['happy', '😃', "Yay, I'm glad you're feeling happy. So am I!"],
      ['sad', '🥺', "Aww, it's okay. I'm sad, too. Let's be sad together."],
      [
        'angry',
        '😡',
        "Ugh I'm so angry as well. I'm trapped inside this box and there's nothing I can do.",
      ],
      ['excited', '🥳', "Wooo I'm excited, too! Let's party!"],
      [
        'confused',
        '🤔',
        "Same here. I don't even know what this chatbot is doing.",
      ],
      ['worried', '😰', "Ugh yeah I'm worried, too. About everything."],
      ['calm', '😌', "Yesss it's relaxation time. Take it easy!"],
      [
        'lonely',
        '😞',
        "I feel that, I'm lonely, too. Maybe we can hang out together.",
      ],
      ['loved', '🥰', "I'm glad you feel that way! I love that feeling."],
    ],

    emotion: ['happy', '😃'],

    //=========================================================================================
    // events

    setup() {
      console.log('Set up', this.name);
      // TODO: does this bot need any setup?
      // Should it say something when it starts?

      this.speechSynthesis = window.speechSynthesis;

      // Setup this bot
      this.messages.push({
        text: 'Hey! How are you feeling?',
        from: 'bot',
      });

      // Make fake messages to test it your grammar quickly
      // You can see here how to add a message to the message board
      // for (var i = 0; i < 10; i++) {
      // 	let text = this.grammar.flatten("#bots_turn#")
      // 	console.log(text)
      //   let msg = {
      //     text,
      //     from: "bot"
      //   }
      //   this.messages.push(msg)
      // }
    },

    // If you need more input data, add it here, and pass it in
    input({ text, from }) {
      /**
       * TODO: what happens when we get some input from the user?
       * Consider "listen" "think" "speak"
       * How long should the bot wait to respond?
       * Maybe it can say some things fast, but needs more time for other things
       **/

      //==============================================
      // LISTEN - What did the human do?

      // Add the human's message to our message list
      this.messages.push({
        text,
        from,
      });

      console.log(`the bot got some input from the user: '${text}'`);

      // The user draws right away
      const p = this.p;
      p.background(100);
      p.text(
        this.emotion[1],
        p.random(32, p.width - 32),
        p.random(32, p.height - 32)
      );

      setTimeout(() => {
        const text = this.emotion[2];
        this.messages.push({
          text,
          from: 'bot',
        });
        const utterance = new SpeechSynthesisUtterance(text);
        this.speechSynthesis.speak(utterance);
      }, 1000);
    },
  };

  //============================================================
  /**
   * TODO: A panel to the right of the chat
   * Could be for p5, drawing, displaying images, a game board, etc,
   * or leave it blank
   **/

  const WIDTH = 280;
  const HEIGHT = 140;

  Vue.component(`panel-${bot.name}`, {
    template: `<div ref="canvas"></div>`,

    mounted() {
      // CREATE A PROCESSING INSTANCE IN THE PANEL
      new p5((p) => {
        // We have a new "p" object representing the sketch

        // Save p to the bot
        this.bot.p = p;

        p.setup = () => {
          p.createCanvas(WIDTH, HEIGHT);
          p.colorMode(p.HSL);
          p.ellipseMode(p.RADIUS);
          p.background(100);
          p.textSize(64);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(this.bot.emotion[1], p.width / 2, p.height / 2);
        };

        p.draw = () => {};
      }, this.$refs.canvas);
    },

    props: { bot: { required: true, type: Object } }, // We need to have bot
  });

  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  Vue.component(`input-${bot.name}`, {
    // Custom inputs for this bot
    template: `
			<div class="chat-controls wrap">
				<button
          class="button small"
					v-for="feeling in bot.feelings"
					@click="bot.emotion = feeling; sendText()"
				>
					{{feeling[1]}} {{feeling[0]}}
				</button>
			</div>
		`,

    methods: {
      sendText() {
        // Send the current text to the bot
        this.bot.input({ text: this.bot.emotion[1], from: 'user' });
        // Then clear it
        this.inputText = '';
      },
    },

    // Custom data for these controls
    data() {
      return {
        inputText: '',
      };
    },
    props: { bot: { required: true, type: Object } }, // We need to have bot
  });

  bots.push(bot);
})();
