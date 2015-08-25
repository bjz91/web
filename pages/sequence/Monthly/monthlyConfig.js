function initBar() {

	var objYear = document.getElementById('year');
	var yearIndex = objYear.selectedIndex;
	var year = objYear.options[yearIndex].text;
	var fileName = 'data/' + year + '.json';

	$.getJSON(fileName, function(data) {
		loadBar(data);
	});
}

