Page({
  data: {
    items: [
      {
        title: '开始时间:',
        extra: '',
        arrow: true,
      },
      {
        title: '结束时间:',
        extra: '',
        arrow: true,
      }
    ],
    startDate: "",
    endDate: ""
  },
  onLoad() {
    let startDate = this.format(new Date(), "yyyy-MM-dd") + " 00:00";
    let endDate = this.format(new Date(), "yyyy-MM-dd hh:mm");
    this.data.startDate = startDate;
    this.data.endDate = endDate;
    let items = [{
      title: '开始时间:',
      extra: startDate,
      arrow: true,
    },
    {
      title: '结束时间:',
      extra: endDate,
      arrow: true,
    }];
    this.setData({
      "items": items
    });
  },
  //点击事件
  onItemClick(ev) {
    console.log("点击事件", ev);
    let endDate = this.format(new Date(), "yyyy-MM-dd hh:mm");
    let index = ev.index;
    switch (index) {
      case 0:
        my.datePicker({
          format: 'yyyy-MM-dd HH:mm',
          currentDate: endDate,
          startDate: '2012-01-01 11:11',
          endDate: endDate,
          success: (res) => {
            this.data.startDate = res.date;
            let items = [{
              title: '开始时间:',
              extra: res.date,
              arrow: true,
            },
            {
              title: '结束时间:',
              extra: endDate,
              arrow: true,
            }];
            this.setData({
              "items": items
            });
          },
        });
        break;
      case 1:
        my.datePicker({
          format: 'yyyy-MM-dd HH:mm',
          currentDate: endDate,
          startDate: '2012-01-01 11:11',
          endDate: endDate,
          success: (res) => {
            this.data.endDate = res.Date;
            let items = [{
              title: '开始时间:',
              extra: this.data.startDate,
              arrow: true,
            },
            {
              title: '结束时间:',
              extra: res.date,
              arrow: true,
            }];
            this.setData({
              "items": items
            });
          },
        });
        break;
    }
  },
  //查询按钮
  queryButton() { 
    //跳转到详情页面
    my.navigateTo({
      url: '../groupQueryDetails/groupQueryDetails?startDate='+this.data.startDate+"&endDate="+this.data.endDate
    });
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
  }
});
