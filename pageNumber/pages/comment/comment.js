// pages/comment/comment.js
// pages/goodList/goodList.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    pages: 0,
    Tab: 0,
    tab: 0,
    commentList:[],
    storeid:'',
    id:'',
    comHead:[{
      id:0,
      index:0,
      name:'全部'
    },{
      index:1,
      id:1,
      name:'好评'
    },{
      index:2,
      id:2,
      name:'中评'
    },{
      index:3,
      id:3,
      name:'差评'
    },{
      index:4,
      id:4,
      name:'有图'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      storeid:options.storeid,
      id:options.id,
      type:options.type
    })
    console.log(this.data.tab)

  },

  previewImg(e){
    const current = e.currentTarget.dataset.src  //获取当前点击的 图片 url
    console.log(current)
    wx.previewImage({
      current,
      urls: this.data.arrcom
    })
  },
  back(){
wx.navigateBack({
  complete: (res) => {},
  delta: 0,
  fail: (res) => {},
  success: (res) => {},
})
  },
  click: function (e) {
    var that = this;
    if (this.data.tab === e.currentTarget.dataset.current) {
      return false;
    } else {
      console.log(e.currentTarget.dataset.current)
      that.setData({
        tab: e.currentTarget.dataset.current,
      })
      console.log(that.data.tab)
      if(that.data.tab<=3){
         that.getCommlist(that.data.tab,'')
             
      }else{
        that.getCommlist('',0)
      }

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getCommlist(rank,isContainPic){
    api._get('goodsComment/findGoodsCommentList?storeId='+this.data.storeid+'&goodsInfoId='+this.data.id+'&moduleType='+this.data.type+'&rank='+rank+'&isContainPic='+isContainPic+"&pageNum=1&pageSize=20")
    .then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          commentList:res.data.list
        })
        var arr=[]
        for(let i in res.data.list ){
          arr=res.data.list[i].enclosureUrl.split(',')
        }
    
        this.setData({
          arr:arr
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }
    })
  },
  getTotal(){
  api._get('goodsComment/findGoodsCommentCount?storeId='+this.data.storeid+'&goodsInfoId='+this.data.id+'&moduleType='+this.data.type)
  .then(res=>{
    console.log(res)

    this.setData({
      rate:res.data.goodRate,
      comHead:[{
        id:0,
        index:0,
      
        name:'全部'+res.data.total
      },{
        index:3,
        id:3,
        name:'好评'+res.data.goodTotal
      },{
        index:2,
        id:2,
        name:'中评'+res.data.medTotal
      },{
        index:1,
        id:1,
        name:'差评'+res.data.badTotal
      },{
        index:4,
        id:4,
        name:'有图'+res.data.isContainPicTotal
      }]
    })
  })

  },
  onflash(rank,isContainPic,pageNo){
    api._get('goodsComment/findGoodsCommentList?storeId='+this.data.storeid+'&goodsInfoId='+this.data.id+'&moduleType='+this.data.type+'&rank='+rank+'&isContainPic='+isContainPic+"&pageNum="+pageNo+"&pageSize="+this.data.pageSize)
    .then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          page: pageNo, //当前的页号
          pages: res.data.pages, //总页数
          commentList:this.data.commentList.concat(res.data.list) 
        })
        var arr=[]
        for(let i in res.data.list ){
          arr=res.data.list[i].enclosureUrl.split(',')
        }
    
        this.setData({
          arr:arr
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
this.getCommlist(0,"")
this.getTotal()
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
    this.getCommlist(this.data.tab,"")
    this.getTotal()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   this.onflash(this.data.tab,"",this.data.page+1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})