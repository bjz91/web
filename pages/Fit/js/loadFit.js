function loadFit(horidata, verdata, fitdata, HoriIndex, VerIndex, textTitle) {

	// 路径配置
	require.config({
		paths : {
			echarts : '../../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/scatter', 'echarts/chart/line'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {

			title : {
				text : textTitle,
				//subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis',
				showDelay : 0,
				formatter : function(params) {
					if (params.value.length > 1) {
						return horidata.name + ' : ' + params.value[0] + '<br/>' + verdata.name + ' : ' + params.value[1];
					} else {
						return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value;
					}
				},
				axisPointer : {
					show : true,
					type : 'cross',
					lineStyle : {
						type : 'dashed',
						width : 1
					}
				}
			},
			legend : {
				data : [horidata.name + ' + ' + verdata.name],
				/*
				 selected : {
				 'R=0.896' : true,
				 'R=0.9216' : true
				 },*/
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
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			xAxis : [{
				name : horidata.name,
				type : 'value',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}],
			yAxis : [{
				name : verdata.name,
				min : 0,
				type : 'value',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}],
			series : [{
				name : '拟合线',
				type : 'line',
				data : function() {
					var list = new Array();
					//起始点
					for (var i = 0; i < 2; i++) {
						list[i] = new Array();
						list[i][0] = fitdata.start_x[HoriIndex][VerIndex];
						list[i][1] = fitdata.start_y[HoriIndex][VerIndex];
					}
					//结束点
					for (var i = 2; i < 4; i++) {
						list[i] = new Array();
						list[i][0] = fitdata.end_x[HoriIndex][VerIndex];
						list[i][1] = fitdata.end_y[HoriIndex][VerIndex];
					}
					return list;
				}()
			}, {
				name : horidata.name + ' + ' + verdata.name,
				type : 'scatter',
				itemStyle : {
					normal : {
						color : ['rgba(255,0,0,0.5)']
					}
				},
				data : function() {
					var list = new Array();
					num = 0;
					for (var i = 0; i < horidata.data.length; i++) {
						//判断空值
						if (horidata.data[i] != -9999 & verdata.data[i] != -9999) {
							list[num] = new Array();
							list[num][0]=horidata.data[i];
							list[num][1]=verdata.data[i];
							num++;
						}
					}
					return list;
				}()
			}]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);

	});

}