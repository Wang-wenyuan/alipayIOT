export default {
  requestGet(url) {
    return new Promise((resolve, reject) => {
      my.request({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          console.log("错误结果",res);
          reject(res)
        }
      });

    })
  }
}