//index.js
//获取应用实例
var amap = require('../../utils/amap-wx.js') //如：..­/..­/libs/amap-wx.js
var key = "94f5b056c1f65da8f42a211ebb81bed6"
const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    id: '',
    image: [],
    swiperIdx: 0,
    seath: false,
    interval: 4000,
    duration: 800,
    right: 0,
    iconList: [],
    address: '',
    goodlist: [],
    storeid: '',
    cardTeams: [],
    newData: []
  },

  //事件处理函数




  onLoad: function (options) {

  },
  getCarList(storeId) {


    api._get('cart/findCartList?storeId=' + storeId).then(res => {
      if (res.code == 200) {
        console.log(res)

        this.setData({
          cardTeams: res.data
        })

      }


    }).catch(e => {
      console.log(e)
    })
  },

  shoppingcar() {
    wx.navigateTo({
      url: '../../pageNumber/pages/shoppingCar/shoppingCar',
    })
  },
  onShow() {

    var that = this


  
    if (app.globalData.id) {

      this.setData({
        city: app.globalData.cityName,
        address: app.globalData.name,
        id: app.globalData.id,
        indexLocal: app.globalData.indexLocal
      })
      console.log(app.globalData)
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {


          var myAmapFun = new amap.AMapWX({
            key: key
          });
          myAmapFun.getRegeo({
            location: res.longitude + ',' + res.latitude,

            success: function (data) {

              if (res && res.longitude) {

                api._get('home/homePage?userLng=' + app.globalData.indexLocal.split(',')[0] + '&userLat=' + app.globalData.indexLocal.split(',')[1] + "&cityCode=" + data[0].regeocodeData.addressComponent.adcode + '&type=3')
                  .then(res => {
                    console.log(res)
                    if (res.code == 200) {
                      let array = res.data.banner



                      wx.setStorageSync('storeId', res.data.store.id)
                      wx.setStorageSync('storeName', res.data.store.name)
                      that.setData({
                        image: array,
                        iconList: res.data.class,
                        address: res.data.store.name,
                        phone: res.data.store.phone,
                        goodlist: res.data.goods,
                        storeid: res.data.store.id
                      })
                      res.data.class.push({
                        hotIcon: "../../image/gengduo@2x.png",
                        icon: "../../image/gengduo@2x.png",
                        id: '',
                        moduleType: "",
                        name: "更多",
                        unSelectIcon: "../../image/gengduo@2x.png"
                      })
                      that.swiper(res.data.class, 10)
                      





                    } else {
                      that.setData({
                        address: res.message
                      })
                      console.log(that.data.address)
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
          api._get('home/homePage?userLng=' + "" + '&userLat=' + "" + "&cityCode=" + '360104' + '&type=3')
            .then(res => {
              console.log(res)
              if (res.code == 200) {

                wx.setStorageSync('storeId', res.data.store.id)
                wx.setStorageSync('storeName', res.data.store.name)
                let array = res.data.banner


                that.setData({
                  image: array,
                  iconList: res.data.class,
                  address: res.data.store.name,
                  storeid: res.data.store.id,
                  phone: res.data.store.phone,
                  goodlist: res.data.goods
                })
                res.data.class.push({
                  hotIcon: "../../image/gengduo@2x.png",
                  icon: "../../image/gengduo@2x.png",
                  id: '',
                  moduleType: "",
                  name: "更多",
                  unSelectIcon: "../../image/gengduo@2x.png"
                })
                that.swiper(res.data.class, 10)
       

              } else {
                that.setData({
                  address: res.message
                })
           
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
              }
            })
        }
      })


    } else {
      this.getHome()
    }

    that.getCarList(wx.getStorageSync('storeId'))
  },

  swiper(arr, size) {
    //  定义好全局this指向
    let that = this
    //  获取数组长度
    var length = arr.length;
    //  一共可以分为几页，ceil：取整，有小数点加一  例如：1.2  取  2
    var page = Math.ceil(length / size);
    //  创建一个新数组，存放截取后的数据
    var newData = []
    //  从第几个开始截取
    var start = 0

    for (var i = 1; i < page; i++) {
      //  i 指循环到第几页   i *  size  截取到第几个，页数 * 每页个数
      var newArr = arr.slice(start, i * size)
      //  放在新的数组中
      newData.push(newArr)
      //  查看余数
      var remainder = length - i * size
      //  下一次开始的下标，第二页应从下标为4开始
      start = i * size
    }
    //  判断余数是否大于每页展示个数
    if (remainder > size) {
      return
    } else {
      //  小于每页个数的话，直接截取到最后一个，再存到数组中，渲染到页面上
      var newArr = arr.slice(start, length)
      newData.push(newArr)
      that.setData({
        newData: newData
      })
    }

   
  },
  more1(e) {
    wx.navigateTo({
      url: '../../pagesSinger/pages/goodList/goodList?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
    })
  },
  goodSearch() {
    wx.navigateTo({
      url: '../../pagesSinger/pages/goodSearch/goodSearch',
    })
  },
  skip1(e) {
  
    if(e.currentTarget.dataset.id==""){
     wx.navigateTo({
       url: '../../pageNumber/pages/classify/classify',
       complete: (res) => {},
        
       fail: (res) => {},
       success: (result) => {},
     })
    }else{
      wx.navigateTo({
        url: '../../pagesSinger/pages/goodList/goodList?index=' + e.currentTarget.dataset.index + '&id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
      })
    }
 
  },
  localtion() {
    wx.navigateTo({
      url: '../../pagesSinger/pages/localtion/localtion',
    })
  },
  freeTell: function () {

    wx.makePhoneCall({

      phoneNumber: this.data.phone,

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
 
            if (res && res.longitude) {

              api._get('home/homePage?userLng=' + res.longitude + '&userLat=' + res.latitude + "&cityCode=" + data[0].regeocodeData.addressComponent.adcode + '&type=3')
                .then(res => {
             
                  if (res.code == 200) {
                    let array = res.data.banner



                    wx.setStorageSync('storeId', res.data.store.id)
                    wx.setStorageSync('storeName', res.data.store.name)
                    that.setData({
                      image: array,
                      iconList: res.data.class,
                      address: res.data.store.name,
                      phone: res.data.store.phone,
                      goodlist: res.data.goods,
                      storeid: res.data.store.id
                    })
                    res.data.class.push({
                      hotIcon: "../../image/gengduo@2x.png",
                      icon: "../../image/gengduo@2x.png",
                      id: '',
                      moduleType: "",
                      name: "更多",
                      unSelectIcon: "../../image/gengduo@2x.png"
                    })
                    that.swiper(res.data.class, 10)
               





                  } else {
                    that.setData({
                      address: res.message
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
    
          }
        })
      },
      fail: function (err) {
        api._get('home/homePage?userLng=' + "" + '&userLat=' + "" + "&cityCode=" + '360104' + '&type=3')
          .then(res => {
   
            if (res.code == 200) {

              wx.setStorageSync('storeId', res.data.store.id)
              wx.setStorageSync('storeName', res.data.store.name)
              let array = res.data.banner


              that.setData({
                image: array,
                iconList: res.data.class,
                address: res.data.store.name,
                storeid: res.data.store.id,
                phone: res.data.store.phone,
                goodlist: res.data.goods
              })
              res.data.class.push({
                hotIcon: "../../image/gengduo@2x.png",
                icon: "../../image/gengduo@2x.png",
                id: '',
                moduleType: "",
                name: "更多",
                unSelectIcon: "../../image/gengduo@2x.png"
              })
              that.swiper(res.data.class, 10)

            } else {
              that.setData({
                address: res.message
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
  touchStart(e) {
 
    this.setData({
      right: -50
    })
  },
  touchEnd(e) {
 
    this.setData({
      right: 0
    })
  },
  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperIdx: current,
    })
  },
  goodsDetail(e) {

    wx.navigateTo({
      url: '../../pagesSinger/pages/goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.id + "&storeid=" + this.data.storeid + '&type=' + e.currentTarget.dataset.type,
    })
  },
  skip() {
    wx.navigateTo({
      url: '../../pageNumber/pages/address/address',
    })
  },
  goodlist() {
    wx.navigateTo({
      url: '../../pagesSinger/pages/goodList/goodList?storeId=' + this.data.id,
    })
  },
  more() {
    wx.navigateTo({
      url: '../../pageNumber/pages/classify/classify',
    })
  },
  store(){
    wx.navigateTo({
      url: '../../pageNumber/pages/storeDetail/storeDetail?storeid='+this.data.storeid,
    })
  },




  onPageScroll: function (e) {

    if (e.scrollTop >= 44) {
      this.setData({
        seath: true
      })
    } else {
      this.setData({
        seath: false
      })
    }
  },
  onPullDownRefresh: function () {
    this.getHome()
  },

})