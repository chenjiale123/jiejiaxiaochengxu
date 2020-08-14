// pagesSinger//pages/orderDetail/orderDetail.js
const api = require('../../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    status: '',
    orderDetail: '',
    date: '',
    array: [],
    rocallTime: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      status: options.status
    })
    console.log(options)
  },


  runBack(cm) {
    var that = this
    var time1
    if (cm > 0) {

      cm > 60000 ?
        (time1 =
          (new Date(cm).getMinutes() < 10 ?
            '0' + new Date(cm).getMinutes() :
            new Date(cm).getMinutes()) +
          ':' +
          (new Date(cm).getSeconds() < 10 ?
            '0' + new Date(cm).getSeconds() :
            new Date(cm).getSeconds())) :
        (time1 =
          '00:' +
          (new Date(cm).getSeconds() < 10 ?
            '0' + new Date(cm).getSeconds() :
            new Date(cm).getSeconds()));
      this.setData({
        rocallTime: time1
      })
      const _msThis = this;
      that.data.inter = setTimeout(function () {
        cm -= 1000;
        _msThis.runBack(cm);
      }, 1000);
    } else {
      // 调用改变订单状态接口
   
      that.getDetail1()

    
      console.log('33333')
      clearInterval(that.data.inter);
    }
  },
  cancel(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消！',
      howCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          console.log("取消");
        } else {
          console.log(e.currentTarget.dataset.id)
          api._posts('order/cancelOrder', {
              orderId: e.currentTarget.dataset.id
            })
            .then(respon => {
              if (respon.code == 200) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'none'
                })
                that.getDetail()
              } else {
                wx.showToast({
                  title: respon.message,
                  icon: 'none'
                })
              }
            })
        }
      },
      fail: function (res) {},
      complete: function (res) {}
    });


  },
  copy() {
    wx.setClipboardData({
      data: this.data.orderDetail.orderNumber,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  refoudDetail(e) {
    wx.navigateTo({
      url: '../../../pageNumber/pages/refoundDetail/refoundDetail?item=' + JSON.stringify(e.currentTarget.dataset.item),
      complete: (res) => {},

      fail: (res) => {},
      success: (result) => {},
    })
  },
  salesApply(e) {
    wx.navigateTo({
      url: '../../../pageNumber/pages/refoundApply/refoundApply?item=' + JSON.stringify(e.currentTarget.dataset.item) + '&index=' + e.currentTarget.dataset.index,
      complete: (res) => {},

      fail: (res) => {},
      success: (result) => {},
    })
  },
  payCode() {

    var detail = {
      data: {
        moduleType: String(this.data.orderDetail.moduleType),
        orderId: this.data.orderDetail.orderId,
        orderPrice: this.data.orderDetail.orderPrice,
        title: this.data.orderDetail.storeName
      },
      date: this.data.tc

    }

    wx.navigateTo({
      url: '../payment/payment?item=' + JSON.stringify(detail),
      complete: (res) => {},

      fail: (res) => {},
      success: (result) => {},
    })
  },
  again() {

var array=[]
    console.log('2323')
    for(let i in this.data.orderDetail.marketOrderGoodsList){
      array.push({
        classId:  this.data.orderDetail.goodsClassId,
        className: "",
        createTime: new Date(),
        goodsDetailId:  this.data.orderDetail.marketOrderGoodsList[i].goodsDetailId,
        goodsInfoId:this.data.orderDetail.marketOrderGoodsList[i].goodsId,
        goodsStatus: "",
        hotIcon: "",
        img:this.data.orderDetail.marketOrderGoodsList[i].goodsImg,
        moduleType: this.data.orderDetail.moduleType,
        num: this.data.orderDetail.marketOrderGoodsList[i].goodsNumber,
        price: this.data.orderDetail.marketOrderGoodsList[i].goodsPrice,
        selected: true,
        specId: this.data.arr,
        specValue: this.data.arr1,
        stock: '',
        title: this.data.orderDetail.marketOrderGoodsList[i].goodsName,
      })
  }

    // let goodArr1 = {
    //   classId: this.data.orderDetail.goodsClassId,
    //   className: "",
    //   createTime: new Date(),
    //   goodsDetailId: this.data.orderDetail.marketOrderGoodsList[0].goodsDetailId,
    //   goodsInfoId: this.data.orderDetail.marketOrderGoodsList[0].goodsId,
    //   goodsStatus: "",
    //   hotIcon: "",
    //   img: this.data.orderDetail.marketOrderGoodsList[0].goodsImg,
    //   moduleType: this.data.orderDetail.moduleType,
    //   num: this.data.orderDetail.marketOrderGoodsList[0].goodsNumber,
    //   price: this.data.orderDetail.marketOrderGoodsList[0].goodsPrice,
    //   selected: true,
    //   specId: this.data.arr,
    //   specValue: this.data.arr1,
    //   stock: '',
    //   title: this.data.orderDetail.marketOrderGoodsList[0].goodsName,
    // }
    wx.navigateTo({

      url: '../placeOrder/placeOrder?goodArr=' + JSON.stringify(array) + '&storeId=' + this.data.orderDetail.storeId + '&classId=' + this.data.orderDetail.goodClassId + '&type=' + this.data.orderDetail.moduleType,
      complete: (res) => {},

      fail: (res) => {},
      success: (result) => {},
    })
  },
  finish(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要完成订单！',
      howCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          console.log("完成");
        } else {

          api._posts('order/finishOrder', {
              orderId: e.currentTarget.dataset.id
            })
            .then(respon => {
              if (respon.code == 200) {
                wx.showToast({
                  title: '确认成功',
                  icon: 'none'
                })
                that.getDetail()
              } else {
                wx.showToast({
                  title: respon.message,
                  icon: 'none'
                })
              }
            })
        }
      },
      fail: function (res) {},
      complete: function (res) {}
    });
  },
  back() {
    wx.navigateBack({
      complete: (res) => {},
      delta: 3,
      fail: (res) => {},
      success: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getIfSale() {
    api._get('order/findIsAfterSaleGoods')
      .then(res => {
        if (res.code == 200) {
          console.log(res)
          this.setData({
            array: res.data
          })
          for (let i in this.data.orderDetail.marketOrderGoodsList) {
            console.log(this.data.array.includes(this.data.orderDetail.marketOrderGoodsList[i].orderGoodsId))
            if (this.data.array.includes(this.data.orderDetail.marketOrderGoodsList[i].orderGoodsId)==true) {
              this.data.orderDetail.marketOrderGoodsList[i].Issale = true
            } else {
              this.data.orderDetail.marketOrderGoodsList[i].Issale = false
            }
          }
          this.setData({
            orderDetail: this.data.orderDetail
          })
          console.log(this.data.orderDetail)
        }

      })
  },
  getDetail() {
    var that=this
    api._posts('order/getOrderDetail', {
        orderId: this.data.id
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          var arr = []
          var arr1 = []


          for (let i in res.data.marketOrderGoodsList) {
            res.data.marketOrderGoodsList[i].spc = JSON.parse(
              res.data.marketOrderGoodsList[i].goodsSpec
            );
            res.data.marketOrderGoodsList[i].goodsImg = res.data.marketOrderGoodsList[i].goodsImg.split(',')[0]
            for (let n in res.data.marketOrderGoodsList[i].spc) {
              arr.push(res.data.marketOrderGoodsList[i].spc[n].specValueName)
              arr1.push(res.data.marketOrderGoodsList[i].spc[n].specId)
            }
          }

          this.setData({
            orderDetail: res.data,
            date: res.date,
            arr: arr,
            arr1: arr1
          })

          var ct = res.data.createTime.replace(/\-/g, '/'); // 创建订单时间
          let ts = new Date().getTime(),
            tc = new Date(ct).getTime();
            
            this.setData({
              tc:tc
            })
          const cm = 15 * 60 * 1000 - (ts - tc);;
          this.runBack(cm);
          that.getIfSale()

        }
      })
  },


  getDetail1() {
    var that=this
    api._posts('order/getOrderDetail', {
        orderId: this.data.id
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          var arr = []
          var arr1 = []


          for (let i in res.data.marketOrderGoodsList) {
            res.data.marketOrderGoodsList[i].spc = JSON.parse(
              res.data.marketOrderGoodsList[i].goodsSpec
            );
            res.data.marketOrderGoodsList[i].goodsImg = res.data.marketOrderGoodsList[i].goodsImg.split(',')[0]
            for (let n in res.data.marketOrderGoodsList[i].spc) {
              arr.push(res.data.marketOrderGoodsList[i].spc[n].specValueName)
              arr1.push(res.data.marketOrderGoodsList[i].spc[n].specId)
            }
          }

          this.setData({
            orderDetail: res.data,
            date: res.date,
            arr: arr,
            arr1: arr1
          })

          that.getIfSale()


        }
      })
  },
  finish() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要完成订单？',
      howCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          console.log("取消");
        } else {

          api._posts('order/finishOrder', {
              orderId: that.data.orderDetail.id
            })
            .then(respon => {
              if (respon.code == 200) {
                wx.showToast({
                  title: '完成成功',
                  icon: 'none'
                })
                that.getDetail()
              } else {
                wx.showToast({
                  title: respon.message,
                  icon: 'none'
                })
              }
            })
        }
      },
      fail: function (res) {},
      complete: function (res) {}
    });
  },

  daohang(){
    console.log(this.data.orderDetail)
wx.openLocation({
 latitude: parseFloat(this.data.orderDetail.storeLatitude),
 longitude: parseFloat(this.data.orderDetail.storeLongitude),
//  address: 'address',
 complete: (res) => {},
 fail: (res) => {},
 name:this.data.orderDetail.storeAddress,
 scale: 28,
 success: (res) => {},
})
  },
  dianhua(){
    wx.makePhoneCall({
      phoneNumber: this.data.orderDetail.storeContactPhone,
      success:function(){},
    })      

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetail()
   

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.inter);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.inter);
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