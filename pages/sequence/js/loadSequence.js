function loadSequence(data, plotBool) {

	/*--------- 设定Series ---------*/
	var num = 0;
	var setSeries = new Array();
	for (var i = 0; i < plotBool.length; i++) {
		if (plotBool[i] == true) {
			//如果该物种被选，则生成物种的对象和值
			var list = [];
			for (var j = 0; j < data.data.length; j++) {
				//var t = timeConvert(data.data[j].time);
				if (data.data[j].species[i] == -9999) {
					//list.push([t, '-']);
					list.push('-');
				} else {
					//list.push([t, data.data[j].species[i]]);
					list.push(data.data[j].species[i]);
				}
			}
			/*
			//确定y轴是哪根
			var yIndex = 0;
			if (data.name[i] == "EC") {
			yIndex = 1;
			} else {
			yIndex = 0;
			}*/
			//series对象
			var obj = {
				'name' : data.name[i],
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

	/*--------- 配置ECharts属性 ---------*/
	// 路径配置
	require.config({
		paths : {
			echarts : '../../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				text : data.title,
				//subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis',
				formatter : function(params) {
					data = params[0].name + '<br />';
					for (var i = 0; i < params.length; i++) {
						data = data + params[i].seriesName + ':' + params[i].value + '<br />';
					}
					return data;
				}
			},
			legend : {
				//按照被选物种自动增减图例
				data : function() {
					var list = [];
					for (var i = 0; i < data.name.length; i++) {
						if (plotBool[i] == true) {
							list.push(data.name[i]);
						}
					}
					return list;
				}()
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataZoom : {
						show : true
					},
					dataView : {
						show : true
					},
					magicType : {
						show : true,
						type : ['line', 'bar', 'stack', 'tiled']
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
			dataZoom : {
				show : true,
				start : 100-(24/data.data.length)*100,
				end : 100
			},
			xAxis : [{
				type : 'category',
				//type : 'time',
				splitNumber : 12,
				/*axisLabel : {
				 formatter : function(value) {
				 var date = new Date(value);
				 data = (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':00';
				 return data;
				 }
				 }*/
				boundaryGap : false,
				data : function() {
					var list = [];
					for (var i = 0; i < data.data.length; i++) {
						list.push(data.data[i].time);
					}
					return list;
				}()
			}],
			yAxis : [{
				type : 'value',
				scale : false, //自动设定Y轴数值范围
				name : data.unit[0]
			}/*, {
			 type : 'value',
			 scale : true, //自动设定Y轴数值范围
			 name : data.unit[1]
			 }*/],
			series : setSeries
		};

		/*--------- 显示ECharts ---------*/
		// 为echarts对象加载数据
		myChart.setOption(option);

	});

}

