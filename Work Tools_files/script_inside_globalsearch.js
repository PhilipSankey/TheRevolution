//Script functions required for Employee Finder and Global Search
function CheckForEnter(evnt, url, textboxID, querystring){
	var code = evnt.keyCode;  // IE
	if (code == null){
		code = evnt.which; // Netscape
	}

	if (code == 13){
		if ((textboxID.indexOf("QuickSearch") > -1) || (textboxID.indexOf("TargetedSearch") > -1)) {
			DisplayQuickSearch(url, textboxID, querystring);
		}
		else if (textboxID.indexOf("EmployeeFinder") > -1){
			DisplayEmployeeFinder(url, textboxID);
		}	
	}
}

function DisplayQuickSearch(url, textboxID, querystring){
	if (document.all["QuickSearchType"][1].checked == true && textboxID.indexOf("QuickSearch") > -1){
		DisplayInternetSearch(textboxID);
	}
	else{
		DisplayIntranetSearch(url, textboxID, querystring);
	}
//	if (document.all["QuickSearchType"][0].checked == true){
//		DisplayIntranetSearch(url, textboxID, querystring);
//	}
//	else{
//		DisplayInternetSearch(textboxID);
//	}

	//Clear out textbox input
	document.all[textboxID].value = "";
	//return false;
}

function DisplayEmployeeFinder(url, textboxID){
	var w;
	if (document.all[textboxID] != null){
		url += ParseEmployeeName(document.all[textboxID].value);
	}

	// Open the control panel
	w = window.open(url, "EmployeeFinderWindow", "channelmode=no, directories=no, fullscreen=no, height=715, width=1024, location=no, menubar=no, resizable=yes, scrollbars=yes, status=no, titlebar=yes, toolbar=no");
	
	// Set the focus to put it on top of the portal
	w.focus();
}

function DisplayIntranetSearch(url, textboxID, querystring){
	var w;
	var text = document.all[textboxID].value;

 	text = text.replace("&", " ");
	text = text.replace("#", " ");
				          
        if (text == ''){
        	text = '*';
        }
    //Use form from Global Search Box
    //Append to form a hidden input field for each query parameter present     
	if (querystring == null){
		document.all.q.value = text;    
	}
	else{
		document.all.q.value = text;
		
		var s = querystring.split("&");
		var frm = document.getElementById("GlobalSearchForm");
		var el; var s2;
		
		for(i=1; i<s.length; i++) {
			s2 = s[i].split("=");
			el = document.createElement("input");
			el.setAttribute("type", "hidden");  
			el.setAttribute("name", s2[0]);  
			el.setAttribute("value", s2[1]);  
			frm.appendChild(el);      
		}
	} 
	//Use form submit for full CGI capability - populates referrer for search Return link
	document.all.GlobalSearchForm.submit();
} 

function DisplayInternetSearch(textboxID){
    var w;
	var text = document.all[textboxID].value;

 	text = text.replace("", "+");
				          
        if (text == ''){
        	text = '*';
        }
         
	var url = "http://www.google.com/search?hl=en&q=";
        url += text;
        
	// Open the control panel
	w = window.open(url, "aciresults", "channelmode=no, directories=no, fullscreen=no, height=550, width=1015, location=no, menubar=yes, resizable=yes, scrollbars=yes, status=no, titlebar=yes, toolbar=yes");

	// Set the focus to put it on top of the portal
//        w.focus();     
} 

function ParseEmployeeName(fullName){
	fullName = Trim(fullName);
	
	if (fullName.indexOf("#") != -1){
		fullName = fullName.replace("#", "%23");
		}

	if (fullName == null || fullName == "" || fullName.indexOf("Last name") != -1){
		return "";
	}

	if (fullName.indexOf(",") == -1){
		var nameList = fullName.split(" ");
	}
	else{
		var nameList = fullName.split(",");
	}
	
	if (nameList[1] == null){
		return "?Inside=" + Trim(nameList[0]);
	}
	else{	
		return "?Inside=" + Trim(nameList[0]) + "," + Trim(nameList[1]);	
	}
}

function Trim(strValue){
	return LTrim(RTrim(strValue));
}

function LTrim(strValue){
	var LTRIMrgExp = /^\s */;
	return strValue.replace(LTRIMrgExp, '');
}

function RTrim(strValue){
	var RTRIMrgExp = /\s *$/;
	return strValue.replace(RTRIMrgExp, '');
}

