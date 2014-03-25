define([], function(){

	return function (html){
		// key method
		// Converts an HTML string into one node object
		// with a hierarchy of children.
		// The result is still in string form but broken into
		// the proper structure
		var
			tags,
			lastType,
			limit = 30,
			nodes = [],
			nodeObject = {},
			current,
			id = 0,
			//commentRegExp = /(<!--(.|\s){1,}?-->)/gi,
			startTagRegExp = /<\/?\w+[^>]*>|<\w+>/g,
			endTagRegExp = /<\/\w*>/,
			closedTagRegExp = /<[^\/]\w+[^>]*><\/\w*>/,
			newlineRegExp = /[\n\t]/g;
			
		function log(){
			//console.log.apply(console, arguments);	
		}
		
		function uid(){
			return 'n-' + (id++);
		}
		
		function getChild(){
			var o = {
				id: uid()	
			};
			nodes.push(o);
			if(current){
				if(!current.children){ current.children = []; }
				current.children.push(o);
				o.parentId = current.id;
			}
			current = o;
			//console.log('   c-current', current);
			return current;
		}
		
		function getParent(){
			if(current.parentId){
				for(var i = 0; i < nodes.length; i++){
					if(nodes[i].id === current.parentId){
						current = nodes[i];
						break;
					}
				}
			}
			//console.log('   p-current', current);
			return current;
		}
		
		function indexes(){
			var tags = {
				open: html.search(startTagRegExp),
				end: html.search(endTagRegExp),
				closed: html.search(closedTagRegExp)
			};
			log('    tags', tags.open, tags.end, tags.closed);
			return tags;
		}
		
		
		while(html.length){
			if(limit-- < 0){console.log('LIMIT!!');break;}
			
			// clear RegExp index
			startTagRegExp.lastIndex = 0;
			endTagRegExp.lastIndex = 0;
				
			html = html.trim().replace(newlineRegExp, '');
			
			log('html ', html );
			tags = indexes();
			
			if(tags.open === 0){
				nodeObject = getChild();
				nodeObject.opentag = startTagRegExp.exec(html);
				log('    openttag', nodeObject.opentag[0]);
				nodeObject.opentag = nodeObject.opentag[0];
				html = html.substring(nodeObject.opentag.length, html.length);
				lastType = 'open';
			}
			
			if(tags.closed === 0){
				log('CLOSED TAG', html);
				nodeObject.closetag = endTagRegExp.exec(html);
				nodeObject.closetag = nodeObject.closetag[0];
				html = html.substring(nodeObject.closetag.length, html.length);
				lastType = 'close';
				log('    closetag', nodeObject.closetag);
				nodeObject = getParent();
				continue;
			}
			
			log('    -- cont html', html);
			tags = indexes();
			
			if(tags.open === 0){
				// next node
				log('        cont...');
				continue;
			}
			
			if(tags.end > 0){
				// inner text
				log('    tags.end');
				nodeObject.innerText = html.substring(0, tags.end);
				log('      text', nodeObject.innerText);
				html = html.replace(nodeObject.innerText, '');
				lastType = 'text';
			}else{
				log('    tags.end', tags.end);
			}
			
			tags = indexes();
			
			if(tags.end === 0){
				// starting with a closing tag
				if(lastType === 'close'){
					nodeObject = getParent();
				}
				nodeObject.closetag = endTagRegExp.exec(html);
				nodeObject.closetag = nodeObject.closetag[0];
				html = html.substring(nodeObject.closetag.length, html.length);
				lastType = 'close';
				log('    closetag', nodeObject.closetag);
				nodeObject = getParent();
			}
			
		
		}
		//log('\n\n\n TREE PARSED', nodes.length);
		//nodes.forEach(function(n){
		//	log(n);
		//});
		//log('\n\n\n');
		return nodes[0];
	};
	
});