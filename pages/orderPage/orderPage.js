import { Page } from '/util/ix';
Page({
  data: {
    headerImage: "/image/timg.jpg",
    footerImage: "/image/timg.jpg",
    tabs: [
      {
        title: '当面付流水',
      },
      {
        title: '资金授权流水',
      },
      {
        title: '退款记录',
      },
    ],
    activeTab: 0,//默认选中那个
    itemsThumb: [
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'123456789',
        arrow: true,
      },
      {
       thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'234567891',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'345678912',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'456789123',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'123456789',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'123456789',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'123456789',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'123456789',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '支付宝刷脸',
        brief:'订单号: ',
        orderId:'123456789',
        arrow: true,
      },
    ],
    date: "",
    totalMoney:0,
    totalCount:0,
    totalCountMax:0,
    payName:"全部",
    payOption:0
  },
  onLoad() {
    this.data.date = this.format(new Date(),"yyyy-MM-dd");
    console.log("当前时间", this.data.date);
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
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
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
    my.navigateTo({ url: '../orderDetails/orderDetails?orderId='+ev.index})
    console.log("点击事件", ev);
  },
  //日期点击事件
  datePicker() {
    my.datePicker({
      currentDate: this.format(new Date(),"yyyy-MM-dd"),
      startDate: '2016-10-9',
      endDate: this.format(new Date(),"yyyy-MM-dd"),
      success: (res) => {
        this.data.date = res.date;
        this.setData({
          "date":res.date
        });
        console.log("日期选择", res);
      },
    });
  },
  //支付方式点击事件
  openPayOption(){
    let then = this;
    my.optionsSelect({
      title: "支付方式选择",
      optionsOne: ["全部", "刷脸", "扫码"],
      selectedOneIndex: 0,
      success(res) {
        console.log("选择完毕",res);
        if(res.selectedOneOption==null || res.selectedOneOption==""){
            //不做处理
        }else{
          then.setData({
          "payName":res.selectedOneOption,
          "payOption":res.selectedOneIndex
        });
        }
        
      }
    });
  },
  //日期格式转换
  format(date,fmt) {
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
  }
});
