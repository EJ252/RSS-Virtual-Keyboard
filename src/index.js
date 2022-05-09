const Keyboard = {
  elements: {
    h1: null,
    textareaTag: null,
    main: null,
    info: null,
    keyboardBody: null,
    keys: [],
    inputKeys: [],
    textarea: '',
    click: new Event('click'),
    keyLayoutCurrent: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
      'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
  },

  properties: {
    shift: 0,
    capslock: 0,
  },

  keyCodeArr: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'Delete',
  ],
  keyCodeArrShort: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
    'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight',
    'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote',
    'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
  ],

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keyboardBody = document.createElement('div');
    this.elements.h1 = document.createElement('H1');
    this.elements.textareaTag = document.createElement('textarea');
    this.elements.info = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keyboardBody.classList.add('keyboard__body');
    this.elements.textareaTag.classList.add('text-area');
    this.elements.info.classList.add('info');
    this.elements.keyboardBody.appendChild(this.createKeys(localStorage.languageNow));

    this.elements.keys = this.elements.keyboardBody.querySelectorAll('.keyboard__key');

    this.elements.inputKeys = this.elements.keyboardBody.querySelectorAll('.keyboard__key:not(.keyboard__special)');

    this.elements.main.appendChild(this.elements.keyboardBody);
    document.body.appendChild(this.elements.h1);
    document.body.appendChild(this.elements.textareaTag);
    document.body.appendChild(this.elements.main);
    document.body.appendChild(this.elements.info);

    this.elements.h1.innerText = 'RSS Virtual Keyboard';
    this.elements.info.innerText = 'Switch language: left ctrl + left alt \n App created in Windows 10';

    this.elements.textarea = document.body.querySelector('.text-area');

    document.body.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (this.keyCodeArrShort.includes(e.code)) {
        const newSymbol = this.elements.keyLayoutCurrent[this.keyCodeArrShort.indexOf(e.code)];
        this.addSymbol(newSymbol);
      }
    });

    for (let i = 0; i < this.elements.inputKeys.length; i += 1) {
      this.elements.inputKeys[i].addEventListener('click', () => {
        const newSymbol = this.elements.inputKeys[i].innerText;
        this.addSymbol(newSymbol);
      });
    }

    this.changeLang();
    this.toggleShift();
    this.toggleCaps();
    this.specialKeys();
    this.getAnimation();
  },
  createKeys(lang) {
    this.elements.keyboardBody.innerHTML = '';
    const fragment = document.createDocumentFragment();
    let keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
      'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?', 'shift ',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'up', 'down', 'right', 'del',
    ];

    if (lang === 'rus') {
      keyLayout = [
        'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\',
        'caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
        'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'shift ',
        'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'up', 'down', 'right', 'del',
      ];
    }

    keyLayout = keyLayout.map((x) => x.toLowerCase());

    const keyLayoutSpecial = keyLayout.filter((key) => key.length > 1 && key !== 'caps lock' && key !== 'shift ');

    keyLayout.forEach((x) => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      const arrow = ['left', 'up', 'down', 'right'].indexOf(x) === -1;
      if (arrow) keyElement.textContent = x; // add text in button from keyLayout

      fragment.appendChild(keyElement);

      if (keyLayoutSpecial.includes(x) || x === '\\') keyElement.classList.add(`keyboard__${x}`, 'keyboard__special');

      if (x === 'caps lock') {
        keyElement.classList.add('keyboard__caps-lock', 'keyboard__key-light', 'keyboard__special');
      }

      if (x === 'shift ') keyElement.classList.add('keyboard__shiftR', 'keyboard__special');
    });

    return fragment;
  },

  toggleShift() {
    const shiftKey = this.elements.keyboardBody.querySelector('.keyboard__shift'); // shift
    const shiftKeyR = this.elements.keyboardBody.querySelector('.keyboard__shiftR'); // shiftR
    const mouseUpEvent = new Event('mouseup');
    const mouseDownEvent = new Event('mousedown');
    let status = false;
    let repeatL;
    let repeatR;

    const func = () => {
      if (status === true) {
        status = false;
        if (this.properties.shift === 0) {
          this.properties.shift = 1;
        } else {
          this.properties.shift = 0;
        }
        this.changeInner(localStorage.languageNow, this.properties.shift, this.properties.capslock);
      }
    };

    const funcReverse = () => {
      if (status === false) {
        status = true;
        if (this.properties.shift === 1) {
          this.properties.shift = 0;
        } else {
          this.properties.shift = 1;
        }
        this.changeInner(localStorage.languageNow, this.properties.shift, this.properties.capslock);
      }
    };

    document.body.addEventListener('keyup', (e) => {
      if (e.code === 'ShiftLeft') shiftKey.dispatchEvent(mouseUpEvent);
      if (e.code === 'ShiftRight') shiftKeyR.dispatchEvent(mouseUpEvent);
      if (repeatL === true) shiftKey.classList.remove('animation-start');
      if (repeatR === true) shiftKeyR.classList.remove('animation-start');
    });

    document.body.addEventListener('keydown', (e) => {
      if (e.code === 'ShiftLeft') {
        repeatL = e.repeat;
        shiftKey.dispatchEvent(mouseDownEvent);
      }
      if (e.code === 'ShiftRight') {
        repeatR = e.repeat;
        shiftKeyR.dispatchEvent(mouseDownEvent);
      }
    });

    [shiftKey, shiftKeyR].forEach((x) => {
      x.addEventListener('mouseup', () => {
        func();
      });

      x.addEventListener('mousedown', () => {
        funcReverse();
      });
    });
  },

  changeLang(param = ['ControlLeft', 'AltLeft']) {
    const pressed = new Set();
    document.addEventListener('keydown', (event) => {
      pressed.add(event.code);

      for (let i = 0; i < param.length; i += 1) {
        if (!pressed.has(param[i])) return;
      }

      if (localStorage.languageNow === 'rus') {
        localStorage.languageNow = 'eng';
      } else {
        localStorage.languageNow = 'rus';
      }
      this.changeInner(localStorage.languageNow, this.properties.shift, this.properties.capslock);
    });
    document.addEventListener('keyup', (event) => pressed.delete(event.code));
  },

  toggleCaps() {
    const capslock = this.elements.keyboardBody.querySelector('.keyboard__caps-lock'); // capslock
    const click = new Event('click');

    document.addEventListener('keyup', (e) => {
      if (e.code === 'CapsLock') {
        capslock.dispatchEvent(click);
      }
    });

    capslock.addEventListener('click', () => {
      this.elements.textarea.focus();

      if (this.properties.capslock === 0) {
        this.properties.capslock = 1;
      } else {
        this.properties.capslock = 0;
      }
      this.changeInner(localStorage.languageNow, this.properties.shift, this.properties.capslock);
      capslock.classList.toggle('keyboard__key-light_active');
      capslock.classList.add('animation');
    });

    function AnimationHandler() {
      capslock.classList.remove('animation');
    }
    capslock.addEventListener('animationend', AnimationHandler, false);
  },

  getAnimation() {
    const animation = (x) => {
      x.classList.add('animation');
      function AnimationHandler() {
        x.classList.remove('animation');
      }
      x.addEventListener('animationend', AnimationHandler, false);
    };

    this.elements.keys.forEach((x) => {
      if (x.classList.contains('keyboard__shift', 'keyboard__shiftR')) {
        x.addEventListener('click', () => animation(x));
        return;
      }
      x.addEventListener('mousedown', () => animation(x));
    });

    document.addEventListener('keydown', (e) => {
      if (this.keyCodeArr.includes(e.code)) {
        const x = this.keyCodeArr.indexOf(e.code);
        this.elements.keys[x].classList.add('animation-start');
      }
    });

    document.addEventListener('keyup', (e) => {
      if (this.keyCodeArr.includes(e.code)) {
        const x = this.keyCodeArr.indexOf(e.code);
        this.elements.keys[x].classList.remove('animation-start');
        animation(this.elements.keys[x]);
      }
    });
  },

  changeInner(lang, shift, caps) {
    let keyLayout;
    if (lang !== 'rus') {
      if (shift === 0) {
        if (caps === 0) {
          keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?',
          ];
          keyLayout = keyLayout.map((x) => x.toLowerCase());
        } else {
          keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?',
          ];
        }
      } else if (caps === 0) {
        keyLayout = [
          '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
          'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}',
          'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"',
          'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '/',
        ];
      } else {
        keyLayout = [
          '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
          'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}',
          'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"',
          'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '/',
        ];
        keyLayout = keyLayout.map((x) => x.toLowerCase());
      }
    }
    if (lang === 'rus') {
      if (shift === 0) {
        if (caps === 0) {
          keyLayout = [
            'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
            'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
            'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
            'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.',
          ];
          keyLayout = keyLayout.map((x) => x.toLowerCase());
        } else {
          keyLayout = [
            'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
            'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
            'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
            'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.',
          ];
        }
      } else if (caps === 0) {
        keyLayout = [
          'Ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
          'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
          'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
          'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',',
        ];
      } else {
        keyLayout = [
          'Ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
          'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
          'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
          'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',',
        ];
        keyLayout = keyLayout.map((x) => x.toLowerCase());
      }
    }

    for (let i = 0; i < keyLayout.length; i += 1) {
      this.elements.inputKeys[i].innerText = keyLayout[i];
    }
    this.elements.keyLayoutCurrent = keyLayout;
  },

  specialKeys() {
    const tabKey = this.elements.keyboardBody.querySelector('.keyboard__tab');
    const enterKey = this.elements.keyboardBody.querySelector('.keyboard__enter');
    const spaceKey = this.elements.keyboardBody.querySelector('.keyboard__space');
    const backspaceKey = this.elements.keyboardBody.querySelector('.keyboard__backspace');
    const delKey = this.elements.keyboardBody.querySelector('.keyboard__del');
    const arrowLeftKey = this.elements.keyboardBody.querySelector('.keyboard__left');
    const arrowUpKey = this.elements.keyboardBody.querySelector('.keyboard__up');
    const arrowDownKey = this.elements.keyboardBody.querySelector('.keyboard__down');
    const arrowRightKey = this.elements.keyboardBody.querySelector('.keyboard__right');

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Tab') {
        tabKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'Enter') {
        enterKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'Space') {
        spaceKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'Backspace') {
        backspaceKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'Delete') {
        delKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'ArrowLeft') {
        arrowLeftKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'ArrowUp') {
        arrowUpKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'ArrowDown') {
        arrowDownKey.dispatchEvent(this.elements.click);
      }
      if (e.code === 'ArrowRight') {
        arrowRightKey.dispatchEvent(this.elements.click);
      }
    });

    tabKey.addEventListener('click', () => {
      this.addSymbol('\t');
    });

    enterKey.addEventListener('click', () => {
      this.addSymbol('\n');
    });

    spaceKey.addEventListener('click', () => {
      this.addSymbol(' ');
    });

    backspaceKey.addEventListener('click', () => {
      this.elements.textarea.focus();
      const start = this.elements.textarea.selectionStart;
      const end = this.elements.textarea.selectionEnd;
      if (start !== end) {
        this.elements.textarea.setRangeText('', start, end);
      } else if (start > 0) {
        this.elements.textarea.setRangeText('', start - 1, end);
      }
    });

    delKey.addEventListener('click', () => {
      this.elements.textarea.focus();
      const start = this.elements.textarea.selectionStart;
      const end = this.elements.textarea.selectionEnd;
      if (start !== end) {
        this.elements.textarea.setRangeText('', start, end);
      } else if (end < this.elements.textarea.value.length) {
        this.elements.textarea.setRangeText('', start, end + 1);
      }
    });

    arrowLeftKey.addEventListener('click', () => {
      this.addSymbol('◄');
    });
    arrowUpKey.addEventListener('click', () => {
      this.addSymbol('▲');
    });
    arrowDownKey.addEventListener('click', () => {
      this.addSymbol('▼');
    });
    arrowRightKey.addEventListener('click', () => {
      this.addSymbol('►');
    });
  },

  addSymbol(newSymbol) {
    const start = this.elements.textarea.selectionStart;
    const end = this.elements.textarea.selectionEnd;
    this.elements.textarea.focus();

    this.elements.textarea.setRangeText(newSymbol, start, end, 'start');
    this.elements.textarea.selectionStart += 1;
    this.elements.textarea.selectionEnd = this.elements.textarea.selectionStart;
  },
};
window.addEventListener('DOMContentLoaded', Keyboard.init());
