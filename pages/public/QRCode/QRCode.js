Page({
  data: {
    code:""
  },
  onLoad(query) {
    console.log("url参数", query);
    this.data.code = query.code;
    this.createCode();
  },
  //创建二维码
  createCode() {
    if (my.canIUse('ix.generateImageFromCode')) {
      my.ix.generateImageFromCode({
        code: this.data.code,
        format: 'QRCODE',
        width: 200,
        correctLevel: 'H',
        success: (r) => {
          console.log(JSON.stringify(r));
          this.setData({ qrcode: r.image });
        }
      });
    }
  }
});
