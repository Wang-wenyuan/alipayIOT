App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    my.ix.speech({
      text: '欢迎使用支付宝',
      success: (r) => {
      }
    });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    console.log("进入show页面");
    
  },
  //授权
  authCode() {
  }
});
