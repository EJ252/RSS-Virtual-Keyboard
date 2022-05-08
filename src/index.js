const Keyboard = {
  elements: {
    main: null,
    keyboardBody: null,
    keys: [],
    inputKeys: [],
  },

  properties: {
    shift: 0,
    capslock: null,
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
    this.elements.keyboardBody.appendChild(this._createKeys(localStorage.languageNow, this.properties.shift));

    this.elements.keys = this.elements.keyboardBody.querySelectorAll('.keyboard__key');
    ////////////////////
    this.elements.inputKeys = this.elements.keyboardBody.querySelectorAll('.keyboard__key:not(.keyboard__special)');
    this.properties.capslock = this.elements.keyboardBody.querySelector('.keyboard__caps-lock'); //capslock

//////////////
    this.elements.main.appendChild(this.elements.keyboardBody);
    document.body.appendChild(this.elements.main);

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerText = 'Switch language: left ctrl + left alt \n App created in Windows 10';
    document.body.appendChild(info);

    const area = document.body.querySelector('.text-area');
    document.body.addEventListener('keyup', (e) => {
      //console.log(e)
      if (e.key.length < 3 && this.keyCodeArr.includes(e.code)) {
        console.log(e.key);
        
        area.value += e.key;
      } 
    });

    for (let i = 0; i < this.elements.inputKeys.length; i++) {
      this.elements.inputKeys[i].addEventListener('click', () => {
        console.log(this.elements.inputKeys[i].innerText);
        area.value += this.elements.inputKeys[i].innerText;
      })
    } 

    this.changeLang('ControlLeft', 'AltLeft'); //call language change function
  },
  _createKeys(lang, shift) {
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
    
      keyLayout = keyLayout.map(x => x.toLowerCase());

    const keyLayoutSpecial = keyLayout.filter(key => key.length > 1 && key !== 'caps lock' && key !== 'shift ');


    keyLayout.forEach(x => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      const arrow = ['left', 'up', 'down', 'right'].indexOf(x) === -1;
      if (arrow) keyElement.textContent = x; // add text in button from keyLayout

      fragment.appendChild(keyElement);

      if(keyLayoutSpecial.includes(x) || x === '\\') keyElement.classList.add(`keyboard__${x}`, 'keyboard__special');

      if(x === 'caps lock') { 
        keyElement.classList.add('keyboard__caps-lock', 'keyboard__key-light', 'keyboard__special');
        
      }

      if(x === 'shift ') keyElement.classList.add('keyboard__shiftR', 'keyboard__special');

    });

    return fragment;

  },

  changeKeys(lang, shift) {
    let keyLayout;
    if (lang !== 'rus') {
      if (shift === 0) {
        this.properties.shift = 1;
        keyLayout = [
          '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 
          'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 
          'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', `"`, 
          'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '/'
        ];
      }
  
      if(shift === 1) {
        this.properties.shift = 0;

        keyLayout = [
          '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 
          'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 
          'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', `'`, 
          'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?'
        ];
        keyLayout = keyLayout.map(x => x.toLowerCase());
      }
    }

    if (lang === 'rus') {
      if(shift === 0) {
        this.properties.shift = 1;  
        keyLayout = [
          'ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 
          'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
          'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`,
          'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ','
        ]; 
      }  
      
      if (shift === 1) {
        this.properties.shift = 0;  
        keyLayout = [
          'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 
          'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
          'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`,
          'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.'
        ]; 
        keyLayout = keyLayout.map(x => x.toLowerCase());
      }
    }

    console.log('changeKey is working');
    for (let i = 0; i < keyLayout.length; i++) {
      this.elements.inputKeys[i].innerText = keyLayout[i];
    }

  },

  changeLang() {
    let pressed = new Set();
    document.addEventListener('keydown', (event) => {
      pressed.add(event.code);

      for (let key of arguments) {
        if (!pressed.has(key)) return;
      }

      let keyLayout;

      if (localStorage.languageNow === 'rus') {
        localStorage.languageNow = 'eng';
        if (this.properties.shift === 1) {
          keyLayout = [
            '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', `"`, 
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '/'
          ];
        } else {
          keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', `'`, 
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?'
          ];
          keyLayout = keyLayout.map(x => x.toLowerCase());
        }

      } else {
        localStorage.languageNow = 'rus';
        if (this.properties.shift === 1) {
          keyLayout = [
            'ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 
            'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
            'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`,
            'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ','
          ]; 
        } else {
          keyLayout = [
            'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 
            'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
            'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`,
            'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.'
          ]; 
          keyLayout = keyLayout.map(x => x.toLowerCase());
        }
      }
      for (let i = 0; i < keyLayout.length; i++) {
        this.elements.inputKeys[i].innerText = keyLayout[i];
      } 
    });

    document.addEventListener('keyup', (event) => pressed.delete(event.code));
  },

  toggleShift() {
    this.properties.capslock.addEventListener('click', () => {
      if (this.properties.shift === 0) { 
        this.properties.shift = 1;
      } else {
        this.properties.shift = 0;
      }
      console.log('toggle');
    });
  },
};
window.addEventListener('DOMContentLoaded', Keyboard.init());
document.addEventListener('click', () => Keyboard.changeKeys(localStorage.languageNow, Keyboard.properties.shift));