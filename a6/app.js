/**
 * Starter code
 *
 */
/* globals Vue, p5 */
// GLOBAL VALUES, CHANGE IF YOU WANT

const bots = [];

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  // We have all the elements, get one with id "app"

  new Vue({
    template: `
			<div id="app" :class="{['bot-' + activeBot.name]: true}">
				<select class="select" v-model="activeBot">
					<option v-for="bot in bots.filter(b=>!b.hide)" :value="bot">
            {{bot.displayName}}
          </option>
				</select>

				<component :is="'panel-' + activeBot.name" :bot="activeBot" class="panel" />

				<div class="chat-container">
					<chat-window :bot="activeBot"/>
					<component :is="'input-' + activeBot.name" :bot="activeBot" />
				</div>
			</div>
		`,
    mounted() {
      this.activeBot.setup();
    },

    watch: {
      activeBot() {
        localStorage.setItem('lastBot', this.activeBot.name);
        this.activeBot.setup();
      },
    },

    data() {
      let lastBot = localStorage.getItem('lastBot');
      // Use the last-used space, or the first if we don't have a record
      let activeBot =
        bots.find((s) => s.name === lastBot) || bots.filter((s) => !s.hide)[0];

      return {
        // Stuff that we pass to all fxns
        settings: {
          p: undefined,
          deltaTime: 0.1,
          time: 0,
        },

        activeBot,
        isPaused: false,
        bots,
      };
    },
    el: '#app',
  });
});
