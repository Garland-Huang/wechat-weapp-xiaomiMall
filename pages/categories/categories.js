// pages/categories/categories.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cate_nav_list: [
            { name: "新品", id: "new" },
            { name: "众筹", id: "zhongchou"},
            { name: "手机", id: "phone" },
            { name: "电视", id: "tv" },
            { name: "电脑", id: "laptop" },
            { name: "家电", id: "appliance" },
            { name: "路由", id: "router" },
            { name: "智能", id: "smart" },
            { name: "儿童", id: "kids" },
            { name: "灯具", id: "lignts" },
            { name: "电源", id: "adapter" },
            { name: "耳机", id: "headset" },
            { name: "音箱", id: "voicebox" },
            { name: "生活", id: "life" },
            { name: "服务", id: "service" },
            { name: "米粉卡", id: "card" }
        ],
        curIndex: 0,  //初始化当前下标为0
        toView: "new", //默认显示“新品展示”
        detail: []
    },

    switchCategory(e) {
        // console.log(e.currentTarget.dataset.id);
        const curIndex = e.currentTarget.dataset.index ? e.currentTarget.dataset.index : 0;
        this.setData({
            toView: e.currentTarget.dataset.id,
            curIndex
        });
    },
    goPage: function (e) {
        console.log(e)
        wx.navigateTo({
            url: '../../pages/spdetail/spdetail?productId=' + e.currentTarget.dataset.productid
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const detail = app.globalData.category;
        var proStorage = wx.getStorageSync("productList");
        for (let i in detail){
            for(let j in detail[i].cate_list){
                proStorage.push(detail[i].cate_list[j]);
            }
        }
        wx.setStorageSync("productList", proStorage)
        this.setData({
            detail
        });
        console.log(this.data.detail)
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