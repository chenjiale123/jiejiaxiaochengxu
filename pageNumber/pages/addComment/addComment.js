// pages/addComment/addComment.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xing:'',
    goods:{},
    img:[],
    value:'0',
    area:'',
    item1:[],
    countPic:5,//上传图片最大数量
    showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
    uploadImgUrl:api.baseUrl+'goodsComment/uploadFiles',//图片的上传的路径
    picList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item= JSON.parse(options.item) 
    console.log(item)
   this.setData({
     goods:item
   })
  },
  text(e){
  this.setData({
    area:e.detail.value
  })
  },

  handleChange(e){
  console.log(e)
  this.setData({
    xing:e.detail.value
  })
  },
  //监听组件事件，返回的结果
  myEventListener:function(e){
    console.log("上传的图片结果集合")
    console.log(e)
    this.setData({
      picList:e.detail.picsList
    })
   },

  switchChange(e){
    console.log(e)
    if(e.detail.value==true){
       this.setData({
         value:'0'
       })
    }else{
      this.setData({
        value:'1'
      })
    }
    console.log(this.data.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  sub(){
    var that=this
 
    api._posts('goodsComment/addGoodsCommentApplet',{
      moduleType:that.data.goods.moduleType,
      storeId:that.data.goods.storeId,
      orderId:that.data.goods.orderId,
      goodsInfoId:that.data.goods.goodsInfoId,
      goodsDetailId:that.data.goods.goodsDetailId,
      specValue:that.data.goods.specValue,
      specImg:that.data.goods.specImg,
      goodsName:that.data.goods.goodsName,
      type:'1',
      orderGoodsId:that.data.goods.orderGoodsId,
      score:that.data.xing,
      content:that.data.area,
      enclosureUrl:that.data.picList.join(','),
      platform:'0',
      isAnonymous:that.data.value
    })
    .then(res=>{
       console.log(res)
       if(res.code==200){
         wx.showToast({
           title: '评价成功',
           icon:'none'
         })
        wx.navigateTo({
          url: '../../../pagesSinger/pages/myComment/myComment?id=2',
          complete: (res) => {},
         
          fail: (res) => {},
          success: (result) => {},
        })
       }else{
        wx.showToast({
          title: res.message,
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