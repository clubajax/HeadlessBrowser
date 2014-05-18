define([], function(){
	
	function Node(){
		
	}
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
		
		global.Node = global.window.Node = new Node();
	}
	
	return global.window;
});