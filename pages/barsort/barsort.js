$.getJSON('barsort.json', function(barsortdata) {

	/*------------ 排序 ------------*/
	var oriData = barsortdata.barsort.data;
	var oriName = barsortdata.barsort.name;
	var temp;

	for (var i = 0; i < oriData.length - 1; i++) {
		var max = i;
		//查找最小值
		for (var j = i + 1; j < oriData.length; j++) {
			if (oriData[max] < oriData[j]) {
				max = j;
			}
		}
		if (max != i) {
			temp = oriData[i];
			oriData[i] = oriData[max];
			oriData[max] = temp;

			temp = oriName[i];
			oriName[i] = oriName[max];
			oriName[max] = temp;
		}
	}

	/*------------ 画图 ------------*/

	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/bar', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				text : '多物种数值排序柱状图',
				subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : ['单位']
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
				data : oriName
			}],
			yAxis : [{
				type : 'value'
			}],
			series : [{
				name : '单位',
				type : 'bar',
				data : oriData
			}]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
	});
});
