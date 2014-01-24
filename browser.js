define([], function(){
	
	var
		tabRegExp = /<\/?\w+\s+[^>]*>/,
		startTagRegExp = /<\w+\s+[^>]*>/gi,
		endTagRegExp = /<\/\w*>/i,
		commentRegExp = /(<!--(.|\s){1,}?-->)/gi;
	
	function parseOuter(html){
		var
			nodeName,
			openTagLength,
			innerText,
			atts = {},
			match = tabRegExp.exec(html);
			
		if(match && match.length){
			openTagLength = match[0].length;
			match[0].split(' ').forEach(function(str, i){
				if(i === 0){
					nodeName = str.substring(1, str.indexOf(' '));
				}else{
					if(str.indexOf('>')>-1){
						str = str.substring(0, str.length - 1);
					}
					atts[str.split('=')[0]] = str.split('=')[1];
				}
			});
			innerText = html.substring(openTagLength, html.lastIndexOf('<'));
			return {
				nodeName:nodeName,
				atts:atts,
				html:innerText
			};
		}
		
		return {
			html:html
		};
	}
	
	function htmlTextToObject(html){
		var
			result,
			nodeObject;
		do{
			result = parseOuterTags(html);
			html = result.html;
		}while(result.nodeName);
		
		console.log('nodeObject:', nodeObject);
	}
	
	function createHierachy(html){
		var
			tags,
			lastType,
			iterator = -1,
			limit = 10,
			startTagRegExp,
			endTagRegExp,
			nodes = [],
			nodeObject = {};
			
		function next(){
			var o = {};
			nodes.push(o);
			iterator++;
			return o;
		}
		function prev(){
			iterator--;
			return nodes[iterator];
		}
		function indexes(){
			return {
				open: html.search(startTagRegExp),
				end: html.search(endTagRegExp)
			};
		}
		
		
		while(html.length){
			if(limit-- < 0){console.log('LIMIT!!');break;}
			
			// redeclaring RegExp
			// how do you clear one after using it?
			startTagRegExp = /<\/?\w+\s+[^>]*>/g,
			endTagRegExp = /<\/\w*>/;
				
			html = html.trim();
			
			tags = indexes();
			
			if(tags.open === 0){
				nodeObject = next();
				nodeObject.innerHTML = html;
				console.log('\nexec html:', html.length, typeof html, html);
				console.log('searched', html.search(startTagRegExp));
				nodeObject.opentag = startTagRegExp.exec(html);
				console.log('opentag', nodeObject.opentag);
				nodeObject.opentag = nodeObject.opentag[0];
				html = html.substring(nodeObject.opentag.length, html.length);
				console.log('new html', html);
				lastType = 'open';
			}
				
			tags = indexes();
			
			console.log('\nopenIndex', tags.open);
			console.log('endIndex', tags.end);
			
			if(tags.open === 0){
				// next node
				//nodeObject = next();
				continue;
			}
			
			
			if(tags.end > 0){
				// inner text
				nodeObject.innerText = html.substring(0, tags.end);
				html = html.replace(nodeObject.innerText, '');
				lastType = 'text';
			}
			
			tags = indexes();
			console.log('   remainder', html);
			
			if(tags.end === 0){
				console.log('.....close.....');
				// starting with a closing tag
				if(lastType === 'close'){
					nodeObject = prev();
				}
				nodeObject.closetag = endTagRegExp.exec(html);
				nodeObject.closetag = nodeObject.closetag[0];
				console.log('ender', nodeObject);
				html = html.substring(nodeObject.closetag.length, html.length);
				lastType = 'close';
			}
			
			console.log('   done?', html);
			
			if(html.length){
				//nodeObject = next();
			}
		
		}
		console.log('\n\n\nnodeObject', nodes.length);
		nodes.forEach(function(n){
			console.log(n);
		});
		return nodeObject;
	}
	
	// <div id='widget03'><div class="child"></div></div>
	
	global.createHierachy = createHierachy;
	global.innerHtmlTest = htmlTextToObject;
	
	function Node(name){
		this.nodeName = name;
		this.style = {};
		this.attributes = {};
		//this.firstChild = {}
		this.childNodes = [];
	}
	Node.prototype = {
		nodeType:1,
		setAttribute: function(key, value){
			this.attributes[key] = value;
		},
		getAttribute: function(key){
			return this.attributes[key];
		},
		childNodes:null,
		appendChild: function(node){
			if(this.childNodes.length){
				this.childNodes[this.childNodes.length-1].nextSibling = node;
				node.previousSibling = this.childNodes[this.childNodes.length-1];
			}
			this.childNodes.push(node);
			this.firstChild = this.childNodes[0];
		},
		firstChild:null,
		set innerHTML(text){
			this.html = text;
			this.appendChild(new Node('div'));
		},
		get innerHTML(){
			return this.html || '<div></div>';
		}
	};
	
	global.document = {
		getElementById: function(id){
			return null;
		},
		createElement: function(nodeName){
			return new Node(nodeName);
		},
		body: (new Node('body'))
	};
	
	global.window = {
		getComputedStyle: function(node){
			return node ? node.style ? node.style : {} : {};
		}
	};
	
	global.navigator = {
		userAgent:'Node.js'	
	};
	
	global.Node = Node;
	
});