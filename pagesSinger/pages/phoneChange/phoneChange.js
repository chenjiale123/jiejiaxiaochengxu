// pages/phoneChange/phoneChange.js
const api = require('../../../utils/api.js')
const RSA = require('../../../utils/wx_rsa')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    newtime: 60,
    codeColor: "color:rgba(179,179,179,1);",
    sendCode: false,
    phone: '',
    YZcode: '',
    btn: true,
    phonenum: '',
    codenum:'',
    newphonenum: '',
    newcodenum:'',
    hidden:true,
    show:false,
    newcode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     

  },

  

  phone(e) {
    if(this.data.codenum!==""&&e.detail.value!==''){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
    this.setData({
      phonenum: e.detail.value
    })
  },
  code(e) {
    if(this.data.phonenum!==""&&e.detail.value!==''){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
    this.setData({
      codenum: e.detail.value
    })
  },

  newphone(e) {
    if(this.data.newcodenum!==""&&e.detail.value!==''){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
    this.setData({
      newphonenum: e.detail.value
    })
  },
  newcode(e) {
    if(this.data.newphonenum!==""&&e.detail.value!==''){
      this.setData({
        hidden:false
      })
    }else{
      this.setData({
        hidden:true
      })
    }
    this.setData({
      newcodenum: e.detail.value
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

    api._get('common/sendSms?type=2&phone=' + this.data.phonenum)
      .then(res => {
        if (res.code == 200) {
          console.log(res)
        }else{
          wx.showToast({

            title: res.message,
  
            icon: "none",
  
            duration: 2000
  
          })
        }
      })
  },

  newgetCode() {

    var that = this
    var newtimer1 = setInterval(function () {
      if (that.data.newtime > 0) {

        var newtime = that.data.newtime - 1
        that.setData({
          newcode: true,
          newtime: newtime,
        })
      } else {
        that.setData({
          newcode: false,
          newtime: 60,
        })
        clearInterval(newtimer1);

      }
    }, 1000)

    api._get('common/sendSms?type=3&phone=' + this.data.phonenum)
      .then(res => {
        if (res.code == 200) {
          console.log(res)
        }else{
          wx.showToast({

            title: res.message,
  
            icon: "none",
  
            duration: 2000
  
          })
        }
      })
  },
  next(){
    api._posts('user/updatePhoneCompareCaptcha',{
      type: 0,
      captcha:this.data.codenum ,
      phone: this.data.phonenum

 
     })
     .then(res=>{
   
       if(res.code==200){
          this.setData({
            show:true
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
  change(){
  api._posts('user/updatePhoneCompareCaptcha',{
    phone:this.data.newphonenum,
    captcha:this.data.newcodenum,
    type:1

  })
  .then(res=>{
    if(res.code==200){
      console.log(res)
      wx.showToast({
        title: '更换成功',
        icon:'none'
      })
      wx.navigateBack({
        complete: (res) => {},
        delta: 1,
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