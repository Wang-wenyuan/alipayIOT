import { Page } from '/util/ix';
Page({
  data: {
    orderId:"",
    data:{
     
    },
     money:100,
      waterMoney:100,
      waterSMoney:100
  },
  onLoad(query) {
    console.log("query",query);
    this.data.orderId = query.orderId;
  },
  onShow(){
    
    //进行查询
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
        break;
    }
    console.log('KeyEvent', r);
  },
});
