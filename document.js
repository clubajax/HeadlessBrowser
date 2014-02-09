define(['./createElement'], function(createElement){
	
	if(!global.document){
		// singleton
		global.document = {
			getElementById: function(id){
				return null;
			},
			createElement: createElement,
			body: null
		};
		
		global.document.body = createElement('body');
	}
	
});