const Keyboard = {
  elements: {
    main: null,
    keyboardBody: null,
    keys: [],
    keysSpecial: [],
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keyboardBody = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keyboardBody.classList.add('keyboard__body');

    this.elements.main.appendChild(this.elements.keyboardBody);
    document.body.appendChild(this.elements.main);


  }
};
window.addEventListener('DOMContentLoaded', Keyboard.init());
