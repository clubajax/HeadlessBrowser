define([], function(){
	
	if(!global.window){
		// singleton
		global.window = {
			getComputedStyle: function(node){
				return node ? node.style ? node.style : {} : {};
			}
		};
		
		global.navigator = {
			userAgent:'Node.js'	
		};
	}
	
	return global.window;
});