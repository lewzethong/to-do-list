$(document).ready(function () {
  updateAllTask();

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    addTask();
  })

  $(document).on('click', '.remove-button', function () {
    deleteTask($(this).data('id'));
  })

  $(document).on('change', '.task input', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });
})

var updateAllTask = function () {
    $.ajax({
    type:'GET',
    url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=519',
    dataType: 'json',
    success: function(response,textStatus){
      console.log(response)
      $('#todo-list').empty();
      response.tasks.forEach(function(task) {
        $('#todo-list').append('<div class="task"><label class="task-container">' + task.content + '<input type="checkbox" data-id="' + task.id + '"' + (task.completed ? 'checked="checked"' : '') + '"><span class="mark-completed-button"></span></label><span class="remove-button" data-id="' + task.id + '">x</span></div>')
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
    url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=519',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task').val()
      }
    }),
    success: function(response,textStatus){
      $('#new-task').val('');
      updateAllTask();
    },
    error: function(request, textStatus,errorMessage){
      console.log(errorMessage)
    }
  })
}

var deleteTask = function (id) {
  $.ajax({
    type:'DELETE',
    url:'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=519',
    success: function(response,textStatus){
      updateAllTask();
    },
    error: function(request, textStatus,errorMessage){
      console.log(errorMessage)
    }
  })
}
  
var markTaskComplete = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=519',
    dataType: 'json',
    success: function (response, textStatus) {
    updateAllTask();
    },
    error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
    }
  });
}

var markTaskActive = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=519',
    dataType: 'json',
    success: function (response, textStatus) {
    updateAllTask();
    },
    error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
    }
  });
}