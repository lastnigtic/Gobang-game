define('jingziqi',function(){
	return function(center){
		// 引入样式
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = 'css/jingziqi.css';
		document.body.append(css);
		// 创建页面
		var container = document.createElement('div');
		container.className = 'container';
		container.id = 'jingziqi';
		for(var i = 0;i<3;i++){
			for(var j = 0;j<3;j++){
				var cell = document.createElement('a');
				cell.href = 'javascript:;';
				cell.id = `cell-${i}${j}`;
				cell.className = 'cell';
				container.append(cell);
			}
		};
		document.body.append(container);


		const X = 'X';
		const O = 'O';
		var model = [];
		var cell = [];
		var flag = 0;
		var over = false;
		var newGame = function(){
			model[i] = [];
			for(var i=0;i<3;i++){
				for (var j = 0;j<3;j++){
					model[i][j] = 0;				}
				};
				flag = 0;
				over = false;
			// 初始化输赢
			for(var i = 0;i<count;i++){
				myWin[i] = 0;
				AIWin[i] = 0;
			};
			reflesh();
		};
		function reflesh(){
			for(var x = 0; x < 3 ; x++){
				for(var y = 0; y < 3; y++){
					if(model[x][y] === 1){
						cell[x][y].text = X;
					}else if(model[x][y] === 2){
						cell[x][y].text = O;
					}else{
						cell[x][y].text = ' ';
					}
				}
			}
		};
		var wins = [];
		var count = 0;
		var myWin = [];
		var AIWin = [];
		 // 遍历出所有赢的组合
		 for(var i = 0;i<3;i++){
		 	wins[i] = [];
		 	for(var j = 0; j < 3; j++){
		 		wins[i][j] = [];
		 	}
		 };
		// 竖轴
		for(var i = 0; i < 3; i++){
			for(var j = 0;j < 3 ; j++){
				wins[i][j][count] = true;
			}
			count++;
		};
		// 检查横轴
		for(var i = 0; i < 3; i++){
			for(var j = 0;j < 3 ; j++){
				wins[j][i][count] = true;
			}
			count++;
		};
		// 检查对角线
		for(var i = 0;i<3;i++){
			var j = i;
			wins[i][j][count] = true;
		};
		count++;
		// 反斜线
		for(var i =2;i>=0;i--){
			wins[2-i][i][count] = true;
		};
		count++;
		function AIturn(){
			var myScore = [],
			AIScore = [];
			for(var i = 0;i<3;i++){
				myScore[i] = [];
				AIScore[i] = [];
				for(var j = 0 ;j < 3; j++){
					myScore[i][j] = 0;
					AIScore[i][j] = 0;
				}
			};
			var max = 0;
			var u=0,v=0;
			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 3; j++){
					if(!model[i][j]){
						// 下在各个点的分数
						for (var k = 0;k<count;k++){
							if(wins[i][j][k]){
								if(myWin[k] == 1){
									myScore[i][j] += 200;
								}else if(myWin[k] == 2){
									myScore[i][j] += 500;
								};
								if(AIWin[k] == 1){
									AIScore[i][j] += 10;
								}else if(AIWin[k] == 2){
									AIScore[i][j] += 500;
								}
							};
							if(myScore[i][j] > max){
								max = myScore[i][j];
								u = i;
								v = j;
							}else if(myScore[i][j] == max){
								if(myScore[i][j] < AIScore[i][j]){
									u = i;
									v = j;
								}
							};
							if(AIScore[i][j] > max){
								max = AIScore[i][j];
								u = i;
								v = j;
							}else if(AIScore[i][j] == max){
								if(AIScore[u][v] < myScore[i][j]){
									u = i;
									v = j;
								}
							}
						}
					}
				}
			};
			model[u][v] = 2;
			reflesh();
			if(flag == 1){
				flag = 0;
				for(var k = 0;k<count;k++){
					if(wins[u][v][k]){
						AIWin[k]++;
						if(AIWin[k]==3){
							alert('AI WIN');
							over = true;
							newGame();
							center.style.display = 'block';
							container.style.display = 'none';
						}
					}
				}
			};
			if(!let()){
				alert('平局');
				newGame();
				center.style.display = 'block';
				container.style.display = 'none';
			}
		}
		// 检查平局
		function let (){
			for (var i = 0;i<3;i++){
				for(var j = 0;j<3;j++){
					if(!model[i][j]){
						return true;
					}
				}
			}
			return false;
		};
		(function(){
			var i,j;
			for(i=0;i<3;i++){
				model[i] = [];
				cell[i] = [];
			}
			for(i=0;i<3;i++){
				for(j=0;j<3;j++){
					cell[i][j] = document.getElementById(`cell-${i}${j}`);
				}
			}
			newGame();
			var s = document.getElementsByClassName('container')[0];
			s.onclick=function(event){
				var xy = event.target.id.match(/[0-9]/g);
				var x = xy[0];
				var y = xy[1];
				if(!model[x][y]){
					model[x][y] = flag + 1;
					reflesh();
					if(flag == 0){
						flag = 1;
						for(var k = 0;k<count;k++){
							if(wins[x][y][k]){
								myWin[k]++;
								if(myWin[k]==3){
									alert('you WIN');
									over = true;
									newGame();
									center.style.display = 'block';
									container.style.display = 'none';
								}
							}
						}
					};
					if(!let()){
						alert('平局');
						newGame();
						center.style.display = 'block';
						container.style.display = 'none';
					}
					if(!over && flag == 1){
						AIturn();
					}
				};
			}
		})();
	}
});