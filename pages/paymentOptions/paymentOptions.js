import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    snValue: '',
    money: 0,
    from: {
      authCode: '',
      buyerId: '',
      codeType: '',
      deviceSn: '',
      sellerId: '',
      subject: '商品订单',
      totalAmount: '',
      waterNote: ''
    },
    modalOpened21:false
  },
  onLoad(query) {
    console.log("paymentOptions页面参数", query);
    this.getSnValue();
    this.data.money = query.money;
    this.moneyConvert();
  },
  moneyConvert() {
    let moneyStr = this.data.money + "";
    if (moneyStr.indexOf(".") == -1) {
      this.data.money = moneyStr + ".00";
    } else {
      if (moneyStr.length - moneyStr.indexOf(".") == 2) {
        this.data.money = moneyStr + "0";
      }
    }
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
  //跳转到设置页面
  navigateToSetting() {
    my.navigateTo({ url: '../setting/setting' })
  },
  //点击事件，跳转到收银台
  facePayClick() {
    console.log("刷脸扫码按钮点击，进入收银台")
    this.existsSnBind();
    
  },
  //点击事件，刷脸付押金
  /**
   * 1.扫脸获取用户信息
   * 2.调用后台保存用户信息
   * 3.返回到首页
   */
  faceCashClick() {
    console.log("刷脸付押金按钮点击,进入扫脸认证");
    //this.startApp(this.data.money);
    
    // my.ix.faceVerify({
    //   //certNo: 'XXX',
    //   //certName: 'XXX',
    //   //verifyType: 'idCard',
    //   option: 'life',

    //   success: (r) => {
    //     console.log("刷脸验身成功",r);
    //     //进入等待页面
    //     this.navigateToLoading();
    //   },
    //   fail: (r) => {
    //     my.showToast({ content: JSON.stringify(r) });
    //   }
    // });
  },
  //唤醒收银台
  startApp(money) {

    //订单号生成，时间戳加上随机数
    let time = new Date().getTime();
    let random_no = "";
    for (let i = 0; i <= this.data.randomLen; i++) {
      random_no += Math.floor(Math.random() * 10);
    }
    console.log("随机数拼接", random_no);
    let orderId = time + random_no;
    this.data.orderId = orderId;
    console.log("订单id", orderId);
    console.log("money", money);
    my.ix.startApp({
      appName: 'cashier',
      bizNo: orderId,
      totalAmount: money,
      showScanPayResult: true,
      //orderDetail: [{ name: '名称1', content: '详情134', fontColor: 'gray' }],
      success: (r) => {
        //my.showToast({ content: r.barCode });
        if (r.success) {
          console.log("收银台启动成功", r.barCode);
          this.data.from.authCode = r.barCode;
          this.data.from.totalAmount = money;
          this.data.from.codeType = r.codeType;
          //开启监听收银台关闭
          this.payClose();
          //调用支付接口
         this.alipay(r.barCode);


          if (r.codeType == "F") {
            //刷脸
            console.log("刷脸操作");
          } else if (r.codeType == "C") {
            //扫码
            console.log("扫码操作");
          }
        }
      }
    });
  },
  //调用具体支付接口
  alipay(barCode) {
    console.log("具体支付接口调用");
    this.data.from.deviceSn = this.data.snValue;
    bnApi.requestPost(sysConfig.apiUrl + "/api/pay", this.data.from).then((res) => {
      if (res.success) {
        console.log("支付成功");
        //获取支付结果
        this.payResult(this.data.orderId, this.data.money, 0, 0);
      } else {
        console.log("支付失败，但不一定失败，请查询支付宝账单");
      }
    });

  },
  //只有扫码成功才能调用获取支付结果
  payResult(bizNo, totalAmount, bizAmount, discount) {
    my.ix.startApp({
      appName: 'scanPayResult',
      bizNo: bizNo,
      totalAmount: totalAmount,
      bizAmount: bizAmount,
      discount: discount,
      success: (r) => {
        my.showToast({ content: JSON.stringify(r) });
        console.log("支付结果获取");
      }
    });
  },
  //监听收银台关闭
  payClose() {
    my.ix.onCashierEventReceive((r) => {
      if (r.bizType === 'RESULT_CLOSED') {
        console.log("收银台关闭");
        //跳转到首页
        my.navigateTo({ url: '../index/index' });
        my.ix.offCashierEventReceive();
      } else if (r.bizType === 'RESULT_BTN_FUNCTION') {
        console.log("收银台自定义按钮按下");
        console.log("收银台关闭");
        //跳转到首页
        my.navigateTo({ url: '../index/index' });
        my.ix.offCashierEventReceive();
      } else {
        console.log('RESULT: ', r.keyCode);
        console.log("收银台关闭");
        //跳转到首页
        my.navigateTo({ url: '../index/index' });
        my.ix.offCashierEventReceive();
      }

    });
  },
  //跳转到loading页面
  navigateToLoading() {
    my.navigateTo({ url: '../public/loading/loading' });
  },
  //获取sn号
  getSnValue() {
    my.ix.getSysProp({
      key: 'ro.serialno',
      success: (r) => {
        console.log("系统信息", r);
        this.data.snValue = r.value;
      }
    });
  },
  //判断设备是否绑定，是否授权
  existsSnBind() {
    bnApi.requestGet(sysConfig.apiUrl + "/terminalEntity/findBySnNum/" + this.data.snValue).then((res) => {
      if (res.success) {
        console.log("可以进行商家收账", res);
        //此代码注释掉转账可能存在错误
        this.data.from.sellerId = res.object.pid;
        //启动收银台
        this.startApp(this.data.money);
      } else {
        console.log("不能进行商家收账，",res);
        this.data.modalOpened21 = true;
        this.setData({
          "modalOpened21": true
        });
      }
    });
  },
  //关闭弹窗
  closeButton() {
    this.data.modalOpened21 = false;
    this.setData({
      "modalOpened21": false
    });
  },
});
