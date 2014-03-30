define(['./createElement'], function(createElement){
	
	function byId(node, id){
		node = node || document.body;
		if(node.id === id){
			return node;
		}
		for(var child, i = 0; i < node.children.length; i++){
			child = node.children[i];
			if(child.id === id){
				return child;
			}
			if(child.children.length){
				byId(child, id);
			}
		}
		return null;
	}
	
	if(!global.document){
		// singleton
		global.document = {
			getElementById: function(id){
				//console.log('getElementById', id);
				//console.log('nodeMap', createElement.nodeMap);
				//return byId(null, id);
				return createElement.nodeMap[id];
			},
			createElement: createElement,
			body: null
		};
		
		global.document.body = createElement('body');
	}
	
});