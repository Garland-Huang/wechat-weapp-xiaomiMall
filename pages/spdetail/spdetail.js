// pages/spdetail/spdetail.js
// 格式化时间
var formatDate = new require("../../utils/util.js");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: true,
        // 轮播图方法
        height: 0,
        // 购物车商品数量
        cartProductNum: 0,
        // 从后台获取的当前点击的商品的数据
        productDetailData: {},
        screenWidth: 0,
        lastTime:3600,
        lastTimeStr:"",
        scrolls: [{ img_url: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f0c04e138bfed2b1ebb589de615236d1.png", text1: "CPU", text2: "骁龙845八核" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/7692726e7a1dd34a3b1b4ede8aca020d.png", text1: "双摄像头", text2: "5.99英寸" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/a5ab24dcb527e49f970f13b11e000ab1.png", text1: "屏幕分辨率", text2: "2160×1080" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/c8ec0829241324e401744da627482560.png", text1: "极速畅玩", text2: "6GB" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/8941adac25333e785b9cc78ca11f4f27.png", text1: "存储容量", text2: "128GB" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/0b4ea0fb21dde2f29df3c20de73539b9.png", text1: "持久待机", text2: "3400mAh" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/d1b67a407fb2a1ed42c2c0ce15af3318.png", text1: "运营商网络", text2: "4G全网通" }, { img_url: "https://i8.mifile.cn/b2c-mimall-media/bfd5ba9ae72c365dee42db14dfae4b0f.png", text1: "网络模式", text2: "双卡双待" }],
        xiangxi_img:[]
    },
   

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("spdetail.js options==>", options)
        var _this = this;
        // 获取屏幕宽度
        var screeninfo = wx.getSystemInfoSync();
        this.screenWidth = screeninfo.screenWidth;

        var productList = wx.getStorageSync("productList");
        // console.log("productList", productList)
        for (var i = 0; i < productList.length; i++) {
            if (options.productId == productList[i].productId) {
                // console.log(productList[i])
                this.setData({
                    productDetailData: productList[i]
                })

            }
        }

        // 获取购物车商品的数量
        var shopCarData = wx.getStorageSync("shopCarList");
        var shopnum = 0;
        for (var k = 0; k < shopCarData.length; k++) {
            shopnum += shopCarData[k].proCount;
        }
        this.setData({
            cartProductNum: shopnum
        })

        // 启动倒计时
        this.countDown();

        // 加载详情部分图片
        const xiangxi_img = app.globalData.xiangxi_img;
        this.setData({xiangxi_img})
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        this.data.lastTime = this.data.lastTime-1;
        // 获取时、分、秒
        let hou = parseInt(this.data.lastTime % (60 * 60 * 24) / 3600);
        hou = hou > 10 ? hou : "0"+hou; 
        let min = parseInt(this.data.lastTime % (60 * 60 * 24) % 3600 / 60);
        min = min > 10 ? min : "0" + min;
        let sec = parseInt(this.data.lastTime % (60 * 60 * 24) % 3600 % 60);
        sec = sec > 10 ? sec : "0" + sec;
        var timeStr = hou +":" + min +":" + sec;
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({
            lastTimeStr: timeStr
        })
        if(this.data.lastTime > 0){
            setTimeout(this.countDown, 1000);
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // console.log("productDetailData==>" ,this.data.productDetailData)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
    goMall: function() {
        wx.switchTab({
            url: '../../pages/index/index'
        })
    },
    addProductCart: function() {
        // 格式化添加数据的当前时间
        var addTime = formatDate(new Date());
        console.log("添加商品时间：", addTime);
        // console.log("this.data.productDetailData==>", this.data.productDetailData);

        var productInfo = {};
        productInfo.proId = this.data.productDetailData.productId;
        productInfo.proName = this.data.productDetailData.title;
        productInfo.proId = this.data.productDetailData.productId;
        productInfo.proImage = this.data.productDetailData.prourl;
        productInfo.proPrice = this.data.productDetailData.price;
        productInfo.proCount = 1;
        productInfo.addTime = addTime;
        // console.log("productInfo==>", productInfo)

        // 获取缓存购物车数据,修改数据，再将数据添加到缓存
        var shopCarData = wx.getStorageSync("shopCarList");
        shopCarData = !shopCarData ? [] : shopCarData;
        console.log("添加到购物车的数据：productInfo==>", productInfo);
        // 判断即将添加的数据购物车是否已经含有该商品
        for (var j = 0; j < shopCarData.length; j++) {
            if (productInfo.proId == shopCarData[j].proId) {
                productInfo.proCount = ++shopCarData[j].proCount;
                shopCarData.splice(j, 1);
                console.log("判断成立")
            } else {
                console.log("判断不成立")
            }
        }
        shopCarData.unshift(productInfo);
        wx.setStorageSync("shopCarList", shopCarData);

        this.setData({
            cartProductNum: ++this.data.cartProductNum
        })
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
        })
    },
    goShopCar: function() {
        // 页面跳转
        wx.switchTab({
            url: '../../pages/shopcar/shopcar'
        })
    }

})