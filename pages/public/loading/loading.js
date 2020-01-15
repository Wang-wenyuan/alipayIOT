Page({
  data: {
    success: false,
    time: 3,
    flag: true//递归调用条件
  },
  onLoad() {
    //页面启动加载
    //调用刷脸认证后资金扣款接口
    console.log("进入等待页面，调用接口");
    this.sleep(3000).then(() => {
      //code
      console.log("睡眠结束");
      this.data.success = true;
      this.setData({
        "success": true
      });
      this.thisSleep();
      

    })

  },
  sleep(ms) {
    return new Promise(resolve =>
      setTimeout(resolve, ms)
    )
  },
  //递归调用
  thisSleep() {
    this.sleep(1000).then(() => {
      if (this.data.time <= 0) {
        this.data.flag = false;
      }
      if (!this.data.flag) {
        this.navigateToIndex();
        return;
      }
      console.log("递归值", this.data.flag);
      console.log("time:", this.data.time);
      this.setData({
        "time": this.data.time
      });
      this.data.time = this.data.time - 1;
      this.thisSleep();

    });
  },
    //跳转到首页
  navigateToIndex(){
    my.reLaunch({url:'../../index/index'});
  },


});
