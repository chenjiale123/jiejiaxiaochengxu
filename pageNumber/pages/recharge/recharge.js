// pagesSinger//pages/recharge/recharge.js
const api = require('../../../utils/api.js')
var util = require('../../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 money(e){

  this.setData({
    value:e.detail.value,
    
  })
  if(e.detail.value.length>0){
    this.setData({
      hidden:true
    })
  }else{
    this.setData({
      hidden:false
    })
  }
 },
 pay(){
 api._posts('wxPay/unifiedorder',{
  price:this.data.value,
  consumeType:"1",
  tradeType:'JSAPI',
  orderId:'',
  openid:wx.getStorageSync('openid')
 })
 .then(res=>{
   console.log(res)
   var sting = "appId=" + res.data.appid + "&nonceStr=" + res.data.noncestr + "&package=prepay_id=" + res.data.prepayid + "&signType=MD5&timeStamp=" + res.data.timestamp.toString() + "&key=fxl123456789123456789123456789jj"
 console.log(sting)
 console.log(util.hexMD5(sting).toUpperCase())
   wx.requestPayment({
    'appId': res.data.appid,
    'timeStamp': res.data.timestamp.toString(),
    'nonceStr': res.data.noncestr,
    'package':  'prepay_id='+res.data.prepayid,
    'signType': 'MD5',
    'paySign': util.hexMD5(sting).toUpperCase(),
    'success': function(res) {
     console.log(res)
     wx.showToast({
       title: '支付成功',
     })
     wx.navigateBack({
       complete: (res) => {},
       delta: 0,
       fail: (res) => {},
       success: (res) => {},
     })
    },
    'fail': function(res) {
  
  

    },
    'complete': function(res) {}
  })
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