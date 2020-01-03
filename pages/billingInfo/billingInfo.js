import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
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
    items1: [],
    startDate: "",
    endDate: "",
    page: 0,
    size: 100,
    form: {
      endTime: '',
      startTime: '',
      sn: '',
    }
  },
  onLoad() {
    let startDate = this.format(new Date(), "yyyy-MM-dd") + " 00:00";
    let endDate = this.format(new Date(), "yyyy-MM-dd hh:mm");
    this.data.startDate = startDate;
    this.data.endDate = endDate;
    this.getSnValue();
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
            this.data.form.startTime = this.data.startDate;
            let items = [{
              title: '开始时间:',
              extra: res.date,
              arrow: true,
            },
            {
              title: '结束时间:',
              extra: this.data.endDate,
              arrow: true,
            }];
            this.setData({
              "items": items
            });
            this.data.form.startTime = this.parserDate(this.data.form.startTime);
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
            this.data.endDate = res.date;
            this.data.form.endTime = res.date;
            
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

            this.data.form.endTime = this.parserDate(this.data.form.endTime);

          },
        });
        break;
    }
  },
  //查询按钮
  queryButton() {
    console.log("点击按钮执行");
    this.query();
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
  dateFormat(date) {
    var dateee = new Date(date).toJSON();
    console.log("日期格式", dateee);
    return new Date(+new Date(dateee) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
  },
  //查询列表
  query() {
    bnApi.requestPost(sysConfig.apiUrl + "/successionSettlement/list/" + this.data.page + "/" + this.data.size, this.data.form).then((res) => {
      
      console.log("参数", this.data.form);
      if (res.success) {
        console.log("查询列表", res);
        let itmes1 = res.queryResult.list;
        this.data.items1 = res.queryResult.list;
        for (let i = 0; i < this.data.items1.length; i++) {
          if (this.data.items1[i].startTime != null) {
            this.data.items1[i].startTime = this.dateFormat(this.data.items1[i].startTime);
          }

          this.data.items1[i].endTime = this.dateFormat(this.data.items1[i].endTime);

        }
        this.setData({
          "items1": this.data.items1
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
        this.data.form.sn = this.data.snValue;
        //进行查询
        this.query();
      }
    });
  },
  //跳转页面
  queryDetail(ev) {
    my.navigateTo({
      url: '../billingInfoDetails/billingInfoDetails?id=' + ev.target.dataset.index
    });
  },
  parserDate (date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
      return new Date();
    }
  }
});
