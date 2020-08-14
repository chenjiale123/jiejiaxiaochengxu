// pages/classify/classify.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tree: [],



   
    scrollTops: 0,  // 要滚动的高度
    tabCur: 0,  // 当前项
    rightCur: 0,  // 用于实现左边联动右边
  },
  back() {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  findGood(e) {
    wx.navigateTo({
      url: '../../../pagesSinger/pages/goodList/goodList?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type+'&childid='+ e.currentTarget.dataset.childid,
    })
  },
  findGood1(e) {
    wx.navigateTo({
      url: '../../../pagesSinger/pages/goodList/goodList?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
    })
  },
  goodsearch(){
   wx.navigateTo({
     url: '../../../pagesSinger/pages/goodSearch/goodSearch',
   })
  },
  skip(e){
    console.log(e)
    wx.navigateTo({
      url: '../../../pagesSinger/pages/goodList/goodList?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type
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
    api._get('common/findClassByMarketCount?storeId='+wx.getStorageSync('storeId'))
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            tree: res.data
          })
        }

      })
  },
  tabNav(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      tabCur: index,
      rightCur: index,
      // 实现左边自动滑动到某个位置 4表示自动滑动到 第五项 （4为索引值）
      scrollTops: (index - 4) * 50
    })
  },
  /**
   * 滑动右边对应左边菜单切换
   * 1、拿到该元素的高度，设定它的top和bottom
   * 2、判断滑动的距离是否大于 设定的top并小于设定的bottom，然后对应左边菜单的滑动
   */
  scrollLink(e) {
    let tree = this.data.tree
    let itemHeight = 0;
    for (let i = 0; i < tree.length; i++) {
      //拿到每个元素
      let els = wx.createSelectorQuery().select("#scroll-" + i);
      els.fields({
        size: true
      }, function (res) {
        tree[i].top = itemHeight;
        itemHeight += res.height;
        tree[i].bottom = itemHeight
      }).exec()
    }

    this.setData({
      tree
    })

    // 拿到滚动的高度
    let scrollTop = e.detail.scrollTop;
    for (let i = 0; i < tree.length; i++) {
      if (scrollTop > tree[i].top && scrollTop < tree[i].bottom) {
        this.setData({
          tabCur: i,
          scrollTops: (i - 4) * 50
        })
        return false
      }
    }
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
   this.onShow()
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