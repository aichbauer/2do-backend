//vars
var todos = [];
var id = 0;
var host = "http://localhost:1337/";


function init(){
  console.log("app init");
  var request = new XMLHttpRequest(),
    url = host + "todos";

  request.onreadystatechange = function(){
    if((request.readyState == 4)&&(request.status == 200)) {
      var response = JSON.parse(request.responseText.trim());
      var data = response.todos;
      todos = data;
      renderList();
    }
  };
  request.open("GET", url, true);
  request.send();

}

function addItem(){
  var input = document.getElementById('newItem');
  var text = input.value;

  input.value = '';
  var request = new XMLHttpRequest(),
    url = host + "todo";

  request.onreadystatechange = function(){
    if((request.readyState == 4)&&(request.status == 200)) {
      var response = JSON.parse(request.responseText.trim());

      todos.push(response.todo);

      renderList();

    }
  };
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("task=" + text);

}

function itemClicked(id){

  var obj = todos.filter(function(todo){
    return todo.id == id;
  })[0];
/*
  if(obj.isDone){
    obj.isDone = false;
    var todo = document.getElementById('item-' + id);
    todo.className = ' item';

  } else{
    var todo = document.getElementById('item-' + id);
    todo.className += ' done';
    obj.isDone = true;

  }
  */
  var request = new XMLHttpRequest(),
    url = host + "todo/" + obj.id;

  request.onreadystatechange = function(){
    if((request.readyState == 4)&&(request.status == 200)) {
      var response = JSON.parse(request.responseText.trim());
      location.reload();
    }
  };
  request.open("PUT", url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("isDone=" + !obj.isDone);



  renderList();


}

function buttonClicked(id) {
  console.log(id);

  var toDelete = todos.filter(function (todo) {
    return todo.id == id;
  })[0];

  if (toDelete.isDone || window.confirm("Willst du eine unbearbeite Aufgabe wirklich löschen???")) {


    var request = new XMLHttpRequest(),
      url = host + "todo/" + toDelete.id;

    request.onreadystatechange = function(){
      if((request.readyState == 4)&&(request.status == 200)) {
        var response = JSON.parse(request.responseText.trim());
        location.reload();
      }
    };
    request.open("DELETE", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();



    renderList();

    renderList();
  }
}

function renderList(){

  var list = document.getElementById('todo');
  list.innerHTML = "";

  //sort todos
  var done = todos.filter(function(todo){
    return todo.isDone;
  });

  var open = todos.filter(function(todo){
    return !todo.isDone;
  });

  todos = open.concat(done);

  // console.log(todos);

  todos.forEach(function(todo){
    var listItem = document.createElement('li');
    var spanText = document.createElement('span');
    var listText = document.createTextNode(todo.task);



    listItem.setAttribute("id", 'item-' + todo.id);
    spanText.setAttribute("onclick", "itemClicked('"+todo.id+"')");
    spanText.appendChild(listText);
    listItem.appendChild(spanText);
    list.appendChild(listItem);


    if(todo.isDone){
      listItem.setAttribute("class", "item done");
      var itemButton = document.createElement('button');
      var buttonText = document.createTextNode('delete');

      itemButton.setAttribute("id", 'button-' + todo.id);
      itemButton.setAttribute("onclick", "buttonClicked('"+todo.id+"')");

      itemButton.appendChild(buttonText);
      listItem.appendChild(itemButton);
    }else{
      listItem.setAttribute("class", "item");
    }








  });
}

function sortList(){
  //sort todos
  var done = todos.filter(function(todo){
    return todo.isDone;
  });

  var open = todos.filter(function(todo){
    return !todo.isDone;
  });

  todos = open.concat(done);

  return todos;
}
