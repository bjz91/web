function loadSort(year, month, date, sortdata, tag) {

	/*------------ 排序 ------------*/
	var newData = sortdata.data;
	var newName = sortdata.name;
	var temp;

	for (var i = 0; i < newData.length - 1; i++) {
		var max = i;
		//查找最小值
		for (var j = i + 1; j < newData.length; j++) {
			if (newData[max] < newData[j]) {
				max = j;
			}
		}
		if (max != i) {
			temp = newData[i];
			newData[i] = newData[max];
			newData[max] = temp;

			temp = newName[i];
			newName[i] = newName[max];
			newName[max] = temp;
		}
	}

	/*------------ 画图 ------------*/

	// 路径配置
	require.config({
		paths : {
			echarts : '../../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/bar', 'echarts/chart/line', 'echarts/chart/funnel', 'echarts/chart/pie'//按需加载
	], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');
		var myChart1 = ec.init(document.getElementById('container1'), 'macarons');

		var option = {
			title : {
				text : sortdata.title,
				//subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis'
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
				data : newName,
				axisLabel : {
					interval : 'auto' //暂时没想到好的方法！！！！！！！
				}
			}],
			yAxis : [{
				type : 'value',
				name : 'ug/m3'
			}],
			series : [{
				name : '浓度',
				type : 'bar',
				itemStyle : {
					normal : {
						color : function(params) {
							// build a color map as your need.
							// macarons主题颜色列表
							var colorList = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050'];
							return colorList[params.dataIndex]
						}
					}
				},
				data : newData,
				barCategoryGap : '50%'
			}]
		};

		var option1 = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				x : 'center',
				y : 'bottom',
				data : sortdata.name
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
					/*
					 magicType : {
					 show : true,
					 type : ['pie', 'funnel']
					 },*/
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
				name : '浓度',
				type : 'pie',
				itemStyle : {
					normal : {
						color : function(params) {
							// build a color map as your need.
							// macarons主题颜色列表
							var colorList = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050'];
							return colorList[params.dataIndex]
						}
					}
				},
				radius : [30, 110],
				center : ['50%', '50%'],
				roseType : 'radius',
				x : '0%', // for funnel
				//sort : 'descending', // for funnel
				//maxSize : '100%', // for funnel
				data : function() {
					var list = [];
					for (var i = 0; i < newData.length; i++) {
						var obj = {
							'value' : newData[i],
							'name' : newName[i]
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
		myChart1.setOption(option1);

		//多图联动
		myChart.connect(myChart1);
		myChart1.connect(myChart);
	});
}
