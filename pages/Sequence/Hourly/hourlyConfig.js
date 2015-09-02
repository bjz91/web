function initSequence() {

	/*--------- 选择文件 ---------*/
	var date = document.getElementById('user_date').value;
	var year = date.substr(0, 4);
	var month = date.substr(5, 2);
	var fileName = 'data/' + year + '/' + year + month + '.json';

	/*--------- 判断复选框是否选中 ---------*/
	var plotBool = [];
	/*
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
	//TC
	if (document.getElementById("TC").checked) {
	plotBool.push(new Boolean(1));
	} else {
	plotBool.push(new Boolean(0));
	}*/
	//Cl
	if (document.getElementById("Cl").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//NO2
	if (document.getElementById("NO2").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//Br
	if (document.getElementById("Br").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//NO3
	if (document.getElementById("NO3").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//SO4
	if (document.getElementById("SO4").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//Li
	if (document.getElementById("Li").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//Na
	if (document.getElementById("Na").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//NH4
	if (document.getElementById("NH4").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//K
	if (document.getElementById("K").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//Mg
	if (document.getElementById("Mg").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//Ca
	if (document.getElementById("Ca").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}

	/*--------- 加载ECharts ---------*/
	//getJSON异常处理
	$.ajaxSetup({
		error : function(x, e) {
			alert("暂无" + year + "年" + month + "月" + "数据");
			return false;
		}
	});
	$.getJSON(fileName, function(data) {
		loadSequence(data, plotBool);
	});
}

