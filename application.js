$(document).ready(function () {
  updateAllTask();

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    addTask();
  })
})

var updateAllTask = function () {
    $.ajax({
    type:'GET',
    url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
    dataType: 'json',
    success: function(response,textStatus){
      response.tasks.forEach(function(task) {
        $('#todo-list').append('<p>' + task.content + '</p>')
      })
    },
    error: function(request, textStatus,errorMessage){
      console.log(errorMessage)
    }
  })
}

var addTask = function () {
  $.ajax({
    type:'POST',
    url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task').val()
      }
    }),
    success: function(response,textStatus){
      $('#todo-list').empty();
      $('#new-task').val('');
      updateAllTask();
    },
    error: function(request, textStatus,errorMessage){
      console.log(errorMessage)
    }
  })
}
  