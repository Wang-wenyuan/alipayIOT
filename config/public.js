export default {
  requestGet(url) {
    return new Promise((resolve, reject) => {
      my.request({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          console.log("错误结果",res);
          reject(res.data)
        }
      });

    })
  },
   requestPost(url,params) {
    return new Promise((resolve, reject) => {
      my.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data:params,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          console.log("错误结果",res);
          reject(res.data)
        }
      });

    })
  },

}