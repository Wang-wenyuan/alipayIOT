import { Page } from '/util/ix';
Page({
  data: {
    money:0
  },
  onLoad(query) {
    this.data.money = query.money;
  },
  //支付宝点击事件
  aliButton(){
    my.navigateTo({ url: '../qrCode/qrCode?type=ali&money='+this.data.money })
  },
  //微信点击事件
  wecharButton(){
    my.navigateTo({ url: '../qrCode/qrCode?type=wechar&money='+this.data.money })
  },
  //回调函数
  onKeyPress(r) {
    console.log("键盘回调函数");
    switch (r.keyCode) {
      case 131:
        r.keyName = '收款';
        break;
      case 132:
        r.keyName = '刷脸';
        break;
      case 133:
        r.keyName = '取消';
        my.navigateBack();
        break;
      case 134:
        r.keyName = '设置';
        console.log("点击设置按钮");
        //跳转页面
        this.navigateToSetting();
        break;
    }
    console.log('KeyEvent', r);
  },
});
