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
    itemsReceipt:[
      { name: '1', value: '条形码' },
      { name: '2', value: '二维码' }
    ],
    printId: "",
    modalOpened1: false,
    modalOpened2: false,
    modalOpened3: false,
    modalOpened4: false,
    taitouSetting1: "",
    taitouSetting2: "",
    taitouSetting3: ""
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
      "modalOpened4": false
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
    console.log("单选按钮选择后内容", e);
  },
  //小票订单打印单选按钮
  radioChange1(e){
    console.log("单选按钮选择后内容", e);
  },
  //打印测试
  printLin() {
    my.ix.printer({
      cmds: [{'cmd':'addSelectPrintModes', 'args':['FONTA', 'ON', 'OFF', 'OFF', 'ON']}, //设置打印模式
         {'cmd':'addSelectJustification', 'args': ['CENTER']},//剧中
         {'cmd':'addText', 'args':['北京邦诺电子科技优先公司']},
         {'cmd':'addPrintAndLineFeed', 'args':[]},//换行
         {'cmd':'addPrintAndLineFeed', 'args':[]},//换行

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['LEFT']},//左边
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['开始时间']},
          {'cmd':'addSetAbsolutePrintPosition', 'args':['192']},
         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         //{'cmd':'addSelectJustification', 'args': ['RIGHT']},//
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['2019-12-16 0:0']},
         {'cmd':'addPrintAndLineFeed', 'args':[]},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['LEFT']},//左边
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['结束时间']},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSetAbsolutePrintPosition', 'args':['192']},
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['2019-12-20 0:0']},
         {'cmd':'addPrintAndLineFeed', 'args':[]},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['LEFT']},//
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['订单总金额：0.00元']},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSetAbsolutePrintPosition', 'args':['192']},
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['实收总计：0.00']},
         {'cmd':'addPrintAndLineFeed', 'args':[]},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['LEFT']},//
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['成功笔数：']},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSetAbsolutePrintPosition', 'args':['192']},
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['0笔']},
         {'cmd':'addPrintAndLineFeed', 'args':[]},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['LEFT']},//
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['退款总计：']},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'OFF', 'OFF', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['RIGHT']},//
         {'cmd':'addTurnDoubleStrikeOnOrOff', 'args': ['OFF']},//颜色变化
         {'cmd':'addText', 'args':['0.00元']},
         {'cmd':'addPrintAndLineFeed', 'args':[]},

         {'cmd':'addSelectPrintModes', 'args':['FONTA', 'OFF', 'ON', 'ON', 'OFF']},
         {'cmd':'addSelectJustification', 'args': ['CENTER']},//
         {'cmd':'addText', 'args':['结束']},
         {'cmd':'addPrintAndLineFeed', 'args':[]}],
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
  },
});
