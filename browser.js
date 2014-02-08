define(['./htmlParser'], function(htmlParser){
	
	var
		tabRegExp = /<\/?\w+\s+[^>]*>/,
		startTagRegExp = /<\w+\s+[^>]*>/gi,
		endTagRegExp = /<\/\w*>/i,
		commentRegExp = /(<!--(.|\s){1,}?-->)/gi,
		attrRegExp = /([\w\-]+\s*=\s*\'[\w\s:;\-]*\')/gi;
		//attrRegExp = /([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
	
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
	
	function innerHtmlTest(html){
		// HTML parser main function
		var
			tree = htmlParser(html),
			nodeObject;
		
		
	}
	
	
	
	// <div id='widget03'><div class="child"></div></div>
	
	//global.createHierachy = htmlParser.createHierachy;
	global.innerHtmlTest = innerHtmlTest;
	
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