define(['./createElement'], function(createElement){
	
	if(!global.document){
		// singleton
		global.document = {
			getElementById: function(id){
				//console.log('getElementById', id);
				//console.log('nodeMap', createElement.nodeMap);
				return createElement.nodeMap[id];
			},
			createElement: createElement,
			body: null
		};
		
		global.document.body = createElement('body');
	}
	
});