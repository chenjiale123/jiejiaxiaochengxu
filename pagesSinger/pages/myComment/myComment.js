// pages/mine/mine.js
// pages/loginUser/loginUser.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:[],
    currentTab: 0,
    tree:[{
      name:'待评价'
    },{
      name:'已评价'
    }],
    page:1,
    pageSize:10,
    pages:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        comid:options.id
      })
    }
    console.log(options)
    if(this.data.comid=="2"){
      this.setData({
        currentTab:1
      })
    }

  },
  set(e){
api._posts('goodsComment/updAnonymousStatus',{
  isAnonymous:'0',
  id:e.currentTarget.dataset.id
}).then(res=>{
  console.log(res)
  if(res.code==200){
    
  }else{
    wx.showToast({
      title: res.message,
      icon:"none"
    })
  }
})
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
  comment(e){
    console.log(e)
  wx.navigateTo({
    url: '../../../pageNumber/pages/addComment/addComment?item='+JSON.stringify(e.currentTarget.dataset.id),
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
detail(e){
 wx.navigateTo({
   url: '../../../pagesSinger/pages/goodsDetail/goodsDetail?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type,
   complete: (res) => {},

   fail: (res) => {},
   success: (result) => {},
 })
},
  /**
   * 生命周期函数--监听页面显示
   */


  onShow: function () {

  // this.onfrash(1)
  // this.onfrash1(1)
  this. getcomm()
  this.getcomm1()
  console.log(this.data.comid)


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
  getcomm(){

    api._get('goodsComment/findCommentList?pageNum=1&pageSize=20').then(res => {
      console.log(res)

      this.setData({
  
        list: res.data.list
      })
      for (let i in this.data.list) {


        var img = this.data.list[i].enclosureUrl
  
        if (img == "" || img == null) {
          console.log('111')
          this.data.list[i].ImagePath = [];
  
        } else {
          console.log('222')
          console.log(img.split(','))
          this.data.list[i].ImagePath = img.split(',');
  
  
        }
      }
  
      this.setData({
        list: this.data.list
      })

    }).catch(e => {
      console.log(e)
    })
  },

  getcomm1(){

    var that = this

    api._get('goodsComment/findWaitCommentList?pageNum=1&pageSize=20').then(res => {
      console.log(res)

      this.setData({
    
        list1: res.data.list
      })
      for (let i in this.data.list1) {


        var img = this.data.list1[i].enclosureUrl
  
        if (img == "" || img == null) {
          console.log('111')
          this.data.list1[i].ImagePath = [];
  
        } else {
          console.log('222')
          console.log(img.split(','))
          this.data.list1[i].ImagePath = img.split(',');
  
  
        }
      }
  
      this.setData({
        list1: this.data.list1
      })

    }).catch(e => {
      console.log(e)
    })
  },
  onfrash: function (pageNo) {
    var that = this

    api._get('goodsComment/findCommentList?pageNum='+pageNo+'&pageSize='+this.data.pageSize).then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pages, //总页数
        list: this.data.list.concat(res.data.list)
      })
      for (let i in this.data.list) {


        var img = this.data.list[i].enclosureUrl
  
        if (img == "" || img == null) {
          console.log('111')
          this.data.list[i].ImagePath = [];
  
        } else {
          console.log('222')
          console.log(img.split(','))
          this.data.list[i].ImagePath = img.split(',');
  
  
        }
      }
  
      this.setData({
        list: this.data.list
      })

    }).catch(e => {
      console.log(e)
    })
  },

  onfrash1: function (pageNo) {
    var that = this

    api._get('goodsComment/findWaitCommentList?pageNum='+pageNo+'&pageSize='+this.data.pageSize).then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pages, //总页数
        list1: this.data.list1.concat(res.data.list)
      })
      for (let i in this.data.list1) {


        var img = this.data.list1[i].enclosureUrl
  
        if (img == "" || img == null) {
          console.log('111')
          this.data.list1[i].ImagePath = [];
  
        } else {
          console.log('222')
          console.log(img.split(','))
          this.data.list1[i].ImagePath = img.split(',');
  
  
        }
      }
  
      this.setData({
        list1: this.data.list1
      })

    }).catch(e => {
      console.log(e)
    })
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
    this.onfrash(this.data.page + 1)
    this.onfrash1(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})