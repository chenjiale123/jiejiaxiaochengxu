// pages/addAddress/addAddress.js

const api = require('../../../utils/api.js')

import WxValidate from '../../../utils/validata.js'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {


    },
    code1: '',
    people1: '',
    phone1: '',
    name: '',
    local: '',
    sexList: [],
    key: '女',
    value1: '',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id:options.id
    })
    this.getDetail(id)


    this.getDictionary()
    this.initValidate()
  },
  getDetail(id) {
    api._get('address/findAddressDetail?id=' + id)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          if (res.data.isDefault == "0") {

            this.setData({
              value1:true
            })

          } else {
            this.setData({
              value1:false
            })
          }


        

          this.setData({
            menpai: res.data.houseNumber,
            name: res.data.address,
            ren: res.data.contactName,
            shouji: res.data.contactNumber,
            key:res.data.sex,

            longitude: res.data.longitude,
            latitude: res.data.latitude
          })


        }


      })
  },
  radioChange(e) {
    console.log(e)
    this.setData({
      key: e.detail.value
    })
  },
  change(e) {
    console.log(e)
    this.setData({
      value1: e.detail.value
    })
  },

  code(e) {
    this.setData({
      code1: e.detail.value
    })
  },

  people(e) {
    this.setData({
      people1: e.detail.value
    })
  },
  phone(e) {
    this.setData({
      phone1: e.detail.value
    })
  },
  localtion() {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  getDictionary() {
    api._get('common/findDictionaryValueSelect?dictionaryKey=gender')
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            sexList: res.data
          })
        }
      })
  },
  initValidate() {
    const rules = {
      code: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        minlength: 11
      },
      people: {
        required: true,
        minlength: 2
      }
    }
    const messages = {
      code: {
        required: '请填写门牌号',
        minlength: '请输入正确的门牌号'
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      people: {
        required: '请填写姓名',
        tel: '请填写正确的姓名'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)

  },
  formSubmit(e) {
    const params = e.detail.value
    console.log(params)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      console.log(this.WxValidate.errorList[0])
      wx.showToast({
        title: this.WxValidate.errorList[0].msg,
        duration: 2000,
        mask: true,
        icon: 'none',
        success: function () {},
        fail: function () {},
        complete: function () {}
      })

      return false
    } else {
      console.log(this.data.value1)
      if (this.data.value1 == true) {
        this.data.value1 = '0'
      } else {
        this.data.value1 = '1'
      }
      api._posts("address/updAddress", {
         id:this.data.id,
          address: this.data.name,
          houseNumber: this.data.menpai,
          contactNumber: this.data.shouji,
          contactName: this.data.ren,
          isDefault: this.data.value1,
          longitude: this.data.longitude,
          latitude: this.data.latitude,
          sex: this.data.key
        })
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'none'
            })
            wx.navigateTo({
              url: '../addressList/addressList',
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
    }


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
    console.log(app.globalData)
    this.setData({
     name:app.globalData.city,
          local:app.globalData.local
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