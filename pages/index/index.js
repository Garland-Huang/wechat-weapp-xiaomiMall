const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper_img: [],
        indicatorDots: true,
        autoplay: true,
        interval: 2500,
        duration: 1000,
        height: 0,
        navData: [],
        actData: {},
        productList: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //   加载数据
        const swiper_img = app.globalData.home_swiper,
            navData = app.globalData.nav_data,
            actData = app.globalData.activity,
            productList = app.globalData.indexPro;
        const home_proStorage=[];
        for (var i = 0; i < productList.length; i++) {
            for (var j = 0; j < productList[i].proData.length; j++){
                home_proStorage.push(productList[i].proData[j]);
            }
        }
        wx.setStorageSync('productList', home_proStorage);
        this.setData({
            swiper_img,
            navData,
            actData,
            productList
        })
        //   修改轮播图宽高
        var screeninfo = wx.getSystemInfoSync();
        this.screenWidth = screeninfo.screenWidth;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    imgloaded: function(e) {
        var height = e.detail.height / e.detail.width * this.screenWidth;
        this.setData({
            height: height
        })
    },
    goPage: function(e) {
        // console.log(e)
        wx.navigateTo({
            url: '../../pages/spdetail/spdetail?productId=' + e.currentTarget.dataset.productid
        })
    },
    goMiInfo() {
        wx.navigateTo({
            url: '../../pages/xiaomi/xiaomi'
        })
    }
})