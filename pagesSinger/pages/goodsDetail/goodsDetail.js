// pages/goodsDetail/goodsDetail.js
const api = require('../../../utils/api.js')
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [],
    show: true,
    show1: false,
    salesNum: 1,
    pri: '',
    price: '',
    model: false,
    show2: false,
    show3: false,
    store: '',
    ku: '',
    id3: '',
    currentTab: 0,
    moren: '',
    comment1: '',
    spc: '',
    values: [],
    currentTab: 0,
    Tab: 0,
    tab: 0,
    id: '',
    tree: [{
      name: "商品",
      scroll: 0
    }, {
      name: "评价",
      scroll: 400
    }, {
      name: "详情",
      scroll: 675
    }],
    hidden: false,
    storeid: '',
    spec: '',
    attributeList: [],
    goodDetails: '',
    img1: [],
    commentList: [],
    commentAll: '',
    intro: '',
    value: [],
    spId: [],
    SpecV: [],
    mack: [],
    status: 1,
    gooddetail: '',
    price1: '',
    cardTeams: [],
    goodsdetails: '',
    goodObj: '',
    name: [],
    specValue: null,
    stock:""
  },
  changenum(e) {
    console.log(e)

    if (Number(e.detail.value) <= this.data.stock) {

      this.data.salesNum = Number(e.detail.value)
      this.setData({
        salesNum: Number(e.detail.value)
      })
    } else {
      this.setData({
        salesNum: this.data.stock
      })
      this.data.salesNum = this.data.stock
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  previewImg(e) {
    const current = e.currentTarget.dataset.src //获取当前点击的 图片 url
    console.log(current)
    wx.previewImage({
      current,
      urls: this.data.arrcom
    })
  },
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    let type = options.type
    if(options.storeId){
      var storeid = options.storeId
    }else{
      var  storeid=wx.getStorageSync('storeId')
    }
    console.log(storeid)

    this.setData({
      storeid: storeid,
      id: id,
      type: type
    })
    this.getSpec(id, storeid)
    this.getDetail(id, storeid)
    this.getCarList(storeid)
  },
  shopcar() {
    wx.navigateTo({
      url: '../../../pageNumber/pages/shoppingCar/shoppingCar',
    })
  },
  addShopCar() {
    console.log(this.data.spId)
    if (this.data.gooddetail) {
      if (this.data.stock <= 0) {
        wx.showToast({
          title: '暂无库存',
          icon: 'none'
        })
      } else {
        api._posts('cart/addCart', {

          goodsDetailId: this.data.gooddetail,
          goodsInfoId: this.data.goodDetails.goodInfoId,
          img: this.data.img1,
          price: this.data.price,
          num: this.data.salesNum,
          title: this.data.goodDetails.name,
          storeId: this.data.goodDetails.storeId,
          specValue: this.data.SpecV,
          specId: this.data.value.join(','),
          moduleType: this.data.type
        })
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            wx.showToast({
              title: '加入购物车成功',
              icon: 'none'
            })
            this.setData({
              show3: false
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      }
 
    } else {
      wx.showToast({
        title: '请选择规格',
        icon: 'none'
      })
    }

  },
  buy() {


    this.setData({
      show3: true,
      status: 1
    })
    if (this.data.specValue == null) {
      api._posts('storeGoods/findGoodsDetailBySpecs', {
          storeId: this.data.storeid,
          goodsInfoId: this.data.goodDetails.goodInfoId,
          goodsDetailId: this.data.goodsdetails,
          moduleType: this.data.type
        })
        .then(res => {
          console.log(res)

          this.setData({
            goodObj: res.data,
            salesNum: 1,
            price: res.data.price,
            img1: res.data.specImg,
            stock: res.data.stock,
            gooddetail: res.data.goodsDetailId
          })
        })

    }

    //   let goodArr1 = {
    //     classId: this.data.goodDetails.parentClassId,
    //     className: "",
    //     createTime: new Date(),
    //     goodsDetailId: this.data.goodDetails.goodsDetailId,
    //     goodsInfoId: this.data.goodDetails.goodInfoId,
    //     goodsStatus: this.data.goodDetails.goodsStatus,
    //     hotIcon: "",
    //     img: this.data.goodDetails.mainImg,
    //     moduleType: this.data.goodDetails.moduleType,
    //     num: this.data.salesNum,
    //     price: this.data.goodDetails.price,
    //     selected: true,
    //     specId: this.data.value,
    //     specValue: this.data.SpecV,
    //     stock: this.data.goodDetails.stock,
    //     title: this.data.goodDetails.title,
    //   }
    //   wx.navigateTo({

    //     url: '../placeOrder/placeOrder?goodArr=' + JSON.stringify([goodArr1]) + '&type=' + this.data.goodDetails.parentClassId + '&classId=' + this.data.goodDetails.moduleType,
    //     complete: (res) => {},

    //     fail: (res) => {},
    //     success: (result) => {},
    //   })

    // }
  },
  addCar() {
    console.log(this.data.attributeList)
    // if (this.data.attributeList.length > 0) {

    this.setData({
      show3: true,
      status: 2
    })
    if (this.data.specValue == null) {
      api._posts('storeGoods/findGoodsDetailBySpecs', {
          storeId: this.data.storeid,
          goodsInfoId: this.data.goodDetails.goodInfoId,
          goodsDetailId: this.data.goodsdetails,
          moduleType: this.data.type
        })
        .then(res => {
          console.log(res)
          this.setData({
            goodObj: res.data,
            salesNum: 1,
            price: res.data.price,
            img1: res.data.specImg,
            stock: res.data.stock,
            gooddetail: res.data.goodsDetailId
          })
        })

    }
  

  },
  dingdan() {



    if (this.data.gooddetail) {

      if (this.data.stock <= 0) {
        wx.showToast({
          title: '暂无库存',
          icon: 'none'
        })
      } else {
      this.setData({
        show3: false,
      })
      let goodArr1 = {
        classId: this.data.goodDetails.parentClassId,
        className: "",
        createTime: new Date(),
        goodsDetailId: this.data.goodObj.goodsDetailId,
        goodsInfoId: this.data.goodDetails.goodInfoId,
        goodsStatus: this.data.goodDetails.goodsStatus,
        hotIcon: "",
        img: this.data.goodObj.specImg,
        moduleType: this.data.goodDetails.moduleType,
        num: this.data.salesNum,
        price: this.data.goodObj.price,
        selected: true,
        specId: this.data.value,
        specValue: this.data.SpecV,
        stock: this.data.goodObj.stock,
        title: this.data.goodDetails.title,
      }
      console.log(goodArr1)
      wx.navigateTo({

        url: '../placeOrder/placeOrder?goodArr=' + JSON.stringify([goodArr1]) + '&classId=' + this.data.goodDetails.parentClassId + '&type=' + this.data.goodDetails.moduleType,
        complete: (res) => {},

        fail: (res) => {},
        success: (result) => {},
      })
    }
    } else {
      wx.showToast({
        title: '请选择规格',
        icon: 'none'
      })
    }
  },
  back() {
    wx.navigateBack({
      complete: (res) => {},
      delta: 0,
      fail: (res) => {},
      success: (res) => {},
    })
  },
  spcShow() {
    this.setData({
      show3: true,
      status: 1
    })

  },
  findAll() {
    wx.navigateTo({
      url: '../../../pageNumber/pages/comment/comment?id=' + this.data.id + '&storeid=' + this.data.storeid + '&type=' + this.data.type,
    })
  },
  store() {
    wx.navigateTo({
      url: '../../../pageNumber/pages/storeDetail/storeDetail?storeid=' + this.data.storeid,
    })
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current,
      })


      var toViewid = "#contain"
      var scrollTop;
      const query = wx.createSelectorQuery(); //创建节点查询器
      query.select(toViewid).boundingClientRect() //选择toViewid获取位置信息
      query.selectViewport().scrollOffset() //获取页面查询位置的
      query.exec(function (res) {
        console.log(res)

        wx.createSelectorQuery().select('.page').boundingClientRect(function (rect) {
          wx.pageScrollTo({
            scrollTop: e.currentTarget.dataset.scroll,
            duration: 0
          })
        }).exec()
      })


    }
  },

  getDetail(id, storeid) {
    var that = this
    api._get('storeGoods/findMarketStoreGoodsInfo?goodsInfoId=' + id + '&storeId=' + storeid + '&moduleType=' + this.data.type)
      .then(res => {
        console.log(res.data)
        if (res.code == 200) {
          this.setData({
            goodDetails: res.data.storeGoodsInfo,
            img: res.data.storeGoodsInfo.mainImg.split(','),
            commentList: res.data.goodsCommentList,
            commentAll: res.data.goodsCommentCountVo,
            intro: res.data.storeGoodsInfo.describe,
            price: res.data.storeGoodsInfo.price,
            img1: res.data.storeGoodsInfo.mainImg.split(',')[0],
            goodsdetails: res.data.storeGoodsInfo.goodsDetailId,
            specValue: res.data.storeGoodsInfo.specValue

          })
          var arrcom = []
          for (let i in res.data.goodsCommentList) {
            arrcom = res.data.goodsCommentList[i].enclosureUrl.split(',')
          }
          console.log(arrcom)
          this.setData({
            arrcom: arrcom
          })
          let article = this.data.intro
          WxParse.wxParse('article', 'html', article, that, 5);
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
  },
  getPlus: function (e) {
    var that = this
    var salesNum = 1
    if (that.data.salesNum < that.data.stock) {
      that.data.salesNum++
    }else{
      wx.showToast({
        title: '超过库存',
        icon:'none'
      })
    }

    that.setData({
      salesNum: that.data.salesNum
    })
    that.getTotalPrice()
  },



  getSpec(id, storeid) {


    api._posts('storeGoods/findSpecsBySpecsIds', {
        storeId: storeid,
        goodsInfoId: id,
        marketSpecStr: "[]",
        moduleType: this.data.type
      })
      .then(res => {

        if (res.code == 200) {
          this.setData({
            attributeList: res.data
          })
        }


      })
  },
  getMain: function (e) {
    var that = this
    that.data.salesNum--

    // console.log(index)

    if (that.data.salesNum <= 0) {
      that.data.salesNum = 1
      // that.delItem(e)
    }

    that.setData({
      salesNum: that.data.salesNum
    })
    that.getTotalPrice()
  },
  getTotalPrice() {
    var salesNum = this.data.salesNum
    var price = this.data.price
    var total = 0

    var price1 = salesNum * price

    this.setData({
      price1: price1,
      countMoney: total.toFixed(2)
    })
    console.log(price1, salesNum)
  },
  close3: function () {
    this.setData({
      show3: false
    })
    console.log(this.data.show1)
  },
  
  clickSkuValue: function (event) {
    let that = this;
    let specName = event.currentTarget.dataset.value;
    let specValueId = event.currentTarget.dataset.valueId;
    let specValueName = event.currentTarget.dataset.valueName;
    console.log(this.data.attributeList)
    console.log(event)

    let _attributeList = this.data.attributeList;
    for (let i = 0; i < _attributeList.length; i++) {
      if (_attributeList[i].specName === specName) {
        console.log(_attributeList[i].child.length)
        for (let j = 0; j < _attributeList[i].child.length; j++) {
          if (_attributeList[i].child[j].specValueName == specValueName) {

            if (_attributeList[i].child[j].checked) {
              // _attributeList[i].child[j].checked = false
           
              // this.data.SpecV.splice(i, 1)
              // this.data.name.splice(i, 1)
              // this.data.spId.splice(i, 1)
              // this.data.value.splice(i, 1)
              // console.log(this.data.SpecV)

            } else {
              setTimeout(
                function(){
                  _attributeList[i].child[j].checked = true;
                },20
              )

             
              
        
              this.data.SpecV[i] = _attributeList[i].child[j].specValueName

              this.data.spId[i] = this.data.attributeList[i].specId
              this.data.value[i] = this.data.attributeList[i].specId
              this.data.name[i] = this.data.attributeList[i].specName
             
            
            }
          } else {
            _attributeList[i].child[j].checked = false;
          }
        }
      }
    }


    this.setData({
      name: this.data.name,
      SpecV: this.data.SpecV,
      value: this.data.value,
      spId: this.data.spId
    })
 
    this.setData({
      attributeList: _attributeList,
    });

    // 去除空元素
    var arr = this.data.value.filter(res => {
      return res
    })
    var arrId = this.data.spId.filter(res => {
      return res
    })
    
    console.log(this.data.SpecV)
 
  

    if (arr.length == this.data.attributeList.length) {



      api._posts('storeGoods/findGoodsDetailBySpecs', {
          storeId: this.data.storeid,
          goodsInfoId: this.data.id,
          specNames: this.data.name.join(','),
          specValueNames: this.data.SpecV.join(','),
          moduleType: this.data.type
        })
        .then(res => {
          console.log(res)
          this.setData({
            goodObj: res.data,
            salesNum: 1,
            price: res.data.price,
            img1: res.data.specImg,
            stock: res.data.stock,
            gooddetail: res.data.goodsDetailId
          })

          for (let i in arr) {
            that.data.mack[i] = {
              specName: that.data.name[i],
              specValueName: that.data.SpecV[i]
            }
          }
    
    
          api._posts('storeGoods/findSpecsBySpecsIds', {
              storeId: that.data.storeid,
              goodsInfoId: that.data.id,
              marketSpecStr: JSON.stringify(that.data.mack),
              moduleType: that.data.type
            })
            .then(res => {
    
              
              var arr1 = []
              console.log(res)
              console.log(that.data.attributeList)
              for (let i in that.data.attributeList) {
                that.data.attributeList[i].specId=res.data[i].specId
                that.data.attributeList[i].specName=res.data[i].specName
                 for (let j in that.data.attributeList[i].child){
                  that.data.attributeList[i].child[j].checkStock=res.data[i].child[j].checkStock
                  that.data.attributeList[i].child[j].isFlay=res.data[i].child[j].isFlay
                  that.data.attributeList[i].child[j].isSelect=res.data[i].child[j].isSelect
                  that.data.attributeList[i].child[j].specValueName=res.data[i].child[j].specValueName
                      if(that.data.attributeList[i].child[j].checked==true){
                      
                        that.data.attributeList[i].child[j].checked==true
    
                      }
                 }
              }
              
              console.log(that.data.attributeList)
    
    
    
              that.setData({
                attributeList: that.data.attributeList,
               
              })
               
    
            })



        })
    } else {


      

      for (let i in arr) {
        this.data.mack[i] = {
          specName: this.data.name[i],
          specValueName: this.data.SpecV[i]
        }
      }


      api._posts('storeGoods/findSpecsBySpecsIds', {
          storeId: this.data.storeid,
          goodsInfoId: this.data.id,
          marketSpecStr: JSON.stringify(this.data.mack),
          moduleType: this.data.type
        })
        .then(res => {

          
          var arr1 = []
          console.log(res)
          console.log(this.data.attributeList)
          for (let i in this.data.attributeList) {
            this.data.attributeList[i].specId=res.data[i].specId
            this.data.attributeList[i].specName=res.data[i].specName
             for (let j in this.data.attributeList[i].child){
              this.data.attributeList[i].child[j].checkStock=res.data[i].child[j].checkStock
              this.data.attributeList[i].child[j].isFlay=res.data[i].child[j].isFlay
              this.data.attributeList[i].child[j].isSelect=res.data[i].child[j].isSelect
              this.data.attributeList[i].child[j].specValueName=res.data[i].child[j].specValueName
                  if(this.data.attributeList[i].child[j].checked==true){
                       console.log('33333333')
                    this.data.attributeList[i].child[j].checked==true

                  }
             }
          }
          
          console.log(this.data.attributeList)



          this.setData({
            attributeList: this.data.attributeList,
            gooddetail: ""
          })
           

        })

    }

    //重新计算哪些值不可以点击,先不做
  },






  dingdan1() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log(options)

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


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll: function (e) {
    console.log(e.scrollTop)
    if (e.scrollTop >= 230) {
      this.setData({
        hidden: true
      })
    } else {
      this.setData({
        hidden: false
      })
    }
  },
  onPullDownRefresh: function () {
    let storeid = wx.getStorageSync('storeId')


    this.getSpec(this.data.id, storeid)
    this.getDetail(this.data.id, storeid)
    this.getCarList(storeid)
  },
})