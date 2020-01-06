Page({
  data: {
    title: "操作成功",
    subTitle: "",
    messageButton: {
      mainButton: {
        buttonText: "确定"
      },
    }
  },
  goBack() {
    my.reLaunch({
      url: '../../index/index'
    });
  }
});