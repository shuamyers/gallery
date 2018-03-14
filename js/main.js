console.log("Starting up");

var gProjs;

$(window).ready(initPage);
$(".submit-email").click(createEmailUrl);

function initPage() {
  gProjs = getProjs();
  renderProj(gProjs);
}

function renderProj(projs) {
  var strHtml = "";
  var strHtmlModal = "";
  projs.forEach(function(proj, idx) {
    strHtml +=
      '<div class="col-md-4 col-sm-6 portfolio-item"> \
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal' +
      (idx + 1) +
      '">\
    <div class="portfolio-hover">\
    <div class="portfolio-hover-content">\
    <i class="fa fa-plus fa-3x"></i>\
    </div>\
    </div>\
    <img class="img-fluid small-img" src="img/portfolio/' +
      (idx + 1) +
      '-thumbnail.jpg" alt="">\
    </a>\
    <div class="portfolio-caption">\
    <h4>' +
      proj.name +
      '</h4>\
    <p class="text-muted">' +
      proj.labels[0] +
      "</p>\
          </div>\
        </div>";

    var selecter = "#portfolioModal1 > .modal-body";

    renderModal(idx, proj);
  });

  $(".porj-container").html(strHtml);
}

function renderModal(idx, proj) {
  // console.log('count:', count++)
  console.count();
  console.log("idx:", idx);
  var strHtml = "";
  strHtml += `<div class="portfolio-modal modal fade" id="portfolioModal${idx +
    1}" tabindex="-1" role="dialog" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="close-modal" data-dismiss="modal">
           <div class="lr">
             <div class="rl"></div>
           </div>
         </div>
         <div class="container">
           <div class="row">
             <div class="col-lg-8 mx-auto">
               <div class="modal-body">
                 <!-- Project Details Go Here -->
                 <h2>${proj.name}</h2>
                 <p class="item-intro ">${proj.title}</p>
                 <img class="img-fluid big-img d-block mx-auto" src="img/portfolio/${idx + 1}-full.jpg" alt="">
                 <p> ${proj.desc} </p>
                 <a class="btn btn-primary go-to-proj" href="${proj.url}"> Go to Project</a>
                 <ul class="list-inline">
                   <li>Date:${proj.publishedAt}</li>
                   <li>Category:<span class="cateegory-bage"> </sapn></li>
                 </ul>
                 <button class="btn btn-primary" data-dismiss="modal" type="button">
                     <i class="fa fa-times"></i>
                     Close Project</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>`;

  
   var strHtmlSpans='';
   proj.labels.forEach(function(label){
     strHtmlSpans += '<span class="badge badge-cateegory"> '+label+' </span> ';
    })
    
    $('.cateegory-bage').html(strHtmlSpans);

  $(".modal-wrapper").append(strHtml);
}

function getProjs() {
  var proj1 = {
    id: "sokoban",
    name: "Sokoban",
    title: "Better push those boxes",
    desc: `Sokoban is a free version of classic computer puzzle game.
            Your goal is to push boxes to storage locations. 
            It is not always as easy as it looks like, 
            taking into account that you cannot pull boxes nor walk over them.
            You can push only one box at a time.`,
    url: "projs/sokoban/index.html",
    publishedAt: '10/03/2018',
    labels: ["Matrixes ", "keyboard events"]
  };
  var proj2 = {
    id: "touchNums",
    name: "Touch the numbers",
    title: "How fast can you touch all the nums",
    desc: `Touch the numbers from 1 to 25 as fast as you can,
        Touch the Numbers is a simple game for training your reflexes and peripheral vision.`,
    url: "projs/touch-nums/index.html",
    publishedAt: '10/03/2018',
    labels: ["Matrixes ", "onclick events"]
  };
  var proj3 = {
    id: "minesweeper",
    name: "Minesweeper",
    title: "Diffuse the mines",
    desc: "Play beginner, intermediate and expert games of Minesweeper",
    url: "projs/Minesweeper/index.html",
    publishedAt: '10/03/2018',
    labels: ["Matrixes ", "onclick events"]
  };
  var proj4 = {
    id: "inPicture",
    name: "In Picture",
    title: "What team has this logo",
    desc: "A logo quiz",
    url: "projs/in-picture/index.html",
    publishedAt: '10/03/2018',
    labels: ["animation"]
  };
  var proj5 = {
    id: "chess",
    name: "Chess",
    title: "what is your next move",
    desc: "classic Chess",
    url: "/projs/chess/chess.html",
    publishedAt: '10/03/2018',
    labels: ["Matrixes ", "keyboard events"]
  };
  var proj6 = {
    id: "bookShop",
    name: "Book Shop",
    title: "Book Shop",
    desc: "Book Shop",
    url: "/projs/chess/chess.html",
    publishedAt: '10/03/2018',
    labels: ["Matrixes ", "keyboard events"]
  };

  var projs = [];

  projs.push(proj1);
  projs.push(proj2);
  projs.push(proj3);
  projs.push(proj4);
  projs.push(proj5);

  return projs;
}

function createEmailUrl() {
  var userEmail = $("#InputEmail1").val();
  var subject = $("#inputSubject").val();
  var body = $("#Textarea1").val();

  window.location.href = `https://mail.google.com/mail/? view=cm&fs=1&to=${userEmail} &su=${subject}&body=${body}`;
}
