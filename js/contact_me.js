$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();


            // get values from FORM
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            alert("HEllo!!!");

            var database = firebase.database().ref('alerts/');

            database.push({
              "name": name,
              "message": message
            });

            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
                .append('</div>');

            //clear all fields
            $('#contactForm').trigger("reset");
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});

//Add another contact
$(".addAnother").click(function(event){
  event.preventDefault();
  var html = $(".copyContact").html();
  $(".contactContainer").append(html);
});

//Add another travel info
$(".addTravel").click(function(event){
  event.preventDefault();
  var html = $(".copyTravel").html();
  $(".travelContainer").append(html);
});

//Add another Risk info
$(".addRisk").click(function(event){
  event.preventDefault();
  var html = $(".copyRisk").html();
  $(".riskContainer").append(html);
});

//Add another Local Lingo
$(".addLingo").click(function(event){
  event.preventDefault();
  var html = $(".copyLingo").html();
  $(".lingoContainer").append(html);
});

$(".checkIt").click(function(event){
  event.preventDefault();
  console.log("bibo");
  console.log("hello");
  alert("Hello po");
  $('#travelPlan').submit();
});

$('#travelPlan').submit(function(event) {
  event.preventDefault();
  alert("Sumit called!");
  var data = {};
  $('#travelPlan').serializeArray().map(function(x){data[x.name] = x.value;});
  console.log(data);
  alert("data printed!");

  var database = firebase.database().ref('tripPlan/');
  database.push(data);
  alert("Data pushed!");
});
