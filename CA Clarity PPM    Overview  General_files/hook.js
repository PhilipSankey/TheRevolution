
isValidAggregationHandlerInput = function(nativeEvent) {
	if (nativeEvent.properties == undefined || 
		nativeEvent.startValues == undefined ||
		nativeEvent.endValues == undefined ||
		nativeEvent.row == undefined ||
		nativeEvent.col == undefined ||
		nativeEvent.handle == undefined ||
		nativeEvent.portletInstanceId == undefined ||
		nativeEvent.startValues.length == undefined ||
		nativeEvent.endValues.length == undefined ||
		nativeEvent.properties.length == undefined ||
		nativeEvent.startValues.length < 1 ||
		nativeEvent.endValues.length < 1 ||
		nativeEvent.properties.length < 1 ||
		nativeEvent.startValues.length != nativeEvent.endValues.length ||
		nativeEvent.startValues.length != nativeEvent.properties.length)
		return false;
	
	return true;
};

initNativeListeners = function() {
	_updateAggregationRowHandler = new Object;
	_updateAggregationRowHandler.invoke = function(nativeEvent) {
		if (!isValidAggregationHandlerInput(nativeEvent)) {
			return;
		}
		
		var row = nativeEvent.row;
		var col = nativeEvent.col;
		var startValues = nativeEvent.startValues;
		var endValues = nativeEvent.endValues;
		var properties = nativeEvent.properties;
		var viewHandle = nativeEvent.handle;
		
		for (var i = 0; i < startValues.length; i++) {
			var oldValue = startValues[i];
			var newValue = endValues[i];
			var property = properties[i];
			
			if( newValue == "")
			{
				newValue = '0.00';
			}
			
			if( oldValue == "")
			{
				oldValue = '0.00';
			}
			if (!hasAggregationRow(property, "sum", viewHandle)) continue;

			// if the oldValue is different from the newValue, update the value in the aggregation row with the new sum
			// try/catch is to avoid exceptions on non-numeric rows 
			try {
				var oldValueFloat = parseFloat(oldValue);
				var newValueFloat = parseFloat(newValue);
			} catch(e) {
				return;
			}

			if (isNaN(oldValueFloat) || isNaN(newValueFloat)) {
				// TODO: do something to indicate the aggregation row does not contain accurate results, like shading/etc.
				//alert("Could not parse values! old: " + oldValueFloat + " new: " + newValueFloat);
				return;
			}

			if (oldValueFloat != newValueFloat) {
				var difference = (newValueFloat*1024) - (oldValueFloat*1024);
				var oldAggValue = getValueInAggregationRow(property,"sum",col,viewHandle);

				//TODO: need to be able to parse strings properly depending on locale
				if (oldAggValue)
					oldAggValue = oldAggValue.replace(',','');

				var oldAggValueFloat = parseFloat(oldAggValue);
				if (isNaN(oldAggValueFloat)) {
					//TODO: do something else
					//alert("Could not parse old agg value! value: " + oldAggValueFloat);
					return;
				}

				var newAggValue = (oldAggValueFloat*1024) + difference;
				var writtenAggValue = newAggValue/1024;
				setValueInAggregationRow(property,"sum",col,writtenAggValue.toFixed(2),viewHandle);
			}
		}
	};
	
	addEditCompleteEventHandler(_updateAggregationRowHandler);
	
	_pageLoadHandler = new Object;
	_pageLoadHandler.invoke = function() {
		// there is no input into this method
		
		// can do something here, like highlighting/removing highlight on cells, etc.
	};
	
	addPageLoadEventHandler(_pageLoadHandler);
	
	_beforeEditHandler = new Object;
	_beforeEditHandler.invoke = function(nativeEvent) {
		// return false to prevent the edit from continuing
		return true;
	}
	
	addBeforeEditEventHandler(_beforeEditHandler);
}
