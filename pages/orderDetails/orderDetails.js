import { Page } from '/util/ix';
import utils from '/util/utils';
Page({
  data: {
    orderId: "",
    data: {

    },
    money: 100,
    waterMoney: 100,
    waterSMoney: 100
  },
  onLoad(query) {
    console.log("query", query);
    this.data.orderId = query.orderId;
  },
  onShow() {

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
  //打印机打印
  print() {
    let printTime = utils.format(new Date(),"yyyy-MM-dd hh:ss");
    my.ix.printer({
      cmds: [{ 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'ON'] },
      { 'cmd': 'addSelectJustification', 'args': ['CENTER'] },
      { 'cmd': 'addText', 'args': ['支付包'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['单号：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': [this.data.orderId] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      { 'cmd': 'addSelectJustification', 'args': ['CENTER'] }, /*设置打印居中对齐*/
      { 'cmd': 'addStoreQRCodeDataGB18030', 'args': ['http://www.baidu.com'] }, /*设置qrcode内容*/
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //下单时间
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['下单时间：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': ['2019-06-18'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //状态
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['状态：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': ['支付成功'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //总金额
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['总金额：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': ['100'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //实收金额
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['实收金额：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': ['100'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //支付账号：
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['支付账号：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': ['支付宝'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //支付时间
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['支付时间：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': ['2019-06-18'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      //打印时间
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
      { 'cmd': 'addText', 'args': ['支付账号：'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addText', 'args': [printTime] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },
      ],
      
      

      

      success: (r) => {
        console.log("success");
      },
      fail: (r) => {
        console.log("fail, errorCode:" + r.error);
      }
    });
  }
});
