var _keyEventListener;

export default class ix {
  static Page(page) {
    page._onShow = page.onShow;
    page.onShow = (...args) => {
      if (!_keyEventListener) {
        my.ix.onKeyEventChange(_keyEventListener = (r) => {
          let current = getCurrentPages().slice(-1)[0];
          if (current && current.onKeyPress)
            current.onKeyPress.call(current, r);
        });
      }
      if (page._onShow) {
        let current = getCurrentPages().slice(-1)[0];
        page._onShow.call(current, ...args);
      }
    };
    page._onHide = page.onHide;
    page.onHide = (...args) => {
      if (_keyEventListener) {
        my.ix.offKeyEventChange();
        _keyEventListener = null;
      }
      if (page._onHide) {
        let current = getCurrentPages().slice(-1)[0];
        page._onHide.call(current, ...args);
      }
    };
    return Page(page);
  }
}