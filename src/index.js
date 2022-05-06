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
    this.elements.keyboardBody.appendChild(this._createKeys());

    this.elements.main.appendChild(this.elements.keyboardBody);
    document.body.appendChild(this.elements.main);


  },
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 
      'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', `'`, 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?', 'shift ',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'up', 'down', 'right', 'del'
    ];
    
    const keyLayoutSpecial = keyLayout.filter(key => key.length > 1 && key !== 'caps lock' && key !== 'shift ');


    keyLayout.forEach(x => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      const arrow = ['left', 'up', 'down', 'right'].indexOf(x) === -1;
      if (arrow) keyElement.textContent = x; // add text in button from keyLayout

      fragment.appendChild(keyElement);

      if(keyLayoutSpecial.includes(x) || x === '\\') keyElement.classList.add(`keyboard__${x}`, 'keyboard__special');

      if(x === 'caps lock') keyElement.classList.add('keyboard__caps-lock', 'keyboard__key-light', 'keyboard__special');

      if(x === 'shift ') keyElement.classList.add('keyboard__shiftR', 'keyboard__special');

    });

    return fragment;

  },
};
window.addEventListener('DOMContentLoaded', Keyboard.init());
