define(['./innerHTML'], function(innerHTML){
	
	var
		refid = 0,
		refMap = {},
		nodeMap = {},
		attProps = {
			id:1,
			title:1,
			tabIndex:1,
			href:1,
			src:1
		};
		
	function uid(){
		return 'ref-' + (refid++);
	}
	
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
	
	function stringifyAttributes(atts){
		var params = [];
		atts.forEach(function(a){
			if(a.localName !== 'id' && a.localName !== 'class'){
				params.push(a.localName+'='+a.localValue);
			}
		});
		return params.join(' ');
	}
	
	function createElement(nodeName){
		//console.log('createElement', nodeName);
		var
			element,
			html = '',
			cssText = '',
			style = {},
			attributes = [],
			refId = uid();
		
		element = {
			nodeName: nodeName,
			nodeType:1,
			children:[],
			attributes: attributes,
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
				if(node.id){
					nodeMap[node.id] = node;
				}
				node.parentNode = this;
				refMap[refId] = node;
			},
			
			replaceChild: function(node, oldNode){
				var i, found;
				for(i = 0; i < this.children.length; i++){
					if(this.children[i] === oldNode){
						this.children[i] = node;
						found = 1;
					}
				}
				if(!found){
					// oh well, screw it...
					this.children.push(node);
				}
				this.firstChild = this.children[0];
				if(node.id){
					nodeMap[node.id] = node;
				}
				node.parentNode = this;
				refMap[refId] = node;
				return this;
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
				if(attProps[key]){
					this[key] = value;
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
				if(indent && indent.substring(0, 1) !== ' '){
					console.log(indent);
					indent = '';
				}else if(indent === undefined){
					indent = '';
				}else{
					indent += '    ';	
				}
				
				var
					params = [],
					style = stringifyStyle(this.style),
					atts = stringifyAttributes(this.attributes),
					text = this.textContent || '';
				if(this.id){
					params.push('id='+this.id);
				}
				if(this.className){
					params.push('class=' + this.className);
				}
				if(style){
					params.push('style='+style);
				}
				if(atts){
					params.push(atts);
				}
				console.log(indent + '<' + this.nodeName, params.join(' '), '> ' + text);
				
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
				str = str.replace(/[\"\'\s]/g, '');
				cssText = str;
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
		
		
		Object.defineProperty(element, 'cssText', {
			set: function(str){
				this.style = str;
			},
			get: function(){
				return cssText;	
			}
		});
		
		Object.defineProperty(element, 'innerHTML', {
			get: function() {
				return html || this.textContent;
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
					this.appendChild(node);
				}
			}
		});
		
		return element;
	}
	
	createElement.nodeMap = nodeMap;
	createElement.refMap = refMap;
	
	global.createElement = createElement;
	
	return createElement;
});