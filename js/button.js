define('button',function(){
 	return function(data){
 		let{buttonName, title, icon, parent} = data;
 		this.button = document.createElement('div');
 		this.button.className = `ghost-button ${buttonName}`;
 		// 图标
 		this.icon = document.createElement('span');
 		this.icon.className = `icon ${buttonName}`;
 		this.icon.style.background = `url(${icon}) center no-repeat`;
 		this.icon.style.backgroundSize = 'cover';
 		this.icon.setAttribute('data-game',buttonName);
 		this.button.append(this.icon);

 		// 超链接
 		this.href = document.createElement('a');
 		this.href.className = 'button';
 		this.href.setAttribute('data-game',buttonName);
 		this.button.append(this.href);

 		// 线条
 		let lineArr = ['top','right','bottom','left'];
 		for(let i = 0; i < lineArr.length; i++){
 			let line = document.createElement('span');
 			line.className = `line line-${lineArr[i]}`;
 			this.href.append(line);
 		}
 		// 标题
 		this.title = document.createTextNode(title);
 		this.href.append(this.title);
 		parent.append(this.button);
 	}
});