$.getJSON('bar.json', function(bardata) {
	$.getJSON('pie.json', function(piedata) {
		// 路径配置
		require.config({
			paths : {
				echarts : '../../src/echarts-2.2.4/build/dist'
			}
		});

		// 使用
		require(['echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/pie', 'echarts/chart/funnel'], function(ec) {

			// 基于准备好的dom，初始化echarts图表
			var myChartBar = ec.init(document.getElementById('container'), 'macarons');

			var optionBar = {
				title : {
					text : '多物种简单柱状图',
					//subtext : '数据来源：毕鉴昭'
				},
				tooltip : {
					trigger : 'item'
				},
				legend : {
					data : [bardata.bar.feature[0]]
				},
				toolbox : {
					show : true,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : ['line', 'bar']
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [{
					type : 'category',
					data : function() {
						var list = [];
						for (var i = 0; i < bardata.bar.data.length; i++) {
							list.push(bardata.bar.data[i].name);
						}
						return list;
					}()
				}],
				yAxis : [{
					type : 'value',
					name : 'ug/m3'
				}],
				series : [{
					name : bardata.bar.feature[0],
					type : 'bar',
					barCategoryGap : '50%',
					data : function() {
						var list = [];
						for (var i = 0; i < bardata.bar.data.length; i++) {
							list.push(bardata.bar.data[i].value[0]);
						}
						return list;
					}()
				}/*, {
				 name : bardata.bar.feature[1],
				 type : 'bar',
				 barCategoryGap : '50%',
				 data : function() {
				 var list = [];
				 for (var i = 0; i < bardata.bar.data.length; i++) {
				 list.push(bardata.bar.data[i].value[1]);
				 }
				 return list;
				 }()
				 }*/]
			};

			// 为echarts对象加载数据
			myChartBar.setOption(optionBar);

			// 基于准备好的dom，初始化echarts图表
			var myChartPie = ec.init(document.getElementById('container1'), 'macarons');

			var optionPie = {
				title : {
					text : '1月详细信息',
					//subtext : '数据来源：毕鉴昭',
					x : 'center'
				},
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : piedata.pie.subspecies[0].name
				},
				/*
				 toolbox : {
				 show : true,
				 feature : {
				 mark : {
				 show : true
				 },
				 dataView : {
				 show : true,
				 readOnly : false
				 },
				 magicType : {
				 show : true,
				 type : ['pie', 'funnel'],
				 option : {
				 funnel : {
				 x : '25%',
				 width : '50%',
				 funnelAlign : 'left',
				 max : 1548
				 }
				 }
				 },
				 restore : {
				 show : true
				 },
				 saveAsImage : {
				 show : true
				 }
				 }
				 },*/
				calculable : true,
				series : [{
					name : '物种详细信息',
					type : 'pie',
					radius : '55%',
					center : ['50%', '50%'],
					data : function() {
						var list = [];
						for (var i = 0; i < piedata.pie.subspecies[0].value.length; i++) {
							var obj = {
								value : piedata.pie.subspecies[0].value[i],
								name : piedata.pie.subspecies[0].name[i],
							};
							list.push(obj);
						}
						return list;
					}()
				}]
			};

			myChartPie.setOption(optionPie);

			var ecConfig = require('echarts/config');
			function eConsole(param) {
				//画物种
				var newOptionPie = myChartPie.getOption();
				newOptionPie.series[0].data = [];
				for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].value.length; i++) {
					var obj = {
						value : piedata.pie.subspecies[param.dataIndex].value[i],
						name : piedata.pie.subspecies[param.dataIndex].name[i],
					};
					newOptionPie.series[0].data.push(obj);
				}
				newOptionPie.legend.data = piedata.pie.subspecies[param.dataIndex].name;
				newOptionPie.title.text=param.dataIndex+1+'月详细信息';
				myChartPie.setOption(newOptionPie, true);

				console.log(param);
			}
			myChartBar.on(ecConfig.EVENT.HOVER, eConsole);

		});
	});
});
