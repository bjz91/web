function timeConvert(str){
	var timeObj= new Date();
	
	timeObj.setFullYear(parseInt(str.substr(0,4)),parseInt(str.substr(5,2))-1,parseInt(str.substr(8,2)));
	timeObj.setHours(parseInt(str.substr(11,2)));
	timeObj.setMinutes(parseInt(str.substr(14,2)));
	timeObj.setSeconds(parseInt(str.substr(17,2)));

	return timeObj;
}