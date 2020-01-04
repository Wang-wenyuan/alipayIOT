import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    startDate:"",
    endDate:"",
    successNum:100,
    breakNum:100,
    totalMoney:100,
    officialCount:100,
    id:'',

    ali:{
      totalMoney: 0,
      totalAllMoney: 0,
      refundMoney: 0
    },
    wechar:{
       totalMoney: 0,
      totalAllMoney: 0,
      refundMoney: 0
    },
    all:{
       totalMoney: 0,
      totalAllMoney: 0,
      refundMoney: 0
    }
  },
  onLoad(query) {
    console.log("url参数",query);
    this.data.id = query.id;
    this.query();
  },
  //查询
  query(){
    bnApi.requestGet(sysConfig.apiUrl+"/successionSettlement/findById/"+this.data.id).then((res)=>{
      console.log("查询结果",res);
      if(res.success){
        this.data.startDate = this.format(new Date(res.object.startTime),"yyyy-MM-dd hh:mm:ss");
        this.data.endDate = this.format(new Date(res.object.endTime),"yyyy-MM-dd hh:mm:ss");
        let aliList = res.object.aliList;
        for(let i=0;i<aliList.length;i++){
          if(aliList[i].status == 1){
            //支付成功
            this.data.ali.totalMoney = aliList[i].totalMoney;
            this.data.ali.totalAllMoney = this.data.ali.totalAllMoney+this.data.ali.totalMoney;
          }
          if(aliList[i].status == 3){
            //退款
             this.data.ali.refundMoney = aliList[i].totalMoney;
             this.data.ali.totalAllMoney = this.data.ali.totalAllMoney+this.data.ali.totalMoney;
          }
          
        }
        //微信
        let wecharList = res.object.wecharList;
        for(let i=0;i<wecharList.length;i++){
          if(wecharList[i].status == 1){
            //支付成功
            this.data.wechar.totalMoney = wecharList[i].totalMoney;
            this.data.wechar.totalAllMoney = this.data.wechar.totalAllMoney+this.data.wechar.totalMoney;
          }
          if(wecharList[i].status == 3){
            //退款
             this.data.wechar.refundMoney = wecharList[i].totalMoney;
             this.data.wechar.totalAllMoney = this.data.wechar.totalAllMoney+this.data.wechar.totalMoney;
          }
        }


        //全部
        let allList = res.object.allList;
        for(let i=0;i<allList.length;i++){
          if(allList[i].status == 1){
            //支付成功
            this.data.all.totalMoney = allList[i].totalMoney;
            this.data.all.totalAllMoney = this.data.all.totalAllMoney+this.data.all.totalMoney;
          }
          if(allList[i].status == 3){
            //退款
             this.data.all.refundMoney = allList[i].totalMoney;
             this.data.all.totalAllMoney = this.data.all.totalAllMoney+this.data.all.totalMoney;
          }
        }
        console.log("交班结算详情参数，",this.data.ali);
        this.setData({
          "ali":this.data.ali,
          "wechar":this.data.wechar,
          "all":this.data.all,
          "startDate":this.data.startDate,
          "endDate":this.data.endDate
        });
      }
    });  
  },
  //日期格式转化
  dateFormat(date) {
      var dateee = new Date(date).toJSON();
      console.log("日期格式",dateee);
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
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
});
