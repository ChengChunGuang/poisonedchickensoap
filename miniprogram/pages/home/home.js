// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    soap:"心灵鸡汤，\n具有精神安慰和动机强化的作用，\n是对世界积极向上的认识。\n\n而毒鸡汤，\n表面看上去是心灵鸡汤，\n而实际上，是加了料的、滋味更加醇厚的鸡汤。",
  },

  onTap:function()
  {
    console.log('onTap')
    wx.switchTab({
      url: '../drink/drink'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  }


})