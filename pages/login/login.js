// pages/login/login.js

const api = require('../../utils/api.js')


Page({
  data: {
    code: ''
  },
  //事件处理函数


  phone() {
    wx.navigateTo({
      url: '../../pagesSinger/pages/phoneLogin/phoneLogin',
    })
  },

  onLoad: function () {
    this.wxlogin()
   
  },
  wxlogin() {
    wx.login({
      success: res => {

        this.setData({
          code: res.code
        })
      }
    });
  },

  getPhoneNumber:function(e) {
    var that = this;

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny'){  

            wx.showModal({  
      
                title: '提示',  
      
                showCancel: false,  
      
                content: '未授权',  
      
                success: function (res) { }  
      
            })  
      
          } else {  
      
            api._get('login/getOpenidAndUnionid?encryptedData=' + e.detail.encryptedData + '&code=' + this.data.code + "&iv=" + e.detail.iv)
        .then(res => {
          if (res.code = 200) {
  
            wx.setStorageSync('phone', res.data.unionid.phoneNumber)
            wx.navigateTo({
              url: '../../pagesSinger/pages/loginUser/loginUser',
            })
  
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
  
            })
          }
  
        })
      
          }
      

 


    

  }

})