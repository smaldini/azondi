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
    var user =  $.session.get ('user');
    e.preventDefault();
    $.ajax({
	url: "/api/1.0/users/" + user + "/reset-password",
	type: "POST",
	data: JSON.stringify({ password: document.getElementById("passwordVerif1").value }),
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(data){window.location.href = "/";},
	failure: function(errMsg) {
        alert(errMsg);}});
});

$("#beta-user-id").on('input', function() {
    if ($("#beta-user-id").val ().length > 2)
    { $ ('#username_notification').hide();
	$.ajax({
	url: "/api/1.0/userids/" + $ ("#beta-user-id").val(),
	type: "GET",
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(data){$ ('#username_notification').text ("User id already taken").show();},
	failure: function(errMsg) {$ ('#username_notification').hide ();}});
    }
    else {$('#username_notification').text ("User id too short").show();}
});

$("#beta-password").on ('input', function () {
    if ($("#beta-name").val() !== "" & $("#beta-email").val() !== "" & $("#beta-password").val() !== "" )
    {document.getElementById ("beta-access-btn").disabled = false;}});

$('#beta-access-btn').click(function (e) {
    e.preventDefault();
    $.ajax({
	url: "/api/1.0/users/" + $ ("#beta-user-id").val (),
	type: "PUT",
	data: JSON.stringify({ name: $ ("#beta-name").val (),
			       email:$ ("#beta-email").val(),
			       password: $ ("#beta-password").val ()}),
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(data){window.location.href = "/help";},
	failure: function(errMsg) {
        alert(errMsg);}});
});

function populate_api_page () {
    var user =  $.session.get ('user');
    $.ajax({
     	url: "api/1.0/users/" + user + "/api-key",
    	type: "GET",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
    	success: function(data){
	    $('#api-info-user-id').replaceWith("<span#api-info-user-id>"+ data.user + "</span>");
	    $('.api-info-api-key-view').empty ().append ("<span#api-info-api-key-view>"+ data.api + "</span>");
	    $ ('#uuid-api-view').empty ().append ("<span#uuid-api-view>?user=" + data.user + "&API=" + data.api + "</span>");},
    	failure: function(errMsg) {alert(errMsg);}});
}

$ ('#api-info-api-key-link').on ('click', function () {

    var user =  $.session.get ('user');
    $.ajax ({
	url: "api/1.0/users/" + user + "/api-key",
	type: "POST",
	contentType: "application/json; charset=utf-8",
    	dataType: "json",
	success: function(data) {populate_api_page ();},
	failure: function(errMsg) {
            alert(errMsg);}});
});

function populate_ws_page () {
    var user = $.session.get ('user');
    $.ajax ({
	url: "api/1.0/users/" + user + "/ws-token",
	type: "GET",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
	success: function(data){
	    $ ('#ws-session-url-info').empty ().append ("<span#ws-session-url-info> opensensors.IO/events/stream/users/" + user + "?token=" + data.token + "</span>" );
	    $('.ws-info-session-token').empty().append ("<span.ws-info-session-token>"+ data.token + "</span>");
	},
    	failure: function(errMsg) {alert(errMsg);}});
    }

$ ('#ws-info-ws-session-token-link').on ('click', function () {
    var user =  $.session.get ('user');
    $.ajax ({
	url: "api/1.0/users/" + user + "/ws-token",
	type: "POST",
	contentType: "application/json; charset=utf-8",
    	dataType: "json",
	success: function(data) {populate_ws_page ();},
	failure: function(errMsg) {
            alert(errMsg);}});
});


