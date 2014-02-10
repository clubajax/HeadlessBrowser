define([], function(){
	
	var
		// handle single quotes, may be contain double quotes
		posAttrRegExp = /([\w\-]+\s*=\s*\'[\w\s:;#\-\"]*\')/gi,
		
		// handle double quotes, may be contain single quotes
		negAttrRegExp = /([\w\-]+\s*=\s*\"[\w\s:;\-\']*\")/gi,
		
		// handle no quotes - value maybe be alpha-numeric
		// string, boolean or number (no quotes or dashes)
		nonAttrRegExp = /([\w\-]+\s*=\s*[\w]*)/gi;
	
	
	function regExpMatch(str, rx, attPairs){
		// apply a RegExp to the open tag
		var
			preventRecursion = 50,
			result = rx.exec(str);
		
		// loop through the string to match the RegExp one at
		// a time. The second time gets the second match, the third
		// a third match, etc.
		while(result){
			attPairs.push(result[0]);
			result = rx.exec(str);
			if(preventRecursion-- < 0){ break;}
		}
	}
	
	function stripQuotes(str){
		if(str.indexOf('"') === 0){
			return str.substring(1, str.length - 1);
		}
		if(str.indexOf("'") === 0){
			return str.substring(1, str.length - 1);
		}
		return str;
	}
	
	function normalize(str){
		// normalize value to boolean, number or string
		if(str === 'null' || str === null || str === ''){
			// this is most likely a bad match
			return null;
		}
		if(str === 'true'){
			return true;
		}
		if(str === 'false'){
			return false;
		}
		if(!isNaN(+str)){
			return +str;
		}
		return stripQuotes(str);
	}
	
	function attsToObject(attPairs){
		// parse resulting array of key-value strings into
		// attribute objects
		// 
		var i, name, value, attrs = [];
		for(i = 0; i < attPairs.length; i++){
			name = attPairs[i].split('=')[0].trim();
			value = normalize(attPairs[i].split('=')[1].trim());
			if(value !== null){
				attrs.push({
					//name:name,
					localName:name,
					//value:value,
					localValue:value
				});
			}
		}
		//console.log('attrs:', attrs);
		return attrs;
	}
	
	return function(opentag){
		// key method
		// operate on open tag to find attributes
		// 
		// reset regexp
		posAttrRegExp.lastIndex = 0;
		
		var
			attPairs = [];
		
		regExpMatch(opentag, posAttrRegExp, attPairs);
		regExpMatch(opentag, negAttrRegExp, attPairs);
		regExpMatch(opentag, nonAttrRegExp, attPairs);
		
		//console.log('attPairs', attPairs);
		
		return attsToObject(attPairs);
		
	};	
});