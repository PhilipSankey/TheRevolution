function InitAlertScroll()
{
	id = "TICKER";
	if(!document.getElementById(id)){
		return;
	}
	tickerContent = document.getElementById(id).innerHTML;
	if (tickerContent.replace(/^\s+|\s+$/, '') != ""){
		varTickerWidth = FetchElementWidth(document.getElementById(id));
		document.getElementById(id).innerHTML = '<span>'+tickerContent+'</span>';
		varDiv = document.getElementById(id);
		varSpan = varDiv.getElementsByTagName('span')[0];
		varTickerTextWidth = FetchElementWidth(varSpan);
		varDiv.onmouseout = function () {AlertScroll(id);};
    	varDiv.onmouseover = function () {clearTimeout(varDiv.TO);};
    	varSpan.style.width = varTickerTextWidth + 'px';
    	varSpan.style.height = varDiv.style.height;
    	varSpan.style.position = 'absolute';
    	varSpan.style.left = varTickerWidth + 'px';
		AlertScroll(id);
	}
	else
	{
		document.getElementById(id).innerHTML = "&nbsp;";
	}
}

function AlertScroll(id) {
	varDiv = document.getElementById(id);
    varSpan = varDiv.children[0];
	varSpanLeft = parseInt(varSpan.style.left, 10);
    if (varSpanLeft >= (FetchElementWidth(varSpan)*-1))
    {
    	varSpan.style.left = (varSpanLeft - 1) + 'px';
    }
    else
    {
    	varSpan.style.left = FetchElementWidth(varDiv) + 'px';
    }
    varDiv.TO = setTimeout("AlertScroll('"+id+"')", 30);
}

function FetchElementWidth(element) {
    if (element.offsetWidth)
    {
    	return element.offsetWidth;
    }
    if (element.clip)
    {
    	return element.clip.width;
    }
    return 0;
}