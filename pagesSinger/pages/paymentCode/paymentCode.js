// pages/paymentCode/paymentCode.js
const api = require('../../../utils/api.js')
const RSA = require('../../../utils/wx_rsa')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   hidden1:false,
   hidden2:false,
   time: 60,
   codeColor: "color:rgba(179,179,179,1);",
   iphone:wx.getStorageSync('phone'),
   newPassword1:'',
   againPassword1:'',
   code1:'',
   isSue:false,
   hidden:true
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
  code(e){
    if(this.data.againPassword1!==""&&e.detail.value!==''&&this.data.newPassword1!==""){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
   this.setData({
    code1:e.detail.value
   })
  },
  newPassword(e){
    if(this.data.againPassword1!==""&&e.detail.value!==''&&this.data.code1!==""){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
    this.setData({
      newPassword1:e.detail.value
     })
  },
  againPassword(e){
    if(this.data.newPassword1!==""&&e.detail.value!==''&&this.data.code1!==""){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
    this.setData({
      againPassword1:e.detail.value
     })
  },
  click1(){
   this.setData({
     hidden2:true
   })
  },
  click3(){
    this.setData({
      hidden1:true
    })
  },
  click2(){
    this.setData({
      hidden2:false
    })
   },
   click4(){
     this.setData({
       hidden1:false
     })
   },
   getfirst(){
  api._get('user/findPayPasswordIsExist')
  .then(res=>{
    console.log(res)
    this.setData({
      isSue:res.data
    })
  })
   },
  getCode() {

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

    api._get('common/sendSms?type=4&phone=' + this.data.iphone)
      .then(res => {
        if (res.code == 200) {
          console.log(res)
        }
      })
  },
  change(){
    if(this.data.code==""){
      wx.showToast({
        title: '请输入验证码',
        icon:'none'
      })
    }else if(this.data.newPassword1==""){
      wx.showToast({
        title: '请输入新密码',
        icon:'none'
      })
    }
   else  if(this.data.newPassword1!==this.data.againPassword1){
      wx.showToast({
        title: '两次输入的密码不一致，请重新输入',
        icon:'none'
      })
    }else{

  
        

        api._posts('user/updatePayPassword',{
          password:this.jiami(this.data.newPassword1),
          captcha:this.data.code1
        })
        .then(res=>{
          console.log(res)
          if(res.code==200){
            wx.showToast({
              title: '修改成功',
              icon:'none'
            })
            wx.navigateBack({
              complete: (res) => {},
              delta: -1,
              fail: (res) => {},
              success: (res) => {},
            })
          }else{
            wx.showToast({
              title: res.message,
              icon:'none'
            })
          }
        })
      
    
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this. getfirst()
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