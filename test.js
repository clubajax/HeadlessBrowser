define([
	'./browser'
], function(browser){
	
	function byId(id){
		return document.getElementById(id);	
	}
	var
		suiteName = 'Headless Browser';
	
		function simpleNode(t){
			// simple node:
			document.body.innerHTML = '<div class="test" id="test">inner text</div>';
			document.body.log();
			t.assert(byId('test'));
		}
		
		function overWriteHtml(t){
			// simple node:
			document.body.innerHTML = '<div class="test" id="test">inner text</div>';
			document.body.innerHTML = '<div class="test" id="test">New inner text</div>';
			document.body.log();
			t.assert(byId('test').textContent === 'New inner text');
		}
		
		function singleChild(t){
			// single child:
			document.body.innerHTML = "<div id='p1'><div class='c'>child text</chld></prnt>";
			document.body.log();
			t.assert(byId('p1').firstChild.textContent === 'child text');
		}
		
		function childrenTwoLevels(t){
			// two levels deep:
			document.body.innerHTML = "<div id='p1'><div class='c1'><div class='c2'>baby text</chld2></chld1></prnt>";
			document.body.log();
			t.assert(byId('p1').firstChild.firstChild.textContent === 'baby text');
		}
		
		function siblings(t){
			// two siblings:
			document.body.innerHTML = "<div id='p1'><div class='c1'>text 1</chld1><div class='c2'>text 2</chld2></prnt>";
			document.body.log();
			t.assert(byId('p1').firstChild.textContent === 'text 1' && byId('p1').firstChild.nextSibling.textContent === 'text 2');
		}
		
		function overwriteSiblings(t){
			// two siblings:
			document.body.innerHTML = "<div id='p1'><div class='c1'>text 1</chld1><div class='c2'>text 2</chld2></prnt>";
			document.body.innerHTML = "<div id='p1'><div class='c2'>text 3</chld1><div class='c4'>text 4</chld2></prnt>";
			document.body.log();
			
			var node = byId('p1').firstChild;
			t.assert(node.textContent === 'text 3' && node.nextSibling.textContent === 'text 4');
		}
		
		function classNameTest(t){
			// one node, attributes
			document.body.innerHTML = "<div id='p1' class='p1 dark mode'></div>";
			document.body.log();
			
			var node = byId('p1');
			t.assert(node.className === 'p1 dark mode');
		}
		
		function styleTest(t){
			// one node, attributes
			document.body.innerHTML = "<div id='p1' style='display:block;'></div>";
			document.body.log();
			
			var node = byId('p1');
			t.assert(node.style.display === 'block');
		}
		
		function cssTextTest(t){
			// one node, attributes
			document.body.innerHTML = "<div id='p1' style='display:block;color:#0000ff;'></div>";
			document.body.log();
			
			var node = byId('p1');
			t.assert(node.cssText === 'display:block;color:#0000ff;');
		}
		
		function simpleAttributesTest(t){
			// one node, attributes
			document.body.innerHTML = "<div id='p1' disabled=true width=400 title='The Title'></div>";
			document.body.log();
			
			var node = byId('p1');
			t.assert(node.getAttribute('disabled') === true);
			t.assert(node.getAttribute('width') === 400);
			t.assert(node.getAttribute('title') === 'The Title');
		}
		
		function siblingsAttributes(t){
			// two siblings, attributes:
			document.body.innerHTML = "<div id='p1'><div class='c1' title='Child One'>text 1</chld1><div class='c2' title='Child Two'>text2</chld2></prnt>";
			document.body.log();
			var node = byId('p1').firstChild;
			t.assert(node.getAttribute('title') === 'Child One' && node.nextSibling.getAttribute('title') === 'Child Two');
		}
		
		function doubleQuotes(t){
			// one node, attributes, double-quotes and an apostrophe
			document.body.innerHTML = '<div id="p1" class="p1 dark mode\'s" width=400 disabled=true style="display:block;"></div>';
			document.body.log();
			var node = byId('p1');
			t.assert(node.className === "p1 dark mode\'s");
			t.assert(node.style.display === 'block');
		}
		
		function textOnly(t){
			// simple text
			document.body.innerHTML = 'There is only text';
			document.body.log();
			t.assert(document.body.innerHTML === 'There is only text');
		}
		
		function loadHtml(t){
			// from execution dir in command line
			var snippet = browser.loadFile('./HeadlessBrowser/domTest.html');
			//console.log('snippet', snippet);
			document.body.innerHTML = snippet;
			document.body.log();
			
			t.assert(byId('widget01').style.color === '#ff0000');
			t.assert(byId('wrapper').className === 'child');
			t.assert(byId('wrapper').firstChild.textContent === 'span text');
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
				title:'Class Name Test',
				run: classNameTest
			},{
				title:'Style Test',
				run: styleTest
			},{
				title:'cssText Test',
				run: cssTextTest
			},{
				title:'Simple Attributes',
				run: simpleAttributesTest
			},{
				title:'Siblings Attributes',
				run: siblingsAttributes
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