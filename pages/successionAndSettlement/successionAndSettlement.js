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
    snValue:'',
    redisId:'',
    form:{
      endTime:'',
      startTime:'',
      sn:''
    },
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
    this.data.startDate = query.startDate;
    this.data.endDate = query.endDate;
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

  //接口调用
query(){
  
  bnApi.requestPost(sysConfig.apiUrl + "/successionSettlement/querySuccSet",this.data.form).then((res)=>{
    if(res.success){
      this.data.redisId = res.object.id;
        let aliList = res.object.aliList;
        for(let i=0;i<aliList.length;i++){
          if(aliList[i].status == 1){
            //支付成功
            this.data.ali.totalMoney = aliList[i].totalMoney;
            this.data.ali.totalAllMoney = this.data.ali.totalElement+this.data.ali.totalMoney;
          }
          if(aliList[i].status == 3){
            //退款
             this.data.ali.refundMoney = aliList[i].totalMoney;
             this.data.ali.totalAllMoney = this.data.ali.totalElement+this.data.ali.totalMoney;
          }
          
        }
        //微信
        let wecharList = res.object.wecharList;
        for(let i=0;i<wecharList.length;i++){
          if(wecharList[i].status == 1){
            //支付成功
            this.data.wechar.totalMoney = wecharList[i].totalMoney;
            this.data.wechar.totalAllMoney = this.data.wechar.totalElement+this.data.wechar.totalMoney;
          }
          if(wecharList[i].status == 3){
            //退款
             this.data.wechar.refundMoney = wecharList[i].totalMoney;
             this.data.wechar.totalAllMoney = this.data.wechar.totalElement+this.data.wechar.totalMoney;
          }
        }


        //全部
        let allList = res.object.allList;
        for(let i=0;i<allList.length;i++){
          if(allList[i].status == 1){
            //支付成功
            this.data.all.totalMoney = allList[i].totalMoney;
            this.data.all.totalAllMoney = this.data.all.totalElement+this.data.all.totalMoney;
          }
          if(allList[i].status == 3){
            //退款
             this.data.all.refundMoney = allList[i].totalMoney;
             this.data.all.totalAllMoney = this.data.all.totalElement+this.data.all.totalMoney;
          }
        }

        this.setData({
          "ali":this.data.ali,
          "wechar":this.data.wechar,
          "all":this.data.all
        });


    }else{

    }
    console.log("交班结算查询：",res);
  });
},
//直接结算
settlement(){
  bnApi.requestGet(sysConfig.apiUrl + "/successionSettlement/add/"+this.data.redisId).then((res)=>{
    if(res.success){
       my.navigateBack();
    }
    console.log("直接结算",res);
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

});
