import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    startDate:"",
    endDate:"",
    successNum:0,
    breakNum:0,
    totalMoney:0,
    officialCount:0,
    refundMoney:0,
    form:{
      endTime:'',
      startTime:'',
      sn:''
    }
  },
  onLoad(query) {
    console.log("url参数",query);
    this.data.startDate = query.startDate;
    this.data.endDate = query.endDate;
    this.data.form.endTime = this.parserDate(query.endDate);
    this.data.form.startTime =  this.parserDate(query.startDate);
    this.getSnValue();
  },
  //查询
  query(){
    console.log("查询条件",this.data.form);
    bnApi.requestPost(sysConfig.apiUrl+'/order/queryGroup',this.data.form).then((res)=>{
      console.log("查询结果",res);
      if(res.success){
        let aliList = res.object.aliList;
        for(let i=0;i<aliList.length;i++){
          if(aliList[i].status == 1){
            //支付成功
            this.data.successNum = this.data.successNum + aliList[i].totalElement;
            this.data.officialCount = this.data.officialCount +aliList[i].totalMoney/100;
          }
          if(aliList[i].status == 3){
            //已退款
            this.data.breakNum = this.data.breakNum+aliList[i].totalElement;
            this.data.refundMoney = this.data.refundMoney+aliList[i].totalMoney/100;
          }
          
        }
        this.data.successNum = this.data.successNum+this.data.breakNum;
        this.data.totalMoney = this.data.totalMoney+this.data.officialCount;
        this.setData({
          "successNum":this.data.successNum,
          "officialCount":this.data.officialCount,
          "breakNum":this.data.breakNum,
          "totalMoney":this.data.totalMoney,
          "refundMoney":this.data.refundMoney
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
  //时间转换
  dateFormat(date) {
    var dateee = new Date(date).toJSON();
    console.log("日期格式", dateee);
    return new Date(+new Date(dateee) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
  },
  //转换为时间对象
  parserDate (date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
      return new Date();
    }
  },
  onUnload() {
    // 页面被关闭
    //初始化变量
    console.log("页面关闭");
    this.data.successNum = 0;
    this.data.breakNum = 0;
    this.data.totalMoney=0;
    this.data.officialCount=0;
    this.data.refundMoney = 0;
  }
});
