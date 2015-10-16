function initBar() {

	/*--------- 选择文件 ---------*/
	var date = document.getElementById('user_date').value;
	var year = date.substr(0, 4);
	var month = date.substr(5, 2);
	var fileName = 'data/' + year + '/' + year + month + '.json';

	/*--------- 判断复选框是否选中 ---------*/
	//Json中污染物的顺序
	var species = ["NH4+", "Na+", "K+", "Ca2+", "Mg2+", "TCations", "SO42-", "NO3-", "Cl-", "TAnions", "OC", "EC", "BC", "TC", "烷烃", "烯烃", "芳香烃", "炔烃", "TVOCs"];

	var plotBool = [];
	for (var i = 0; i < species.length; i++) {
		if (document.getElementById(species[i]).checked) {
			plotBool.push(new Boolean(1));
		} else {
			plotBool.push(new Boolean(0));
		}
	}

	/*--------- 加载ECharts ---------*/
	//getJSON异常处理
	$.ajaxSetup({
		error : function(x, e) {
			alert("暂无" + year + "年" + month + "月" + "数据");
			return false;
		}
	});

	var xaxis = ["0时", "1时", "2时", "3时", "4时", "5时", "6时", "7时", "8时", "9时", "10时", "11时", "12时", "13时", "14时", "15时", "16时", "17时", "18时", "19时", "20时", "21时", "22时", "23时"];

	$.getJSON(fileName, function(data) {
		loadBar(data, plotBool, xaxis);
	});
}
