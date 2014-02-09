define([], function(){

	
	var
		beginTag = '<!-- headless -->',
		endTag = '<!-- /headless -->',
		beginTagLength = beginTag.length,
		fs = require('fs');
		
		return function(path){
			var
				file = fs.readFileSync(path, 'utf8'),
				snippet = file.substring(file.indexOf(beginTag) + beginTagLength, file.indexOf(endTag));
			//console.log(snippet);
			return snippet;
		};
		
});