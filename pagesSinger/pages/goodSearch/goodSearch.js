// pages/goodSearch/goodSearch.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    hidden: true,
    currentTab: 0,
    hidden1: true,
    arr: [],
    searchRecord: [],
    goodList: []
  },
  back() {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  detail(e) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getKey()
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
  },

  searchSubmitFn: function (e) {
    var that = this

    var searchRecord = this.data.searchRecord
    if (e.detail.value == '') {
      //输入为空时的处理
    } else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 5) {
        searchRecord.unshift({
          value: e.detail.value,

        })
      } else {
        searchRecord.pop() //删掉旧的时间最早的第一条
        searchRecord.unshift({
          value: e.detail.value,

        })
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
    this.setData({
      keyword1: e.detail.value
    })
    let storeId = wx.getStorageSync('storeId')

    api._post("home/findStoreGoodsByKeyword", {
        dtoList: [],
        keyword: this.data.keyword1,
        pageNum: 1,
        pageSize: 100,
        storeId: storeId
      })
      .then(res => {
        console.log(res)
        this.setData({
          hidden: false,
          goodData: res.data.classList,
          goodsList: res.data.storeGoodsInfo.list
        })
      })


  },
  historyDelFn: function () {
    wx.removeStorageSync('searchRecord')
    this.setData({
      searchRecord: []
    })
  },
  topsearch(e) {
    this.setData({
      keyword1: e.detail.value
    })
    let storeId = wx.getStorageSync('storeId')
    api._get('home/findStoreGoodsByKeyword?storeId=' + storeId + '&keyword=' + this.data.keyword1 + "&classId=''" + '&pageNum=1&pageSize=100')
      .then(res => {

        console.log(res)
        this.setData({
          hidden: false,
          goodData: res.data.classList,
          goodsList: res.data.storeGoodsInfo.list
        })


      })
  },
  getSearch() {
    // api._get('home/findStoreGoodsByKeyword')
  },
  change(e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      console.log(e.currentTarget.dataset.current)
      that.setData({
        currentTab: e.currentTarget.dataset.current,
      })
    }

    let storeId = wx.getStorageSync('storeId')
    console.log(storeId)
    if (this.data.keyword) {
      api._post("home/findStoreGoodsByKeyword", {
          dtoList: [{
            classId: e.currentTarget.dataset.id,
            moduleType: e.currentTarget.dataset.type
          }],
          keyword: this.data.keyword,
          pageNum: 1,
          pageSize: 100,
          storeId: storeId
        })
        .then(res => {
          console.log(res)
          this.setData({


            goodsList: res.data.storeGoodsInfo.list
          })
        })
    } else {
      api._post("home/findStoreGoodsByKeyword", {
          dtoList: [{
            classId: e.currentTarget.dataset.id,
            moduleType: e.currentTarget.dataset.type
          }],
          keyword: this.data.keyword1,
          pageNum: 1,
          pageSize: 100,
          storeId: storeId
        })
        .then(res => {
          console.log(res)
          this.setData({


            goodsList: res.data.storeGoodsInfo.list
          })
        })
    }

  },

  search(e) {

    let storeId = wx.getStorageSync('storeId')
    console.log(storeId)
    this.setData({
      keyword: e.currentTarget.dataset.id
    })

    api._post("home/findStoreGoodsByKeyword", {
        dtoList: [

        ],
        keyword: e.currentTarget.dataset.id,
        pageNum: 1,
        pageSize: 100,
        storeId: storeId
      })
      .then(res => {
        console.log(res)
        this.setData({
          hidden: false,
          goodData: res.data.classList,
          goodsList: res.data.storeGoodsInfo.list
        })
      })
    if (this.data.searchRecord.length < 5) {
      console.log(wx.getStorageSync('searchRecord'))
      var arr = []
      for (let i in wx.getStorageSync('searchRecord')) {
        arr.push(wx.getStorageSync('searchRecord')[i].value)
      }


      if (arr.indexOf(e.currentTarget.dataset.id) !== -1) {
        console.log('3333')
      } else {
        this.data.searchRecord.unshift({
          value: e.currentTarget.dataset.id,

        })
      }

    } else {
      this.data.searchRecord.pop() //删掉旧的时间最早的第一条
      this.data.searchRecord.unshift({
        value: e.currentTarget.dataset.id,

      })
    }
    //将历史记录数组整体储存到缓存中
    wx.setStorageSync('searchRecord', this.data.searchRecord)

  },
  getKey() {
    api._get('home/findKeywordList')
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            hotList: res.data
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
    this.setData({
      arrList: wx.getStorageSync('listArr')
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})