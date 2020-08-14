const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const app = getApp();

 const getViewInfo = (id) => {

  return new Promise((resolve, reject) => {
  
  try {wx.createSelectorQuery().select(id).boundingClientRect(res => {resolve(res)}).exec()
  
  }catch (err) {
  
  reject(err)
  
  }
  
  })}  
  



module.exports = {

  formatTime: formatTime,
  getViewInfo:getViewInfo
}
