// 默认声明一个函数记录list显示的数据---删除状态
var initdata = function (that) {
  
  var cardTeams = that.data.cardTeams
  for( let i in that.data.cardTeams){
    for (let j in that.data.cardTeams[i].goodsList) {
      that.data.cardTeams[i].goodsList[j].shows = ""
    }
  }

  that.setData({
    cardTeams: cardTeams
  })
}
const api = require('../../../utils/api.js')
Page({

  /**

  * 页面的初始数据

  */

  data: {
    delBtnWidth: 185, //删除按钮宽度单位（rpx） 
    list: [],
    list1: [],
    consigneeName: '',
    consigneePhone: "",
    areaIdPath: "",
    address: '',
    index1: '',
    show: false,
    status: false,
    startX: 0, //开始坐标
    startY: 0,
    select:'',
    allselected: false,

    allnum: 0,

    allprices: 0,
    list: [],
    storename: '',
    hidden: false,
    total: [],
    show:true,
    hidden1:false,
    ids:"",
    show3:false,
    spec: '',
    attributeList: [],
    goodDetails: '',
    img1: "",
    commentList: [],
    commentAll: '',
    intro: '',
    value: [],
    spId: [],
    SpecV: [],
    mack: [],
    status: 1,
    gooddetail: '',
    price1: "",
    oldId:'',
    goodsDetail:'',
    arr:[],
    blur:[],
    arr1:[],
    name: [],

  },

  /**

  * 生命周期函数--监听页面加载

  */
 changenum(e){
  console.log(e)

  if(Number(e.detail.value) <=e.currentTarget.dataset.stock){
    e.detail.value=Number(e.detail.value)
    this.data.cardTeams[e.currentTarget.dataset.index1].goodsList[e.currentTarget.dataset.index].num=Number(e.detail.value)
         this.setData({
          cardTeams:this.data.cardTeams
         })
  
  }else{
    this.data.cardTeams[e.currentTarget.dataset.index1].goodsList[e.currentTarget.dataset.index].num=e.currentTarget.dataset.stock
    this.setData({
      cardTeams:this.data.cardTeams
     })
    e.detail.value=e.currentTarget.dataset.stock
  }

  api._posts('cart/updNum',{
    storeId:wx.getStorageSync('storeId'),
    goodsDetailId:e.currentTarget.dataset.detail,
    num:e.detail.value
  })
  .then(res=>{
    if(res.code==200){
      console.log(res)
    }else{
      wx.showToast({
        title: res.message,
        icon:"none"
      })
    }
  })

 },
 dingdan(){
  var storeId=wx.getStorageSync('storeId')
  console.log(this.data.goodDetails)
  api._posts('cart/updSpec',{
    oldDetailId:this.data.goodsDetail,
    goodsDetailId:this.data.gooddetail,
    goodsInfoId:this.data.goodsInfo,
    img: this.data.img1,
    price: this.data.price,
    num: this.data.salesNum,
    title: this.data.goodDetails.name,
    storeId:storeId,
    specValue: this.data.SpecV,
    specId: this.data.value.join(','),
    moduleType:this.data.type
  })


  .then(res=>{
    console.log(res)
    if(res.code==200){
      wx.showToast({
        title: '修改成功',
        icon:'none'
      })
      this.getCarList(storeId)
      this.setData({
        show3:false
      })
    }
  })
 },


 searchClass(e){
    console.log(e)
    api._get('cart/findLikeGoods?storeId='+wx.getStorageSync('storeId')+'&classId='+e.currentTarget.dataset.item.classId+'&type='+e.currentTarget.dataset.item.moduleType)
    .then(res=>{
      console.log(res)
      if(res.code==200){
        wx.navigateTo({
          url: '../goodList/goodList?id='+res.data.parentId,
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }
    })
  },
  spcAgain(e){
    this.setData({
      show3: true,
      salesNum:1,

    })
    console.log(e)
    var storeid=wx.getStorageSync('storeId')
    let id=e.currentTarget.dataset.id
    this.getSpec(id, storeid,this.data.type)
    this.getDetail(id, storeid)
    this.setData({
      type:e.currentTarget.dataset.goodsdetail.moduleType,
      storeid: storeid,
      id: e.currentTarget.dataset.id,
      specID:[],
      specValue:[],
      goodsDetail:e.currentTarget.dataset.goodsdetail.goodsDetailId,
      price:"",
        SpecV:[],
      goodsInfo:e.currentTarget.dataset.goodsdetail.goodsInfoId,
      img1:e.currentTarget.dataset.goodsdetail.img,
      spId:[],
   
    
    })
  },


 spcShow(e) {
  var storeid=wx.getStorageSync('storeId')
  let id=e.currentTarget.dataset.id
  this.setData({
    type:e.currentTarget.dataset.goodsdetail.moduleType,
    show3: true,
    salesNum:e.currentTarget.dataset.num,
    storeid: storeid,
    id: e.currentTarget.dataset.id,
    specID:e.currentTarget.dataset.specid.split(','),
    specValue:e.currentTarget.dataset.value.split(','),
    goodsDetail:e.currentTarget.dataset.goodsdetail.goodsDetailId,
    price:e.currentTarget.dataset.goodsdetail.price,

      SpecV:e.currentTarget.dataset.value.split(','),
    goodsInfo:e.currentTarget.dataset.goodsdetail.goodsInfoId,
    img1:e.currentTarget.dataset.goodsdetail.img,
    spId:e.currentTarget.dataset.specid.split(','),
  })


  this.getSpec(id, storeid,this.data.type)
  this.getDetail(id, storeid)

},
getPlus: function (e) {
  var that = this
  var salesNum = 1
  if(that.data.salesNum<that.data.stock){
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
getDetail(id, storeid) {
  var that = this
  api._get('storeGoods/findMarketStoreGoodsInfo?goodsInfoId=' + id + '&storeId=' + storeid + '&type='+this.data.type)
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
        
          
        })
    
      }
    })
},


getSpec(id, storeid,type) {

var that=this
  api._posts('storeGoods/findSpecsBySpecsIds', {
      storeId: storeid,
      goodsInfoId: id,
      marketSpecStr: "[]",
      moduleType:type
    })
    .then(res => {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          attributeList: res.data
        })
      for(let i in that.data.attributeList){
        that.data.arr1[i]=that.data.attributeList[i].specName
        that.data.name[i]=that.data.attributeList[i].specName
         for(let j in that.data.attributeList[i].child){
         
           if(that.data.SpecV[i]==  that.data.attributeList[i].child[j].specValueName){
            that.data.attributeList[i].child[j].checked=true
            that.data.arr[i]=that.data.attributeList[i].child[j].specValueName
           }
         }
      }
      console.log(that.data.attributeList)
      for (let i in that.data.attributeList) {
        that.data.mack[i] = {
          specName: that.data.name[i],
          specValueName: that.data.arr[i]
        }
      }

      api._posts('storeGoods/findSpecsBySpecsIds', {
        storeId: that.data.storeid,
        goodsInfoId: that.data.id,
        marketSpecStr: JSON.stringify(that.data.mack),
        moduleType: that.data.type
        })
        .then(res => {
  
  

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
          that.setData({
            attributeList:that.data.attributeList
          })
  
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
   console.log(specValueName)

  //TODO 性能可优化，加文末链接入群探讨
  let _attributeList = this.data.attributeList;

  for (let i = 0; i < _attributeList.length; i++) {
    if (_attributeList[i].specName == specName) {
      for (let j = 0; j < _attributeList[i].child.length; j++) {
        if (_attributeList[i].child[j].specValueName == specValueName) {
          //如果已经选中，则反选
          if (_attributeList[i].child[j].checked) {
            // _attributeList[i].child[j].checked = false;
            // console.log(this.data.SpecV)
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
           console.log(this.data.name)
            this.data.SpecV[i] = _attributeList[i].child[j].specValueName
            this.data.arr[i] = _attributeList[i].child[j].specValueName
            this.data.value[i] = _attributeList[i].specId

            this.data.name[i] = _attributeList[i].specName
            console.log(this.data.SpecV)
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
    'attributeList': _attributeList,
  });
  // 去除空元素

  var arr = this.data.value.filter(res => {
    return res
  })
  var arrId = this.data.spId.filter(res => {
    return res
  })

  if (this.data.arr.length == this.data.attributeList.length) {

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
          salesNum:1,
          price: res.data.price,
          img1: res.data.specImg,
          stock: res.data.stock,
          gooddetail: res.data.goodsDetailId
        })

        for (let i in that.data.arr) {
          that.data.mack[i] = {
            specName: that.data.name[i],
            specValueName: that.data.SpecV[i]
          }
        }
        console.log(that.data.mack)
    
        api._posts('storeGoods/findSpecsBySpecsIds', {
          storeId: that.data.storeid,
          goodsInfoId: that.data.id,
          marketSpecStr: JSON.stringify(that.data.mack),
          moduleType: that.data.type
          })
          .then(res => {
    
    
       
    
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
            that.setData({
              attributeList:that.data.attributeList
            })
          
    
          })


      })
  } else {

  console.log(this.data.arr)
    for (let i in this.data.arr) {
      this.data.mack[i] = {
        specName: this.data.name[i],
        specValueName: this.data.SpecV[i]
      }
    }
    console.log(this.data.mack)

    api._posts('storeGoods/findSpecsBySpecsIds', {
      storeId: this.data.storeid,
      goodsInfoId: this.data.id,
      marketSpecStr: JSON.stringify(this.data.mack),
      moduleType: this.data.type
      })
      .then(res => {


   

        for (let i in this.data.attributeList) {
          this.data.attributeList[i].specId=res.data[i].specId
          this.data.attributeList[i].specName=res.data[i].specName
           for (let j in this.data.attributeList[i].child){
            this.data.attributeList[i].child[j].checkStock=res.data[i].child[j].checkStock
            this.data.attributeList[i].child[j].isFlay=res.data[i].child[j].isFlay
            this.data.attributeList[i].child[j].isSelect=res.data[i].child[j].isSelect
            this.data.attributeList[i].child[j].specValueName=res.data[i].child[j].specValueName
              if(this.data.attributeList[i].child[j].checked==true){
                    
                  this.data.attributeList[i].child[j].checked==true

                }
           }
        }
      

      })

  }

  //重新计算哪些值不可以点击,先不做
},







  onLoad: function (options) {
    var that = this
    var storeId = wx.getStorageSync('storeId')
    this.getCarList(storeId)
    //获取购物车信息
    this.getStoreList(storeId)

  },
  change(){
    this.setData({
      hidden1:true,
      show:false
    })
  },
  change1(){
    this.setData({
      hidden1:false,
      show:true
    })
  },
  dixed() {
    this.setData({
      hidden: true
    })
  },
  select(e) {
    console.log(e)
    var that = this
    this.setData({
      hidden: false
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {

        api._posts('home/storageUserStore?userLng=' + res.longitude + '&userLat=' + res.latitude + '&storeId=' + e.currentTarget.dataset.id.id)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              that.setData({
                storename: e.currentTarget.dataset.id.name
              })
              wx.setStorageSync('storeId', e.currentTarget.dataset.id.id)
              that.getCarList(e.currentTarget.dataset.id.id)
              that.getStoreList(e.currentTarget.dataset.id.id)
            }
          })
      },
      fail(err) {
        console.log(res)
      }

    })
  },

  getCarList(storeId) {


    api._get('cart/findCartList?storeId=' + storeId).then(res => {
      if (res.code == 200) {
      console.log(res)
      for(let i in res.data){
        for(let j in res.data[i].goodsList){
          res.data[i].goodsList[j].mainImg=res.data[i].goodsList[j].mainImg.split(',')[0]
        }
      }
      var blur=[]
         for(let i in res.data ){
          res.data[i].total=0
          if(res.data[i].type=='失效商品'){
            for(let j in res.data[i].goodsList){
              blur.push(res.data[i].goodsList[j])
            }
           
          }
         }
   
         this.setData({
          cardTeams: res.data,
          blur:blur
        })
     console.log(blur)
   
   

      }


    }).catch(e => {
      console.log(e)
    })
  },

  getStoreList(storeId) {
    api._get('cart/findUserAllCart?storeId=' + storeId).then(res => {
      if (res.code == 200) {
        this.setData({
          list: res.data,
        
        })
        for(let i in res.data){
          if(res.data[i].isCurrent==0){
              this.setData({
                storename:res.data[i].name
              })
          }
        }
      }

      console.log(res)

    }).catch(e => {
      console.log(e)
    })
  },
  clear(e){
    var that=this
    console.log(e)
    let arr=e.currentTarget.dataset.ids
    var array=[]
    for( let i in arr){
      // for(let j in arr[i].goodsList){
        array[i]=arr[i].goodsDetailId
      // }
    }
    console.log(array)


    wx.showModal({
      title: '提示',
      content: '确认要清除失效商品吗？',
      success (res) {
      if (res.confirm) {
        api._posts('cart/delCheckedGoods',{
          ids:array.join(','),
          storeId:wx.getStorageSync('storeId')
        })
        .then(res=>{
          if(res.code==200){
            console.log(res)
            that.getCarList(storeId)
          }
        })
      } else if (res.cancel) {
      console.log('用户点击取消')
      }
    }
    })
 
    
  },
  order(e){
   var goodArr=[]
    for(let i in this.data.cardTeams){
       for(let j in this.data.cardTeams[i].goodsList){
            if( this.data.cardTeams[i].goodsList[j].selected==true){
                
              goodArr.push(this.data.cardTeams[i].goodsList[j])
               
            }
       }
    }


    console.log(e)
    
    if(goodArr.length==0){
      console.log(333)
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
    }else{
      wx.navigateTo({

        url: '../../../pagesSinger/pages/placeOrder/placeOrder?goodArr='+JSON.stringify(goodArr)+'&type='+e.currentTarget.dataset.id+'&classId='+e.currentTarget.dataset.classid,
        complete: (res) => {},
     
        fail: (res) => {},
        success: (result) => {},
      })
    }


  },
  // 开始滑动事件
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this;
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      // var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
        // txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
        // txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          // txtStyle = "left:-" + delBtnWidth + "px";
        }
      }

    }
  },
  // 滑动中事件
  touchE: function (e) {


    if (e.changedTouches[0].clientX > 42) {

      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = "";
      txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0px";
      //获取手指触摸的是哪一项 
   
      var index1 = e.currentTarget.dataset.index1;
      var index = e.currentTarget.dataset.index;
      var list = this.data.cardTeams;
      list[index1].goodsList[index].shows = txtStyle;
      console.log(e)
      this.setData({
        cardTeams: list
      });
   
    } else {
      console.log("2");
    }
  },
  //获取元素自适应后的实际宽度 
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale); 
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error 
    }
  },
  //点击删除按钮事件 
  delItem: function (e) {
    var that = this;
    // 打印出当前选中的index
    var index1 = e.currentTarget.dataset.index1;
    var index = e.currentTarget.dataset.index;

    // 获取到列表数据
    var list = that.data.cardTeams;
    wx.showModal({
      title: "",
      content: "确定删除此商品？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "rgba(153,153,153,1)",
      confirmText: "确定",
      confirmColor: "#FFA64C",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          // 删除
          console.log(list[index1].goodsList[index])
          // list[index1].goodsList.splice(e.currentTarget.dataset.index, 1);


          api._post('cart/delCheckedGoods?ids='+list[index1].goodsList[index].goodsDetailId+'&storeId='+wx.getStorageSync('storeId'))
          .then(res=>{
            console.log(res)
            if(res.code==200){
              that.setData({
                cardTeams: list
              })
              initdata(that)

              wx.showToast({
                title: '删除成功',
                icon:'none'
              })
              that.getCarList(wx.getStorageSync('storeId'))
            }else{
              wx.showToast({
                title: res.message,
                icon:'none'
              })
            }

             // 重新渲染
         
          })
         
        }
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
    var storeId = wx.getStorageSync('storeId')
    this.getCarList(storeId)
    //获取购物车信息
    this.getStoreList(storeId)
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

  },

  //计算总价格  所有选中商品的 （价格*数量）相加

  getallprices: function () {

    var cardTeams = this.data.cardTeams //购物车数据

    var all=0
    var num1=0
    for (var i = 0; i < cardTeams.length; i++) {

      var allprices = 0

      let allnum = 0

      var goodsList = cardTeams[i].goodsList

      for (var a = 0; a < goodsList.length; a++) {

        if (goodsList[a].selected&&(goodsList[a].goodsStatus==1||goodsList[a].goodsStatus==5)) {

          let price = Number(goodsList[a].price)

          let num = parseInt(goodsList[a].num) //防止num为字符 *1或parseInt Number

          allprices += price * num
          all+=price * num
          allnum += num
          num1 += num
         

        } 
     

      }
      console.log(allprices)
      this.data.total[i] = allprices
      this.setData({


        allnum: allnum,

        allprices: allprices

      })


      for (let i in this.data.cardTeams) {
        this.data.cardTeams[i].total = this.data.total[i]
      }
      this.setData({
        cardTeams:this.data.cardTeams
      })

    }

      this.setData({
        all:all,
        num1:num1
      })
      console.log(this.data.ids)

    //跟新已选数量




  },

  //全选条件 条件->商铺全选择全选 反之

  allallprices: function () {

    let cardTeams = this.data.cardTeams

    let storenum = cardTeams.length;

    let allselected = this.data.allselected

    let allselectednum = 0;

    for (var i = 0; i < cardTeams.length; i++) {

      if (cardTeams[i].selected == true) {

        allselectednum++

      }

    }

    if (storenum == allselectednum) {

      allselected = true

    } else {

      allselected = false

    }

    this.setData({

      allselected: allselected

    })

    this.getallprices();

  },

  //全选按钮点击

  tapallallprices: function () {

    let allselected = this.data.allselected

    var cardTeams = this.data.cardTeams //购物车数据

    if (allselected) {

      allselected = false

    } else {

      allselected = true

    }
    //选择

    for (var i = 0; i < cardTeams.length; i++) {

      cardTeams[i].selected = allselected

      var goodsList = cardTeams[i].goodsList

      for (var a = 0; a < goodsList.length; a++) {

        goodsList[a].selected = allselected

      }

    }

    this.setData({

      cardTeams: cardTeams, //店铺下商品的数量

      allselected: allselected

    })

    this.getallprices();

  },

  // 店铺的选中

  storeselected: function (e) {

    var cardTeams = this.data.cardTeams //购物车数据

    let index = e.currentTarget.dataset.index //当前店铺下标

    var thisstoredata = cardTeams[index].goodsList //当前店铺商品数据

    //改变当前店铺状态

    if (cardTeams[index].selected) {

      cardTeams[index].selected = false

      //改变当前店铺所有商品状态

      for (var i in thisstoredata) {

        cardTeams[index].goodsList[i].selected = false

      }

    } else {

      cardTeams[index].selected = true

      //改变当前店铺所有商品状态

      for (var i in thisstoredata) {

        cardTeams[index].goodsList[i].selected = true

      }

    }

    this.setData({

      cardTeams: cardTeams //店铺下商品的数量

    })
    console.log(this.data.cardTeams)

    this.getallprices();

    this.allallprices();

  },

  // 商品的选中

  goodsselected: function (e) {

    var cardTeams = this.data.cardTeams //购物车数据

    let index = e.currentTarget.dataset.index //当前商品所在店铺中的下标

    let idx = e.currentTarget.dataset.selectIndex //当前店铺下标

    let cai = cardTeams[idx].goodsList; //当前商品的店铺data.goodsList

    let curt = cai[index]; //当前商品数组

    if (curt.selected) {

      cardTeams[idx].goodsList[index].selected = false //点击后当前店铺下当前商品的状态

      cardTeams[idx].selected = false

    } else {

      cardTeams[idx].goodsList[index].selected = true //点击后当前店铺下当前商品的状态

      //当店铺选中商品数量与店铺总数量相等时 改变店铺状态

      var storegoodsleg = cardTeams[idx].goodsList.length

      var goodsList = cardTeams[idx].goodsList

      var selectedleg = 0

      for (var i in goodsList) {

        if (goodsList[i].selected == true) {

          selectedleg++

        }

      }

      if (storegoodsleg == selectedleg) {

        cardTeams[idx].selected = true

      }

    }

    // 更新

    this.setData({

      cardTeams: cardTeams //店铺下商品的数量

    })
    console.log(this.data.cardTeams)
    console.log(curt)

    this.getallprices();

    this.allallprices();

  },

  // 点击+号，num加1，点击-号，如果num > 1，则减1

  addCount: function (e) {
  var that=this
    var cardTeams = this.data.cardTeams //购物车数据

    let index = e.currentTarget.dataset.index //当前商品所在店铺中的下标

    let idx = e.currentTarget.dataset.selectIndex //当前店铺下标

    let cai = cardTeams[idx].goodsList; //当前商品的店铺data.goodsList

    let curt = cai[index]; //当前商品数组

    var num = curt.num; //当前商品的数量

    num++;

    cardTeams[idx].goodsList[index].num = num //点击后当前店铺下当前商品的数量

    this.setData({

      cardTeams: cardTeams //店铺下商品的数量

    })


    api._posts('cart/updNum',{
      storeId:wx.getStorageSync('storeId'),
      goodsDetailId:e.currentTarget.dataset.detail,
      num:num
    })
    .then(res=>{
      if(res.code==200){
        console.log(res)
        if(res.data!==null){
          cardTeams[idx].goodsList[index].num=res.data
          that.setData({

            cardTeams: cardTeams //店铺下商品的数量
      
          })
        }else{
          wx.showToast({
            title: res.message,
            icon:"none"
          })
        }
      }
    })
    //计算总价格

    this.getallprices();

  },

  minusCount: function (e) {

    var cardTeams = this.data.cardTeams //购物车数据

    let index = e.currentTarget.dataset.index //当前商品所在店铺中的下标

    let idx = e.currentTarget.dataset.selectIndex //当前店铺下标

    let cai = cardTeams[idx].goodsList; //当前商品的店铺data.goodsList

    let curt = cai[index]; //当前商品数组

    var num = curt.num; //当前商品的数量

    if (num <= 1) {

      return false;

    }

    num--;

    cardTeams[idx].goodsList[index].num = num //点击后当前店铺下当前商品的数量

    this.setData({

      cardTeams: cardTeams //店铺下商品的数量

    })
    api._posts('cart/updNum',{
      storeId:wx.getStorageSync('storeId'),
      goodsDetailId:e.currentTarget.dataset.detail,
      num:num
    })
    .then(res=>{
      if(res.code==200){
        console.log(res)
      }else{
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }
    })
    this.getallprices();

  },
  deleteList: function(e) {
    var that=this 
    var storeId = wx.getStorageSync('storeId')
    var newArray=[]
    var shopcar = this.data.cardTeams; //购物车数据
    for (let i in shopcar) {
        for (let j in shopcar[i].goodsList) {
          if (shopcar[i].goodsList[j].selected==true&&(shopcar[i].goodsList[j].goodsStatus==1||shopcar[i].goodsList[j].goodsStatus==5)){
            newArray.push(shopcar[i].goodsList[j].goodsDetailId);
          }
        }
    }

    console.log(newArray)
    if(newArray.length>0){
      wx.showModal({
        title: '提示',
        content: '确认要删除这几种商品吗？',
        success (res) {
        if (res.confirm) {
          api._posts('cart/delCheckedGoods?ids='+newArray.join(',')+'&storeId='+wx.getStorageSync('storeId'))
          .then(res=>{
            if(res.code==200){
              console.log(res)
              that.getCarList(storeId)
            }
          })
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
      }
      })
    }else{
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
    }
  
  
  },



})