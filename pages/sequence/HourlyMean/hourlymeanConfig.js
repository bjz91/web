function initBar() {

	var objMonth = document.getElementById('month');
	var monthIndex = objMonth.selectedIndex;
	var month = objMonth.options[monthIndex].text;
	var fileName = 'data/' + month + '.json';

	$.getJSON(fileName, function(data) {
		loadBar(data);
	});
}
