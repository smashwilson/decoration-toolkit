'use babel';

import DecorationToolkitView from './decoration-toolkit-view';
import { CompositeDisposable } from 'atom';

export default {

  decorationToolkitView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.decorationToolkitView = new DecorationToolkitView(state.decorationToolkitViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.decorationToolkitView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'decoration-toolkit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.decorationToolkitView.destroy();
  },

  serialize() {
    return {
      decorationToolkitViewState: this.decorationToolkitView.serialize()
    };
  },

  toggle() {
    console.log('DecorationToolkit was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
