$.getJSON('barsort.json', function(data) {

	/*------------ 画图 ------------*/

	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/funnel', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				text : '多物种数值排序玫瑰图',
				subtext : '数据来源：毕鉴昭',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				x : 'center',
				y : 'bottom',
				data : data.barsort.name
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
						type : ['pie', 'funnel']
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
			series : [{
				name : '物种排序',
				type : 'pie',
				radius : [30, 110],
				center : ['50%', '50%'],
				roseType : 'area',
				x : '0%', // for funnel
				sort : 'descending', // for funnel
				maxSize : '50%', // for funnel
				data : function() {
					var list = [];
					for (var i = 0; i < data.barsort.data.length; i++) {
						var obj = {
							'value' : data.barsort.data[i],
							'name' : data.barsort.name[i]
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
	});
});
