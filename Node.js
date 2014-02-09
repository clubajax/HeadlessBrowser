define(['./innerHTML'], function(innerHTML){
	
	function injectAttributes(instance){
		var attributes = [];
		
		instance.setAttribute = function(key, value){
			var i, found = false;
			for(i = 0; i < attributes.length; i++){
				if(attributes[i].localName === key){
					attributes[i].localValue = value;
					found = true;
					break;
				}
			}
			if(!found){
				attributes.push({
					localName:key,
					localValue:value
				});
			}
		};
		instance.getAttribute = function(key){
			var i;
			for(i = 0; i < attributes.length; i++){
				if(attributes[i].localName === key){
					return attributes[i].localValue;
				}
			}
			return null;
		};
		Object.defineProperty(instance, 'attributes', {
			get: function() {
				return attributes;
			},
			set: function(attrs) {
				//console.log('SET ATTRRIBUTES');
				attributes = attrs;
				var i, value;
				for(i = 0; i < attributes.length; i++){
					value = attributes[i].localValue;
					//console.log('   ', value);
					switch(attributes[i].localName){
						case 'id':
							this.id = value;
							break;
						case 'class':
							this.className = value;
							break;
						case 'style':
							this.style = value;
					}
				}
			}
		});
	}
	
	function stringifyStyle(style){
		var key, styles = '';
		for(key in style){
			if(style.hasOwnProperty(key)){
				styles += (key+'='+style[key]+';');
			}
		}
		console.log('stringifyStyle', styles, style);
		return styles;
	}
	
	function injectStyle(instance){
		var style = {};
		Object.defineProperty(instance, 'style', {
			set: function(str){
				
				str = str.replace(/[\"\']/g, '');
				var i, key, value, definitions = str.split(';');
				for(i = 0; i < definitions.length; i++){
					if(definitions[i]){
						key = definitions[i].split(':')[0].trim();
						value = definitions[i].split(':')[1].trim();
						if(value === ''){
							delete style[key];
						}else{
							style[key] = value;	
						}
					}	
				}
				console.log('*****set style', str, style);
			},
			get: function(){
				return style;	
			}
		});
	}
	
	function injectInnerHtml(instance){
		var html = '';
		Object.defineProperty(instance, 'innerHTML', {
			get: function() {
				return html;
			},
			set: function(str) {
				html = str;
				this.appendChild(innerHTML(str));
			}
		});
	}
	
	function Node(name){
		this.nodeName = name;
		this.children = [];
	}
	Node.prototype = {
		nodeType:1,
		// childNodes includes whitespace, which we are not testing
		appendChild: function(node){
			if(this.children.length){
				this.children[this.children.length-1].nextSibling = node;
				node.previousSibling = this.children[this.children.length-1];
			}
			this.children.push(node);
			this.firstChild = this.children[0];
		},
		firstChild:null,
		log: function(indent){
			if(indent === undefined){
				indent = '';
			}else{
				indent += '    ';	
			}
			
			var params = [], style = stringifyStyle(this.style);
			if(this.id){
				params.push('id='+this.id);
			}
			if(this.className){
				params.push('class=' + this.className);
			}
			if(style){
				params.push('style='+style);
			}
			
			console.log(indent + '<' + this.nodeName, params.join(' '), '>');
			this.children.forEach(function(child){
				child.log(indent);
			});
		}
		
	};
	
	injectAttributes(Node.prototype);
	injectStyle(Node.prototype);
	injectInnerHtml(Node.prototype);
		
	global.Node = Node;
	
	return Node;
});