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

function IsUseridTaken (id) {
    var result = false;
	$.ajax({
	    url: "/api/1.0/userids/" + $ ("#beta-user-id").val(),
	    type: "GET",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    async: false,
	    success: function(data){$ ('#username_notification').text ("User id already taken").show();
				   result = true; },
	    failure: function(errMsg) {$ ('#username_notification').hide ();
				       result =  false;}});
    return result;
}

function IsEmailRegistered (id) {
    var result = false;
	$.ajax({
	    url: "/api/1.0/userids/" + $ ("#beta-user-id").val(),
	    type: "GET",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    async: false,
	    success: function(data){$ ('#username_notification').text ("User id already taken").show();
				   result = true; },
	    failure: function(errMsg) {$ ('#username_notification').hide ();
				       result =  false;}});
    return result;
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function Validate () {
    if ($("#beta-name").val() !== ""
	& $("#beta-user-id").val ().length > 2
	& (false == IsUseridTaken ($("#beta-user-id").val ()))
	& $("#beta-password").val() !== ""
	& IsEmail ($("#beta-email").val()))
    {document.getElementById ("beta-access-btn").disabled = false;}
}

$("#beta-user-id").on('input', function() {
    if ($("#beta-user-id").val ().length > 2)
    { $ ('#username_notification').hide();
      IsUseridTaken ($("#beta-user-id").val ());
      Validate ();
    }
    else {$('#username_notification').text ("User id too short").show();}
});

$ ("#beta-email").on ('input', function () {
    if (IsEmail ($("#beta-email").val())) {
	$ ('#email_notification').hide();
    Validate (); }
    else {$('#email_notification').text ("Invalid email").show();}
});

$("#beta-password").on ('input', function () {
    Validate(); });

$("#beta-password").on ('input', function () {
   Validate(); });

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


//Validate function for contact form
function ValidateContactForm () {
  //checks for madatory fields: name, email, comments
    if ($("#contact-us-form #beta-name").val() !== ""
	& $("#contact-us-form #beta-comments").val() !== ""
	& IsEmail ($("#contact-us-form #beta-email").val()))
    {return true;} else{return false;}
}

//Validate contact form function called each time a field is written to
//for an input field
$("#contact-us-form input").on("keyup", function () {
    if(ValidateContactForm())
      {$("#contact-us-form #contact-form-btn").removeAttr('disabled');}
    else {$("#contact-us-form #contact-form-btn").attr('disabled','disabled');}
});
//for a textarea
$("#contact-us-form #beta-comments").on("keyup", function () {
    if(ValidateContactForm())
      {$("#contact-us-form #contact-form-btn").removeAttr('disabled');}
    else {$("#contact-us-form #contact-form-btn").attr('disabled','disabled');}
});
//Validate again and send POST
//with a json object containing the data
$('#contact-form-btn').click(function (e) {
    if(ValidateContactForm()){
      e.preventDefault();
      $.ajax({
	  url: "/api/1.0/contact-form",
	  type: "POST",
	  data: JSON.stringify({ name: $ ("#beta-name").val (),
				 company:$ ("#beta-company").val(),
				 email:$ ("#beta-email").val(),
				 phone:$ ("#beta-phone").val(),
				 comments: $ ("#beta-comments").val ()}),
	  contentType: "application/json; charset=utf-8",
	  dataType: "json",
          success: function(data){
	  alert("foooo");
	  $('.form-inline').prepend('<div class="alert alert-success" role="alert">Thanks for your interest in Opensensors.io! Will get back to you shortly!</div>').delay(1000);
          window.location.href = "/";
          },
          failure: function(errMsg) {alert(errMsg);}
      });
    }
});

function populate_api_page () {
    var user =  $.session.get ('user');
    $.ajax({
     	url: "api/1.0/users/" + user + "/api-key",
    	type: "GET",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
    	success: function(data){
	    $('span#api-info-user-id').replaceWith("<span#api-info-user-id>"+ data.user + "</span>");
	    $('.api-info-api-key-view').empty ().append ("<span#api-info-api-key-view>"+ data.api + "</span>");
	    $ ('#uuid-api-view').empty ().append ("<span#uuid-api-view>?user=" + data.user + "&API=" + data.api + "</span>");},
    	failure: function(errMsg) {alert(errMsg);}});
    $('span#api-host-name').replaceWith("<span#api-host-name>" + window.location.protocol+"//" + window.location.host + "</host-name>");

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
