// pages/address/address.js
var amap = require('../../../utils/amap-wx.js') //如：..­/..­/libs/amap-wx.js
var key = "94f5b056c1f65da8f42a211ebb81bed6"
var app = getApp()
Page({
  data: {
    isShow: false,
    tips: {},
    longitude: '',
    latitude: '',
    markers: [],
    add: [],
    contentShow: "../../../image/dw@2x.png",
    contentHiden: '../../../image/dw01@2x.png'
  },
  onLoad(options) {
   

  },
  onShow() {
    var that = this;
    console.log(app.globalData.local)
    var myAmapFun = new amap.AMapWX({
      key: key
    });

    if (app.globalData.local == "") {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          if (res && res.longitude) {
            that.setData({
              longitude: res.longitude,
              latitude: res.latitude,

            })
          }
          console.log(res)

          var myAmapFun = new amap.AMapWX({
            key: key
          });
          myAmapFun.getRegeo({
            location: res.longitude + ',' + res.latitude,

            success: function (data) {
              //成功回调
         

              if (app.globalData.cityName == "") {

                that.setData({
                  cityName: data[0].regeocodeData.addressComponent.city
                })
              } else {
                let cityName = app.globalData.cityName

                that.setData({
                  cityName: cityName
                })
              }


            },
            fail: function (info) {
              //失败回调
              console.log(info)
            }
          })

          myAmapFun.getPoiAround({
            location: res.longitude + ',' + res.latitude,

            success: function (data) {
              //成功回调
              console.log(data)
              that.setData({
                add: data.markers
              })
              console.log(that.data.add)
            },
            fail: function (info) {
              //失败回调
              console.log(info)
            }
          })


        }
      })
    } else {
     
  
    

      myAmapFun.getPoiAround({
        location: app.globalData.local,

        success: function (data) {
          //成功回调

          that.setData({
         
            longitude: app.globalData.local.split(',')[0],
            latitude: app.globalData.local.split(',')[1],
          });
          console.log(data)
          that.setData({
            add: data.markers
          })
          console.log(that.data.add)
        },
        fail: function (info) {
          //失败回调
          console.log(info)
        }
      })
      console.log( app.globalData.local)
      myAmapFun.getRegeo({
        location: app.globalData.local,

        success: function (data) {
           console.log(data)
          that.setData({
          
            longitude: app.globalData.local.split(',')[0],
            latitude: app.globalData.local.split(',')[1],
          });
           
       
          if (app.globalData.cityName == "") {

            that.setData({
              cityName: data[0].regeocodeData.addressComponent.city
            })
          } else {
            let cityName = app.globalData.cityName

            that.setData({
              cityName: cityName
            })
          }

        },
        fail: function (info) {
          //失败回调
          console.log(info)
        }
      })

 


   

    }
  },
  select() {
    wx.navigateTo({
      url: '../citySelect/citySelect',
    })
  },
  selectItem(e) {
    console.log(e)
    // wx.navigateTo({
    //   url: '../addAddress/addAddress?address=' + e.currentTarget.dataset.name + '&local=' + e.currentTarget.dataset.local,
    // })
    app.globalData.city=e.currentTarget.dataset.name
    app.globalData.local=e.currentTarget.dataset.local

    wx.navigateBack({
      complete: (res) => {},
    })
  },
  focus: function (e) {
    wx.navigateTo({
      url: '../addressSearch/addressSearch',
    })
  },

  regionchange(e) {

    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {

      var that = this;
      this.mapCtx = wx.createMapContext("map", this);

      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: function (res) {
          console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            circles: [{
              latitude: res.latitude,
              longitude: res.longitude,
              color: '#FF0000DD',
              fillColor: '#d1edff88',
              radius: 3000, //定位点半径
              strokeWidth: 1
            }]
          })
          var myAmapFun = new amap.AMapWX({
            key: key
          });
          myAmapFun.getPoiAround({
            location: res.longitude + ',' + res.latitude,
            querytypes: "",
            querykeywords: '',
            success: function (data) {
              //成功回调
              console.log(data)
              that.setData({
                add: data.markers
              })
              console.log(that.data.add)
            },
            fail: function (info) {
              //失败回调
              console.log(info)
            }
          })




        }
      })
    }


  },
  onPullDownRefresh(){
    this.onShow()
  }
})