'use babel';

export default class BlockDecoration {
  constructor(message) {
    this.element = document.createElement('div');
    this.element.classList.add('decorationToolkit-decoration');
    this.element.classList.add('decorationToolkit-block');
    this.element.textContent = message;
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
