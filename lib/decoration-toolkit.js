'use babel';

import { CompositeDisposable } from 'atom';
import BlockDecoration from './block-decoration';

export default {
  markers: null,
  count: 0,
  subscriptions: null,

  activate() {
    this.markers = [];
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'decoration-toolkit:add-decoration': () => this.addBlockDecoration(),
    }));
  },

  deactivate() {
    for (const marker of this.markers) {
      marker.destroy();
    }
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  addBlockDecoration() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    }

    for (const selectionRange of editor.getSelectedBufferRanges()) {
      const item = new BlockDecoration(`decoration #${this.count}`);

      const marker = editor.markBufferRange(selectionRange, {invalidate: 'never', exclusive: true});
      editor.decorateMarker(marker, {
        type: 'block',
        position: 'after',
        item,
      });

      this.markers.push(marker);
      this.count++;
    }
  }

};
