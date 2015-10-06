function initSequence() {

	/*--------- 选择文件 ---------*/
	var objYear = document.getElementById('year');
	var yearIndex = objYear.selectedIndex;
	var year = objYear.options[yearIndex].text;
	var fileName = 'data/' + year + '.json';

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
			alert("暂无" + year + "年" + "数据");
			return false;
		}
	});
	$.getJSON(fileName, function(data) {
		loadSequence(data, plotBool);
	});
}

