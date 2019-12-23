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
    my.navigateTo({
      url: '../../index/index'
    });
  }
});