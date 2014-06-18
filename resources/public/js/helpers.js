$("#passwordVerif2").on('input', function() {
    if ($("#passwordVerif2").val() == $("#passwordVerif1").val())
    {//show tick
	$("#ireset2").replaceWith("<i class='fa fa-check' id='ireset2'></i>");
	$("#ireset1").replaceWith("<i class='fa fa-check' id='ireset1'></i>");
	$("#reset-password-btn").toggleClass( "btn-primary");
	document.getElementById("reset-password-btn").disabled = false;
    }
    else {
	$("#ireset2").replaceWith("<i class='fa fa-times' id='ireset2'></i>");
	$("#ireset1").replaceWith("<i class='fa fa-times' id='ireset1'></i>");
	document.getElementById("reset-password-btn").disabled = true;}});


$('#reset-password-btn').click(function (e) {
e.preventDefault();
    $.ajax({
	//this needs amending based on what's in the session
	url: "/api/1.0/users/yods/reset-password",
	type: "POST",
	data: JSON.stringify({ password: document.getElementById("passwordVerif1").value }),
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(data){window.location.href = "/";},
	failure: function(errMsg) {
        alert(errMsg);}});    
 });
