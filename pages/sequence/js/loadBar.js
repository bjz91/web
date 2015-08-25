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
		var setSeries = new Array();
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
					'barCategoryGap' : '50%' //for bar
				};
				setSeries[i] = obj;
			} else {
				//如果该物种没有被选，则数据设为空
				setSeries[i] = [];
			}
		}

		/*---------- 基于准备好的dom，初始化echarts图表 ----------*/
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				'text' : data.bartime.text,
				//'subtext' : '数据来源：毕鉴昭'
			},
			tooltip : {
				'trigger' : 'axis'
			},
			legend : {
				x : 'right',
				//按照被选物种自动增减图例
				data : function() {
					var list = [];
					for (var i = 0; i < data.bartime.name.length; i++) {
						if (plotBool[i] == true) {
							list.push(data.bartime.name[i]);
						}
					}
					return list;
				}()
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

