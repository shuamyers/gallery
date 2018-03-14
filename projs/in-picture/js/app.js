'use stric';

console.log('In pic');

var QUEST_COUNT = 3;

var gQuestions = createQuests();
var gCurrQuest;
var gScore = 100;


function gameInit(){ 
    console.log(gQuestions);
    renderQuest(gQuestions[0]);
    gCurrQuest = gQuestions[0];
}

function createQuests() {
    var quest = 'What team has this logo?';
    var imgUrl = ['images/man-u.png', 'images/arsenal-fc.png', 'images/chelsea-fc.png'];
    var opts = ['Mancester United', 'Arsenal FC', 'Chelsea FC'];

    var Quests = [];
    for (var i = 0; i < QUEST_COUNT; i++) {
        var node = {
            id: i,
            imgUrl: imgUrl[i],
            quest: quest,
            opts: opts,
            ansIdx: i
        }
        Quests[i] = node;
    }
    return Quests
}

function renderQuest(quest) {
    var elQuestNum = document.querySelector('.quest-num');
    elQuestNum.innerText = quest.id + 1;

    var elImg = document.querySelector('.pic-box');
    console.log(quest.imgUrl)
    elImg.innerHTML = '<img class="img-qest" src="' + quest.imgUrl + '" alt="">' + ' <h3>'+quest.quest+'?</h3>';

    var strHtml = '';

    for (var i = 0; i < 3; i++) {
        strHtml += '<h3 class="answer ' + i + '" onclick="checkAnswer(' + i + ',this)" >' + quest.opts[i] + '</h3>'
    }

    var elAnswerBox = document.querySelector('.answer-box');
    elAnswerBox.innerHTML = strHtml;
}

function checkAnswer(optIdx, elAns) {
    if (optIdx === gCurrQuest.ansIdx) {
        elAns.classList.add('sucsses');
        if (gQuestions[gCurrQuest.id + 1]) {
            setTimeout(function () {
                renderQuest(gQuestions[gCurrQuest.id + 1]);
                gCurrQuest = gQuestions[gCurrQuest.id + 1];
                elAns.classList.remove('sucsses');
            }, 1000)
        }
        else {
            setTimeout(function () {
                // renderSum();
                elAns.classList.remove('sucsses');
            }, 1000)
        }
    } else {
        elAns.classList.add('worng');
        gScore += - 10;
        setTimeout(function name(params) {
            elAns.classList.remove('worng');
        }, 1000)
        console.log(gScore)
    }
} 
// function renderSum(){

// }