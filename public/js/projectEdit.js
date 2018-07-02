// load initial values into <textarea>'s for editing a PROJECT
// since they do not use 'value' attribute like <input> does
$(".proj-desc").val(projectData.description);
$(".proj-code").val(projectData.code);