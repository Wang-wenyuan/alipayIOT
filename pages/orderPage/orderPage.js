import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    headerImage: "/image/timg.jpg",
    footerImage: "/image/timg.jpg",
    snValue: '',
    index: 0,//页面展示
    tabs: [
      {
        title: '当面付流水',
      },
      {
        title: ' ',
      },
      {
        title: '退款记录',
      },
    ],
    activeTab: 0,//默认选中那个
    itemsThumb: [
    ],
    itemsThumb2: [],
    date: "",
    totalMoney: 0,
    totalCount: 0,
    totalCountMax: 0,
    payName: "全部",
    payOption: 0,
    page: 0,
    size: 100,
    //订单
    from: {
      dateTime: '',
      sn: '',
      waterNumber: '',
      status: '1',//支付状态
      outTradeNo: '',
      payType:'',
      limit:100,
      page:0
    },
    //退款记录
    from1: {
      dateTime: '',
      outTradeNo: '',
      refundAmount: '',
      sn: '',
      tradeNo: ''
    },
    flag:0,
  },
  onLoad() {
    this.data.date = this.format(new Date(), "yyyy-MM-dd");
    console.log("当前时间", this.data.date);
    //获取设备sn号
    this.getSnValue();
  },
  onShow() {
    this.getSnValue();
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
        my.navigateBack();
        break;
      case 134:
        r.keyName = '设置';
        console.log("点击设置按钮");
        this.navigateToSetting();
        break;
    }
    console.log('KeyEvent', r);
  },
  handleTabClick({ index }) {
    console.log("选择变换", index);
    this.data.flag = 0;
    switch (index) {
      case 0:
        this.data.index = 0;
        this.queryOrder();
        this.setData({
          activeTab: index,
          "index": 0
        });
        break;
      case 1:
        break;
      case 2:
        this.queryRefund();
        this.setData({
          activeTab: index,
          "index": 2
        });
        break;
    }

  },
  handleTabChange({ index }) {
    console.log("选择变换2", index);
    this.data.flag = 2;
    this.setData({
      activeTab: index,
    });
  },
  handlePlusClick() {
    my.alert({
      content: 'plus clicked',
    });
  },
  //进入设置页面
  navigateToSetting() {
    my.navigateTo({ url: '../setting/setting' })
  },
  //点击事件
  onItemClick(ev) {
    my.navigateTo({ url: '../orderDetails/orderDetails?orderId=' + ev.target.dataset.index+"&type=pay"})
    console.log("点击事件", ev);
  },
  //退款点击事件
  onItemClick2(ev) {
    my.navigateTo({ url: '../orderDetails/orderDetails?orderId=' + ev.target.dataset.index + "&type=refund" })
    console.log("点击事件", ev);
  },
  //日期点击事件
  datePicker() {
    my.datePicker({
      currentDate: this.format(new Date(), "yyyy-MM-dd"),
      startDate: '2016-10-9',
      endDate: this.format(new Date(), "yyyy-MM-dd"),
      success: (res) => {
        this.data.date = res.date;
        this.setData({
          "date": res.date
        });
        console.log("日期选择", res);
        console.log("日期选择index",this.data.index);
        if (this.data.index == 0) {
          console.log("日期选择");
          this.queryOrder();
        }
        if (this.data.index == 2) {
          this.queryRefund();
        }


      },
    });
  },
  //支付方式点击事件
  openPayOption() {
    let then = this;
    my.optionsSelect({
      title: "支付方式选择",
      optionsOne: ["全部", "刷脸", "扫码"],
      selectedOneIndex: 0,
      success(res) {
        console.log("选择完毕", res);
        if (res.selectedOneOption == null || res.selectedOneOption == "") {
          //不做处理
          //then.queryOrder();
        } else {
          //调用订单查询接口
          if(res.selectedOneIndex==1){
            //刷脸
            then.data.from.payType = "F";
          }
          if(res.selectedOneIndex ==2){
            then.data.from.payType = "C";
          }
          if(res.selectedOneIndex == 0){
            then.data.from.payType="";
          }
          if(then.data.flag==0){
              then.queryOrder();
          }
          if(then.data.flag == 2){
            then.queryRefund();
          }
          
          then.setData({
            "payName": res.selectedOneOption,
            "payOption": res.selectedOneIndex
          });
        }

      }
    });
  },
  handleInput(value) {
    this.setData({
      value,
    });
  },
  handleClear(value) {
    this.setData({
      value: '',
    });
  },
  handleFocus() { },
  handleBlur() { },
  handleCancel() {
    this.setData({
      value: '',
    });
  },
  handleSubmit(value) {
    if(this.data.flag==0){
      this.data.from.outTradeNo = value;
    }
    if(this.data.flag ==2){
      this.data.from2.outTradeNo = value;
    }
    
    this.queryOrder();
  },
  //日期格式转换
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
  //获取sn号
  getSnValue() {
    my.ix.getSysProp({
      key: 'ro.serialno',
      success: (r) => {
        console.log("系统信息", r);
        this.data.snValue = r.value;
        //进行查询
        this.queryOrder();
      }
    });
  },
  //订单查询
  queryOrder() {
    this.data.from.dateTime = this.data.date;
    this.data.from.sn = this.data.snValue;

    bnApi.requestPost(sysConfig.apiUrl + "/order/list", this.data.from).then((res) => {
      console.log("res",this.data.from);
      if (res.success) {
        console.log("订单查询成功", res);
        this.data.itemsThumb = res.queryResult.list;
        let items = res.queryResult.list;
        this.data.totalCount = res.queryResult.total;
        this.data.totalMoney = 0;
        for(let i=0;i<items.length;i++){
          this.data.totalMoney +=items[i].actualPayment;
        }
        this.data.totalMoney = (this.data.totalMoney)/100;
         
        this.setData({
          "itemsThumb": res.queryResult.list,
          "totalCount":this.data.totalCount,
          "totalMoney":this.data.totalMoney,
          "totalCountMax":this.data.totalMoney
        });
      } else {
        console.log("查询订单失败", res);
      }
      this.data.from.waterWater = "";
    });
  },
  //退款记录查询
  queryRefund() {
    this.data.from1.dateTime = this.data.date;
    this.data.from1.sn = this.data.snValue;
    console.log("退款记录:", this.data.from1);
    bnApi.requestPost(sysConfig.apiUrl + "/api/refund/list/" + this.data.page + "/" + this.data.size, this.data.from1).then((res) => {
      if (res.success) {
        console.log("退款查询成功", res);
        this.data.itemsThumb2 = res.queryResult.list;
        this.setData({
          "itemsThumb2": res.queryResult.list
        });
      } else {

      }
      this.data.from2.outTradeNo = "";
    });
  },
  //刷新页面
  refresh(){
    this.onLoad();
  },
  //时间转换
  parserDate (date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
      return new Date();
    }
  }
});
