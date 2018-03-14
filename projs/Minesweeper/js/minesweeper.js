'use strict';
console.log('Minesweeper');


var gBoard;
var gNums;
var gInterval

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gState;

initGame()

function initGame() {
    var elBoomNum = document.querySelector('.num-boom');
    elBoomNum.innerText = '💣: ' + gLevel.MINES;
    gNums = getNmus();
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);
    resetGame()
    gState.isGameOn = true;
}

function resetGame() {
    gState = {
        isGameOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    var elWin = document.querySelector('.win');
    elWin.classList.add('hide');
    var elGameOver = document.querySelector('.game-over');
    elGameOver.classList.add('hide');
    clearInterval(gInterval);
    var elTime = document.querySelector('.timer');
    elTime.innerText = '⏲️:' + gState.secsPassed;

}

function buildBoard(level) {
    var board = [];
    var boardSize = level.SIZE;

    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            var cell = {
                isMine: isMine(),
                isFlage: false,
                mineNegCount: 0,
                isHidden: true,
                isChecked: false
            }
            board[i][j] = cell;
        }
    }
    setMinesNegsCount(board);
    console.log(board);
    return board
}

function getNmus() {
    var CellsCount = gLevel.SIZE * gLevel.SIZE;
    var nums = [];
    for (var i = 0; i < CellsCount; i++) {
        if (i < gLevel.MINES) nums[i] = i + 1;
        else nums[i] = 0;
    }
    shuffle(nums);
    return nums;
}

function drowNum(nums) {
    return nums.pop();
}

function isMine() {
    var isMine = false;
    var mineCount = gLevel.MINES;
    var num = drowNum(gNums);
    if (num !== 0) {
        isMine = true;
        mineCount--;
    }
    return isMine;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            if (cell.isMine) updateNegs(board, i, j);
        }
    }
}

function updateNegs(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // If middle cell or out of mat - continue;
            if ((i === rowIdx && j === colIdx) ||
                (j < 0 || j >= board[i].length)) continue;

            board[i][j].mineNegCount++;
        }
    }
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = row[j];
            var cellContent = '';
            var className = 'cell ';
            className += (gBoard[i][j].isHidden) ? 'hidden ' : '';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this,' + i + ',' + j + ')"' +
                ' oncontextmenu="rightClicked(this,' + i + ',' + j + ')" ' +
                'class="' + className + '">' + cellContent +
                '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}


function Beginner() {
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    initGame()
}
function Medium() {
    gLevel.SIZE = 6;
    gLevel.MINES = 5;
    initGame()
}

function Expert() {
    gLevel.SIZE = 7;
    gLevel.MINES = 4;
    initGame()
}

function checkGameOver() {

    if (!gState.isGameOn) {
        clearInterval(gInterval);
        var elGameOver = document.querySelector('.game-over');
        elGameOver.classList.remove('hide')
    }

    var numCount = gLevel.SIZE * gLevel.SIZE;
    if (gState.shownCount + gState.markedCount === numCount && 
        gLevel.MINES === gState.markedCount) {
        var elWin = document.querySelector('.win');
        elWin.classList.remove('hide')
        gState.isGameOn = false;
        clearInterval(gInterval);
    }

}
function timer() {
    gState.secsPassed++;
    var time = document.querySelector('.timer');
    time.innerText = '⏲️: ' + gState.secsPassed;
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (elCell.innerText === '🚩') return
    if (!cell.isHidden) return
    if (gState.shownCount === 0) {
        gInterval = setInterval(timer, 1000);
    }
    showContent(elCell, gBoard, i, j);
    if (cell.isMine) mineHit(elCell, i, j);
    else if (cell.mineNegCount === 0) expandShown(elCell, gBoard, i, j);
}

function showContent(elCell, board, i, j) {
    var cell = board[i][j];
    if (cell.isMine) elCell.innerText = '💥';
    else if (cell.mineNegCount !== 0) elCell.innerText = cell.mineNegCount;
    cell.isHidden = false;
    elCell.classList.remove('hidden');
    gState.shownCount++;
}

function mineHit(elCell, board, i, j) {
    var elCells = document.querySelectorAll('.hidden');
    gState.isGameOn = false;
    checkGameOver()
    for (var i = 0; i < elCells.length; i++) {
        elCells[i].classList.remove('hidden');
        var coords = getCellCoord(elCells[i].id);
        gBoard[coords.i][coords.j].isHidden = false;
        showContent(elCells[i], gBoard, coords.i, coords.j);
    }
}

function expandShown(elCell, board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // If middle cell or out of mat - continue;
            if ((i === rowIdx && j === colIdx) ||
                (j < 0 || j >= board[i].length)) continue;
            var cell = board[i][j];
            if (!cell.isHidden) continue;
            cell.isHidden = false;
            var newSelector = getSelector(i, j)
            var elNewCell = document.querySelector(newSelector);
            showContent(elNewCell, board, i, j);
            checkGameOver();
            if (!cell.isChecked && cell.mineNegCount === 0) expandShown(elNewCell, board, i, j);
        }
    }
}

function rightClicked(elCell, i, j) {
    if (!gBoard[i][j].isHidden) return;
    var elFlagedNum = document.querySelector('.flaged-num');
    if (elCell.innerText === '🚩') {
        elCell.innerText = '';
        gState.markedCount--;
        elFlagedNum.innerText = '🚩 : ' + gState.markedCount;
        return
    }
    elCell.innerText = '🚩';
    gState.markedCount++;
    elFlagedNum.innerText = '🚩 : ' + gState.markedCount;
    checkGameOver();
}

document.oncontextmenu = document.body.oncontextmenu = function () {
    return false
}


