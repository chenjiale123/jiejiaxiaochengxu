// pages/loginUser/loginUser.js
const api = require('../../../utils/api.js')
const RSA = require('../../../utils/wx_rsa')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxlogin()
 
  },

  jiami (input_rsa) {
    var  publicKey='-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCD7+4W2LU+GURZmL1DfIBQF3eIdAs3VgPYURhp9OLa/XFr26VITBGtDFauUpz9ZCnbiO5ON7aSklHyiwGdE/iZzl1GozgmYVBCPqUQ2Wy358VyYLRStYuXXgjbZ8SLi0dE7D4QlulTYS18/iTfZ0qu7Kz9dEtXyi6NVaAs/Pn9VwIDAQAB-----END PUBLIC KEY-----'
    var encStr=''
   
    // var encrypt_rsa = new RSA.RSAKey();
    var encrypt_rsa = RSA.KEYUTIL.getKey(publicKey);
    console.log('加密RSA:')
    console.log(encrypt_rsa)
    encStr = encrypt_rsa.encrypt(input_rsa)
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr)
     return  encStr

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
  queryUserInfo(e) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var encryptedData = res.encryptedData;
        var iv = res.iv;
        api._get('login/getOpenidAndUnionid?encryptedData=' + encryptedData + '&code=' + that.data.code + "&iv=" + iv)
          .then(res => {
             console.log(res)
            if (res.code = 200) {
              let user = {
                openid: res.data.openid.openid,
                unionid: res.data.unionid.unionId,
                avatarUrl:res.data.unionid.avatarUrl
              }
         
              let info = JSON.stringify(user)
              console.log(info)
              api._post('login/login', {
                  autype: 'applet',
                  password: that.jiami(wx.getStorageSync('phone')),
                  username: info
                })
                .then(res => {
                  console.log(res)
                  if(res.code==200){
                    wx.setStorageSync('user', res.data.user)
                    wx.setStorageSync('token', res.data.Authentication)
                    wx.setStorageSync('openid', res.data.user.appletOpenId)
                    wx.switchTab({
                      url: '../../../pages/index/index',
                    })
                    wx.showToast({

                      title: '登录成功',
      
                      icon: "none",
      
                      duration: 2000
      
                    })
                  }else{
                    wx.showToast({

                      title: res.message,
      
                      icon: "none",
      
                      duration: 2000
      
                    })
                  }
                })

            } else {
              wx.showToast({

                title: res.message,

                icon: "none",

                duration: 2000

              })
            }

          })

      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})