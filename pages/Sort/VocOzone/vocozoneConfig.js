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

	$.getJSON(fileName, function(sortdata) {
		loadSort(year, month, date, sortdata, tag);
	});
}

