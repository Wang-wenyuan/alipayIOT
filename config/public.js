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
        timeout:70000,
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
  requestUpdate(url,params) {
    return new Promise((resolve, reject) => {
      my.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data:params,
        timeout:60000,
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