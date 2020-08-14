// pages/addAddress/addAddress.js

const api = require('../../../utils/api.js')

import WxValidate from '../../../utils/validata.js'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
   
     
    },
    code1:'',
    people1:'',
    phone1:'',
    name:'',
    local:'',
    sexList:[],
   key:'女',
   value1:false    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  
     this.getDictionary()
     this.initValidate()
  },
  radioChange(e){
    console.log(e)
    this.setData({
          key:e.detail.value
    })
  },
  change(e){
   console.log(e)
   
    this.setData({
      value1:e.detail.value
    })
  
  },

  code(e){
    this.setData({
      code1:e.detail.value
    })
  },

  people(e){
    this.setData({
      people1:e.detail.value
    })
  },
  phone(e){
    this.setData({
      phone1:e.detail.value
    })
  },
  localtion(){
    wx.navigateTo({
      url: '../address/address',
    })
  },

  getDictionary(){
     api._get('common/findDictionaryValueSelect?dictionaryKey=gender')
     .then(res=>{
       console.log(res)
       if(res.code==200){
         this.setData({
           sexList:res.data
         })
       }else{
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }
     })
  },
  initValidate(){
    const rules = {
      code: {
        required: true,
        minlength:2
      },
      phone:{
        required:true,
        minlength:11
      },
      people:{
        required:true,
        minlength:2
      }
    }
    const messages = {
      code: {
        required: '请填写门牌号',
        minlength:'请输入正确的门牌号'
      },
      phone:{
        required:'请填写手机号',
        tel:'请填写正确的手机号'
      },
      people:{
        required:'请填写姓名',
        tel:'请填写正确的姓名'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)

  },
  formSubmit(e){
    const params = e.detail.value
    console.log(params)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
     console.log(this.WxValidate.errorList[0])
     wx.showToast({
      title: this.WxValidate.errorList[0].msg,
      duration:2000,
      mask:true,
      icon:'none', 
      success:function(){ },
      fail: function () { },    
      complete: function () { }   
   })

      return false
    }else{
      if(this.data.value1==true){
        this.data.value1='0'
      }else{
        this.data.value1='1'
      }
     api._posts("address/addAddress",{
      address:this.data.name,
      houseNumber:this.data.code1,
      contactNumber:this.data.phone1,
      contactName:this.data.people1,
      isDefault:this.data.value1,
      longitude:Number(this.data.local.split(",")[0]) ,
      latitude:Number(this.data.local.split(",")[1]),
      sex:this.data.key
     })
     .then(res=>{
       console.log(res)
       if(res.code==200){
        wx.showToast({
          title: '添加成功',
          icon:'none'
        })
       wx.navigateBack({
         complete: (res) => {},
       })
      }else{
       wx.showToast({
         title: res.message,
         icon:'none'
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
   this.onLoad()
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