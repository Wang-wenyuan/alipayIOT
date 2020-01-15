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
    modalOpened: false
  },
  onLoad() { 
    this.setData({
          "modalOpened": false
        });
        this.data.modalOpened = false;
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
        //返回上一级
        this.setData({
          "modalOpened": false
        });
        this.data.modalOpened = false;
        my.reLaunch({
          url: '../index/index'
        });
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
        this.data.modalOpened = true;
        this.setData({
          "modalOpened": true
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
  //开始交班
  startJiaoBan() {
    this.setData({
      "modalOpened": false
    });
    my.navigateTo({
      url: "../successionAndSettlement/successionAndSettlement"
    });
  },
  //查看记录
  lookJieSuan() {
    this.setData({
      "modalOpened": false
    });
    my.navigateTo({
      url: "../billingInfo/billingInfo"
    });
  },
  onModalClick21() {
    this.setData({
      "modalOpened": false
    });
  },
  //页面关闭
  onUnload() {
    console.log("页面关闭");
    this.setData({
      "modalOpened": false
    });
    this.data.modalOpened = false;
  }

});
