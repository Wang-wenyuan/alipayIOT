Page({
  data: {
    items: [
      {
        thumb: '/image/timg.jpg',
        title: '设备绑定',
        extra: '未绑定',
        arrow: true,
      },
    ],
    items1: [
      {
        thumb: '/image/timg.jpg',
        title: '收款模式',
        extra: '即插即用模式',
        arrow: true,
      },
      {
        thumb: '/image/timg.jpg',
        title: '默认支付方式',
        extra: '刷脸支付',
        arrow: 'up',
      },

    ],
    items2: [
      {
        thumb: '/image/timg.jpg',
        title: '打印设置',
        extra: '即插即用模式',
        arrow: true,
      },
    ],
    items3: [
      {
        thumb: '/image/timg.jpg',
        title: '系统设置',
        extra: '',
        arrow: true,
      },

    ],
    items4: [
      {
        thumb: '/image/timg.jpg',
        title: '软件版本',
        extra: '0.0.1',
      },
      {
        thumb: '/image/timg.jpg',
        title: '小程序容器版本',
        extra: 'xxxxx',
      }
    ],
    snValue: "",//sn版本号
    printerId: ""
  },
  onLoad() {
    //版本号栏目
    this.versionShow();
    this.getSnValue();
    
  },
  onShow() {
    //监听打印设备
    this.listenMonitorPrinter();  
    //设备是否绑定
    let extra = "未绑定";
    let items =  [
      {
        thumb: '/image/timg.jpg',
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
            thumb: '/image/timg.jpg',
            title: '软件版本',
            extra: '0.0.1',
          },
          {
            thumb: '/image/timg.jpg',
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
  }
});
