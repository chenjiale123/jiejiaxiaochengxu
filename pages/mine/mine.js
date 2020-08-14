// pages/mine/mine.js
// pages/loginUser/loginUser.js
const api = require('../../utils/api.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:"../../image/toux@2x.png",
    name:'你还未登陆，请点击登陆',
    goodList:[],
    hidden:false,
    cardTeams:[]
  },
  shopping(){
    wx.navigateTo({
      url: '../../pageNumber/pages/shoppingCar/shoppingCar',
    })
  },
  recharge(){
    wx.navigateTo({
      url: '../../pageNumber/pages/recharge/recharge',
    })
  },
  edit(){
 wx.navigateTo({
   url: '../../pagesSinger/pages/peoInfo/peoInfo',
 })
  },
  footprint(){
    wx.navigateTo({
      url: '../../pageNumber/pages/footprint/footprint',
    })
  },
  setting(){
    wx.navigateTo({
      url: '../../pageNumber/pages/setting/setting',
    })
  },
  bill(){
    wx.navigateTo({
      url: '../../pageNumber/pages/bill/bill',
    })
  },
  comment(){
wx.navigateTo({
  url: '../../pagesSinger/pages/myComment/myComment',
})
  },
add(){
wx.navigateTo({
  url: '../../pagesSinger/pages/myComment/myComment',
})
},
wait(e){
  app.globalData.typeId=1
  wx.switchTab({

    url: '../../pages/order/order',
  })
},
ing(e){
  app.globalData.typeId=5
  wx.switchTab({
    url: '../../pages/order/order',
  })
},
finish(e){
  app.globalData.typeId=7
  wx.switchTab({
    url: '../../pages/order/order',
  })
},
findAll(){
  app.globalData.typeId=''
  wx.switchTab({
    url: '../../pages/order/order',
  })
},
afterSale(){
wx.navigateTo({
  url: '../../pageNumber/pages/refoundList/refoundList',
  complete: (res) => {},
 
  fail: (res) => {},
  success: (result) => {},
})
},

getCarList() {


  api._get('cart/findCartList?storeId=' + wx.getStorageSync('storeId')).then(res => {
    if (res.code == 200) {
      console.log(res)

      this.setData({
        cardTeams: res.data
      })

    }


  }).catch(e => {
    console.log(e)
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
detail(e){
wx.navigateTo({
  url: '../../pagesSinger/pages/goodsDetail/goodsDetail?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type,
  complete: (res) => {},
 
  fail: (res) => {},
  success: (result) => {},
})
},
getList(){
api._get('recommend/findRecommendStoreGoods?storeId='+wx.getStorageSync('storeId'))
.then(res=>{
  if(res.code==200){
    for(let i in res.data){
      res.data[i].mainImg=res.data[i].mainImg.split(',')[0]
    }
    this.setData({
      goodList:res.data
    })
  }
})
},
login(){
wx.navigateTo({
  url: '../login/login',
  complete: (res) => {},

  fail: (res) => {},
  success: (result) => {},
})
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  let user=wx.getStorageSync('user')
  console.log(user)
  this.setData({
    icon:user.avatarUrl,
    name:user.username,

  })
  this.getUser()
  this.getList()
  this.getCarList()
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