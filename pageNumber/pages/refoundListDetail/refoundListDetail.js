// pagesSinger//pages/refoundListDetail/refoundListDetail.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0, 0, 0, 0],
    multiArray: [],
    year: "",
    month: "",
    day: "",
    startHour: "",
    endHour: "",
    tree: [{
      time: '今天周三',
      date: [{
        hour: '09:30-12:00'
      }, {
        hour: '09:30-12:00'
      }, {
        hour: '09:30-12:00'
      }]
    }, {
      time: '明天周四',
      date: [{
        hour: '09:30-3:00'
      }, {
        hour: '09:30-9:00'
      }, {
        hour: '09:30-12:00'
      }]
    }],
    saleDetail:'',
    date:'',
    kuan:'',
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     id:options.id
   })

   var date = new Date();
   var year = date.getFullYear()
   var month = date.getMonth() + 1
   var day = date.getDate()
   var hour = date.getHours()
  console.log(options.goodArr)

   var surplusMonth = this.surplusMonth(year);

   var surplusDay = this.surplusDay(year, month, day);

   var surplusHour = this.surplusHour(year, month, day, hour)




 

   this.setData({

     multiArray: [
       [year + '年'],
       surplusMonth,
       surplusDay,
       surplusHour[0],
       ['~'],
       surplusHour[1]
     ],
     year: year,
     month: month,
     day: day,
     startHour: surplusHour[0][0],
     endHour: surplusHour[1][0],
     orderData: ''
   })
  },

  cancel(){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要取消售后！',
      howCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
      success: function (res) {
        if(res.cancel){}else{
          api._posts('afterSale/afterSaleCancel',{
            id:that.data.saleDetail.id,
            type:that.data.saleDetail.type
          })
          .then(res=>{
            if(res.code==200){
              wx.showToast({
                title: '取消成功',
                icon:'none'
              })
              that.getDetail()
            }else{
              wx.showToast({
                title: res.message,
                icon:'none'
              })
            }
          })
        }

  }
})
    },
    palt(){
      var that=this
      wx.showModal({
        title: '提示',
        content: '确定平台介入！',
        howCancel: true, //是否显示取消按钮
        cancelText: "否", //默认是“取消”
        cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
        confirmText: "是", //默认是“确定”
        confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
        success: function (res) {
      api._posts('afterSale/applySystemJoin',{
        id:that.data.saleDetail.id,
        type:that.data.saleDetail.type
      })
      .then(res=>{
        if(res.code==200){
          wx.showToast({
            title: '平台介入成功',
            icon:'none'
          })
          that.getDetail()
        }else{
          wx.showToast({
            title: res.message,
            icon:'none'
          })
        }
      })
    }
  })
    },
    agree(){
      var that=this
      wx.showModal({
        title: '提示',
        content: '确定同意门店处理结果！',
        howCancel: true, //是否显示取消按钮
        cancelText: "否", //默认是“取消”
        cancelColor: 'rgba(255,76,79,1)', //取消文字的颜色
        confirmText: "是", //默认是“确定”
        confirmColor: 'rgba(255,76,79,1)', //确定文字的颜色
        success: function (res) {
        if(res.cancel){
          

        }else{
          api._posts('afterSale/agreeStoreResult',{
            id:that.data.saleDetail.id,
            type:that.data.saleDetail.type
          })
          .then(res=>{
            if(res.code==200){
              wx.showToast({
                title: '同意成功',
                icon:'none'
              })
              that.getDetail()
            }else{
              wx.showToast({
                title: res.message,
                icon:'none'
              })
            }
          })
        }

  
    }
  })
    },
    daohang(){
      console.log(this.data.saleDetail)
 wx.openLocation({
   latitude: parseFloat(this.data.saleDetail.afterSaleStoreVo.latitude),
   longitude: parseFloat(this.data.saleDetail.afterSaleStoreVo.longitude),
  //  address: 'address',
   complete: (res) => {},
   fail: (res) => {},
   name:this.data.saleDetail.afterSaleStoreVo.address,
   scale: 28,
   success: (res) => {},
 })
    },
    dianhua(){
      wx.makePhoneCall({
        phoneNumber: this.data.saleDetail.afterSaleStoreVo.storeContactPhone,
        success:function(){},
      })      

    },
