$(document).ready(function() {

  // PUT - edit a specific project in the database
  $('.edit-form').on('submit', function(e) {
    e.preventDefault();
    var newData = $(this).serialize();
    var url = $(this).attr('action');
    $.ajax({
      method: 'PUT',
      url: url,
      data: newData
    }).done(function(data) {
      window.location = url;
    });
  });
 
  // DELETE - remove specific project from the database
  $(".delete").on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      window.location = '/user';
    })
  });
});
