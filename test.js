define([
	'./browser'
], function(browser){
	
	var suiteName = 'Headless Browser';
	
		function simpleNode(){
			// simple node:
			document.body.innerHTML = '<div class="test" id="test">inner text</div>';
			document.body.log();
		}
		
		function overWriteHtml(){
			// simple node:
			document.body.innerHTML = '<div class="test" id="test">inner text</div>';
			document.body.log();
			document.body.innerHTML = '<div class="test" id="test">New inner text</div>';
			document.body.log();
		}
		
		function singleChild(){
			// single child:
			document.body.innerHTML = "<div class='p1'><div class='c'>text</chld></prnt>";
			document.body.log();
		}
		
		function childrenTwoLevels(){
			// two levels deep:
			document.body.innerHTML = "<div class='p1'><div class='c1'><div class='c2'>text2</chld2></chld1></prnt>";
			document.body.log();
		}
		
		function siblings(){
			// two siblings:
			document.body.innerHTML = "<div class='p1'><div class='c1'>text 1</chld1><div class='c2'>text2</chld2></prnt>";
			document.body.log();
		}
		
		function overwriteSiblings(){
			// two siblings:
			document.body.innerHTML = "<div class='p1'><div class='c1'>text 1</chld1><div class='c2'>text2</chld2></prnt>";
			document.body.log();
			document.body.innerHTML = "<div class='p2'><div class='c2'>text 3</chld1><div class='c4'>text2</chld2></prnt>";
			document.body.log();
		}
		
		function siblingsAttributes(){
			// two siblings, attributes:
			document.body.innerHTML = "<div class='p1 dark mode' id='p' style='display:block;'><div class='c1'>text 1</chld1><div class='c2'>text2</chld2></prnt>";
			document.body.log();
		}
		
		function simpleAttributesTest(){
			// one node, attributes
			document.body.innerHTML = "<div class='p1 dark mode' id='p' style='display:block;'></div>";
			document.body.log();
		}
		
		function doubleQuotes(){
			// one node, attributes, opposite quotes
			document.body.innerHTML = '<div class="p1 dark mode\'s" width=400 disabled=true id="testNode" style="display:block;"></div>';
			document.body.log();
		}
		
		function textOnly(){
			// simple text
			document.body.innerHTML = 'There is only text';
			document.body.log();
		}
		
		function loadHtml(){
			// from execution dir in command line
			var snippet = browser.loadFile('./HeadlessBrowser/domTest.html');
			console.log('snippet', snippet);
			document.body.innerHTML = snippet;
			console.log('** body log **\n');
			document.body.log();
			console.log('\n');
		}
		
	return {
		suiteName: suiteName,
		tests:[
			{
				title:'Simple Node',
				run: simpleNode
			},{
				title:'Overwrite innerHTML',
				run: overWriteHtml
			},{
				title:'Single Child',
				run: singleChild
			},{
				title:'Children Two Levels Deep',
				run: childrenTwoLevels
			},{
				title:'Siblings',
				run: siblings
			},{
				title:'Overwrite Siblings',
				run: overwriteSiblings
			},{
				title:'Siblings Attributes',
				run: siblingsAttributes
			},{
				title:'Simple Attributes',
				run: simpleAttributesTest
			},{
				title:'Double Quotes Attributes Test',
				run: doubleQuotes
			},{
				title:'Text Only',
				run: textOnly
			},{
				title:'Load External HTML',
				run: loadHtml
			}
		]
	};
	
});