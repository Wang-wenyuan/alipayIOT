import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    money: 0,
    snValue: "",
    outTradeNo: "",//外部订单
    time: 60,
    timer: null,
    count: 0,
    show: false,
    show1: false,
    show2: false,
    show3: false,
    form: {
      buyerId: "",
      codeType: "C",
      deviceSn: "",
      pid: "",
      subject: "商品订单",
      totalAmount: 0,
      waterNote: ""
    },
    formQuery: {
      outTradeNo: "",
      tradeNo: "",
    },
    qrcode: '',
  },
  onLoad(query) {
    this.data.money = query.money;
    this.data.form.totalAmount = query.money;
    this.getSnValue();
  },
  //调用接口获取支付二维码
  preCreate() {
    bnApi.requestPost(sysConfig.apiUrl + "/api/preCreate", this.data.form).then((res) => {
      console.log("二维码查询成功", res);
      if (res.success) {
        this.data.outTradeNo = res.object.outTradeNo;
        this.createQR(res.object.qr_code);
      }
    });
  },
  createQR(code) {
    if (my.canIUse('ix.generateImageFromCode')) {
      my.ix.generateImageFromCode({
        code: code,
        format: 'QRCODE',
        width: 200,
        correctLevel: 'H',
        success: (r) => {
          console.log(JSON.stringify(r));
          this.setData({ qrcode: r.image });
          //调用用户是否扫码接口
          console.log("接口调用", this.data.outTradeNo);
          this.queryResultTwo();
          //setTimeout(this.clock(),1000);
          this.getCode();

        }
      });
    }
  },
  //定时器改变时间
  // clock() {
  //   while (true) {
  //     if (this.data.time == 0) {
  //       return;
  //     }
  //     this.sleep(1000);
  //     this.data.time = this.data.time - 1;
  //     console.log("定时器执行");
  //     this.setData({
  //       "time": this.data.time
  //     });
  //   }
  // },
  //定时器
  getCode() {

    const TIME_COUNT = 60;
    this.data.count = TIME_COUNT;
    this.setData({
      "count": this.data.count
    });
    console.log("定时器进入：", this.data.count);
    if (!this.data.timer) {
      this.data.count = TIME_COUNT;
      this.setData({
        "count": this.data.count
      });
      this.data.show = false;
      this.data.timer = setInterval(() => {
        console.log("定时器进入：", this.data.count);
        if (this.data.count > 0 && this.data.count <= TIME_COUNT) {
          this.data.count--;
          console.log("定时器：", this.data.count);
          this.setData({
            "count": this.data.count
          });
        } else {
          this.data.show = true;
          this.setData({
            "show": true
          });
          clearInterval(this.data.timer);
          this.data.timer = null;
        }
      }, 1000)
    }
  },
  sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  },
  //判断设备是否绑定，是否授权
  existsSnBind() {
    bnApi.requestGet(sysConfig.apiUrl + "/terminalEntity/findBySnNum/" + this.data.snValue).then((res) => {
      if (res.success) {
        console.log("可以进行商家收账", res);
        //此代码注释掉转账可能存在错误
        this.data.form.pid = res.object.pid;
        this.preCreate();
      } else {
        console.log("不能进行商家收账，", res);
      }
    });
  },
  //用户是否扫码
  queryResultTwo() {
    this.data.formQuery.outTradeNo = this.data.outTradeNo;
    console.log("参数查询", this.data.formQuery);
    bnApi.requestPost(sysConfig.apiUrl + "/api/queryResultTwo", this.data.formQuery).then((res) => {
      console.log("扫码查询", res);
      if (res.success) {
        this.setData({
          "show1": true
        });
        //调用查询订单接口
        bnApi.requestPost(sysConfig.apiUrl + "/api/queryResult", this.data.formQuery).then((res) => {
          console.log("订单查询", res);
          if (res.success) {
            //支付成功
            this.setData({
              "show1": false,
              "show3": false,
              "show2": true
            });
            this.sleep(2000);
            //跳转到首页
            my.redirectTo({
              url: '../index/index'
            });
          }
        });
      } else {
        //关闭交易
        this.setData({
          "show3": true
        });
        this.sleep(2000);
        //跳转到首页
        my.redirectTo({
          url: '../index/index'
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
        this.data.form.deviceSn = r.value;
        this.existsSnBind();
      }
    });
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
