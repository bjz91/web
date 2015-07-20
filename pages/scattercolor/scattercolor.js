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
			text : '色彩渐变散点图',
			//subtext : '数据来源：毕鉴昭'
		},
		tooltip : {
			trigger : 'item'
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
		dataRange : {
			min : 0,
			max : 100,
			y : 'center',
			text : ['高值', '低值'], // 文本，默认为数值文本
			color : ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
			calculable : true
		},
		xAxis : [{
			type : 'value',
			name : 'ug/m3',
			scale : true
		}],
		yAxis : [{
			type : 'value',
			name : 'ug/m3',
			scale : true
		}],
		animation : true, //显示交互动画
		series : [{
			name : '色彩渐变',
			type : 'scatter',
			symbolSize : 5,
			data : (function() {
				var d = [];
				var len = 500;
				var value;
				while (len--) {
					value = (Math.random() * 100).toFixed(2) - 0;
					d.push([(Math.random() * value + value).toFixed(2) - 0, (Math.random() * value).toFixed(2) - 0, value]);
				}
				return d;
			})()
		}]
	};

	// 为echarts对象加载数据
	myChart.setOption(option);

});