back(){
wx.navigateBack({
  complete: (res) => {},
  delta: 2,
  fail: (res) => {},
  success: (res) => {},
})
},
runBack(cm) {
  var that = this
  var time1
  if (cm > 0) {

    cm > 60000 ?
      (time1 =
        (new Date(cm).getHours() < 10 ?
        '0' + new Date(cm).getHours() :
        new Date(cm).getHours()) +
      ':' +
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
 
    // that.getDetail()

  
   
    clearInterval(that.data.inter);
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
    var that=this
this.getDetail()

var dateStr =
this.data.multiArray[0][this.data.multiIndex[0]] +
this.data.multiArray[1][this.data.multiIndex[1]] +
this.data.multiArray[2][this.data.multiIndex[2]] +
this.data.multiArray[3][this.data.multiIndex[3]] +
this.data.multiArray[4][this.data.multiIndex[4]] +
this.data.multiArray[5][this.data.multiIndex[5]];
console.log(dateStr)
this.setData({

orderData: dateStr
})
  },
getDetail(){
  var that=this
api._get('afterSale/getAfterSaleDetail?id='+this.data.id)
.then(res=>{
  if(res.code==200){
    console.log(res)
    var date= new Date().getFullYear()
      if(res.data.serviceTimeEnd){
        res.data.serviceTimeEnd= res.data.serviceTimeEnd.replace(date+'-','')
        res.data.serviceTimeStart= res.data.serviceTimeStart.replace(date+'-','')
      }
  

      res.data.afterSaleGoodInfoVo.spc = JSON.parse(
        res.data.afterSaleGoodInfoVo.goodsSpec)
        res.data.afterSaleGoodInfoVo.goodsImg=res.data.afterSaleGoodInfoVo.goodsImg.split(',')[0]
   

  if(res.data.storeDealVoucher!==null){
    res.data.storeDealVoucher=res.data.storeDealVoucher.split(',')
     
  }
  if(res.data.systemDealVoucher!==null){
    res.data.systemDealVoucher=res.data.systemDealVoucher.split(',')
     
  }
  if(res.data.voucher!==""){
    res.data.voucher=res.data.voucher.split(',')

  }
    this.setData({
      saleDetail:res.data,
      date:res.date,
  
    })
    var ct = res.data.createTime.replace(/\-/g, '/'); // 创建订单时间
    let ts = new Date().getTime(),
      tc = new Date(ct).getTime();
      
      this.setData({
        tc:tc
      })
    const cm = 16 * 60*60 * 1000 - (ts - tc);;
    this.runBack(cm);

    this.setData({
      kuan:(100 / that.data.saleDetail.processList.length)
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

  },
//月份计算
surplusMonth: function (year) {
  var date = new Date();
  var year2 = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var monthDatas = [];
  if (year == year2) {
    var surplusMonth =  month;
    monthDatas.push(month + "月")
    // for (var i = month; i < 12; i++) {
    //   monthDatas.push(i + 1 + "月")
    // }
  } else {
    // for (var i = 0; i < 12; i++) {
    //   monthDatas.push(i + 1 + "月")
    // }
  }

  return monthDatas;
},
//天数计算
surplusDay: function (year, month, day) {
  var days = 31;
  var dayDatas = [];
  var date = new Date();
  var year2 = date.getFullYear()
  var month2 = date.getMonth() + 1
  var date1=date.getDay()
  switch (parseInt(month)) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;

      break;
      //对于2月份需要判断是否为闰年
    case 2:
      if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        days = 29;

        break;
      } else {
        days = 28;

        break;
      }

      case 4:
      case 6:
      case 9:
      case 11:
        days = 30;

        break;

  }
  if (year == year2 && month == month2) {
    // dayDatas.push(day + "日")
    for (var i = date1+1; i < date1+8; i++) {
      dayDatas.push(i + 1 + "日")
    }
  } else {

    for (var i = date1+1; i < date1+8; i++) {
      dayDatas.push(i + 1 + "日")
    }
  }
  return dayDatas;
},
//时间计算
surplusHour: function (year, month, day, hour) {
  var date = new Date();
  var year2 = date.getFullYear()
  var month2 = date.getMonth() + 1
  var day2 = date.getDate();
  var hourEnd = ["9.5", "12", "14.5", "17", "19.5"];
  var hours = [
    ['09:30', '12:00', '14:30', '17:00', "18:00"],
    ['12:00', '14:30', '17:00', '18:00', '19:30']
  ];

  if (year == year2 && month == month2 && day == day2) {
    var hour2 = hour
    var j = 0;
    for (var i = 0; i < hourEnd.length; i++) {

      if ((hourEnd[i] - hour) > 0) {
        console.log("i" + i)
        j = i;
        break;
      }
    }
    var surplusHours = [
      [],
      []
    ];
    for (var i = j; i < hours[0].length; i++) {

      surplusHours[0].push(hours[0][i]);
    }
    for (var i = j; i < hours[1].length; i++) {
 
      surplusHours[1].push(hours[1][i]);
    }

    hours = surplusHours;
  }
  return hours;
},
bindMultiPickerColumnChange: function (e) {
  var date = new Date();
  var year1 = date.getFullYear()
  var month1 = date.getMonth() + 1
  var day1 = date.getDate()
  var hour1 = date.getHours()

  var data = {
    multiArray: this.data.multiArray,
    multiIndex: this.data.multiIndex,
    year: this.data.year,
    month: this.data.month,
    day: this.data.day,
    startHour: this.data.startHour,
    endHour: this.data.startHour,
  };
  data.multiIndex[e.detail.column] = e.detail.value;
  switch (e.detail.column) {
    case 0:
      var yearStr = data.multiArray[e.detail.column][e.detail.value];
      var year = yearStr.substring(0, yearStr.length - 1)
      data.year = parseInt(year);
      var surplusMonth = this.surplusMonth(year);
      data.multiArray[1] = surplusMonth;

      if (data.year == year1) {
        data.month = month1;
      } else {
        data.month = 1;
      }
      if (data.year == year1 && month1 == data.month) {
        data.day = day1;
      } else {
        data.day = 1;
      }

      var surplusDay = this.surplusDay(data.year, data.month, data.day);

      data.multiArray[2] = surplusDay;
      var surplusHour;
      if (data.year == year1 && month1 == data.month && data.day == day1) {
        surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)
      } else {
        surplusHour = this.surplusHour(data.year, data.month, data.day, 1)
      }



      data.multiArray[3] = surplusHour[0];
      data.multiArray[5] = surplusHour[1];


      data.startHour = surplusHour[0];
      data.endHour = surplusHour[1];

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;
      data.multiIndex[3] = 0;
      data.multiIndex[5] = 0;
      break;
    case 1:
      console.log('选择月份' + data.multiArray[e.detail.column][e.detail.value]);

      var monthStr = data.multiArray[e.detail.column][e.detail.value];
      var month = monthStr.substring(0, monthStr.length - 1);

      data.month = month;
      data.day = 1;

      if (data.year == year1 && month1 == data.month) {
        data.day = day1;
      } else {
        data.day = 1;
      }

      var surplusDay = this.surplusDay(data.year, data.month, data.day);

      data.multiArray[2] = surplusDay;

      var surplusHour;
      if (data.year == year1 && month1 == data.month && data.day == day1) {
        surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)
      } else {
        surplusHour = this.surplusHour(data.year, data.month, data.day, 1)
      }


      data.multiArray[3] = surplusHour[0];
      data.multiArray[5] = surplusHour[1];


      data.startHour = surplusHour[0];
      data.endHour = surplusHour[1];
      data.multiIndex[2] = 0;
      data.multiIndex[3] = 0;
      data.multiIndex[5] = 0;
      break;
    case 2:

      var dayStr = data.multiArray[e.detail.column][e.detail.value];
      var day = dayStr.substring(0, dayStr.length - 1);
      data.day = day;

      var surplusHour;
      if (data.year == year1 && month1 == data.month && data.day == day1) {
        surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)
      } else {
        surplusHour = this.surplusHour(data.year, data.month, data.day, 1)
      }


      data.multiArray[3] = surplusHour[0];
      data.multiArray[5] = surplusHour[1];



      data.startHour = surplusHour[0];
      data.endHour = surplusHour[1];

      data.multiIndex[3] = 0;
      data.multiIndex[5] = 0;
      break;
    case 3:
      console.log('起始时间' + data.multiArray[e.detail.column][e.detail.value]);

      var hourStr = data.multiArray[e.detail.column][e.detail.value];
      var hour = hourStr.substring(0, hourStr.length - 1);
      data.startHour = hour;
      console.log('起始时间' + hour);
      var endhours2 = [];
      if (data.year == year1 && data.month == month1 && data.day == day1) {
        var surplusHour = this.surplusHour(data.year, data.month, data.day, hour);
        endhours2 = surplusHour[1]
      } else {
        var end =  ['12:00', '14:30', '17:00', '18:00', '19:30'];
        for (var i = e.detail.value; i < end.length; i++) {
          endhours2.push(end[i]);
        }
      }


      data.multiArray[5] = endhours2;
      data.multiIndex[5] = 0;

      break;
    case 5:
      var hourStr = data.multiArray[e.detail.column][e.detail.value];
      var hour = hourStr.substring(0, hourStr.length - 1);
      data.endHour = hour;
      console.log('结束时间' + data.multiArray[e.detail.column][e.detail.value]);
      break;
  }
  this.setData(data)

},
//value 改变时触发 change 事件
bindMultiPickerChange: function (e) {

  var dateStr =
    this.data.multiArray[0][this.data.multiIndex[0]] +
    this.data.multiArray[1][this.data.multiIndex[1]] +
    this.data.multiArray[2][this.data.multiIndex[2]] +
    this.data.multiArray[3][this.data.multiIndex[3]] +
    this.data.multiArray[4][this.data.multiIndex[4]] +
    this.data.multiArray[5][this.data.multiIndex[5]];
  console.log('picker发送选择改变，携带值为', dateStr)
  this.setData({
    orderData: dateStr
  })

  var approvedates = this.data.orderData.replace(/[年月]/g, "-");
  let approvedate = approvedates.replace(/[日]/g, " ");

  let arr = approvedate.split(' ')[0].split('-')
  let arr1 = approvedate.split(' ')[1].split('~')
  console.log(arr1)
  var Month = arr[1]
  var Day = arr[2]
  var CurrentDate = ""
  if (Month >= 10) {
    CurrentDate += Month + "-";
  } else {
    CurrentDate += "0" + Month + "-";
  }
  if (Day >= 10) {
    CurrentDate += Day;
  } else {
    CurrentDate += "0" + Day;
  }

  api._posts('afterSale/chooseServiceTime',{
    afterSaleId:this.data.saleDetail.id,
    serviceDate: arr[0] + '-' + CurrentDate,
    serviceTimeEnd: arr[0] + '-' + CurrentDate + ' ' + arr1[1] + ':00',
    serviceTimeStart: arr[0] + '-' + CurrentDate + ' ' + arr1[0] + ':00'
  })
  .then(res=>{
    console.log(res)
    if(res.code==200){
      this.getDetail()
    }else{
      wx.showToast({
        title: res.message,
        icon:'none'
      })
    }
  })


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