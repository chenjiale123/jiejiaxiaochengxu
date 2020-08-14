// pages/bill/bill.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billList:[],
    page: 1,
    pageSize: 10,
    pages: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 this.getBillList()
  },
getBillList(){
api._get('bill/findBillList?pageNum=1&pageSize=20')
.then(res=>{
  console.log(res)
  if(res.code==200){
    this.setData({
      billList:res.data
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
 onflash(pageNo){
  api._get('bill/findBillList?pageNum='+pageNo+'&pageSize='+this.data.pageSize)
  .then(res=>{
    console.log(res)
    if(res.code==200){
      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pages, //总页数
        billList:this.data.billList.concat(res.data) 
      })
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