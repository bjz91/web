function initSort(tag) {

	/*--------- 选择文件 ---------*/
	var date = document.getElementById('user_date').value;
	var year = date.substr(0, 4);
	var month = date.substr(5, 2);
	if (tag == 0) {
		var date = date.substr(8, 2);
		var fileName = 'data/daily/' + year + '/' + month + '/' + year + month + date + '.json';
	} else if (tag == 1) {
		var date = '';
		var fileName = 'data/monthly/' + year + '/' + year + month + '.json';
	}

	/*--------- 加载ECharts ---------*/
	//getJSON异常处理
	$.ajaxSetup({
		error : function(x, e) {
			alert("暂无数据");
			return false;
		}
	});
	
	$.getJSON(fileName, function(sortdata) {
		loadSort(year, month, date, sortdata, tag);
	});
}

