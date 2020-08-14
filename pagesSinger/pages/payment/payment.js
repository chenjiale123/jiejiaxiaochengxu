// pagesSinger//pages/payment/payment.js
const api = require('../../../utils/api.js')
var util = require('../../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    order:'',
    userDetail:'',
    price:'',
    value:1,
    hidden:false,
    infomation:'',
    moduleType:'',
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    
  },
  detail(){
   this.setData({
     hidden:true
   })
   api._posts('order/getOrderDetail',{
     orderId:this.data.order
   })
   .then(res=>{
    console.log(res)
    if(res.code==200){
      this.setData({
        infomation:res.data
      })
    }
  })
  },
  close(){
    this.setData({
      hidden:false
    })
  },
  getUser() {
    api._get('user/findUserDetail')
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            userDetail: res.data
          })
        }
      })
  },
  back(){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定暂时不支付了吗？',
      howCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'rgba(255,76,79,1)',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'rgba(255,76,79,1)',//确定文字的颜色
      success:function(res){
        if(res.cancel){
          console.log("完成");
        }else{
       
          api._posts('order/cancelOrder',{
            orderId:that.data.order
          })
          .then(respon=>{
         if(respon.code==200){
             wx.showToast({
               title: '取消成功',
               icon:'none'
             })
            wx.navigateBack({
              complete: (res) => {},
              delta: 2,
              fail: (res) => {},
              success: (res) => {},
            })
         }else{
          wx.showToast({
            title: respon.message,
            icon:'none'
          })
         }
          })
        }
      },fail:function(res){},
      complete:function(res){}
    });

  },

  formatDuring:function (mss) {

    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((mss % (1000 * 60)) / 1000);
 
    return minutes + " : " + seconds ;
},
  radioChange(e){
   this.setData({
     value:e.detail.value
   })
  },
  pay(){
   if(this.data.value==2){
   api._posts('order/payOrder',{
    orderId:this.data.order
   })
   .then(res=>{
     console.log(res)
   })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let item=JSON.parse(options.item) 
    console.log(item)
    this.setData({
      time: item.date ,
      order:item.data.orderId,
      price:item.data.orderPrice,
      title:item.data.title,
      moduleType:item.data.moduleType
    })

 // 创建订单时间
    let ts = new Date().getTime(),
      tc = item.date;
    const cm = 15 * 60 * 1000 - (ts - tc);;
    this.runBack(cm);
    // this.showInputLayer();
    console.log(item.date)
  },

  runBack(cm) {
    var that = this
    var time1
    if (cm > 0) {

      cm > 60000 ?
        (time1 =
          (new Date(cm).getMinutes() < 10 ?
            '0' + new Date(cm).getMinutes() :
            new Date(cm).getMinutes()) +
          ':' +
          (new Date(cm).getSeconds() < 10 ?
            '0' + new Date(cm).getSeconds() :
            new Date(cm).getSeconds())) :
        (time1 =
          '00:' +
          (new Date(cm).getSeconds() < 10 ?
            '0' + new Date(cm).getSeconds() :
            new Date(cm).getSeconds()));
      this.setData({
        rocallTime: time1
      })
      const _msThis = this;
      that.data.inter = setTimeout(function () {
        cm -= 1000;
        _msThis.runBack(cm);
      }, 1000);
    } else {
      // 调用改变订单状态接口
   
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+that.data.order,
      complete: (res) => {},
      
      fail: (res) => {},
      success: (result) => {},
    })

    
      console.log('33333')
      clearInterval(that.data.inter);
    }
  },
  showInputLayer: function(){
    var that=this
    api._get('user/findPayPasswordIsExist')
    .then(res=>{
      console.log(res)
  
        if(res.data==true){
        if(that.data.value==1){
          that.setData({ showPayPwdInput: true, payFocus: true });
    
        }else{
          api._posts('wxPay/unifiedorder',{
            price:that.data.value,
            consumeType:"2",
            tradeType:'JSAPI',
            orderId:that.data.order,
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
          
    
              wx.navigateTo({
                url: '../paySuccess/paySuccess?id='+that.data.order,
                complete: (res) => {},
           
                fail: (res) => {},
                success: (result) => {},
              })
              },
              'fail': function(res) {
            
            
          
              },
              'complete': function(res) {}
            })
           })
        }
      }else{
        wx.showToast({
          title: '你还未设置支付密码请设置',
          icon:'none'
        })
        wx.navigateTo({
          url: '../paymentCode/paymentCode',
          complete: (res) => {},
        
          fail: (res) => {},
          success: (result) => {},
        })
      }
    })
 
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    /**获取输入的密码**/
    var that=this
    var val = this.data.pwdVal;
	/**在这调用支付接口**/
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function(){
      /**弹框**/
  
      
  api._posts('remainingSum/remainingSumPay',{
    orderId:that.data.order,
    moduleType:that.data.moduleType,
    payPwd:String(val)
  })
  .then(res=>{
    if(res.code==200){
      wx.showToast({
        title: "支付成功",
        icon:'none'
      })
      wx.navigateTo({
        url: '../paySuccess/paySuccess?id='+that.data.order,
        complete: (res) => {},
   
        fail: (res) => {},
        success: (result) => {},
      })
    }else{
      wx.showToast({
        title: res.message,
        icon:'none'
      })
    }
    console.log(res)
  })

    });

  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });

      if (e.detail.value.length >= 6){
        this.hidePayLayer();
      }
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
this.getUser()

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