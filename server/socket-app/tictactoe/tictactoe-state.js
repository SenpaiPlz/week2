const _ = require('lodash');

module.exports = function (injected) {
    var gameState = undefined;

    return function (history) {
        function processEvent(event) {
            switch(event.type){
                case "GameCreated":
                    gameState = {   full: false,
                                    nextPlayIsX:  true,
                                    board: [['','',''],['','',''],['','','']],
                                    victory: false,
                                    draw: false,
                                    moveCount: 0
                                };

                case "GameJoined":
                    gameState.full = true;
                    break;
                case "MovePlaced":
                    gameState.board[event.x][event.y] = event.side;
                    gameState.nextPlayIsX = !gameState.nextPlayIsX;
                    gameState.moveCount++;
                    check_victory();
                    check_draw();
                    break;
                default: break
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull(){
            return gameState.full;
        }

        function nextSide(){
                return gameState.nextPlayIsX === true ? 'X' : 'O';
        }

        function sqrIsEmpty(x,y){
            return gameState.board[x][y] === '';
        }
        
        function check_victory(){
            for(let i = 0; i < 3; i++)
            {

                if(gameState.board[0][i] === gameState.board[1][i] && gameState.board[1][i] === gameState.board[2][i]) 
                {
                    if(gameState.board[0][i] !== '')
                    {
                        gameState.victory = true;
                        return;
                    }
                }
                if(gameState.board[i][0] === gameState.board[i][1] && gameState.board[i][1] === gameState.board[i][2]) 
                {
                     if(gameState.board[i][0] !== '')
                    {
                        gameState.victory = true;
                        return;
                    }
                }
            }

            if(gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0]) {
                if(gameState.board[0][2] !== '')
                {
                    gameState.victory = true;
                    return;
                }
            }
            if(gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2]) {
                if(gameState.board[0][0] !== '')
                {
                    gameState.victory = true;
                    return
                }
            }
        }

        function check_draw(){
            gameState.draw = (gameState.moveCount === 9) && !gameState.victory
        }

        function isVictory(){
            return gameState.victory;       
        }

        function isDraw(){
            return gameState.draw
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull,
            nextSide: nextSide,
            sqrIsEmpty: sqrIsEmpty,
            isVictory: isVictory,
            isDraw: isDraw,
        }
    };
};
