function initSequence() {

	/*--------- 选择文件 ---------*/
	var date = document.getElementById('user_date').value;
	var year = date.substr(0, 4);
	var month = date.substr(5, 2);
	var fileName = 'data/' + year + '/' + month + '.json';

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

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileName, function(data) {
		loadSequence(data, plotBool);
	});
}

