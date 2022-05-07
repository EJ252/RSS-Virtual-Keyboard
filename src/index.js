const Keyboard = {
  elements: {
    main: null,
    keyboardBody: null,
    keys: [],
    keysSpecial: [],
  },

  keyCodeArr: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'Delete'
  ],

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keyboardBody = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keyboardBody.classList.add('keyboard__body');
    this.elements.keyboardBody.appendChild(this._createKeys());

    this.elements.keys = this.elements.keyboardBody.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keyboardBody);
    document.body.appendChild(this.elements.main);

    const area = document.body.querySelector('.text-area');
    document.body.addEventListener('keyup', (e) => {
      console.log(e)
      if (e.key.length < 3 && this.keyCodeArr.includes(e.code)) area.value += e.key;
      console.log(String.fromCharCode(e.key.charCodeAt()));
      if (e.code === 'ControlLeft') this.elements.keyboardBody.appendChild(this._createKeys('rus'));
    })

  },
  _createKeys(lang) {
    this.elements.keyboardBody.innerHTML = '';
    const fragment = document.createDocumentFragment();
    let keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 
      'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', `'`, 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?', 'shift ',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'up', 'down', 'right', 'del'
    ];

    if(lang === 'rus') {
      keyLayout = [
        'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 
        'caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`, 'enter',
        'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'shift ',
        'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'up', 'down', 'right', 'del'
      ]; 
    }
    
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
