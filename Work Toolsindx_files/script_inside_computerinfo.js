function PopComputerInfo(IPAddress){
	var spacer = "               ";
	var strMsg = "";

	if (IPAddress != null){
		strMsg += "\nIP Address: " + IPAddress;
	}

	strMsg += "\nScreen resolution: " + screen.width + "x" + screen.height + spacer;

	alert(strMsg);
}

