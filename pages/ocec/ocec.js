function initOcec() {
	//加载ECharts
	$.getJSON('ocec.json', function(data) {
		loadOcec(data);
	});
}

function loadOcec(ocecdata) {

	/*--------- 判断复选框是否选中 ---------*/
	var plotBool = [];
	//OC
	if (document.getElementById("OC").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//EC
	if (document.getElementById("EC").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}

	/*--------- 设定Series ---------*/
	var num = 0;
	var setSeries = new Array();
	for (var i = 0; i < plotBool.length; i++) {
		if (plotBool[i] == true) {
			//如果该物种被选，则生成物种的对象和值
			var list = [];
			for (var j = 0; j < ocecdata.sequence.data.length; j++) {
				var t = timeConvert(ocecdata.sequence.data[j].time);
				if (ocecdata.sequence.data[j].species[i] == "NaN") {
					list.push([t, '-']);
				} else {
					list.push([t, ocecdata.sequence.data[j].species[i]]);
				}
			}
			//确定y轴是哪根
			var yIndex = 0;
			if (ocecdata.sequence.name[i] == "EC") {
				yIndex = 1;
			} else {
				yIndex = 0;
			}
			//series对象
			var obj = {
				'name' : ocecdata.sequence.name[i],
				'type' : 'line',
				'data' : list,
				'yAxisIndex' : yIndex
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
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				text : '多物种多轴时序图勾选显示 ',
				subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					var date = new Date(params.value[0]);
					data = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时';
					return data + '<br/>' + params.seriesName + ':' + params.value[1];
				}
			},
			legend : {
				//按照被选物种自动增减图例
				data : function() {
					var list = [];
					for (var i = 0; i < ocecdata.sequence.name.length; i++) {
						if (plotBool[i] == true) {
							list.push(ocecdata.sequence.name[i]);
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
				start : 60,
				end : 100
			},
			xAxis : [{
				type : 'time',
				splitNumber : 12,
				axisLabel : {
					formatter : function(value) {
						var date = new Date(value);
						data = (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':00';
						return data;
					}
				}
			}],
			yAxis : [{
				type : 'value',
				scale : true, //自动设定Y轴数值范围
				name : ocecdata.sequence.unit[0]
			}, {
				type : 'value',
				scale : true, //自动设定Y轴数值范围
				name : ocecdata.sequence.unit[1]
			}],
			series : setSeries
		};

		/*--------- 显示ECharts ---------*/
		// 为echarts对象加载数据
		myChart.setOption(option);

	});

}

