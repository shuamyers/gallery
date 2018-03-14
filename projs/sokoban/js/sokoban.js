'use strict';

var gBoard;
var gGamerPos = null;
var gMoveCount = 0;
var gDests = [];
var gIsGameOver = false;
var gBonus = [];
var gBonusInterval = null;
var gRemoveBonusInterval = null;


initGame()

function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
   gBonusInterval= setInterval(showBonus,20000);

}

function resetGame() {
    gGamerPos = null;
    gMoveCount = 0;
    gDests = [];
    gIsGameOver = false;
    var elWin = document.querySelector('.win');
    elWin.classList.add('hide');
    var elScore = document.querySelector('.score');
    elScore.innerText = 'Score : 100';
    var elStepCount = document.querySelector('.step-count');
    elStepCount.innerText = 'Steps : ' + gMoveCount;
    initGame()

}

function buildBoard() {
    var board = [
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'f', 'f', 'f', 'f', 'f', 'x'],
        ['x', 'f D', 'f P', 'f', 'f', 'f', 'f', 'f', 'x'],
        ['x', 'x', 'x', 'f', 'f B', 'f D', 'f', 'f', 'x'],
        ['x', 'f D', 'x', 'f', 'f B', 'f', 'f', 'f', 'x'],
        ['x', 'f', 'f', 'f', 'f D', 'f', 'f', 'f', 'x'],
        ['x', 'f B', 'f', 'f B', 'f B', 'f B', 'f D', 'f', 'x'],
        ['x', 'f', 'f', 'f', 'f D', 'f', 'f', 'f', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
    ];
    board = convertBoard(board)
    return board
}

function convertBoard(board) {
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        newBoard[i] = []
        for (var j = 0; j < board.length; j++) {
            var oldCell = board[i][j];
            var newCell = {
                isFloolr: (oldCell === 'f' || oldCell === 'f D' || oldCell === 'f B' || oldCell === 'f P') ? true : false,
                isBox: (oldCell === 'f B') ? true : false,
                isDest: (oldCell === 'f D') ? true : false,
                isPlayer: (oldCell === 'f P') ? true : false,
                isWall: (oldCell === 'x') ? true : false,
                isNull: (oldCell === '') ? null : false,
                bonus: null

            }
            newBoard[i][j] = newCell
            if (newBoard[i][j].isPlayer) gGamerPos = { i: i, j: j };
            if (newBoard[i][j].isDest) gDests.push({ i: i, j: j });
            if (newBoard[i][j].isFloolr) gBonus.push({ i: i, j: j })
        }
    }
    return newBoard
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = row[j];
            var cellContent = getContent(cell);
            var className = getClassName(cell);
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this,' + i + ',' + j + ')"' +
                'class="' + className + '">' + cellContent +
                '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}

function getContent(cell) {
    var cellContent;
    if (cell.isPlayer) cellContent = '🕺';
    else if (cell.isBox) cellContent = '🏾';
    else if (cell.bonus) cellContent = cell.bonus;
    else if (cell.isDest) cellContent = '🎯';
    else cellContent = '';
    return cellContent
}

function getClassName(cell) {
    var className = 'cell ';
    if (cell.isFloolr) className += 'floolr ';
    if (cell.isWall) className += 'wall ';
    if (cell.isWall) className += 'box ';
    if (cell.isPlayer) className += ' player';
    return className
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isWall || gBoard[i][j].isNull === null || gIsGameOver) return
    var cell = gBoard[i][j];
    checkPlayerNextToCell(elCell, i, j)

}

function checkPlayerNextToCell(elCell, i, j) {
    if (gBoard[i + 1][j] === gBoard[gGamerPos.i][gGamerPos.j]) movePieceUp(elCell, i, j);
    else if (gBoard[i - 1][j] === gBoard[gGamerPos.i][gGamerPos.j]) movePieceDown(elCell, i, j);
    else if (gBoard[i][j - 1] === gBoard[gGamerPos.i][gGamerPos.j]) movePieceRight(elCell, i, j);
    else if (gBoard[i][j + 1] === gBoard[gGamerPos.i][gGamerPos.j]) movePieceLeft(elCell, i, j);
}

function movePieceDown(elCell, i, j) {
    if (gBoard[i][j].isBox && gBoard[i + 1][j].isWall ||
        gBoard[i][j].isBox && gBoard[i + 1][j].isBox) return
        debugger;
    var move = { i: 1, j: 0 }
    movePiece(elCell, i, j, move)
}
function movePieceUp(elCell, i, j) {
    if (gBoard[i][j].isBox && gBoard[i - 1][j].isWall ||
        gBoard[i][j].isBox && gBoard[i - 1][j].isBox) return
        debugger;
    var move = { i: (-1), j: 0 }
    movePiece(elCell, i, j, move)
}
function movePieceLeft(elCell, i, j) {
    if (gBoard[i][j].isBox && gBoard[i][j - 1].isWall ||
        gBoard[i][j].isBox && gBoard[i][j - 1].isBox) return
    var move = { i: 0, j: -1 }
    movePiece(elCell, i, j, move)
}
function movePieceRight(elCell, i, j) {
    if (gBoard[i][j].isBox && gBoard[i][j + 1].isWall ||
        gBoard[i][j].isBox && gBoard[i][j + 1].isBox) return
    var move = { i: 0, j: 1 }
    movePiece(elCell, i, j, move)
}

