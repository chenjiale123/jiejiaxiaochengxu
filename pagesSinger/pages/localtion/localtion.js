//获取应用实例
var amap = require('../../../utils/amap-wx.js') //如：..­/..­/libs/amap-wx.js
var key = "94f5b056c1f65da8f42a211ebb81bed6"
const api = require('../../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentShow: "../../../image/qjd@2x.png",
    contentHiden: '../../../image/qjd01@2x.png',
    address:'南昌'
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
  searchStore(e){
    var that=this

    api._get('home/findAllStore?userLng=' + app.globalData.local.split(',')[0] + '&userLat=' + app.globalData.local.split(',')[1]+ "&cityCode=" +app.globalData.citycode+ '&storeName=' + e.detail.value)
    .then(res => {
      console.log(res)
      if (res.code == 200) {
        let array = res.data.storeVos


        that.setData({
          array: res.data.storeVos,
          remain:res.data.remarks
        })

      } else {
        that.setData({
          array: res.data,

        })
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  select(e) {
    console.log(e)
    wx.switchTab({
      url: '../../../pages/index/index',
    })
    app.globalData.id = e.currentTarget.dataset.id
    app.globalData.name = e.currentTarget.dataset.name
    app.globalData.indexLocal=e.currentTarget.dataset.local
       wx.setStorageSync('storeId', e.currentTarget.dataset.id)

    api._posts('home/changeUserStore',{
      id:e.currentTarget.dataset.item.id,
      name:e.currentTarget.dataset.item.name,
      address:e.currentTarget.dataset.item.address,
      phone:e.currentTarget.dataset.item.phone,
      longitude:e.currentTarget.dataset.item.longitude,
      latitude:e.currentTarget.dataset.item.latitude,
      distance:e.currentTarget.dataset.item.distance,
      isCurrent:e.currentTarget.dataset.item.isCurrent,
    })
    .then(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {



    if( app.globalData.cityName){
      this.setData({
       address:app.globalData.cityName,
       local:app.globalData.local
      })
      var that = this
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
  
  
          var myAmapFun = new amap.AMapWX({
            key: key
          });
          myAmapFun.getRegeo({
            location: res.longitude + ',' + res.latitude,
  
            success: function (data) {
              //成功回调
  
              if (res && res.longitude) {
  
                api._get('home/findAllStore?userLng=' + app.globalData.local.split(',')[0] + '&userLat=' + app.globalData.local.split(',')[1]+ "&cityCode=" +app.globalData.cityName+ '&storeName=' + ''+'&cityCode='+app.globalData.citycode)
                  .then(res => {
                    console.log(res)
                    if (res.code == 200) {
                      let array = res.data.storeVos
  
  
                      that.setData({
                        array: res.data.storeVos,
                        remain:res.data.remarks
                      })
  
                    } else {
                      that.setData({
                        array: res.data,
  
                      })
                      wx.showToast({
                        title: res.message,
                        icon: 'none'
                      })
                    }
                  })
  
              }
  
  
            },
  
  
  
            fail: function (info) {
              //失败回调
              console.log(info)
            }
          })
        },
        fail: function (err) {
             api._get('home/findAllStore?userLng=' + ''+ '&userLat=' + ''+ "&cityCode=" +app.globalData.cityName+ '&storeName=' + ''+'&cityCode='+360104)
                  .then(res => {
                    console.log(res)
                    if (res.code == 200) {
                      let array = res.data.storeVos
  
  
                      that.setData({
                        array: res.data.storeVos,
                        remain:res.data.remarks
                      })
  
                    } else {
                      that.setData({
                        array: res.data,
  
                      })
                      wx.showToast({
                        title: res.message,
                        icon: 'none'
                      })
                    }
                  })
        }
      })

    }else{
      this.getHome()
    }
  },
  selectCity(){
   wx.navigateTo({
     url: '../../../pageNumber/pages/citySelect/citySelect',
   })
  },
  getHome() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {


        var myAmapFun = new amap.AMapWX({
          key: key
        });
        myAmapFun.getRegeo({
          location: res.longitude + ',' + res.latitude,

          success: function (data) {
            //成功回调
           console.log(data)
            if (res && res.longitude) {

              api._get('home/findAllStore?userLng=' + res.longitude + '&userLat=' + res.latitude + "&cityCode=" + data[0].regeocodeData.addressComponent.adcode + '&storeName=' + '')
                .then(res => {
                  console.log(res)
                  if (res.code == 200) {
                    let array = res.data.storeVos
                   

                    that.setData({
                      array: res.data.storeVos,
                      remain:res.data.remarks
                    })

                  } else {
                    that.setData({
                      array: res.data.storeVos,
                      remain:res.data.remarks
                    })
                    wx.showToast({
                      title: res.message,
                      icon: 'none'
                    })
                  }
                })

            }


          },



          fail: function (info) {
            //失败回调
            console.log(info)
          }
        })
      },
      fail: function (err) {
        api._get('home/findAllStore?userLng=' + ''+ '&userLat=' + ''+ "&cityCode=" +app.globalData.cityName+ '&storeName=' + ''+'&cityCode='+360104)
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            let array = res.data.storeVos


            that.setData({
              array: res.data.storeVos,
              remain:res.data.remarks
            })

          } else {
            that.setData({
              array: res.data,

            })
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      }
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
    this.getHome()
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