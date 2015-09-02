function initGas() {

	/*--------- 选择文件 ---------*/
	var date = document.getElementById('user_date').value;
	var year = date.substr(0, 4);
	var month = date.substr(5, 2);

	var objHori = document.getElementById('Hori');
	var HoriIndex = objHori.selectedIndex;
	var Hori = objHori.options[HoriIndex].text;

	var objVer = document.getElementById('Ver');
	var VerIndex = objVer.selectedIndex;
	var Ver = objVer.options[VerIndex].text;

	var horiFileName = 'data/' + year + '/' + month + '/' + Hori + '.json';
	var verFileName = 'data/' + year + '/' + month + '/' + Ver + '.json';
	var fitFileName = 'data/' + year + '/' + month + '/Fit.json';

	var textTitle = year + '年' + month + '月' + Hori + '+' + Ver + '相关性分析';

	/*--------- 加载ECharts ---------*/
	//getJSON异常处理
	$.ajaxSetup({
		error : function(x, e) {
			alert("暂无数据");
			return false;
		}
	});

	$.getJSON(horiFileName, function(horidata) {
		$.getJSON(verFileName, function(verdata) {
			$.getJSON(fitFileName, function(fitdata) {
				//写入拟合参数
				R2 = document.getElementById('R2');
				R2.value = fitdata.R2[HoriIndex][VerIndex];

				k = document.getElementById('k');
				k.value = fitdata.k[HoriIndex][VerIndex];

				b = document.getElementById('b');
				b.value = fitdata.b[HoriIndex][VerIndex];

				//加载ECharts
				loadFit(horidata, verdata, fitdata, HoriIndex, VerIndex, textTitle);
			});
		});
	});

}


