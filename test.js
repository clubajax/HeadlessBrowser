define([
	'./browser'
], function(browser){
	
	var testName = 'Headless Browser';
	
	return function(options){
		options.begin(testName);
		
		//innerHtmlTest('<div class="test" id="test">inner text</div>');
		
		// simple node:
		//createHierachy('<div class="test" id="test">inner text</div>');
		
		// single child:
		//createHierachy("<div class='p1'><div class='c'>text</chld></prnt>");
		//innerHtmlTest("<div class='p1'><div class='c'>text</chld></prnt>");
		
		// two levels deep:
		//createHierachy("<div class='p1'><div class='c1'><div class='c2'>text2</chld2></chld1></prnt>");
		
		// two siblings:
		//createHierachy("<div class='p1'><div class='c1'>text 1</chld1><div class='c2'>text2</chld2></prnt>");
		
		
		// two siblings, attributes:
		//createHierachy("<div class='p1 dark mode' id='p' style='display:block;'><div class='c1'>text 1</chld1><div class='c2'>text2</chld2></prnt>");
		
		
		innerHtmlTest("<div class='p1 dark mode' id='p' style='display:block;'><div class='c1'>text 1</chld1><div class='c2'>text2</chld2></prnt>");
		
		// one node, attributes
		//innerHtmlTest("<div class='p1 dark mode' id='p' style='display:block;'></div>");
		
		
		//createHierachy("<div class='child'></div></div>");
		
		options.end(testName);
	};
	
});