console.log("Todos");

var gTodos;
var TODO_KEY;

// This is the same as <body onload="">
var $document = $(document);
$document.ready(init);

function init() {
  
  gTodos = getTodos();
  saveToStorage(TODO_KEY,gTodos);
  renderTodos(gTodos);
}

function renderTodos(todos) {
  saveToStorage(TODO_KEY,gTodos);
  var strHtmls = "";
  // Even better with Map
  todos.forEach(function(todo, idx) {
    var strHtml = `<li class="list-todos">
        <input type="checkbox" ${(todo.isDone)? 'checked':''} id="${"c" + idx}" onchange="toggleTodo(${idx})" />
        <label class="todo-txt" data-id="${"c" + idx}" for="${"c" + idx}"><span></span>${todo.txt}
            <i class="fa fa-times" onclick="delTodo(${idx})" title="Remove"></i>
        </label> 
      </li>`;
    strHtmls += strHtml;
  });

  var $elTodos = $(".todos");
  $elTodos.html(strHtmls);

  var $elCount = $("header > h1 > span");
  $elCount.html(gTodos.length);
}

function getTodos() {
  var todos = getFromStorage(TODO_KEY)
  if(!todos){
    var todos = [];
    todos.push(getTodo("Style with Flexbox"));
    todos.push(getTodo("Master your HTML"));
    todos.push(getTodo("Practice Array Extras"));
  }
  return todos;
}

function getTodo(txt) {
  return {
    txt: txt,
    isDone: false
  };
}

function toggleTodo(idx) {
  var selector = "#c" + idx + " + label";
  gTodos[idx].isDone = !gTodos[idx].isDone;
  if(gTodos[idx].isDone) $(selector).addClass("line-through");
  else $(selector).removeClass("line-through");
  var $el = $(selector);
  $el.addClass("highlight");
  setTimeout(function() {
    $el.removeClass("highlight");
  }, 1000);
  saveToStorage(TODO_KEY,gTodos);
}

function addTodo() {
  var txt = $('#newTodo').val();
  var todo = getTodo(txt);
  gTodos.push(todo);
  renderTodos(gTodos);
  $('#newTodo').val('')
  saveToStorage(TODO_KEY,gTodos);
}

function delTodo(idx) {
  gTodos.splice(idx, 1);
  renderTodos(gTodos);
}

function filterTodos(filterPram) {
  if (filterPram === "all") {
    renderTodos(gTodos);
  } else {
    isActive = filterPram === "active" ? true : false;
    var todosFilterd = gTodos.filter(function(item, filterPram) {
      if (!item.isDone === isActive) return item;
    });
    renderTodos(todosFilterd);
  } 
}


