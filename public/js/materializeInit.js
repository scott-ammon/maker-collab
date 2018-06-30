$(document).ready(function(){
  M.AutoInit();
});

$(".project-bar").click(function () {
    window.location = $(this).find("a").attr('href');
});
