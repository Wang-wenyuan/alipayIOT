Page({
  data: {
    startDate:"",
    endDate:"",
    successNum:100,
    breakNum:100,
    totalMoney:100,
    officialCount:100
  },
  onLoad(query) {
    console.log("url参数",query);
    this.data.startDate = query.startDate;
    this.data.endDate = query.endDate;
  },
});
