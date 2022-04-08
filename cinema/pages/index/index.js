// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    domain:'http://3.cn/',
    xhr:[]
  },
  onLoad(){
    var o = this;
    var para = 
    {
      "banner":
      {
        "len":2,
        "order":"pid",
        "byway":"desc"
      },
      "movie":
      {
        "len":3,
        "order":"score",
        "byway":"desc"
      },
      "ranking":
      {
        "len":10,
        "order":"hits",
        "byway":"desc"
      }
    }
    para = JSON.stringify(para)
    wx.request({
      url: this.data.domain +'?s=index/home',
      method:"POST",
      data:{
        "para":para
      },
      success(res){
        console.log(res)
        o.setData({
          xhr:res.data
        })
      }
    })
  }
})
