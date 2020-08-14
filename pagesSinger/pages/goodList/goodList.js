// pages/goodList/goodList.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: "",
    Tab: 0,
    tab: 0,
    id: '',
    tree: [],
    classId:'',
    page: 1,
    pageSize: 10,
    pages: 0,
    goodlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id,
        currentTab:options.id,
        type:options.type,
        childid:options.childid,
        tab:Number(options.childid) 
      })
     console.log(options.childid)
      this.getClassGood()
    }

  },
  detail(e){
   wx.navigateTo({
     url: '../goodsDetail/goodsDetail?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type,
   })
  },
  back() {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  more() {
    wx.navigateTo({
      url: '../../../pageNumber/pages/classify/classify',
    })
  },


  //点击切换

  clickTab: function (e) {
    this.setData({
      id:e.currentTarget.dataset.id,
      classId:''
    })
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.id) {
      return false;
    } else {
      
      that.setData({
        currentTab: e.currentTarget.dataset.id,
      })
    }
    this.getClassGood()
  },
  click: function (e) {
    var that = this;
    this.setData({
     
      classId:e.currentTarget.dataset.id
    })
    if (this.data.tab === e.currentTarget.dataset.id) {
      return false;
    } else {
      console.log(e)
      that.setData({
        tab: e.currentTarget.dataset.id,
      })
    }
    this.getClassGood()

  },
  getClassGood(){
    api._get('home/findStoreGoodsByType?storeId='+wx.getStorageSync('storeId')+'&parentClassId='+this.data.id+'&classId='+this.data.classId+'&tType=1'+'&moduleType='+this.data.type+'&pageNum=1&pageSize=20')
    .then(res=>{
      console.log(res)
      for (let i in res.data.list){
        res.data.list[i].mainImg=res.data.list[i].mainImg.split(',')[0]
      }
       console.log(res.data.list)
      this.setData({
        goodlist:res.data.list
      })
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getClass() {
    api._get('common/findAllClassTree')
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          var arr=[]
          for(let i in res.data){
            for(let j in res.data[i].subclass){
              arr.push(res.data[i].subclass[j])
            }
            //  arr.concat(res.data[i].subclass)
         
          }
          console.log(arr)
          this.setData({
            tree: arr
          })
        }

      })
  },
  onfrash: function (pageNo) {
    var that = this
 
    api._get('home/findStoreGoodsByType?storeId='+wx.getStorageSync('storeId')+'&parentClassId='+this.data.id+'&classId='+this.data.classId+'&tType=1'+'&moduleType='+this.data.type+'&pageNum='+pageNo+'&pageSize='+this.data.pageSize)
    .then(res=>{
      console.log(res)
      for (let i in res.data.list){
        res.data.list[i].mainImg=res.data.list[i].mainImg.split(',')[0]
      }
      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pages, //总页数
        goodlist: this.data.goodlist.concat(res.data.list)
     
      })
      
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getClass()
    //  api._get('/home/findStoreGoodsByType')
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
    this.getClassGood()
    this.getClass()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onfrash(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})