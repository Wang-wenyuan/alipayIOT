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
    outOrderId: '',
    waterEndTime: '',
    waterState: '',
    type: 'pay',
    payType: '',
    payTypeStr: '',
    from: {
      tradeNo: '',//流水号
      refundAmount: '',//退款金额
      snNum: ''
    },
    items: {},
    modalOpened: false,
    model: {},
    snValue: '',
  },
  onLoad(query) {
    console.log("query", query);
    this.data.orderId = query.orderId;
    this.data.type = query.type;
    this.getSnValue();
    console.log("type类型", query.type);
    if (this.data.type == "pay") {
      this.queryOrder();
    } else {
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
  //打开弹出框
  printModelShow() {
    this.setData({
      "modalOpened": true
    });
  },
  //打印机打印
  printButton(e) {
    console.log(e);
    this.print(e.target.dataset.type);
    this.setData({
      "modalOpened": false
    });
  },
  print(printType) {
    console.log("打印进入", printType);
    let printTime = utils.format(new Date(), "yyyy-MM-dd hh:ss");
    let cmds = [{ 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'ON', 'ON', 'ON'] },
    { 'cmd': 'addSelectJustification', 'args': ['CENTER'] },
    { 'cmd': 'addText', 'args': ['支付宝'] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //商户联
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['商户联'] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //商户
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['商户：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': ['北京邦华信诺电子科技有限公司'] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //门店
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['门店：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': ['北京邦华信诺电子科技有限公司'] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //收款终端
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['收款终端：蜻蜓'] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //单号
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['单号：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': [this.data.outOrderId] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //订单码
    { 'cmd': 'addSelectJustification', 'args': ['CENTER'] }, /*设置打印居中对齐*/
    { 'cmd': 'addStoreQRCodeDataGB18030', 'args': [this.data.outOrderId] }, /*设置qrcode内容*/
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //下单时间
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['下单时间：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': [this.data.waterEndTime] },
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
    { 'cmd': 'addText', 'args': [this.data.waterMoney] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //实收金额
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['实收金额：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': [this.data.waterMoney] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //支付方式：
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['支付方式：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': [this.data.payTypeStr] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //支付时间
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['支付时间：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': [this.data.waterEndTime] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    //打印时间
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },
    { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },
    { 'cmd': 'addText', 'args': ['打印时间：'] },
    { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
    { 'cmd': 'addText', 'args': [printTime] },
    { 'cmd': 'addPrintAndLineFeed', 'args': [] },
    ];
    if (printType == 1) {
      //商户联
      cmds[7].args = ['商户联']

    } else {
      //顾客联
      cmds[7].args = ['顾客联']
    }
    let model1 = this.data.model;
    //判断条形码和二维码
    if (model1.orderIdPrint == '0') {
      console.log("进入条形码打印");
      //条形码，删除二维码 35 36 37
      cmds.splice(37, 1);
      cmds.splice(36, 1);
      cmds.splice(35, 1);
      cmds.push({ 'cmd': 'addSelectJustification', 'args': ['CENTER'] });
      cmds.push({ 'cmd': 'addSelectPrintingPositionForHRICharacters', 'args': ['BELOW'] });
      cmds.push({ 'cmd': 'addSetBarcodeHeight', 'args': ['60'] });
      cmds.push({ 'cmd': 'addCODE128', 'args': [this.data.outOrderId] });
      cmds.push({ 'cmd': 'addPrintAndLineFeed', 'args': [] });

    }
    //分割线
    cmds.push({ 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] });
    cmds.push({ 'cmd': 'addText', 'args': ['----------------'] });
    cmds.push({ 'cmd': 'addPrintAndLineFeed', 'args': [] });
    my.ix.printer({
      cmds: cmds,
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
    bnApi.requestGet(sysConfig.apiUrl + "/order/findById/" + this.data.orderId).then((res) => {
      if (res.success) {
        console.log("订单查询成功", res);
        this.data.money = res.object.actualPayment / 100;
        this.data.waterMoney = res.object.actualPayment / 100;
        this.data.waterSMoney = res.object.consumeMoney;
        this.data.payType = res.object.payType;
        this.data.outOrderId = res.object.outTradeNo;
        this.data.waterEndTime = this.dateFormat(res.object.createTime);
        this.data.from.tradeNo = res.object.serialNumber;
        this.data.from.refundAmount = this.data.money;
        this.data.waterState = res.object.waterState;
        this.data.from.snNum = res.object.sn;
        if (this.data.payType == 'F') {
          this.data.payTypeStr = "支付宝刷脸支付";
        } else {
          this.data.payTypeStr = "支付宝扫码支付";
        }
        this.setData({
          "money": this.data.waterMoney,
          "waterMoney": this.data.waterMoney,
          "waterSMoney": this.data.waterMoney,
          "payType": this.data.payType,
          "outOrderId": this.data.outOrderId,
          "waterEndTime": this.data.waterEndTime,
          "waterState": this.data.waterState,
          "type": "pay"
        });
      } else {
        console.log("查询订单失败", res);
      }
    });
  },
  //退款订单查询
  queryRefund() {
    bnApi.requestGet(sysConfig.apiUrl + "/api/refund/findById/" + this.data.orderId).then((res) => {
      if (res.success) {
        console.log("退款订单:", res);
        this.items = res.object;
        this.data.money = res.object.refundFee;
        this.items.refundCreateTime = this.dateFormat(res.object.refundCreateTime);
        this.setData({
          "items": this.items,
          "money": this.data.money,
          "type": "refund"
        });
      }
    });
  },
  //格式化日期
  dateFormat(date) {
    var dateee = new Date(date).toJSON();
    console.log("日期格式", dateee);
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
  refundButton() {
    console.log("执行退款：");
    this.refund();
  },
  //退款接口
  refund() {
    bnApi.requestPost(sysConfig.apiUrl + "/api/refund", this.data.from).then((res) => {
      console.log("退款参数", this.data.from);
      if (res.success) {
        console.log("退款成功", res);
        my.navigateTo({
          url: '../public/success/success'
        });
      } else {
        console.log("退款失败", res);
      }
    });
  },
  //关闭弹窗
  onModalClose() {
    this.setData({
      "modalOpened": false
    });
  },
  //打印参数查询
  printSettingInit() {
    //查询是否有设置，没有进行默认设置
    bnApi.requestGet(sysConfig.apiUrl + "/system/config/findByType/2000/" + this.data.snValue).then((res) => {
      console.log("查询打印配置", res);
      if (res.success) {
        //this.data.from = res.object;
        let model = res.object.model;
        for (let i = 0; i < 28; i++) {
          model = model.replace("\\", "");
        }
        console.log("循环过后字符串", model);
        let jsonModel = JSON.parse(model);
        //默认操作
        this.data.model = jsonModel;
      } else {
        console.log("没有查询到该设备号下的打印设置");
        bnApi.requestGet(sysConfig.apiUrl + "/system/dictionary/findByType/2000").then((res) => {
          console.log("打印设置初始化结果", res);
          if (res.success) {
            let value = JSON.parse(res.object.value);
            this.data.model = value;

          } else {

          }
        });
      }
    });

  },
  //获取sn号
  getSnValue() {
    my.ix.getSysProp({
      key: 'ro.serialno',
      success: (r) => {
        console.log("系统信息", r);
        this.data.snValue = r.value;
        //进行查询
        this.printSettingInit();
      }
    });
  }
});
