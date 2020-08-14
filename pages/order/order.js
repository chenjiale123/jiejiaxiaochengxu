// pages/order/order.js
const api = require('../../utils/api.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tree: [{
      name: '全部',
      id: ""
    }, {
      name: '待付款',
      id: 1
    }, {
      name: '进行中',
      id: 5
    }, {
      name: '已完成',
      id: 7
    }, {
      name: '已取消',
      id: 8
    }],
    list: [],
    currentTab: "",

    page: 1,
    pageSize: 10,
    pages: 0,
    orderList: []
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
    // this.onfrash(1)
    this.getList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
   
  },
  getStatus() {

  },
  pay(e){
 

    var ct = e.currentTarget.dataset.item.createTimeStr.replace(/\-/g, '/'); // 创建订单时间

     
    var detail={
      data:{
        moduleType:String(e.currentTarget.dataset.item.moduleType) ,
        orderId:e.currentTarget.dataset.item.orderId,
        orderPrice:e.currentTarget.dataset.item.orderPrice,
        title:e.currentTarget.dataset.item.storeName
      },
      date:  new Date(ct).getTime()
     
    }

  wx.navigateTo({
    url: '../../pagesSinger/pages/payment/payment?item='+JSON.stringify(detail),
    complete: (res) => {},
  
    fail: (res) => {},
    success: (result) => {},
  })
  },
