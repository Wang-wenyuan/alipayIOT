Page({
  data: {
    orderId:"",
    data:{}
  },
  onLoad(query) {
    console.log("query",query);
    this.data.orderId = query.orderId;
  },
  onShow(){
    
    //进行查询
  }
});
