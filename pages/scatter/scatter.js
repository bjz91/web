$.getJSON('bpnn.json', function(bpnndata) {
	$.getJSON('knn.json', function(knndata) {
		// 路径配置
		require.config({
			paths : {
				echarts : '../../src/echarts-2.2.4/build/dist'
			}
		});

		// 使用
		require(['echarts', 'echarts/chart/scatter', 'echarts/chart/line'], function(ec) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('container'), 'macarons');

			var option = {

				title : {
					text : '多物种简单散点图',
					//subtext : '数据来源：毕鉴昭'
				},
				tooltip : {
					trigger : 'axis',
					showDelay : 0,
					formatter : function(params) {
						if (params.value.length > 1) {
							return 'Inventory: ' + params.value[0] + '<br/>' + 'Satellite: ' + params.value[1];
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
					data : ['BPNN', {
						name : 'R=0.896'
					}, 'KNN', {
						name : 'R=0.9216'
					}],
					selected : {
						'R=0.896' : true,
						'R=0.9216' : true
					},
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
					name : 'ug/m3',
					type : 'value',
					scale : true,
					axisLabel : {
						formatter : '{value}'
					}
				}],
				yAxis : [{
					name : 'ug/m3',
					min : 0,
					type : 'value',
					scale : true,
					axisLabel : {
						formatter : '{value}'
					}
				}],
				series : [{
					name : 'Fitting Line',
					type : 'line',
					itemStyle : {
						normal : {
							color : ['rgba(255,0,0,0.5)']
						}
					},
					data : [[0, 1], [400, 300]]
				}, {
					name : 'Fitting Line',
					type : 'line',
					itemStyle : {
						normal : {
							color : ['rgba(0,180,120,0.5)']
						}
					},
					data : [[1, 0], [380, 400]]
				}, {
					name : 'BPNN',
					type : 'scatter',
					itemStyle : {
						normal : {
							color : ['rgba(255,0,0,0.5)']
						}
					},
					data : function() {
						var list = new Array();
						for (var i = 0; i < bpnndata.bpnn.length; i++) {
							list[i] = new Array();
							list[i][0] = bpnndata.bpnn[i].ori;
							list[i][1] = bpnndata.bpnn[i].new;
						}
						return list;
					}()
				}, {
					name : 'KNN',
					type : 'scatter',
					itemStyle : {
						normal : {
							color : ['rgba(0,180,120,0.5)']
						}
					},
					data : function() {
						var list = new Array();
						for (var i = 0; i < knndata.knn.length; i++) {
							list[i] = new Array();
							list[i][0] = knndata.knn[i].ori;
							list[i][1] = knndata.knn[i].new;
						}
						return list;
					}()
				}]
			};

			// 为echarts对象加载数据
			myChart.setOption(option);

		});
	});
});
