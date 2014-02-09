define(['./Node'], function(Node){
	
	if(!global.document){
		// singleton
		global.document = {
			getElementById: function(id){
				return null;
			},
			createElement: function(nodeName){
				return new Node(nodeName);
			},
			body: (new Node('body'))
		};
	}
	
});