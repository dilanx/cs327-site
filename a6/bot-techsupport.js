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
    name: 'techsupport', // Lowercase only no spaces! (we reuse this for some Vue stuff)
    displayName: 'Tech Support',

    // Make your own grammar for this bot, use GPT to help, or watch a tutorial!
    grammar: new tracery.Grammar({
      greetingStart: ['Hello', 'Hi', 'Hey', 'Greetings', 'Good day'],
      greetingProblem: [
        'What can I help you with?',
        'How can I help you?',
        'What seems to be the problem?',
        'How can I help you today?',
        'What do you need help with?',
      ],
      greeting: "#greetingStart#! I'm tech support. #greetingProblem#",

      farewellAdj: [
        'good',
        'great',
        'awesome',
        'fantastic',
        'wonderful',
        'lovely',
        'pleasant',
        'perfect',
        'beautiful',
        'glorious',
        'joyous',
        'cheerful',
      ],
      farewell: [
        'Have a #farewellAdj# day!',
        'I hope your day is #farewellAdj#!',
        'I wish you a #farewellAdj# day!',
      ],
    }),

    // What kind of data does your bot need?
    // this bot can count so it needs a number
    number: 1,

    devices: ['computer', 'desktop', 'laptop', 'watch', 'phone', 'headphones'],
    problems: [
      'broke',
      'not working',
      'not turning on',
      'not charging',
      'not connecting',
      'not connecting to wifi',
      'not connecting to bluetooth',
      'not connecting to internet',
      'not connecting to network',
      'not connecting to printer',
      'not connecting to speakers',
      'not connecting to headphones',
      'not connecting to monitor',
      'not connecting to keyboard',
      'not connecting to mouse',
      'not connecting to display',
      'not connecting to tv',
      'not connecting to screen',
    ],

    supervisors: ['supervisor', 'senior supervisor', 'ceo'],

    stage: 0,
    supervisorLevel: 0,

    memory: {},

    //=========================================================================================
    // events

    setup() {
      console.log('Set up', this.name);
      // TODO: does this bot need any setup?
      // Should it say something when it starts?

      // Setup this bot
      this.messages.push({
        text: this.grammar.flatten('#greeting#'),
        from: 'bot',
      });
    },

    countUp() {
      // A custom method for this bot
      // The bot counts and says its new number
      this.number += 1;
      this.messages.push({
        text: 'number is ' + this.number,
        from: 'bot',
      });
    },

    async wait(time) {
      await new Promise((resolve) => setTimeout(resolve, time));
    },

    async say(message) {
      // wait a little bit
      await this.wait(1000);
      this.messages.push({
        text: message,
        from: 'bot',
      });
    },

    // If you need more input data, add it here, and pass it in
    async input({ text, from }) {
      /**
       * TODO: what happens when we get some input from the user?
       * Consider "listen" "think" "speak"
       * How long should the bot wait to respond?
       * Maybe it can say some things fast, but needs more time for other things
       **/

      //==============================================
      // LISTEN - What did the human do?

      // Add the human's message to our message list
      console.log(`the bot got some input from the user: '${text}'`);
      this.messages.push({
        text,
        from,
      });

      //==============================================
      // THINK - What should the bot do now?
      //  this is a good time to pretend that you (the bot) are thinking deeply
      //  - even if you are faking it -- artificial intelligence is theater
      // Maybe you need a call to HuggingFace to decide what to do?

      if (this.stage === 0) {
        for (const device of this.devices) {
          if (text.includes(device)) {
            this.memory.device = device;
            break;
          }
        }

        if (!this.memory.device) {
          await this.say(
            `Sorry, I don't understand. What device do you need help with? We can help with any device that we sell, including ${this.devices.join(
              ', '
            )}.`
          );
          return;
        }

        for (const problem of this.problems) {
          if (text.includes(problem)) {
            this.memory.problem = problem;
            break;
          }
        }

        if (!this.memory.problem) {
          await this.say(
            `What's wrong with your ${this.memory.device}? Say something like "My ${this.memory.device} is not working".`
          );
          return;
        }

        await this.say(
          `I'm sorry to hear that your ${this.memory.device} is ${this.memory.problem}. Let's see if we can fix it.`
        );

        await this.say(`Have you tried turning it off and on again?`);
        this.stage = 1;
        return;
      }

      if (this.stage === 1 && text.toLowerCase().startsWith('n')) {
        await this.say(
          `Ooh okay, try that then. Is your ${this.memory.device} still ${this.memory.problem}?`
        );
        this.stage = 2;
        return;
      }

      if (this.stage === 2 && text.toLowerCase().startsWith('n')) {
        await this.say(
          `Great, glad I could help. ${this.grammar.flatten('#farewell#')}`
        );
        this.stage = -1;
        return;
      }

      if (text.toLowerCase().startsWith('y')) {
        if (this.supervisorLevel >= this.supervisors.length) {
          await this.say(
            `Welp, I'm out of ideas and out of supervisors. ${this.grammar.flatten(
              '#farewell#'
            )}`
          );
          this.stage = -1;
          return;
        }
        await this.say(
          `Ah okay, the problem with your ${
            this.memory.device
          } must be quite complex. Let me grab my ${
            this.supervisors[this.supervisorLevel]
          }. Be right back!`
        );
        this.stage = -1;
        await this.wait(2000);
        await this.say(
          `Hello, my name is ${
            this.supervisors[this.supervisorLevel]
          }. What seems to be the problem?`
        );

        this.memory = {};
        this.stage = 0;
        this.supervisorLevel += 1;
        return;
      }

      if (this.stage < 0) {
        return;
      }
      await this.say(`What?`);
    },
  };

  //============================================================
  /**
   * TODO: A panel to the right of the chat
   * Could be for p5, drawing, displaying images, a game board, etc,
   * or leave it blank
   **/

  Vue.component(`panel-${bot.name}`, {
    template: `<div></div>`,

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
			<div class="chat-controls">
				<input
          @keyup.enter="sendText"
          v-model="inputText"
          placeholder="Message..."
        />
				<button class="button" @click="sendText">
					<i class="fa-solid fa-circle-right"></i>
				</button>
			</div>
		`,

    methods: {
      sendText() {
        if (!this.inputText) {
          return;
        }
        // Send the current text to the bot
        this.bot.input({ text: this.inputText, from: 'user' });
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
