export default class ix {
  static Page(page) {
    ['onShow', 'onHide', 'onUnload'].forEach((f) => {
      const raw = page[f];
      page[f] = (...args) => {
        if (f === 'onShow') {
          if (!page._keyEventListener) {
            my.ix.onKeyEventChange(page._keyEventListener = (r) => {
              let cur = getCurrentPages().slice(-1)[0];
              if (cur && cur.onKeyPress)
                cur.onKeyPress.call(cur, r);
            });
          }
        } else if (f === 'onHide' || f === 'onUnload') {
          if (page._keyEventListener) {
            my.ix.offKeyEventChange(page._keyEventListener);
            page._keyEventListener = null;
          }
        }
        if (raw instanceof Function) {
          let cur = getCurrentPages().slice(-1)[0];
          raw.call(cur, ...args);
        }
      };
    });
    return Page(page);
  }
}