function movePiece(elClicedCell, i, j, move) {
    var playerSelector = getSelector(gGamerPos.i, gGamerPos.j);
    var elFromCell = document.querySelector(playerSelector);

    // Update the Model 
    if (gBoard[i][j].isBox) {
        var newBoxSelector = getSelector(i + move.i, j + move.j);
        var elNewBoxCell = document.querySelector(newBoxSelector);
        gBoard[i][j].isBox = false;
        gBoard[i + move.i][j + move.j].isBox = true;
        // Update the DOM
        elNewBoxCell.innerText = getContent(gBoard[i + move.i][j + move.j]);
        elClicedCell.innerText = getContent(gBoard[i][j]);
    }
    gBoard[i][j].isPlayer = true;
    gBoard[gGamerPos.i][gGamerPos.j].isPlayer = false;
    removeBonus(elClicedCell,gBoard[i][j])
    // Update the DOM
    elClicedCell.innerText = getContent(gBoard[i][j]);
    elFromCell.innerText = getContent(gBoard[gGamerPos.i][gGamerPos.j]);
    gGamerPos.i = i;
    gGamerPos.j = j;
    gMoveCount++;

    // Update the DOM
    var elScore = document.querySelector('.score');
    elScore.innerText = 'Score : ' + (100 - gMoveCount);
    var elStepCount = document.querySelector('.step-count');
    elStepCount.innerText = 'Steps : ' + gMoveCount;
    checkGameOver()
}

function checkGameOver() {
    gIsGameOver = false;
    var counter = 0;
    for (var i = 0; i < gDests.length; i++) {
        var rowIdx = gDests[i].i;
        var colIdx = gDests[i].j;
        if (gBoard[rowIdx][colIdx].isBox && gBoard[rowIdx][colIdx].isDest) counter++;
    }
    if (counter === gDests.length) {
        gIsGameOver = true;
        var elWin = document.querySelector('.win');
        elWin.classList.remove('hide');
        clearInterval(gBonusInterval);

    }
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        if (gBoard[gGamerPos.i - 1][gGamerPos.j].isWall) return
        var elToSelector = getSelector(gGamerPos.i - 1, gGamerPos.j);
        var elCellTo = document.querySelector(elToSelector)
        movePieceUp(elCellTo, gGamerPos.i - 1, gGamerPos.j);
    }
    else if (e.keyCode == '40') {
        // down arrow
        if (gBoard[gGamerPos.i + 1][gGamerPos.j].isWall) return
        var elToSelector = getSelector(gGamerPos.i + 1, gGamerPos.j);
        var elCellTo = document.querySelector(elToSelector)
        movePieceDown(elCellTo, gGamerPos.i + 1, gGamerPos.j);
    }
    else if (e.keyCode == '37') {
        if (gBoard[gGamerPos.i][gGamerPos.j - 1].isWall) return
        var elToSelector = getSelector(gGamerPos.i, gGamerPos.j - 1)
        var elCellTo = document.querySelector(elToSelector)
        movePieceLeft(elCellTo, gGamerPos.i, gGamerPos.j - 1);
    }
    else if (e.keyCode == '39') {
        // right arrow
        if (gBoard[gGamerPos.i][gGamerPos.j + 1].isWall) return
        var elToSelector = getSelector(gGamerPos.i, gGamerPos.j + 1)
        var elCellTo = document.querySelector(elToSelector)
        movePieceRight(elCellTo, gGamerPos.i, gGamerPos.j + 1);
    }
}

function showBonus() {
    var bonusIcons = ['⏲️','M','💛'];
    var randIcons =  getRandomInt(0, bonusIcons.length);
    var rand = getRandomInt(0, gBonus.length);
    var coord = gBonus[rand];
    var cell = gBoard[coord.i][coord.j];
    if (cell.isBox || cell.isPlayer) showBonus();
    cell.bonus = bonusIcons[randIcons];
    var Selector = getSelector(coord.i, coord.j);
    var elCell = document.querySelector(Selector);
    elCell.innerText = getContent(cell)
    var removeBonusInterval = setInterval(removeBonus,10000,elCell,cell);   
}

function removeBonus(elCell, cell) {
    cell.bonus = null;
    elCell.innerText = getContent(cell)
    clearInterval(gRemoveBonusInterval);
}
