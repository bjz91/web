function initSequence() {

	//选择逐小时
	var fileName = 'sequenceDaily.json';

	/* 逐日和逐小时切换（暂时取消此功能）
	 var objSelect = document.getElementById('time');
	 var selectIndex = objSelect.selectedIndex;
	 if (selectIndex == 0) {//选择逐小时
	 var fileName = 'sequenceHourly.json';
	 } else if (selectIndex == 1) {//选择逐日
	 var fileName = 'sequenceDaily.json';
	 }
	 */

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

	//加载ECharts
	$.getJSON(fileName, function(data) {
		loadSequence(data, plotBool);
	});
}

