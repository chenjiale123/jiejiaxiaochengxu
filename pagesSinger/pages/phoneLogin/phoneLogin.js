// pages/phoneLogin/phoneLogin.js

const RSA = require('../../../utils/wx_rsa')
//获取应用实例

const api = require('../../../utils/api')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    codeColor: "color:rgba(179,179,179,1);",
    sendCode: false,
    phone: '',
    YZcode: '',
    btn: true
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


  sendCode: function (e) {
    var that = this
    var timer1 = setInterval(function () {
      if (that.data.time > 0) {

        var time = that.data.time - 1
        that.setData({
          code: true,
          time: time,
        })
      } else {
        that.setData({
          code: false,
          time: 60,
        })
        clearInterval(timer1);

      }
    }, 1000)

    // 请求
    api._get('common/sendSms?phone=' + this.data.phone+'&type=0' )
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({

            title: '发送成功',

            icon: 'none',

            duration: 2000

          })
        } else {
          wx.showToast({

            title: res.message,

            icon: 'none',

            duration: 2000

          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  userphone(e) {
    this.setData({
      phone: e.detail.value
    })

    if (e.detail.value.length == 11){
      this.setData({
        codeColor: "rgba(255,76,79,1);"
      })
    }
    if (e.detail.value.length == 11 && this.data.YZcode.length == 6) {

      this.setData({
        btn: false
      })
    }
  },
  inputWatch(e) {
    this.setData({
      YZcode: e.detail.value
    })
    if (e.detail.value.length == 6 && this.data.phone.length == 11) {

      this.setData({
        btn: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 
  login(){
    api._post('login/login',{
      autype: 'mobile',
      password:this.jiami(this.data.YZcode) ,
      username: this.data.phone
     })
     .then(res=>{
   
       if(res.code==200){
         wx.setStorageSync('token', res.data.Authentication)
         wx.setStorageSync('user', res.data.user)
         wx.setStorageSync('openid', res.data.user.appletOpenId)
        wx.showToast({

          title: '登录成功',

          icon: "none",

          duration: 2000

        })
        wx.switchTab({
          url: '../../../pages/index/index',
        })
      }else{
        wx.showToast({

          title: res.message,

          icon: "none",

          duration: 2000

        })
      }
     })
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