define(['./innerHTML'], function(innerHTML){
	
	function stringifyStyle(style){
		var key, styles = '';
		for(key in style){
			if(style.hasOwnProperty(key)){
				styles += (key+'='+style[key]+';');
			}
		}
		//console.log('stringifyStyle', styles, style);
		return styles;
	}
	
	function createElement(nodeName){
		var
			element,
			html = '',
			style = {},
			attributes = [];
		
		element = {
			nodeName: nodeName,
			nodeType:1,
			children:[],
			textContent:'',
			firstChild:null,
			parentNode:null,
			nextSibling:null,
			previousSibling:null,
			appendChild: function(node){
				if(this.children.length){
					this.children[this.children.length-1].nextSibling = node;
					node.previousSibling = this.children[this.children.length-1];
				}
				this.children.push(node);
				this.firstChild = this.children[0];
			},
			
			setAttribute: function(key, value){
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
			},
			getAttribute: function(key){
				var i;
				for(i = 0; i < attributes.length; i++){
					if(attributes[i].localName === key){
						return attributes[i].localValue;
					}
				}
				return null;
			},
			
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
				if(this.textContent){
					console.log(indent + '    ' + this.textContent);
				}
				this.children.forEach(function(child){
					child.log(indent);
				});
			}
		};
		
		Object.defineProperty(element, 'attributes', {
			get: function() {
				return attributes;
			},
			set: function(attrs) {
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
		
		Object.defineProperty(element, 'style', {
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
		
		Object.defineProperty(element, 'innerHTML', {
			get: function() {
				return html;
			},
			set: function(str) {
				if(this.children.length){
					this.children.length = 0;
				}
				html = str;
				var node = innerHTML(str);
				if(typeof node === 'string'){
					this.textContent = html;
				}else{
					this.appendChild();
				}
			}
		});
		
		return element;
	}
	
	global.createElement = createElement;
	
	return createElement;
});