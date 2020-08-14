//先引用城市数据文件

const api = require('../../../utils/api.js')
var amap = require('../../../utils/amap-wx.js') //如：..­/..­/libs/amap-wx.js
var key = "94f5b056c1f65da8f42a211ebb81bed6"

var app = getApp()
var lineHeight = 0;
var endWords = "";
var isNum;
Page({
  data: {
    "hidden": true,
    cityName: "",
    _arr: [],
    hotCity:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getLocation()
  

  },
  focus(){
    wx.navigateTo({
      url: '../citySearch/citySearch',
    })
  },
  getLocation(){
    var that=this
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
            console.log(app.globalData.cityName)

            if (app.globalData.cityName == "") {

              that.setData({
                cityName: data[0].regeocodeData.addressComponent.city,
                citycode: data[0].regeocodeData.addressComponent.adcode
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
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //初始化封装的城市数据
   this.getCity()
   this.getHotCity()
   

  },
  getHotCity(){
    api._get('address/findHotCityList')
    .then(res=>{
      console.log(res)

      this.setData({
        hotCity:res.data
    })
  })
  },
  getCity(){
    api._get('address/findCityList')
    .then(res => {
      let arr = this.sortArr(res.data, 'firstPinyin')
      let arr1 = {}
      arr1['A'] = arr[0]
      arr1['B'] = arr[1]
      arr1['C'] = arr[2]
      arr1['D'] = arr[3]
      arr1['E'] = arr[4]
      arr1['F'] = arr[5]
      arr1['G'] = arr[6]
      arr1['H'] = arr[7]
      arr1['J'] = arr[8]
      arr1['K'] = arr[9]
      arr1['L'] = arr[10]
      arr1['M'] = arr[11]
      arr1['N'] = arr[12]
      arr1['P'] = arr[13]
      arr1['Q'] = arr[14]
      arr1['R'] = arr[15]
      arr1['S'] = arr[16]
      arr1['T'] = arr[17]
      arr1['W'] = arr[18]
      arr1['X'] = arr[19]
      arr1['Y'] = arr[20]
      arr1['Z'] = arr[21]
      var cityChild = arr1;
      console.log(arr1)
      console.log(arr)
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
     
          lineHeight = (res.windowHeight - 100) / 22;
          console.log(res.windowHeight - 100)
          that.setData({
            city: cityChild,
            winHeight: res.windowHeight - 2,
            lineHeight: lineHeight
          })
        }
      })

    })
  },
  sortArr: function (arr, str) {
    var _arr = [],
      _t = [],
      // 临时的变量
      _tmp;

    // 按照特定的参数将数组排序将具有相同值得排在一起
    arr = arr.sort(function (a, b) {
      var s = a[str],
        t = b[str];

      return s < t ? -1 : 1;
    });

    if (arr.length) {
      _tmp = arr[0][str];
    }
    // console.log( arr );
    // 将相同类别的对象添加到统一个数组
    for (var i in arr) {

      if (arr[i][str] === _tmp) {

        _t.push(arr[i]);
      } else {
        _tmp = arr[i][str];
        _arr.push(_t);
        _t = [arr[i]];
      }
    }
    // 将最后的内容推出新数组
    _arr.push(_t);


    return _arr;

  },


  //触发全部开始选择
  chStart: function () {
    console.log('触发全部开始选择')
    //trans是代表右侧字母列表背景的透明度，在演示中可以看到效果，
    //点击右侧列表时呈现灰色背景，点击结束后透明度为0,同时显示页面最下面定义的showWords的显示
    this.setData({
      trans: ".3",
      hidden: false
    })
  },
  //触发结束选择
  chEnd: function () {
    console.log('触发结束选择')
    this.setData({
      trans: "0",
      hidden: true,
      scrollTopId: this.endWords
    })
  },
  //获取文字信息
  getWords: function (e) {
    console.log('获取文字信息')
    var id = e.target.id;
    this.endWords = id;
    isNum = id;
    this.setData({
      showwords: this.endWords
    })
  },
  //设置文字信息
  setWords: function (e) {
    console.log('设置文字信息')
    var id = e.target.id;
    this.setData({
      scrollTopId: id
    })
  },
  //选择城市，并让选中的值显示在文本框里
  bindCity: function (e) {
    console.log(e.currentTarget.dataset.city);
    console.log(e.currentTarget.dataset.local)
    var cityName = e.currentTarget.dataset.city;
    var local = e.currentTarget.dataset.local;
    var citycode = e.currentTarget.dataset.code;
    app.globalData.cityName = cityName
    app.globalData.local = local
    app.globalData.citycode=citycode
    console.log(cityName)
    console.log(local)
    wx.navigateBack()

 
  }
})