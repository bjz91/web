function loadBar(data, plotBool) {

	// 路径配置
	require.config({
		paths : {
			echarts : '../../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'], function(ec) {

		/*--------- 设定Series ---------*/
		var num = 0;
		var setSeries = [];
		var legendData = [];
		for (var i = 0; i < plotBool.length; i++) {
			if (plotBool[i] == true) {
				//如果该物种被选，则生成物种的对象和值
				var list = [];
				for (var j = 0; j < data.bartime.value[0].length; j++) {
					if (data.bartime.value[i][j] == "NaN") {
						list.push('-');
					} else {
						list.push(data.bartime.value[i][j]);
					}
				}
				//series对象
				var obj = {
					'name' : data.bartime.name[i],
					'type' : 'line',
					'data' : list,
					'yAxisIndex' : 0,
					'itemStyle' : {
						'normal' : {
							'barBorderRadius' : 0 //for bar，边缘取消圆角
						}
					},
					'barCategoryGap' : '50%' //for bar
				};
				setSeries.push(obj);
				//图例名称
				legendData.push(data.bartime.name[i]);
			}
		}

		/*---------- 基于准备好的dom，初始化echarts图表 ----------*/
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				text : data.bartime.text,
				//'subtext' : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			legend : {
				x : 'right',
				//按照被选物种自动增减图例
				data : legendData
			},
			toolbox : {
				'show' : true,
				orient : 'vertical',
				x : 'right',
				y : 'center',
				'feature' : {
					'mark' : {
						'show' : true
					},
					'dataView' : {
						'show' : true,
						'readOnly' : false
					},
					'magicType' : {
						'show' : true,
						'type' : ['line', 'bar', 'stack', 'tiled']
					},
					'restore' : {
						'show' : true
					},
					'saveAsImage' : {
						'show' : true
					}
				}
			},
			calculable : true,
			grid : {
				'y' : 80,
				'y2' : 100
			},
			xAxis : [{
				'type' : 'category',
				'axisLabel' : {
					'interval' : 0
				},
				'data' : data.bartime.xaxis
			}],
			yAxis : {
				'type' : 'value',
				'name' : 'ug/m3'
			},
			series : setSeries
		};

		/*---------- 为echarts对象加载数据 ----------*/
		myChart.setOption(option);
	});
}

