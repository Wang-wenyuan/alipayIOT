import { Page } from '/util/ix';
import utils from '/util/utils';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    orderId: "",
    money: '',
    waterMoney: '',
    waterSMoney: '',
    outOrderId:'',
    waterEndTime:'',
    waterState:'',
    type:'pay',
    from:{
      tradeNo:'',//流水号
      refundAmount:'',//退款金额
      snNum:''
    },
    items:{}
  },
  onLoad(query) {
    console.log("query", query);
    this.data.orderId = query.orderId;
    this.data.type = query.type;
    if(this.data.type=="pay"){
      this.queryOrder();
    }else{
      this.queryRefund();
    }
    
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
  },
  //订单查询
  queryOrder() {
    bnApi.requestGet(sysConfig.apiUrl + "/api/water/findById/" + this.data.orderId).then((res) => {
      if (res.success) {
        console.log("订单查询成功", res);
        this.data.money = res.object.waterMoney;
        this.data.waterMoney = res.object.waterMoney;
        this.data.waterSMoney = res.object.waterSMoney;
        this.data.type = res.object.waterWay;
        this.data.outOrderId = res.object.waterWater;
        this.data.waterEndTime = this.dateFormat(res.object.waterEndTime);
        this.data.from.tradeNo = res.object.waterNumber;
        this.data.from.refundAmount =res.object.waterMoney;
        this.data.waterState = res.object.waterState;
        this.data.from.snNum = res.object.snNum;
        this.setData({
          "money":res.object.waterMoney,
          "waterMoney":res.object.waterMoney,
          "waterSMoney":res.object.waterSMoney,
          "type":res.object.waterWay,
          "outOrderId":res.object.waterWater,
          "waterEndTime":this.data.waterEndTime,
          "waterState":this.data.waterState
        });
      } else {
        console.log("查询订单失败", res);
      }
    });
  },
  //退款订单查询
  queryRefund(){
    bnApi.requestGet(sysConfig.apiUrl + "/api/refund/findById/" + this.data.orderId).then((res)=>{
      if(res.success){
        console.log("退款订单:",res);
        this.items = res.object;
        this.data.money = res.object.refundFee;
        this.items.refundCreateTime = this.dateFormat(res.object.refundCreateTime);
        this.setData({
          "items":this.items,
          "money":this.data.money
        });
      }
    });
  },
  //格式化日期
  dateFormat(date) {
      var dateee = new Date(date).toJSON();
      console.log("日期格式",dateee);
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
  format(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1,                 //月份 
      "d+": date.getDate(),                    //日 
      "h+": date.getHours(),                   //小时 
      "m+": date.getMinutes(),                 //分 
      "s+": date.getSeconds(),                 //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
  refundButton(){
    console.log("执行退款：");
    this.refund();
  },
  //退款接口
  refund(){
    bnApi.requestPost(sysConfig.apiUrl + "/api/refund",this.data.from).then((res)=>{
      console.log("退款参数",this.data.from);
      if(res.success){
        console.log("退款成功",res);
        my.navigateTo({
          url: '../public/success/success'
        });
      }else{
        console.log("退款失败",res);
      }
    });
  }
});
