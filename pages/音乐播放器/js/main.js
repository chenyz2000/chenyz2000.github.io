/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
	el: "#player",

	data: {
		query: "",      // 查询关键字
		musicList: [],      // 歌曲数组

		musicUrl: "",     // 歌曲地址
		musicCover: "",     // 歌曲封面
		hotComments: [],      // 歌曲评论
		isPlaying: false,     // 动画播放状态

		isShow: false,      // 遮罩层的显示状态
		mvUrl: ""     // mv地址
	},

	methods: {
		// 歌曲搜索
		searchMusic: function () {
			var that = this;
			axios.get("//autumnfish.cn/search?keywords=" + this.query).then(
				function (response) {
					// console.log(response);
					that.musicList = response.data.result.songs;
					//console.log(response.data.result.songs);
				},
				function (err) { }
			);
		},

		// 通过歌曲ID找到歌曲
		getMusicById: function (musicId) {
			//  console.log(musicId);
			var that = this;
			// 获取歌曲url
			axios.get("//autumnfish.cn/song/url?id=" + musicId).then(
				function (response) {
					// console.log(response);
					// console.log(response.data.data[0].url);
					that.musicUrl = response.data.data[0].url;
				},
				function (err) { }
			);
			// 获取歌曲封面图片
			axios.get("//autumnfish.cn/song/detail?ids=" + musicId).then(
				function (response) {
					// console.log(response);
					// console.log(response.data.songs[0].al.picUrl);
					that.musicCover = response.data.songs[0].al.picUrl;
				},
				function (err) { }
			);
			// 获取歌曲热评
			axios.get("//autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
				function (response) {
					// console.log(response);
					// console.log(response.data.hotComments);
					that.hotComments = response.data.hotComments;
				},
				function (err) { }
			);
		},

		// 歌曲播放
		play: function () {
			// console.log("play");
			this.isPlaying = true;
		},
		// 歌曲暂停
		pause: function () {
			// console.log("pause");
			this.isPlaying = false;
		},

		// 播放mv
		playMV: function (mvid) {
			var that = this;
			axios.get("//autumnfish.cn/mv/url?id=" + mvid).then(
				function (response) {
					// console.log(response);
					//console.log(response.data.data.url);
					that.isShow = true;
					that.mvUrl = response.data.data.url;
				},
				function (err) { }
			);
		},
		// 隐藏
		hide: function () {
			this.isShow = false;
		}
	}
});
