// miniprogram/pages/drink/drink.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    soap_count:0,
    soap:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  doWhenComplete:function(thiscup){
    wx.hideLoading()
    if (thiscup.length > 0) {
      this.setData({
        soap: thiscup
      })
    }
    else {
      this.setData({
        soap: "鸡汤喝完啦，帮忙盛一碗吧~~"
      })
    }
  },

  doDrinkPoisonedSoap:function (){
    this.setData({
      soap: ""
    })
    wx.showLoading({
      title: '盛汤中...',
    })
    const db = wx.cloud.database()
    db.collection('soap')
      .count()
      .then(res=>{
        this.setData({
          soap_count: res.total
        })
        var id = Math.floor(Math.random() * res.total)
        db.collection('soap')
          .where({
            _id: id,
          })
          .get()
          .then(res => {
            if (res.data.length > 0) {
              this.doWhenComplete(res.data[0]._content)
            }
            else{
              this.doWhenComplete("")
            }
          })
          .catch(err => {
            console.error(err)
            this.doWhenComplete("")
          })
      })
  },

  onTap:function(e){
    console.log('onTap')
    this.doDrinkPoisonedSoap()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
    this.doDrinkPoisonedSoap()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    //this.doDrinkPoisonedSoap()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    //this.doDrinkPoisonedSoap()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})