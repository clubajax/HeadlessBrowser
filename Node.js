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
				attributes = attrs;
				var i, value;
				for(i = 0; i < attributes.length; i++){
					value = attributes[i].localValue;
					switch(attributes[i].localName){
						case 'id':
							instance.id = value;
							break;
						case 'class':
							instance.className = value;
							break;
						case 'style':
							instance.style = value;
					}
				}
			}
		});
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
			},
			get: function(){
				return style;	
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
		children:null,
		appendChild: function(node){
			if(this.children.length){
				this.children[this.children.length-1].nextSibling = node;
				node.previousSibling = this.children[this.children.length-1];
			}
			this.children.push(node);
			this.firstChild = this.children[0];
		},
		firstChild:null,
		set innerHTML(text){
			this.html = text;
			this.appendChild(innerHTML(text));
		},
		get innerHTML(){
			return this.html || '';
		}
		
	};
	
	injectAttributes(Node.prototype);
	injectStyle(Node.prototype);
		
	global.Node = Node;
	
	return Node;
});