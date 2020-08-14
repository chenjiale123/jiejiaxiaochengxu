// pages/shopCar/shopCar.js
// pages/storeDetail/storeDetail.js


const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    hidden1: false,
    date: '2019-01-01 13:37',
    disabled: false, //设置是否能点击 false可以 true不能点击
    startDate: '1920-01-01 12:37',
    endDate: '2200-03-12 12:38',
    placeholder: '请选择时间',
    nameValue: '',
    userDetail: ''


  },
  phone() {
    wx.navigateTo({
      url: '../phoneChange/phoneChange',
    })
  },
  boy() {
    api._posts('user/updUser', {
        gender: '1'
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            hidden1: false
          })
          wx.showToast({
            title: '修改成功',
            icon: "none"
          })
          this.getUser()
        }
      })
  },
  girl() {
    api._posts('user/updUser', {
        gender: '0'
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            hidden1: false
          })
          wx.showToast({
            title: '修改成功',
            icon: "none"
          })
          this.getUser()
        }
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

  name(e) {
    this.setData({
      nameValue: e.detail.value
    })
  },
  cancel() {
    this.setData({
      hidden: false
    })
  },
  cancel1() {
    this.setData({
      hidden1: false
    })
  },
  sure() {
    api._posts('user/updUser', {
        username: this.data.nameValue
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            hidden: false
          })
          wx.showToast({
            title: '修改成功',
            icon: "none"
          })
          this.getUser()
        }
      })
  },
  onPickerChange: function (e) {
    console.log(e.detail);


    api._posts('user/updUser', {
        dob: e.detail.dateString
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {

          wx.showToast({
            title: '修改成功',
            icon: "none"
          })
          this.getUser()
        }
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  nickName() {
    this.setData({
      hidden: true
    })
  },
  sexName() {
    this.setData({
      hidden1: true
    })
  },

  changeAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {

        console.log(res.tempFiles)


        wx.uploadFile({
          url: api.baseUrl + 'user/updUser',
     
          filePath: res.tempFilePaths[0], //文件路径  这里是mp3文件
          name: 'image', //随意
          header: {
            'Authentication': wx.getStorageSync('token'),
        
          },


          formData: {
           
          },
          success: function (res) {
            console.log(res)
            if (res.errMsg == 'uploadFile:ok') {
              that.getUser()
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })
            }

          }
        })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
    this.getUser()
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