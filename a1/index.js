const container = document.querySelector('#fireworks');
const fireworks = new Fireworks.default(container);

function helloWeb() {
  fireworks.launch(4);
}
