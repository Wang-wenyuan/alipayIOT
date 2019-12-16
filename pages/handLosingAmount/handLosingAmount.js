Page({
  data: {
    numList: [
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '标题文字',
      },
    ],
    money: ""
  },
  onLoad() { },
  onItemClick(ev) {
    my.alert({
      content: ev.detail.index,
    });
  },
  //数字键盘点击事件
  numClick(ev) {
    let index = ev.target.id;
    console.log("index", index);
    my.createSelectorQuery().select("#"+index)
    if (index < 9) {
      this.data.money = this.data.money + (index+1);
    }
    switch (index) {
      case "floatButton":
        this.data.money = this.data.money+".";
        break;
      case "zeroButton":
      this.data.money = this.data.money+"0";
        break;
      case "breakButton":
        //删除
        this.data.money = (this.data.money).substring(0,(this.data.money).length-1);
        break;
    }
    console.log("this.data.money", this.data.money);
    this.setData({
      "money": this.data.money
    });
    console.log("数字键盘", ev);
  }
});
