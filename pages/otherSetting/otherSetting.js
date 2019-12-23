import { Page } from '/util/ix';
import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    shoukuanSetting:{},
    items: [
      {
        thumb: '/image/1.png',
        title: '设备绑定',
        extra: '未绑定',
        arrow: true,
      },
    ],
    items1: [
      {
        thumb: '/image/2.png',
        title: '收款模式',
        extra: '即插即用模式',
        arrow: true,
      },
      {
        thumb: '/image/3.png',
        title: '默认支付方式',
        extra: '刷脸支付',
        arrow: 'up',
      },

    ],
    items2: [
      {
        thumb: '/image/4.png',
        title: '打印设置',
        extra: '即插即用模式',
        arrow: true,
      },
    ],
    items3: [
      {
        thumb: '/image/5.png',
        title: '系统设置',
        extra: '',
        arrow: true,
      },

    ],
    items4: [
      {
        thumb: '/image/6.png',
        title: '软件版本',
        extra: '0.0.1',
      },
      {
        thumb: '/image/7.png',
        title: '小程序容器版本',
        extra: 'xxxxx',
      }
    ],
    itemsGathering:[
     
    ],
    itemsPay:[
      { name: '0', value: '刷脸支付' },
      { name: '1', value: '扫码支付' },
    ],
    snValue: "",//sn版本号
    printerId: "",
    modalOpened: false,
    modalOpened1:false
  },
  onLoad() {
    //版本号栏目
    this.versionShow();
    this.getSnValue();
    //初始化设置
    this.setSetting();
    
  },
  onShow() {
    //监听打印设备
    this.listenMonitorPrinter();  
    //设备是否绑定
    let extra = "未绑定";
    let items =  [
      {
        thumb: '/image/1.jpg',
        title: '设备绑定',
        extra: extra,
        arrow: true,
      },
    ];
  },
  onItemClick(ev) {
    console.log("ev", ev);
    switch (ev.index) {
      case "items-0":
        //进入二维码生成
        my.navigateTo({
          url: '../public/QRCode/QRCode?code=' + this.data.snValue
        });
        break;
      case "items1-0":
      console.log("进入收款模式选择");
      //调用数据字典
      bnApi.requestGet(sysConfig.apiUrl+"/system/dictionary/findByType/1000").then((res)=>{
        if(res.success){
            console.log("收款模式查询成功：",res);
            
            this.data.itemsGathering = JSON.parse(res.object.value);
            this.setData({
              "itemsGathering":this.data.itemsGathering
            });
        }else{
          console.log("收款模式查询失败",res);
        }
      });
      //收款模式
        this.setData({
          "modalOpened": true
        });
        break;
      case "items1-1":
        break;
      case "items2-0":
        //打印设置
        this.printerSetting();
        break;
      case "items3-0":
        //进入系统设置
        my.ix.startApp({
          appName: 'settings',
        });
        break;
      case "items4-0":
        break;
      case "items4-1":
        break
    }
  },
  onScrollToLower() {
    const { items5 } = this.data;
    const newItems = items5.concat(newitems);
    console.log(newItems.length);
    this.setData({
      items5: newItems,
    });
  },
  //版本号列表展示
  versionShow() {
    my.ix.getVersion({
      success: (r) => {
        console.log("版本号", r);

        let items4 = [
          {
            thumb: '/image/6.png',
            title: '软件版本',
            extra: '0.0.1',
          },
          {
            thumb: '/image/7.png',
            title: '小程序容器版本',
            extra: r.versionName,
          }
        ];
        this.setData({
          "items4": items4
        });

      }
    });
  },
  //获取sn版本号
  getSnValue() {
    my.ix.getSysProp({
      key: 'ro.serialno',
      success: (r) => {
        console.log("系统信息", r);
        this.data.snValue = r.value;
      }
    });
  },
  //#endregion//进入设置页面
  navigateToSetting() {
    my.navigateTo({ url: '../setting/setting' })
  },
  //监听打印机初始化
  listenMonitorPrinter() {
    console.log("打印机初始化监听");
    // 开始监听
    my.ix.startMonitorPrinter({
      success: (r) => {
        console.log("监听设备成功", r);
        
      },
      fail: (r) => {
        console.log("fail, errorCode:" + r.error);
      }, complete: (r) => {
        console.log("complete", r);
        // 等待事件的变化
        my.ix.onMonitorPrinter((r) => {
          console.log("received data:", r);
        });

      },

    });
  },
  printerSetting(){
    my.ix.queryPrinter({
          success: (r) => {
            console.log("打印机id", r);
            if (r.usb.length <= 0) {
              my.alert({
                title: '错误',
                content: '请链接打印设备',
                buttonText: '我知道了',
                success: () => {
                 
                }
              });
            }
            this.setData({
              "printerId": r.id
            })
            //跳转页面
            my.navigateTo({
              url:"../printSetting/printSetting"
            });
          },
          fail: (r) => {
            this.setData({
              message: JSON.stringify(r)
            })
          }
        });
  },
  onHide() {
  },
  onUnload() {
    // 页面被关闭
    console.log("页面关闭");
    // 结束监听
    my.ix.offMonitorPrinter({
      success: (r) => {
        console.log("结束监听", r);
      },
      fail: (r) => {
        console.log("fail, errorCode:" + r.error);
      }
    });
  },
  //确定按钮
  sureButton(){
    console.log("确定按钮点击");
    this.data.modalOpened = false;
    this.data.modalOpened1 = false;
    this.setData({
      "modalOpened":false,
      "modalOpened1":false
    });
  },
   radioChange1(e) {
    console.log('收银付款你选择的是：', e);
    //发送请求修改设置内容

  },
  //初始化设置
  setSetting(){
    //收款模式
    bnApi.requestGet(sysConfig.apiUrl+"/system/config/findByType/1000").then((res)=>{
      if(res.success){
        console.log("收款模式查询成功",res);
        this.data.shoukuanSetting = JSON.parse(res.object.model);
        let gather = this.data.itemsGathering;
        for(let i=0;i<gather.length;i++){
            if(gather[i].name==this.data.shoukuanSetting.name){
              gather[i] = this.data.shoukuanSetting;
            }
        }
      }else{
        console.log("收款模式查询失败");
      }
    });
  },
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
        break;
    }
    console.log('KeyEvent', r);
  },
});
