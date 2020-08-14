// 默认声明一个函数记录list显示的数据---删除状态
var initdata = function (that) {
  var list = that.data.list
  for (var i = 0; i < list.length; i++) {
    list[i].shows = ""
  }
  that.setData({
    list: list
  })
}
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 185, //删除按钮宽度单位（rpx） 
    list: [],
    list1: [],
    consigneeName: '',
    consigneePhone: "",
    areaIdPath: "",
    address: '',
    index1: '',
    show: false,
    status: false,
    startX: 0, //开始坐标
    startY: 0,
    select:''

  },
  add: function () {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  edit: function (e) {
    var that = this
 


    wx.navigateTo({
      url: '/pages/editAddress/editAddress?id=' +  e.currentTarget.dataset.id ,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  radioChange(e) {
    console.log(e.detail.value)
    var that = this
   this.setData({
     select:e.detail.value
   })
  
  },
  sure: function (e) {

   
  wx.navigateTo({
    url: '../addAddress/addAddress',
  })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getList()



  },
  getList() {

    api._get('address/findAddressList').then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          list: res.data

        })


      } else {

      }


    }).catch(e => {

      console.log(e)
    })
  },



  // 开始滑动事件
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this;
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      // var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
        // txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
        // txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          // txtStyle = "left:-" + delBtnWidth + "px";
        }
      }

    }
  },
  // 滑动中事件
  touchE: function (e) {
   
     
    if (e.changedTouches[0].clientX > 42&&this.data.startX - e.changedTouches[0].clientX>0) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = "";
      txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      list[index].shows = txtStyle;
      this.setData({
        list: list
      });
   
    } else {
      console.log(e);
      if(e.changedTouches[0].clientX>280){
        console.log('333')
     
 


        wx.navigateTo({
          url: '../editAddress/editAddress?id=' +  e.currentTarget.dataset.id ,
          success: function (res) {},
          fail: function (res) {},
          complete: function (res) {},
        })
      }
    }
  },
  //获取元素自适应后的实际宽度 
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale); 
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error 
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件 
  delItem: function (e) {
    var that = this;
    // 打印出当前选中的index
    console.log(e.currentTarget.dataset.index);
    // 获取到列表数据
    var list = that.data.list;
    wx.showModal({
      title: "",
      content: "确定删除地址？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "rgba(153,153,153,1)",
      confirmText: "确定",
      confirmColor: "#FFA64C",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          // 删除
          list.splice(e.currentTarget.dataset.index, 1);


          api._post('address/delAddress?id='+e.currentTarget.dataset.id)
          .then(res=>{
            console.log(res)
            if(res.code==200){
              that.setData({
                list: list
              })
              initdata(that)

              wx.showToast({
                title: '删除成功',
                icon:'none'
              })
            }else{
              wx.showToast({
                title: res.message,
                icon:'none'
              })
            }

             // 重新渲染
         
          })
         
        }
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
   this.onLoad()
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
   this.getList()
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