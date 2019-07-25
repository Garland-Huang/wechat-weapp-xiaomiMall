// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noCheck: "../../image/check_normal.png",
        inCheck:"../../image/check_press.png",
        payway: [{ url: "../../image/pay_zfb2.png", text: "支付宝", check_img: "../../image/check_normal.png" }, { url: "../../image/pay_wx.png", text: "微信支付", check_img: "../../image/check_normal.png" }, { url: "../../image/micash_wap.png", text: "小米钱包", check_img: "../../image/check_normal.png" }, { url: "../../image/pay_yl1.png", text: "银联支付", check_img: "../../image/check_normal.png"}, { url: "../../image/pay_yzf.png", text: "翼支付", check_img: "../../image/check_normal.png" }],
        showyouhui:false,
        quanMa:""
    },
    goShouPage(){
        wx.navigateTo({
            url: '../../pages/address/address'
        })
    },
    // 切换单选样式
    checkFun(e){
        console.log(e.target.dataset.index)
        for(var i = 0;i < this.data.payway.length; i++){
            this.data.payway[i].check_img = this.data.noCheck;
            this.data.payway[e.target.dataset.index].check_img = this.data.inCheck;
        }
        console.log(this.data.payway)
        this.setData({
            payway: this.data.payway
        })
    }, 
    // 改变b绑定input值
    bindKeyInput: function (e) {
        this.setData({
            quanMa: e.detail.value
        })
    },
    // 展示优惠框
    showyouhuiFun(e){
        this.setData({
            showyouhui:!this.data.showyouhui
        })
    },
    // 展示模态框
    showquan(){
        if (this.data.quanMa){
            wx.showModal({
                title: '温馨提示',
                content: '优惠吗有点问题，快检查下吧~',
                showCancel: false,
                confirmColor: "#FF6700"
            })
        }else{
            wx.showModal({
                content: '请输入优惠码',
                showCancel: false,
                confirmColor: "#FF6700"
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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