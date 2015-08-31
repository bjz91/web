function initTime() {

	var objYear = document.getElementById('year');
	var objMonth = document.getElementById('month');
	var objDate = document.getElementById('date');

	var yearIndex = objYear.selectedIndex;
	var monthIndex = objMonth.selectedIndex;
	var dateIndex = objDate.selectedIndex;

	var year = objYear.options[yearIndex].text;
	var month = objMonth.options[monthIndex].text;
	var date = objDate.options[dateIndex].text;

	var fileName = year + '/' + month + '/' + date + '/' + year + month + date + '.json';

	$.getJSON(fileName, function(barsortdata) {
		exePlot(year, month, date, barsortdata);
	});
}

function exePlot(year, month, date, data) {

	/*------------ 排序 ------------*/
	var newData = data.barsort.data;
	var newName = data.barsort.name;
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
				text : year + '年' + month + '月' + date + '日' + '玫瑰图',
				//subtext : '数据来源：毕鉴昭',
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
	});
}
