import bnApi from '/config/public';
let sysConfig = require('/config/sysConfig')
Page({
  data: {
    modalOpened2: true,
    items: [
      {
        title: '打印顾客联',
        extra: '',
      },

    ],
    items1: [
      {
        title: '自定义抬头设置',
        arrow: true,
      },

    ],
    items2: [
      {
        title: '打印商户联',
        extra: '',
      },
    ],
    items3: [
      {
        title: '自定义抬头设置',
        arrow: true,
      },

    ],
    items4: [
      {
        title: '打印底部广告',
        arrow: true,
      },
      {
        title: '小票订单号打印',
        extra: '条形码',
        arrow: true,
      }
    ],
    items5: [
      {
        title: '打印事件间隔',
        extra: '1s',
        arrow: true,
      }
    ],
    itemsRadio: [
      { name: '0', value: '0.5s' },
      { name: '1', value: ' 1s' },
      { name: '2', value: ' 2s' },
      { name: '3', value: ' 3s' },
    ],
    itemsReceipt: [
      { name: '0', value: '条形码' },
      { name: '1', value: '二维码' }
    ],
    printId: "",
    switch1: true,
    switch2: true,
    checked1: true,
    checked2: true,
    modalOpened1: false,
    modalOpened2: false,
    modalOpened3: false,
    modalOpened4: false,
    taitouSetting1: "",
    taitouSetting2: "",
    taitouSetting3: "",
    snValue: "",
    //顾客抬头
    gukeTaitouValue: "",
    //商品抬头
    shopTaitouValue: "",
    //需要提交的参数
    from: {
      id: "",
      name: "",
      model: "",
      type: "",
      snNum: ""
    },
    //数据模型封装
    model: {
      clientUnite: {}
    }
  },
  //行数判单
  onItemClick(ev) {
    let index = ev.index;
    switch (index) {
      case "0":
        break;
      case "1":
        this.setData({
          "modalOpened1": true
        });
        break;
      case "2":
        break;
      case "3":
        this.setData({
          "modalOpened2": true
        });
        break;
      case "items4-0":
        this.setData({
          "modalOpened6": true
        });
        break;
      case "items4-1":
        this.setData({
          "modalOpened4": true
        });
        break;
      case "5":
        this.setData({
          "modalOpened3": true
        });
        break;
    }

  },
  //自定义抬头设置
  onModalClick2() {

  },
  //自定义设置确定按钮
  sureButton() {
    this.setData({
      "modalOpened1": false,
      "modalOpened2": false,
      "modalOpened3": false,
      "modalOpened4": false,
      "modalOpened6": false,
    });
  },
  //多行文本
  onBlu1r1(e) {
    this.data.taitouSetting1 = e.detail.value;
    console.log("多行文本", e);
  },
  //多行文本
  onBlu1r2(e) {
    this.data.taitouSetting2 = e.detail.value;
    console.log("多行文本", e);
  },
  //事件间隔单选按钮
  radioChange(e) {
    this.data.model.printTime = e.detail.value;
    console.log("单选按钮选择后内容", e);
  },
  //小票订单打印单选按钮
  radioChange1(e) {
    this.data.model.orderIdPrint = e.detail.value;
    this.data.items4.extra =
      this.setData({

      });
    console.log("单选按钮选择后内容", e);
  },
  //打印测试
  printLin() {
    my.ix.printer({
      cmds: [{ 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'ON', 'OFF', 'OFF', 'ON'] }, //设置打印模式
      { 'cmd': 'addSelectJustification', 'args': ['CENTER'] },//剧中
      { 'cmd': 'addText', 'args': ['北京邦诺电子科技优先公司'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },//换行
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },//换行

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },//左边
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['开始时间'] },
      { 'cmd': 'addSetAbsolutePrintPosition', 'args': ['192'] },
      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      //{'cmd':'addSelectJustification', 'args': ['RIGHT']},//
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['2019-12-16 0:0'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },//左边
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['结束时间'] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSetAbsolutePrintPosition', 'args': ['192'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['2019-12-20 0:0'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },//
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['订单总金额：0.00元'] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSetAbsolutePrintPosition', 'args': ['192'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['实收总计：0.00'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },//
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['成功笔数：'] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSetAbsolutePrintPosition', 'args': ['192'] },
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['0笔'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['LEFT'] },//
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['退款总计：'] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'OFF', 'OFF', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['RIGHT'] },//
      { 'cmd': 'addTurnDoubleStrikeOnOrOff', 'args': ['OFF'] },//颜色变化
      { 'cmd': 'addText', 'args': ['0.00元'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] },

      { 'cmd': 'addSelectPrintModes', 'args': ['FONTA', 'OFF', 'ON', 'ON', 'OFF'] },
      { 'cmd': 'addSelectJustification', 'args': ['CENTER'] },//
      { 'cmd': 'addText', 'args': ['结束'] },
      { 'cmd': 'addPrintAndLineFeed', 'args': [] }],
      success: (r) => {
        this.setData({
          message: JSON.stringify(r)
        })
      },
      fail: (r) => {
        this.setData({
          message: JSON.stringify(r)
        })
      }
    });
  },
  onLoad() {
    //获取打印机id
    my.ix.queryPrinter({
      success: (r) => {
        this.printId = r.usb[0].id;
      },
      fail: (r) => {
        this.setData({
          message: JSON.stringify(r)
        })
      }
    });
    //获取sn号
    this.getSnValue();
  },
  //获取sn版本号
  getSnValue() {
    my.ix.getSysProp({
      key: 'ro.serialno',
      success: (r) => {
        console.log("系统信息", r);
        this.data.snValue = r.value;
        this.data.from.snNum = r.value;
        //打印设置初始化
        this.printSettingInit();
      }
    });
  },
  printSettingInit() {
    //查询是否有设置，没有进行默认设置
    bnApi.requestGet(sysConfig.apiUrl + "/system/config/findByType/2000/" + this.data.snValue).then((res) => {
      console.log("查询打印配置", res);
      if (res.success) {
        this.data.from = res.object;
        let model = res.object.model;
        for (let i = 0; i < 28; i++) {
          model = model.replace("\\", "");
        }
        console.log("循环过后字符串",model);
        let jsonModel = JSON.parse(model);

        this.data.model = jsonModel;
        this.data.from.name = res.object.name;
        this.data.from.type = res.object.type;
        let itemsreceipt = this.data.itemsReceipt;
        for (let i = 0; i < itemsreceipt.length; i++) {
          if (itemsreceipt[i].name == jsonModel.orderIdPrint) {
            itemsreceipt[i].checked = true;
            this.data.items4[1].extra = itemsreceipt[i].value;
          }


        }

        let itemsRadio = this.data.itemsRadio;
        for (let i = 0; i < itemsRadio.length; i++) {
          if (itemsRadio[i].name == jsonModel.printTime) {
            itemsRadio[i].checked = true;
            this.data.items5[0].extra = itemsRadio[i].value;
          }



        }
        console.log("1", this.data.items4);
        console.log("1", this.data.items5);
        
        this.setData({
          "checked1": jsonModel.clientUnite.ifPrintClientUnite,
          "gukeTaitouValue": jsonModel.clientUnite.clientUniteContent,
          "checked2": jsonModel.commercialUnite.ifPrintCommercialUnite,
          "shopTaitouValue": jsonModel.commercialUnite.commercialUniteContent,
          "bottomAdvertising": jsonModel.bottomAdvertising,
          "itemsReceipt": itemsreceipt,
          "items4": this.data.items4,
          "items5": this.data.items5,
          "itemsRadio": this.data.itemsRadio,
          "itemsReceipt": this.data.itemsReceipt
        });
        console.log("打印顾客联按钮",this.data.checked1);

      } else {
        console.log("没有查询到该设备号下的打印设置");
        bnApi.requestGet(sysConfig.apiUrl + "/system/dictionary/findByType/2000").then((res) => {
          console.log("打印设置初始化结果", res);
          if (res.success) {
            let value = JSON.parse(res.object.value);
            this.data.model = value;
            this.data.from.name = res.object.name;
            this.data.from.type = res.object.type;
            let itemsreceipt = this.data.itemsReceipt;
            for (let i = 0; i < itemsreceipt.length; i++) {
              if (itemsreceipt[i].name == value.orderIdPrint) {
                itemsreceipt[i].checked = true;
                this.data.items4[1].extra = itemsreceipt[i].value;
              }


            }

            let itemsRadio = this.data.itemsRadio;
            for (let i = 0; i < itemsRadio.length; i++) {
              if (itemsRadio[i].name == value.printTime) {
                itemsRadio[i].checked = true;
                this.data.items5[0].extra = itemsRadio[i].value;
              }



            }
            console.log("1", this.data.items4);
            console.log("1", this.data.items5);
            this.setData({
              "checked1": value.clientUnite.ifPrintClientUnite,
              "gukeTaitouValue": value.clientUnite.clientUniteContent,
              "checked2": value.commercialUnite.ifPrintCommercialUnite,
              "shopTaitouValue": value.commercialUnite.commercialUniteContent,
              "bottomAdvertising": value.bottomAdvertising,
              "itemsReceipt": itemsreceipt,
              "items4": this.data.items4,
              "items5": this.data.items5,
              "itemsRadio": this.data.itemsRadio,
              "itemsReceipt": this.data.itemsReceipt
            });
            console.log("data参数", this.data);
          } else {

          }
        });
      }
    });

  },
  //打印顾客联单选按钮
  switch1Change(e) {
    //顾客联按钮
    this.data.model.clientUnite.ifPrintClientUnite = e.detail.value;
    console.log("打印顾客联", e);
  },
  //顾客联内容
  gukeUreButton(e) {

    console.log("顾客联内容:", e.detail.value);
    this.data.model.clientUnite.clientUniteContent = e.detail.value;
    this.setData({
      "modalOpened1": false
    });
  },
  //打印商户联单选按钮
  switch2Change(e) {
    //商户联按钮
    this.data.model.commercialUnite.ifPrintCommercialUnite = e.detail.value;
    console.log("打印顾客联", e);
  },
  //商户联内容
  shopUreButton(e) {

    console.log("顾客联内容:", e.detail.value);
    this.data.model.commercialUnite.commercialUniteContent = e.detail.value;
    this.setData({
      "modalOpened2": false
    });
  },
  //底部广告
  bottomButton(e) {
    console.log("底部广告:", e.detail.value);
    this.data.model.bottomAdvertising = e.detail.value;
    this.setData({
      "modalOpened6": false
    });
    console.log("data参数", this.data);
  },
  onHide() {
    // 页面隐藏
    console.log("页面隐藏");
  },
  onUnload() {
    // 页面被关闭
    console.log("页面被关闭");
    //model进行转换
    let model = JSON.stringify(JSON.stringify(this.data.model));
    this.data.from.model = model.substr(1, model.length - 1);
    //调用保存
    bnApi.requestPost(sysConfig.apiUrl + "/system/config/update/"+this.data.from.id, this.data.from).then((res) => {
      if (res.success) {
        console.log("保存成功", res);

      } else {
        console.log("保存失败", res);
      }

    });

  },

});
