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
  $('#travelPlan').submit();
});

$('#travelPlan').submit(function(event) {
  event.preventDefault();
  alert("Sumit called!");
  var data = {};
  $('#travelPlan').serializeArray().map(function(x){data[x.name] = x.value;});
  console.log(data);
  alert("data printed!");

  //Grab Values
  var country = "";
  country = data.country;

  //For Key Contacts
  var name = [];
  $("input[name=name]").each(function () {
    if ($(this).val() != "") {
      name.push($(this).val());
    }
  });

  var phone = [];
  $("input[name=phone]").each(function () {
    if ($(this).val() != "") {
      phone.push($(this).val());
    }
  });

  var email = [];
  $("input[name=email]").each(function () {
      email.push($(this).val());
  });

  //For info
  var travel = [];
  $("input[name=travel]").each(function () {
    if ($(this).val() != "") {
      travel.push($(this).val());
    }
  });

  console.log(travel);

  var travelInfo = [];
  $("textarea[name=travelInfo]").each(function () {
    if ($(this).val() != "") {
      travelInfo.push($(this).val());
    }
  });

  console.log(travelInfo);

  //For risk
  var risk = []
  $("input[name=risk]").each(function () {
    if ($(this).val() != "") {
      risk.push($(this).val());
    }
  });

  var riskInfo = []
  $("textarea[name=riskInfo]").each(function () {
    if ($(this).val() != "") {
      riskInfo.push($(this).val());
    }
  });

  //For lingo
  var word = []
  $("input[name=word]").each(function () {
    if ($(this).val() != "") {
      word.push($(this).val());
    }
  });

  var meaning = []
  $("input[name=meaning]").each(function () {
    if ($(this).val() != "") {
      meaning.push($(this).val());
    }
  });

  //Create KeyContacts
  var arrayLength = name.length;
  var keyContact = firebase.database().ref('keyContacts/');
  for (var i = 0; i < arrayLength; i++) {
    var contact = {};
    contact = {
      name: name[i],
      phone: phone[i],
      email: email[i],
      country: country
    };
    keyContact.push(contact);
  }
  alert("Contact Pushed");
  //Create travelInfo
  var arrayLength = travel.length;
  var traveldata = firebase.database().ref('travelInfo/');
  for (var i = 0; i < arrayLength; i++) {
    var travelList = {};
    travelList = {
      travel: travel[i],
      travelInfo: travelInfo[i],
      country: country
    };

    console.log(travelList);
    traveldata.push(travelList);
  }
  alert("Travel Info pushed!");

  //Create riskInfo
  var arrayLength = risk.length;
  var riskdata = firebase.database().ref('riskInfo/');
  for (var i = 0; i < arrayLength; i++) {
    var riskList = {};
    riskList = {
      risk: risk[i],
      riskInfo: riskInfo[i],
      country: country
    };
    riskdata.push(riskList);
  }


  var database = firebase.database().ref('tripPlan/');
  database.push(data);
  alert("Data pushed!");
});
