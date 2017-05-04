define('wuziqi',[],function(){
	return function(center){
		// 引入样式
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = 'css/wuziqi.css';
		document.body.append(css);
		// 自己创建画布
		var vas = document.createElement('canvas');
		vas.setAttribute('id','wuziqi');
		vas.setAttribute('width','450px');
		vas.setAttribute('height','450px');
		document.body.append(vas);
		// canvas 画布
		var chess = document.getElementById('wuziqi');
		var ctx = chess.getContext('2d');

		// 谁下子
		var flag = 1; 
		// 是否结束
		var over = false;

		/**
		 * AI
		 */ 
		 // 赢法数组
		 var win = [];
		 for(var i = 0;i < 15;i++ ){
		 	win[i] = [];
		 	for (var j = 0; j < 15;j++){
		 		win[i][j] = [];
		 	}
		 };

		 var count = 0;// 赢法种类
		 // 所有竖线
		 for (var i = 0; i<15; i++){
		 	for (var j = 0; j<11; j++){
		 		for (var k = 0; k<5; k++){
		 			win[i][j+k][count] = true;
		 		}
		 		count++;
		 	}
		 };

		 //所有横线
		 for (var i = 0; i<15; i++){
		 	for (var j = 0; j<11; j++){
		 		for (var k = 0; k<5; k++){
		 			win[j+k][i][count] = true;
		 		}
		 		count++;
		 	}
		 }

		 // 所有斜线\
		 for (var i = 0; i<11; i++){
		 	for (var j = 0; j<11; j++){
		 		for (var k = 0; k<5; k++){
		 			win[i+k][j+k][count] = true;
		 		}
		 		count++;
		 	}
		 };
		 // 所有反斜线/
		 for (var i = 0; i<11; i++){
		 	for (var j = 14; j>3; j--){
		 		for (var k = 0; k<5; k++){
		 			win[i+k][j-k][count] = true;
		 		}
		 		count++;
		 	}
		 };

		 // 赢法统计数组
		 var myWin = [];
		 var AIWin = [];
		 for(var i = 0;i<count;i++){
		 	myWin[i] = 0;
		 	AIWin[i] = 0;
		 };

		 // 电脑下棋
		 function AIturn(){
		 	var myScore = [];
		 	var AIScore = [];
		 	var max = 0;// 保存最高分数
		 	var u = 0,v = 0;
		 	// 初始化分数
		 	for(var i = 0;i<15;i++){
		 		myScore[i] = [];
		 		AIScore[i] = [];
		 		for(var j = 0;j<15;j++){
		 			myScore[i][j] = 0;
		 			AIScore[i][j] = 0;
		 		}
		 	};
		 	// 计算玩家和AI分数
		 	for(var i = 0;i<15;i++){
		 		for(var j = 0; j<15;j++){
		 			// 为空可以下子
		 			if(chessModel[i][j] == 0){
		 				// 优先级，先拦截玩家三颗，在下自己的三颗
		 				for(var k = 0; k < count ; k++){
		 					// 如果是一种赢法，则计算下子的赢面
		 					if(win[i][j][k]){
		 						// 计算玩家
		 						if(myWin[k] == 1){
		 							myScore[i][j] += 100;
		 						}else if(myWin[k] == 2){
		 							myScore[i][j] += 200;
		 						}else if(myWin[k] == 3){
		 							myScore[i][j] += 5000;
		 						}else if(myWin[k] == 4){
		 							myScore[i][j] += 20000;
		 						}
		 						// 计算自己
		 						if(AIWin[k] == 1){
		 							AIScore[i][j] += 50;
		 						}else if(AIWin[k] == 2){
		 							AIScore[i][j] += 150;
		 						}else if(AIWin[k] == 3){
		 							AIScore[i][j] += 200;
		 						}else if(AIWin[k] == 4){
		 							AIScore[i][j] += 30000;
		 						}
		 					}
		 				}
		 				if(myScore[i][j] > max){
		 					max = myScore[i][j];
		 					u = i;
		 					v = j;
		 				}else if(myScore[i][j] == max){
		 					if(AIScore[i][j] > AIScore[u][v]){
		 						u = i;
		 						v = j;
		 					}
		 				}
		 				if(AIScore[i][j] > max){
		 					max = AIScore[i][j];
		 					u = i;
		 					v = j;
		 				}else if(AIScore[i][j] == max){
		 					if(myScore[i][j] > myScore[u][v]){
		 						u = i;
		 						v = j;
		 					}
		 				}
		 			}
		 		}
		 	}
		 	oneStep(u,v,false);
		 	chessModel[u][v] = 1;
		 	for(var k = 0;k<count;k++){
				// 遍历所有赢法，落在相应位置则所有可能赢法myWin+1,到五胜出
				if(win[u][v][k]){
					AIWin[k]++;
					if(AIWin[k] == 5){
						alert('AI Win');
						over = true;
						newGame();
						center.style.display = 'block';
						vas.style.display = 'none';
					}
				}
			}
			if(!over){
				if(flag){flag = 0}else{flag = 1};
			}
		};

		/**
		 * model层
		 */
		 var chessModel = [];
		 // 清除所有数据
		 function newGame(){
		 	vas.style.display = 'block';
		 	for(var i = 0;i<15;i++){
		 		chessModel[i]=[];
		 		for(var j = 0;j<15;j++){
		 			chessModel[i][j]='';
		 		}
		 	}
		 	for(var i = 0;i < count;i++ ){
		 		myWin[i] = 0;
		 		AIWin[i] = 0;
		 	};
		 	ctx.clearRect(0,0,450,450);
		 	drawChessTable();
		 	over = false;
		 }




		 /**
		  * 视图层
		  */
		 // 背景logo

		// 画棋盘
		function drawChessTable(){
			ctx.strokeStyle = '#BFBFBF';
			ctx.beginPath();
			for(var i = 0; i < 15 ; i++){
				ctx.moveTo(15+(i*30),15);
				ctx.lineTo(15+(i*30),435);
				ctx.stroke();
				ctx.moveTo(15,15+(i*30));
				ctx.lineTo(435,15+(i*30));
				ctx.stroke();
			}
			ctx.closePath();
		};
		// 画旗子
		function refresh(){
			for (var i = 0;i<15;i++ ){
				for(var j =0;j<15;j++ ){
					if(chessModel[i][j] == 2){
						oneStep(i,j,true)
					}else if(chessModel[i][j] == 1){
						oneStep(i,j,false)
					}
				}
			}
		};
		function oneStep(i, j, me){
			ctx.beginPath();
			ctx.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);
			// 渐变色
			var gradient = ctx.createRadialGradient(15+i*30+2,15+j*30-2,13,   15+i*30+2,15+j*30-2,1);
			if(me){
				gradient.addColorStop(0,'#0A0A0A');
				gradient.addColorStop(1,'#636766');
			}else{
				gradient.addColorStop(0,'#D1D1D1');
				gradient.addColorStop(1,'#F9F9F9');
			}
			ctx.fillStyle = gradient;
			ctx.closePath();
			ctx.fill();
		};

		(function(){
			newGame();
			drawChessTable();
				// 获取下子的位置
				chess.onclick = function(e){
					var x = e.offsetX;
					var y = e.offsetY;
					// i横轴，j纵轴
					var i = Math.floor(x/30);
					var j = Math.floor(y/30);
					if(!chessModel[i][j]){
						chessModel[i][j] = flag + 1;
						refresh();
						// 判断胜负
						for(var k = 0;k<count;k++){
							// 遍历所有赢法，落在相应位置则所有可能赢法myWin+1,到五胜出
							if(win[i][j][k]){
								myWin[k]++;
								if(myWin[k] == 5){
									alert('you Win');
									over = true;
									newGame();
									center.style.display = 'block';
									vas.style.display = 'none';
									return;
								}
							}
						}
						if(!over){
							if(flag){flag = 0}else{flag = 1};
							AIturn();
						}
					};
				};
			})();
		}
	});