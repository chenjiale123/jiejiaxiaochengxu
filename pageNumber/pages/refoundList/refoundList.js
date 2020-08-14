// pagesSinger//pages/refoundList/refoundList.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    pages: 0,
    salesList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  orderDetail(e){
   wx.navigateTo({
     url: '../refoundListDetail/refoundListDetail?id='+e.currentTarget.dataset.id,
     complete: (res) => {},
  
     fail: (res) => {},
     success: (result) => {},
   })
  },
  getList() {
    api._get('afterSale/getAfterSaleList?storeId=' + wx.getStorageSync('storeId') + '&pageNum=1' + "&pageSize=20")
      .then(res => {
        console.log(res)
        if (res.code == 200) {


          for (let i in res.data) {
            res.data[i].afterSaleGoodInfoVo.spc = JSON.parse(
              res.data[i].afterSaleGoodInfoVo.goodsSpec
            );
            res.data[i].afterSaleGoodInfoVo.goodsImg=res.data[i].afterSaleGoodInfoVo.goodsImg.split(',')[0]
          }
          this.setData({
            
            salesList: res.data
          })
        }
      })
  },
  onflash(pageNo){
    api._get('afterSale/getAfterSaleList?storeId=' + wx.getStorageSync('storeId') + '&pageNum='+ pageNo+ "&pageSize="+this.data.pageSize)
    .then(res => {
      console.log(res)
      if (res.code == 200) {


        for (let i in res.data) {
          res.data[i].afterSaleGoodInfoVo.spc = JSON.parse(
            res.data[i].afterSaleGoodInfoVo.goodsSpec
          );
          res.data[i].afterSaleGoodInfoVo.goodsImg=res.data[i].afterSaleGoodInfoVo.goodsImg.split(',')[0]
        }
        this.setData({
          page: pageNo, //当前的页号
          pages: res.data.pages, //总页数
          salesList: this.data.salesList.concat(res.data) 
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
  },
  findDetail(e){
    wx.navigateTo({
      url: '../refoundListDetail/refoundListDetail?id='+e.currentTarget.dataset.id,
      complete: (res) => {},
   
      fail: (res) => {},
      success: (result) => {},
    })
  },
  cancelOrder(e){
  var that=this
    wx.showModal({
      title: '提示',
      content: '确定要取消售后！',
      howCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
      success: function (res) {
        if(res.cancel){}else{
        api._posts('afterSale/afterSaleCancel',{
          id:e.currentTarget.dataset.id,
          type:e.currentTarget.dataset.type
        })
        .then(res=>{
          if(res.code==200){
            wx.showToast({
              title: '取消成功',
              icon:'none'
            })
            that.getList()
          }else{
            wx.showToast({
              title: res.message,
              icon:'none'
            })
          }
        })
      }
      }

    })


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
    this.onflash(this.data.page+1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})