againOrder(e){
  console.log(e)
  var that=this
  if(e.currentTarget.dataset.item.storeId!==wx.getStorageSync('storeId')){
    
    wx.showModal({
      title: '提示',
      content: '你查看的商品不属于当前门店，是否切换？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'#999',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色 
      success:function(){
        if (res.cancel) {}else{
       var array=[]
        for(let i in e.currentTarget.dataset.item.orderListGoodsList){
            array.push({
              classId:  e.currentTarget.dataset.item.goodsClassId,
              className: "",
              createTime: new Date(),
              goodsDetailId:  e.currentTarget.dataset.item.orderListGoodsList[i].goodsDetailId,
              goodsInfoId:e.currentTarget.dataset.item.orderListGoodsList[i].goodsId,
              goodsStatus: "",
              hotIcon: "",
              img:e.currentTarget.dataset.item.orderListGoodsList[i].goodsImg,
              moduleType: e.currentTarget.dataset.item.moduleType,
              num: e.currentTarget.dataset.item.orderListGoodsList[i].goodsNumber,
              price: e.currentTarget.dataset.item.orderListGoodsList[i].goodsPrice,
              selected: true,
              specId: that.data.arr,
              specValue: that.data.arr1,
              stock: '',
              title: e.currentTarget.dataset.item.orderListGoodsList[i].goodsName,
            })
        }
        // let goodArr1 = {
        //   classId:  e.currentTarget.dataset.item.goodsClassId,
        //   className: "",
        //   createTime: new Date(),
        //   goodsDetailId:  e.currentTarget.dataset.item.orderListGoodsList[0].goodsDetailId,
        //   goodsInfoId:e.currentTarget.dataset.item.orderListGoodsList[0].goodsId,
        //   goodsStatus: "",
        //   hotIcon: "",
        //   img:e.currentTarget.dataset.item.orderListGoodsList[0].goodsImg,
        //   moduleType: e.currentTarget.dataset.item.moduleType,
        //   num: e.currentTarget.dataset.item.orderListGoodsList[0].goodsNumber,
        //   price: e.currentTarget.dataset.item.orderListGoodsList[0].goodsPrice,
        //   selected: true,
        //   specId: that.data.arr,
        //   specValue: that.data.arr1,
        //   stock: '',
        //   title: e.currentTarget.dataset.item.orderListGoodsList[0].goodsName,
        // }
        console.log(array)
        wx.navigateTo({
      
          url: '../../pagesSinger/pages/placeOrder/placeOrder?goodArr=' + JSON.stringify(array) +'&storeId='+e.currentTarget.dataset.item.storeId+ '&classId=' + e.currentTarget.dataset.item.goodsClassId + '&type=' + e.currentTarget.dataset.item.moduleType,
          complete: (res) => {},
      
          fail: (res) => {},
          success: (result) => {},
        })
      }

       },//接口调用成功
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
   })
  }else{
    var array=[]
    for(let i in e.currentTarget.dataset.item.orderListGoodsList){
        array.push({
          classId:  e.currentTarget.dataset.item.goodsClassId,
          className: "",
          createTime: new Date(),
          goodsDetailId:  e.currentTarget.dataset.item.orderListGoodsList[i].goodsDetailId,
          goodsInfoId:e.currentTarget.dataset.item.orderListGoodsList[i].goodsId,
          goodsStatus: "",
          hotIcon: "",
          img:e.currentTarget.dataset.item.orderListGoodsList[i].goodsImg,
          moduleType: e.currentTarget.dataset.item.moduleType,
          num: e.currentTarget.dataset.item.orderListGoodsList[i].goodsNumber,
          price: e.currentTarget.dataset.item.orderListGoodsList[i].goodsPrice,
          selected: true,
          specId: that.data.arr,
          specValue: that.data.arr1,
          stock: '',
          title: e.currentTarget.dataset.item.orderListGoodsList[i].goodsName,
        })
    }
    // let goodArr1 = {
    //   classId:  e.currentTarget.dataset.item.goodsClassId,
    //   className: "",
    //   createTime: new Date(),
    //   goodsDetailId:  e.currentTarget.dataset.item.orderListGoodsList[0].goodsDetailId,
    //   goodsInfoId:e.currentTarget.dataset.item.orderListGoodsList[0].goodsId,
    //   goodsStatus: "",
    //   hotIcon: "",
    //   img:e.currentTarget.dataset.item.orderListGoodsList[0].goodsImg,
    //   moduleType: e.currentTarget.dataset.item.moduleType,
    //   num: e.currentTarget.dataset.item.orderListGoodsList[0].goodsNumber,
    //   price: e.currentTarget.dataset.item.orderListGoodsList[0].goodsPrice,
    //   selected: true,
    //   specId: that.data.arr,
    //   specValue: that.data.arr1,
    //   stock: '',
    //   title: e.currentTarget.dataset.item.orderListGoodsList[0].goodsName,
    // }
    wx.navigateTo({
  
      url: '../../pagesSinger/pages/placeOrder/placeOrder?goodArr=' + JSON.stringify(array) +'&storeId='+e.currentTarget.dataset.item.storeId+ '&classId=' + e.currentTarget.dataset.item.goodsClassId + '&type=' + e.currentTarget.dataset.item.moduleType,
      complete: (res) => {},
  
      fail: (res) => {},
      success: (result) => {},
    })
  }


},
  orderDetail(e){
  wx.navigateTo({
    url: '../../pagesSinger/pages/orderDetail/orderDetail?id='+e.currentTarget.dataset.id+'&status='+e.currentTarget.dataset.status,
    complete: (res) => {},

    fail: (res) => {},
    success: (result) => {},
  })
  },
  finish(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要完成订单？',
      howCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'rgba(255,76,79,1)',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'rgba(255,76,79,1)',//确定文字的颜色
      success:function(res){
        if(res.cancel){
          console.log("取消");
        }else{
       
          api._posts('order/finishOrder',{
            orderId:e.currentTarget.dataset.id
          })
          .then(respon=>{
         if(respon.code==200){
             wx.showToast({
               title: '完成成功',
               icon:'none'
             })
             that.getList()
         }else{
          wx.showToast({
            title: respon.message,
            icon:'none'
          })
         }
          })
        }
      },fail:function(res){},
      complete:function(res){}
    });
  },
  getList() {
    api._posts('order/getOrderList', {
        orderStatus: this.data.currentTab,
        pageSize: 20,
        pageNum: 1
      })
      .then(res => {
        console.log(res)
        var arr=[]
        var arr1=[]
        if (res.code == 200) {
          for (let i in res.data.list) {
           var date= new Date().getFullYear()
           res.data.list[i].serviceTimeStart= res.data.list[i].serviceTimeStart.replace(date+'-','')
           res.data.list[i].serviceTimeEnd= res.data.list[i].serviceTimeEnd.replace(date+'-','')
          

          for (let j in res.data.list[i].orderListGoodsList) {
            res.data.list[i].orderListGoodsList[j].goodsImg =
              res.data.list[i].orderListGoodsList[j].goodsImg.split(',')[0]
              res.data.list[i].orderListGoodsList[j].spc=JSON.parse(res.data.list[i].orderListGoodsList[j].goodsSpec)
                 for( let n in res.data.list[i].orderListGoodsList[j].spc){
                     arr.push( res.data.list[i].orderListGoodsList[j].spc[n].specValueName)
                     arr1.push( res.data.list[i].orderListGoodsList[j].spc[n].specId)
                 }
          }
        }

 console.log(res.data.list)
          this.setData({
            orderList: res.data.list,
            arr:arr,
            arr1:arr1
          })
        }else{
          this.setData({
            orderList: []
          })
        }
      })
  },
  cancelOrder(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要取消！',
      howCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'rgba(255,76,79,1)',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'rgba(255,76,79,1)',//确定文字的颜色
      success:function(res){
        if(res.cancel){
          console.log("取消");
        }else{
       
          api._posts('order/cancelOrder',{
            orderId:e.currentTarget.dataset.id
          })
          .then(respon=>{
         if(respon.code==200){
             wx.showToast({
               title: '取消成功',
               icon:'none'
             })
             that.getList()
         }else{
          wx.showToast({
            title: respon.message,
            icon:'none'
          })
         }
          })
        }
      },fail:function(res){},
      complete:function(res){}
    });


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
     currentTab:app.globalData.typeId
    })

  

    this.getList()
    this.onfrash(1)
    console.log(app.globalData.typeId)
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

  onfrash: function (pageNo) {
    var that = this
 
    api._posts('order/getOrderList',{
      
        orderStatus: this.data.currentTab,
        pageSize: this.data.pageSize,
        pageNum: pageNo
      
    }).then(res => {
      console.log(res)
      var arr = [];
      for (let i in res.data.list) {
        for (let j in res.data.list[i].orderListGoodsList) {
          res.data.list[i].orderListGoodsList[j].goodsImg =
            res.data.list[i].orderListGoodsList[j].goodsImg.split(',')[0]
         
        }
      }
      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pages, //总页数
        orderList: this.data.orderList.concat(res.data.list)
      })
 
  
      this.setData({
        orderList: this.data.orderList
      })
      console.log(this.data.orderList)
    }).catch(e => {
      console.log(e)
    })
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
    this.onfrash(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})