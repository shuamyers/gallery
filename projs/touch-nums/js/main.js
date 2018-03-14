'use strict';

var numsCount = 16;
var rowSize = 4;

var gPerv = 0;
var gGameIntervalId;
var gTime = 0;
var gNums = initGame();



renderNums(gNums)


function initGame() {
    var nums = createNums();
    return shuffle(nums);
}

function resetGame() {
    clearInterval(gGameIntervalId);
    gTime=0;
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = '<h2>Time: ' + gTime + '</h2> ';
    gNums = initGame();
    renderNums(gNums)
    var elCarrNum = document.querySelector('.carr-num');
    elCarrNum.innerHTML = '<h2>Next Num = ' + 1 + '</h2>';

}
function levalEsayClicked() {
    numsCount = 16;
    rowSize = 4;
    resetGame()
}
function levalMideamClicked() {
    clearInterval(gGameIntervalId);
    gTime=0;
    numsCount = 25;
    rowSize = 5;
    gNums = initGame();
    renderNums(gNums)
}
function levalHardClicked() {
    clearInterval(gGameIntervalId);
    gTime=0;
    numsCount = 36;
    rowSize = 6;
    gNums = initGame();
    renderNums(gNums)
    }


function createNums() {
    var nums = [];
    for (var i = 1; i <= numsCount; i++) {
        nums.push(i);
    }
    return nums
}

function shuffle(items) {
    var j, tempItem, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tempItem = items[i];
        items[i] = items[j];
        items[j] = tempItem;
    }
    return items;
};

function gameTime(elTimer) {
    gTime++;
    elTimer.innerHTML = '<h2>Time: ' + gTime + '</h2> ';
}


function renderNums(nums) {
    var elBorad = document.querySelector('.tbl-nums');
    var strHtml = '';

    for (var i = 0; i < rowSize; i++) {
        strHtml += '<tr calss="row">';
        for (let j = 0; j < rowSize; j++) {
            var val = gNums.pop();
            strHtml += '<td class="num" onclick="numClicked(this,' + val + ',)">' + val + '</td>';
        }
        strHtml += '</tr>';
    }
    elBorad.innerHTML = strHtml;
}

function numClicked(elNums, val) {
    var elCarrNum = document.querySelector('.carr-num');
    

    if (val === (gPerv + 1)) {
        elNums.classList.add('selected');
        gPerv = val;

        if (numsCount === val) {
            clearInterval(gGameIntervalId);
            alert('you win!!!')
        }
    }

    if (gPerv < numsCount) {
        elCarrNum.innerHTML = '<h2>Next Num = ' + (gPerv + 1) + '</h2>';
    }

    if (val === 1) {
        var elTimer = document.querySelector('.timer');
        gGameIntervalId = setInterval(function () {
            gameTime(elTimer)
        }, 1000);
    }
}
