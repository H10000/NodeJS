	// Author:Hant
	// Date:2019-05-15

	var app = new Vue({
		el: "#app",
		data: {
			logo: "",
			isMenuShow0: false,
			isMenuShow1: false,
			isMenuShow2: false,
			isMenuShow3: false,
			isMenuShow4: false,
			isMenuShow5: false,
			isMenuShow6: false,
			menu0: "",
			menu1: "",
			menu2: "",
			menu3: "",
			menu4: "",
			menu5: "",
			menu6: "",
			mainTitle: "",
			subTitle: "",
			putOnRecord: "",
			introduction: {},
			product: {},
			stats: {},
			team: {},
			line: {},
			contact: {}
		},
		methods: {
			teamMethod: function (number, flag) {
				var tip="";
				if (flag == 0) {
					tip = "请添加下方微信沟通"
				}
				else if (flag ==1) {
					tip = "请添加下方QQ沟通"
				}
				else if (flag == 2) {
					tip = "请添加下方电话沟通"
				}
				layer.open({
					type: 1,
					title: false,
					closeBtn: 0,
					shade:0.6,
					shadeClose: true,
					anim: 4,
					content: "<div style='padding:20px;text-align:center;'><div>" + tip + "</div><div style='color:#1E9FFF;'>" + number + "</div></div>"
				});
			}
		}
	});

	axios.get('/data/config.json')
		.then(function (response) {
			var dataInfo = response.data;
			app.logo = dataInfo.baseConf.logo;
			for (var i = 0; i < dataInfo.baseConf.menu.length; i++) {
				app["isMenuShow" + i] = dataInfo.baseConf.menu[i].isShow;
				app["menu" + i] = dataInfo.baseConf.menu[i].name;
			}
			app.mainTitle = dataInfo.baseConf.mainTitle;
			app.subTitle = dataInfo.baseConf.subTitle;
			app.putOnRecord = dataInfo.baseConf.putOnRecord;
			app.introduction = dataInfo.introduction;
			app.product = dataInfo.product;
			app.stats = dataInfo.stats;
			app.team = dataInfo.team;
			app.line = dataInfo.line;
			app.contact = dataInfo.contact;

		})
		.catch(function (error) {
			console.log(error);
		});