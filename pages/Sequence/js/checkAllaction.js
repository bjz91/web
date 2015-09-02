function checkAllaction(obj) {
	for (var i = 0; i < document.all.length; i++) {
		if (document.all[i].type == "checkbox") {
			switch(obj) {
			case 1:
				document.all[i].checked = true;
				break;
			//全选
			case 2:
				document.all[i].checked = false;
				break;
			//不选
			case 3:
				{
					if (document.all[i].checked == true) {
						document.all[i].checked = false;
					} else {
						document.all[i].checked = true;
					}
				}
				break;
			//反选
			}
		}
	}
}