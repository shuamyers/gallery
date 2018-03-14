'use strict';

console.log('hi')


var gBooks;
var gNextId = 1;


function initBookShop(){
    gBooks=createBooks();
    renderBooks(gBooks);
    
}

function createBooks(){
    var books=[];

    var book1 = createBook('Lord of the rings','90');
    var book2 = createBook('Treasure Island','50');
    var book3 = createBook('Count of monte cristo','75');

    books.push(book1);
    books.push(book2);
    books.push(book3);

    return books
}

function renderBooks(books){
    var strHtmls = books.map(function(book,id){
        return `
        <tr>
            <th scope="row">${book.id}</th>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
            <button type="button" class="btn btn-outline-success" data-toggle="modal" 
                data-target="#modall" onclick="renderReadModal(${book.id})">
                Read
            <i class="fa fa-book"></i>
        </button>
              <button type="button"  onclick="renderUpdateAndAddModal(true,${book.id})"
                 class="btn btn-outline-primary" data-toggle="modal" data-target="#modall">
                    Update <i class="fa fa-edit"></i>
                </button>
              <button onclick="deleteBook(this,${book.id})" class="btn btn-outline-danger">Delete <i class="fa fa-times"></i></button>
            </td>
        </tr>
        `
    }) 
    $('.tbooks').html(strHtmls.join(''));
}

function saveBook(){
    // ev.preventDefault();
     var bookId = $('#bookId').val();
     var bookName = $('#bookName').val();
     var bookPrice =$('#bookPrice').val();

    if(bookId !== 'undefined'){
        console.log('hey its me '+ bookId)
        bookId = parseInt(bookId);
        var idx = gBooks.findIndex(function(book){
           return book.id === bookId
       });
       console.log('hey its me 2 '+ bookId)
        gBooks[idx].name = bookName;
        gBooks[idx].price = bookPrice;
        renderBooks(gBooks);
   }else{
    gBooks.push(createBook(bookName,bookPrice));
    renderBooks(gBooks);
   }
}


function deleteBook(el,idx){
    gBooks.splice(idx,1);
    renderBooks(gBooks);
}


function createBook(name,price){
    var id = getId();
    return {
        id:id,
        name:name,
        price:price,
        imgUrl:'img/'+id+'.jpg',
        rate:0
    }
}

function getId(){
    var id = gNextId++;
    return id
}

function renderReadModal(id){
    var book = gBooks.find(function(book){
        return book.id === id
    })
    $('#ModalLabel').text('Book Details');
    
    var strHtml = `
    <img src="${book.imgUrl}" alt="book" class="book-img">
    <div class="book-info">
        <h2 class="book-name">Name: <span> ${book.name}</span></h2>
        <h3 class="book-price">Price: <span>${book.price}</span></h3>
        <h3 class="book-rateing">Book Rateing: <span>${book.rate}</span></h3>
        <div class="btn-group-vertical">    
                <span>Rate this book </span>
                <button class="btn  btn-success" onclick="updateRaeting(true,${book.id})"><i class="fa fa-thumbs-up"></i></button>
                <button class="btn  btn-danger" onclick="updateRaeting(false,${book.id})"><i class="fa fa-thumbs-down"></i></button>
        </div>
    </div>
        
    `
    $('.modal-body').html(strHtml)
}


 function renderUpdateAndAddModal(isUpdate,id){
     var book = gBooks.find(function(book){
         return book.id === id
     })
     var title = (isUpdate)? 'Update Book' : 'Add Book'
     var valName = (isUpdate)? book.name : '';
     var valPrice = (isUpdate)? book.price : '';
     var btnText = (isUpdate)? 'Save changes':'Add Book';
     var bookId = (isUpdate)? book.id : null ;
     
     
     $('#ModalLabel').text(title);

     var strHtml = `
     <form class="addAndUpdateFrom">
     <div class="form-group">
         <label for="bookName">Book's Name</label>
         <input type="text" class="form-control" id="bookName" value="${valName}" placeholder="Enter Name" >
     </div>
     <div class="form-group">
         <label for="bookPrice">Book's Price</label>
         <input type="text" class="form-control" id="bookPrice" value="${valPrice}" placeholder="Enter Price">
         <input type="hidden" id="bookId" value="${id}">
     </div>
     <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
         <button type="submit" class="btn btn-primary submit-add-update" onclick="saveBook()" data-dismiss="modal">${btnText}</button>
     </div>
    </form>
         
     `
     $('.modal-body').html(strHtml);
     
    }


   function updateRaeting(isLike,id){
       var rate = gBooks[id].rate;
        gBooks[id].rate = (isLike)? rate + 1 : rate-1;
        renderReadModal(id);
   }
