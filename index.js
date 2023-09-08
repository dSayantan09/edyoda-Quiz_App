$(document).ready(function () {
    var answers = [];
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (
      response
    ) {
      for (var i = 0; i < response.length; i++) {
        answers.push(["q" + (i + 1), response[i].answer]);
        createQuestion(
          "Q" + (i + 1) + ". " + response[i].question,
          response[i].options,
          i + 1
        );
      }
  
      $("form").append(
        $("<div>")
          .attr("class", "buttonDiv")
          .append(
            $("<input>")
              .attr("class", "submitButton")
              .attr("type", "submit")
              .attr("value", "Submit")
          )
      );
    });
  
    $("form").submit(function (e) {
      var submittedAnswers = $(this).serializeArray();
      var score = 0;
      for (var i = 0; i < submittedAnswers.length; i++) {
        for (var j = 0; j < answers.length; j++) {
          if (
            answers[j][1] == submittedAnswers[i].value &&
            submittedAnswers[i].name == answers[j][0]
          ) {
            score++;
          }
        }
      }
      $("#score").html(score + "/5");
      $(this).find(":input[type=submit]").prop("disabled", true);
      $("form input[type=radio]").each(function () {
        if (this.checked == false) {
          this.disabled = true;
        }
      });
      $(".correct").css({ display: "inline-block" });
      $(".wrong").css({ display: "inline-block" });
      return false;
    });
  
    function createQuestion(question, options, queNo) {
      $("form").append($("<h4>").html(question));
      for (var j = 0; j < options.length; j++) {
        if (answers[queNo - 1][1] != j + 1) {
          $("form").append(
            $("<label>").append(
              $("<input>")
                .attr("type", "radio")
                .attr("class", "option")
                .attr("name", "q" + queNo)
                .attr("value", j + 1),
              $("<span>").html(options[j]),
              $("<i>")
                .addClass("far fa-times-circle wrong")
                .css("display", "none"),
              $("<br>")
            )
          );
        } else {
          $("form").append(
            $("<label>").append(
              $("<input>")
                .attr("type", "radio")
                .attr("class", "option")
                .attr("name", "q" + queNo)
                .attr("value", j + 1),
              $("<span>").html(options[j]),
              $("<i>")
                .addClass("far fa-check-circle correct")
                .css("display", "none"),
              $("<br>")
            )
          );
        }
      }
      $("form").append($("<div>").addClass("seperation"));
    }
  
    $("body").on("contextmenu", function (e) {
      e.preventDefault();
    });
  });
  