// pagesSinger//pages/refoundApply/refoundApply.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleDetail:'',
    index:'',
    hidden:false,
    salesNum:1,
    tree:[{
      value:"1",
    name:'退货退款',
    checked:true
    },
    {
      value:"2",
      name:'退款',
      checked:false
      }],
      countPic:5,//上传图片最大数量
      showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
      uploadImgUrl: api.baseUrl+'afterSale/uploadFile',//图片的上传的路径
      picList:[],
      text1:'',
      type:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     salesDetail: JSON.parse(options.item) ,
     index:options.index
   })
   console.log(JSON.parse(options.item))
   console.log(options.index)
  },
  myEventListener:function(e){
    console.log("上传的图片结果集合")
    console.log(e)
    this.setData({
      picList:e.detail.picsList
    })
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  radioChange(e){
   console.log(e)
   var that=this
   if(e.detail.value=="1"){
     console.log('333')
     that.setData({
       type:e.detail.value,
       hidden:false
     })
     this.data.hidden=false
   } else if(e.detail.value=="2"){
    console.log('111')
    that.setData({
      type:e.detail.value,
      hidden:true
    })
    this.data.hidden=true
   }
  },
  getPlus(){
    var that = this
    var salesNum = 1
    if(that.data.salesNum< this.data.salesDetail.marketOrderGoodsList[this.data.index].goodsNumber){
      that.data.salesNum++
    }
     
 

    that.setData({
      salesNum: that.data.salesNum
    })
  },
  getMain(){
    var that = this
    var salesNum = 1
   if(that.data.salesNum>1) {
    that.data.salesNum--
   }
     
 

    that.setData({
      salesNum: that.data.salesNum
    })
    
  },
 text(e){
   this.setData({
     text1:e.detail.value
   })
 },
  sub(){
    
    if(this.data.salesDetail.moduleType==2){
       this.setData({
        type:"2"
       })
    }
api._posts('afterSale/applyAfterSale',{
  type:Number(this.data.type),
  moduleType:this.data.salesDetail.moduleType,
  storeId:this.data.salesDetail.storeId,
  orderId:this.data.salesDetail.id,
  orderGoodsId:this.data.salesDetail.marketOrderGoodsList[this.data.index].orderGoodsId,
  applyNum:this.data.salesNum,
  applyReason:this.data.text1,
  voucher:this.data.picList.join(',')
})
.then(res=>{
  console.log(res)
  if(res.code==200){
    wx.showToast({
      title: '申请成功',
      icon:'none'
    })
  wx.navigateTo({
    url: '../refoundListDetail/refoundListDetail?id='+res.data,
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