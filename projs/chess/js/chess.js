
var gBoard = createChessBoard();
var gSelectedCell = null;

console.table(gBoard);
renderBoard(gBoard);


function createChessBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            board[i][j] = ''
        }
    }
    board[6][4] = '♟';
    board[3][2] = '♙';
    board[7][7] = '♜';
    board[1][3] = '♙';
    board[5][5] = '♜';
    board[7][3] = '♙';
    board[5][6] = '♞';
    board[3][4] = '♞';
    return board;
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    var isLight = true;

    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {

            var cellClass = (isLight) ? 'light' : 'dark'
            cellClass += ' cell-' + i + '-' + j;
            isLight = !isLight;

            strHtml += '<td onclick="cellClicked(this, ' + i + ',' + j + ')" class="' + cellClass + '">'
            strHtml += board[i][j];
            strHtml += '</td>'
        }
        isLight = !isLight;
        strHtml += '</tr>\n';
    }

    // console.log(strHtml);
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, cellI, cellJ) {
    if (gSelectedCell) {
        unmarkCells()
        gSelectedCell.classList.remove('selected');
        gSelectedCell = null;
    }
    elCell.classList.add('selected');
    gSelectedCell = elCell;
    var piece = elCell.innerHTML;
    switch (piece) {
        case '♟':
            markCellsForPawn(cellI, cellJ);
            break;
        case '♙':
            markCellsForPawn(cellI, cellJ);
            break;
        case '♜':
            markCellsForRook(cellI, cellJ);
            break;
        case '♞':
            markCellsForKnight(cellI, cellJ);
            break;

    }
}

function markCellsForPawn(cellI, cellJ) {
    var markedCellIdx = (gBoard[cellI][cellJ] === '♟') ? cellI - 1 : cellI + 1
    console.log('Pawn In:', cellI, cellJ);
    var selector = '.cell-' + (markedCellIdx) + '-' + cellJ
    var elCell = document.querySelector(selector);
    elCell.classList.add('mark');
    if (cellI === 6 && gBoard[cellI][cellJ] === '♟') {
        selector = '.cell-' + (cellI - 2) + '-' + cellJ
        elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    } else if (cellI === 1 && gBoard[cellI][cellJ] !== '♟') {
        selector = '.cell-' + (cellI + 2) + '-' + cellJ
        elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }
    console.log(elCell);
}
function markCellsForRook(cellI, cellJ) {
    console.log('Rook In:', cellI, cellJ);
    //up
    for (var i = cellJ - 1; i >= 0; i--) {
        if (gBoard[i][cellJ] !== '') break;
        markCell(i, cellJ);
    }
    //down
    for (var i = cellI + 1; i < gBoard.length; i++) {
        if (gBoard[i][cellJ] !== '') break;
        markCell(i, cellJ);
    }
    //right
    for (var j = cellJ + 1; j < gBoard.length; j++) {
        if (gBoard[cellI][j] !== '') break;
        markCell(cellI, j);
    }
    //left
    for (var j = cellJ - 1; j >= 0; j--) {
        if (gBoard[cellI][j] !== '') break;
        markCell(cellI, j);
    }
}

function markCell(i, j) {
    selector = '.cell-' + i + '-' + j;
    var elCell = document.querySelector(selector);
    elCell.classList.add('mark');
    return elCell;
}

function markCellsForKnight(cellI, cellJ) {
       for (var i = -2; i <= 2; i++) {
        if (i === 0 || !gBoard[cellI + i]) continue;
        for (var j = -2; j <= 2; j++) {
            if (j === 0 || !gBoard[cellJ + j] || Math.abs(i) === Math.abs(j)) {
                continue;
            }else if (gBoard[cellI + i][cellJ + j] === ''  ){
                markCell(cellI + i, cellJ + j);
            }
        }
    }
}

function unmarkCells() {
    var elMarkeds = document.querySelectorAll('.mark');
    for (var i = 0; i < elMarkeds.length; i++) {
        elMarkeds[i].classList.remove('mark');
    }
}
