import { Page } from '/util/ix';
Page({
  data: {
    list: [
      {
        icon: '/image/jiaobanAccount.png',
        text: '交班结算',
      },
      {
        icon: '',
        text: '',
      },
      {
        icon: '/image/huizongQuery.png',
        text: '汇总查询',
      },
      {
        icon: '/image/order.png',
        text: '订单流水',
      },
      {
        icon: '',
        text: '',
      },
      {
        icon: '/image/setting.png',
        text: '设置',
      }
    ],
  },
  onLoad() { },
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
        //返回上一级
        my.navigateBack();
        break;
      case 134:
        r.keyName = '设置';
        console.log("点击设置按钮");
        break;
    }
    console.log('KeyEvent', r);
  },
  //点击按钮回调
  onItemClick(ev) {
    console.log("按钮回调:", ev);
    this.data.index = ev.detail.index;
    switch (ev.detail.index) {
      case 0:
      my.navigateTo({
        url: '../billingInfo/billingInfo'
      });
        break;
      case 2:
      //汇总查询
      my.navigateTo({
        url: '../groupQuery/groupQuery'
      });
        break;
      case 3:
      //进入订单流水
      my.navigateTo({
        url: '../orderPage/orderPage'
      });
        break;
      case 5:
        //进入自定义设置页面
        my.navigateTo({
        url: '../otherSetting/otherSetting'
      });
        break;
    }
  },

});
