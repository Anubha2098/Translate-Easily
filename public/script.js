// client-side js, loaded by index.html
// run by the browser each time the page is loaded
//variable to store user input
// in the input text box
var user1_in = "";

//Specifies the language of the input text.
 $("document").ready( function () {
        alert("Have a nice translation experience! Don't forget to rate the quality of translation and fill the Qualtrics survey at the end!");
    }); 

var s;
var count = 1;


      // event to capture send button click
      $(".send_message").click(function(e) {
        var sv = document.getElementById('select-language-1');
        var lang_from =sv.options[sv.selectedIndex].value;
        
        var so = document.getElementById('select-language-2');
        var lang_to =so.options[so.selectedIndex].value;
        
        user1_in = $(".message_input").val();
        $(".message_input").val("");
        console.log("user1_in:", user1_in);
        if (count==1)
          s="left";
        else
           s = s === 'right' ? 'left' : 'right';
        AddtoChat(user1_in, s);
        fetch(
          "/translate?user_in=" +
            user1_in +
            "&lang_from=" +
            lang_from +
            "&lang_to=" +
            lang_to
        ).then(response => {
          response.json().then(function(data) {
            console.log(data[0]["translations"][0].text);
            AddtoChat2(data[0]["translations"][0].text,s);
            count++;
          });
        });
      });

      // event to capture Enter button
      $(".message_input").keyup(function(e) {
        if (e.which === 13) {
          var sv = document.getElementById('select-language-1');
        var lang_from =sv.options[sv.selectedIndex].value;
        
        var so = document.getElementById('select-language-2');
        var lang_to =so.options[so.selectedIndex].value;
          user1_in = $(".message_input").val();
          $(".message_input").val("");
          console.log("user1_in:", user1_in);
          if (count==1)
            s="left";
          else
           s = s === 'right' ? 'left' : 'right';
          AddtoChat(user1_in, s);
          fetch(
            "/translate?user_in=" +
              user1_in +
              "&lang_from=" +
              lang_from +
              "&lang_to=" +
              lang_to
          ).then(response => {
            response.json().then(function(data) {
              console.log(data[0]["translations"][0].text);
              AddtoChat2(data[0]["translations"][0].text, s);

            count++;
            });
          });
        }
      });

// Function to add user input and translated text to UI
function AddtoChat(text, message_side) {
  
  var $messages, message;
  $messages = $(".messages");
 
  message = new Message({
    text: text,
    message_side: message_side,
    messageid: ".messages"
  });
  message.draw();
  $messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300);
}

function AddtoChat2(text, message_side) {
  
  var $messages, message;

  $messages = $(".messages");
  message= new Message({
    text: text,
    message_side: message_side,
    messageid: ".messages"
  });
    
    
  
  message.draw();
  $messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300);
}
  



// Function to create individual message elements
function Message(arg) {
  (this.text = arg.text), (this.message_side = arg.message_side);
  this.messageid = arg.messageid;
  this.draw = (function(_this) {
    return function() {
      var $message;
      $message = $(
        $(".message_template")
          .clone()
          .html()
      );
      $message
        .addClass(_this.message_side)
        .find(".text")
        .html(_this.text);
      $(_this.messageid).append($message);
      return setTimeout(function() {
        return $message.addClass("appeared");
      }, 0);
    };
  })(this);
  return this;
}


function swapLang(div1, div2) {
  var d1 = document.getElementById('select-language-1');
  var d2 = document.getElementById('select-language-2');
  var val1 = d1.value;
  var val2 = d2.value;
  var opt1 = d1.options;
  var opt2 = d2.options;
  for (var opt, j = 0; opt = opt1[j]; j++) {
    if (opt.value == val2) {
      d1.selectedIndex = j;
      break;
    }
  }
  for (var opt, j = 0; opt = opt2[j]; j++) {
    if (opt.value == val1) {
      d2.selectedIndex = j;
      break;
    }
  }
}

