// pages/mine/mine.js
// pages/loginUser/loginUser.js
const api = require('../../../utils/api.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    storelist:[],
    currentTab: 0,
    tree:[{
      name:'商品足迹'
    },{
      name:'门店足迹'
    }],
    page: 1,
    pageSize: 10,
    pages: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      console.log(e.currentTarget.dataset.current)
      that.setData({
        currentTab: e.currentTarget.dataset.current,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
getMyfoot(){
api._get('browseHistory/findGoodsBrowseHistoryList?pageNum=1&pageSize=20')
.then(res=>{
  console.log(res)
  if(res.code==200){
    this.setData({
      list:res.data.list
    })
  }else{
    wx.showToast({
      title: res.message,
      icon:"none"
    })
  }
})
},



getMyfootStore(){
var that=this

  wx.getLocation({
    type: 'gcj02',
    success: (res)=> {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      this.setData({ latitude: latitude, longitude: longitude})
       
      api._get('browseHistory/findStoreBrowseHistoryList?pageNum=1&pageSize=100&userLng='+longitude+'&userLat='+latitude)
  .then(res=>{
    console.log(res)
    if(res.code==200){
      that.setData({
        storelist:res.data.list
      })
    }else{
      wx.showToast({
        title: res.message,
        icon:"none"
      })
    }
  })



    }

  })






},
storeDetail(e){
  console.log(e)
  if(e.currentTarget.dataset.storeid!==wx.getStorageSync('storeId')){

    wx.showModal({
      title: '切换门店',
      content: '是否切换门店？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”

      confirmText:"是",//默认是“确定”
    
      success: function (res) {
        if (res.cancel) {}else{

        api._posts('home/storageUserStore',{
          storeId :e.currentTarget.dataset.storeid
        })
        .then(res=>{
          wx.switchTab({
            url: '../../../pages/index/index',
          })
        })
       
   
      
        }
      }
    })
    

  }else{
    wx.showToast({
      title: '你选择的是当前门店',
      icon:'none'
    })
  }
},
detail(e){
  console.log(e.currentTarget.dataset.storeid)
  console.log(wx.getStorageSync('storeId'))
  if(e.currentTarget.dataset.storeid!==wx.getStorageSync('storeId')){
    wx.showModal({
      title: '切换门店',
      content: '该商品不属于当前门店是否切换？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”

      confirmText:"是",//默认是“确定”
    
      success: function (res) {
        if (res.cancel) {}else{
          wx.navigateTo({
            url: '../../../pagesSinger/pages/goodsDetail/goodsDetail?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type+'&storeId='+e.currentTarget.dataset.storeid,
            complete: (res) => {},
          
            fail: (res) => {},
            success: (result) => {},
          })
        }
      
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })
  }else{
    wx.navigateTo({
      url: '../../../pagesSinger/pages/goodsDetail/goodsDetail?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type+'&storeId='+e.currentTarget.dataset.storeid,
      complete: (res) => {},
    
      fail: (res) => {},
      success: (result) => {},
    })
  }

},
store(e){
wx.navigateTo({
  url: '../storeDetail/storeDetail?storeid='+e.currentTarget.dataset.storeid,
  complete: (res) => {},

  fail: (res) => {},
  success: (result) => {},
})
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  this.getMyfoot()
  this.getMyfootStore()
  },
  onfrash: function (pageNo) {
    var that = this
 
    api._get('browseHistory/findGoodsBrowseHistoryList?pageNum='+pageNo+'&pageSize='+this.data.pageSize)
    .then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          page: pageNo, //当前的页号
          pages: res.data.pages, //总页数
          list:  this.data.list.concat( res.data.list)
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:"none"
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
    this.getMyfoot()
    this.getMyfootStore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onfrash(this.data.page+1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})