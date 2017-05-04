require.config({
	baseUrl:'./js',
});
require(['jingziqi','wuziqi','button'],function(jing, wu, button){
	var ctrl = document.getElementById('center');
	var b1 = new button({
		icon:'img/mission.png',
		buttonName:'jing',
		title:'井字棋',
		parent:ctrl
	});
	var b2 = new button({
		icon:'img/play.png',
		buttonName:'wu',
		title:'五字棋',
		parent:ctrl
	});

	// 点击跳转
	ctrl.onclick = function(event){
		var jingE = document.getElementById('jingziqi') || '';
		var wuE = document.getElementById('wuziqi')  || '';
		var select = event.target.dataset.game;
		switch(select){
			case 'wu':
			ctrl.style.display = 'none';
			if(wuE){
				wuE.style.display = 'block'
			}else{
				wu(ctrl);
			};
			break;
			case 'jing':
			if(jingE){
				console.log('run');jingE.style.display = 'block'
			}else{
				jing(ctrl);
			};
			ctrl.style.display = 'none';
			break;
			default:break;
		}
	};


	var single = function(){
		var a = 1;
		return function(){
			console.log(a++);
		}
	}
	var c = single();
	c();
	c();
	var b = single();
	b();
});