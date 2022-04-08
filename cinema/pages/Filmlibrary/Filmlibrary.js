// pages/Filmlibrary/Filmlibrary.js
Page({
    data: {
        list:'http://3.cn/',
        banner:[]
    },
    onLoad(){
      var o = this;
      wx.request({
        url:this.data.list+'?s=index/home',
        success(res){
            o.setData({
              banner:res.data
            })
        } 
      })
    }
}) 