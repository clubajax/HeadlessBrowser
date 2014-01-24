define([
	'./browser'
], function(browser){
	
	var testName = 'Headless Browser';
	
	return function(options){
		options.begin(testName);
		
		//innerHtmlTest('<div class="test" id="test">inner text</div>');
		createHierachy("<div class='widget03'><div class='child'>child text</chld></prnt>");
		
		//createHierachy("<div class='child'></div></div>");
		
		options.end(testName);
	};
	
});