import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  // .js
  data: {
    defautPoster: false,
    poster: true,
    posid: 'idle_pos',                           // 海报位置id，目前固定传入idle_pos
    audible: false,                               // 海报（视频类）是否有声音
    show_default_poster: true,                 // 是否展示本地兜底海报
    background: ['/image/lunbo.jpg', '/image/lunbo.jpg', '/image/lunbo.jpg'],
    buttonImage: "/image/timg.jpg",
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 5000,//自动切换时间
    duration: 500,//滑动动画时间
    circular: true,//无限滑动
    randomLen: 5
  },

  // 展示成功回调 
  onDisplaySuccess() {
    console.log('poster display success');
    // 投放的海报成功展示后，取消兜底海报的展示
    //this.setData({ show_default_poster: false });
  },
  // 展示失败回调 
  onDisplayFail(e) {
    console.log('展示失败' + e.detail.error);
  },
  //获取兜底海报图片地址
  queryImg() {
    console.log("兜底海报图片进行查询");
    my.httpRequest({
      url: '',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (res.success) {
          this.data.background = res.background;
        }
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  //回调函数
  onKeyPress(r) {
    console.log("键盘回调函数");
    switch (r.keyCode) {
      case 131:
        r.keyName = '收款';
        let money = r.amount;//金额元
        //金额判断
        this.moneyIf(money);

        //唤醒收银台进行支付操作
        //this.startApp(money);
        break;
      case 132:
        r.keyName = '刷脸';
        break;
      case 133:
        r.keyName = '取消';
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
  //money判断
  moneyIf(money) {
    if (money == 0) {
      // my.ix.speech({
      //   text: '金额为零',
      //   speak: true,
      //   success: (r) => {
         
      //   }
      // });
       my.navigateTo({
            url:"../handLosingAmount/handLosingAmount"
          });
    }
    else if (money >= 50000) {
      console.log("金额过大");
      my.ix.speech({
        text: '金额过大',
        speak: true,
        success: (r) => {
          return;
        }
      });
    } else {
      let moneyStr = money+"";
      if (moneyStr.length - moneyStr.indexOf(".") > 3) {
        my.ix.speech({
          text: '金额不合法',
          speak: true,
          success: (r) => {
            return;
          }
        });
      }else{
        //跳转paymentOptions页面
    this.navigateTopaymentOptions(money);
      }
    }
    
  },
  //唤醒收银台

  //跳转到选择支付界面
  navigateTopaymentOptions(money) {

    my.navigateTo({ url: '../paymentOptions/paymentOptions?money=' + money });
  },
  navigateToSetting() {
    my.navigateTo({ url: '../setting/setting' })
  },
  // 设置静音
  mute() {
    this.setData({ audible: false });
  },

  // 取消静音
  unmute() {
    this.setData({ audible: true });
  },

  // 暂停海报播放（视频类）
  pause() {
    if (typeof (this.posterContext) === 'undefined') {
      this.posterContext = my.createPosterContext('my_poster_id');
    }
    this.posterContext.pause({});
  },

  // 恢复海报播放（视频类）
  resume() {
    if (typeof (this.posterContext) === 'undefined') {
      this.posterContext = my.createPosterContext('my_poster_id');
    }
    this.posterContext.resume({});
  },

  // 广告可用性变化回调
  onPosterChange(e) {
    console.log('poster availability changed, now has poster = ' + e.detail.hasPoster);
  },
  onLoad(query) {
    //this.queryImg();
    // 页面加载
    console.log("请求url:",sysConfig.apiUrl);
    bnApi.requestGet(sysConfig.apiUrl+"/agent/agentSelect.do").then((res)=>{
      console.log("网络请求发起结果",res);
    }).catch((err)=>{
        console.log("嫡传错误信息",err);
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
    //my.ix.offKeyEventChange();
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});