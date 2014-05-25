define([], function(){
	
	function Node(){
		
	}
	if(!global.window){
		// singleton
		global.window = {
			getComputedStyle: function(node){
				return node ? node.style ? node.style : {} : {};
			},
			toString: function(){
				return '[object global]';
			}
		};
		
		global.navigator = {
			userAgent:'Node.js'	
		};
		
		global.Node = global.window.Node = new Node();
	}
	
	return global.window;
});