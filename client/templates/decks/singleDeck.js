var questions;

Template.singleDeck.rendered = function(){
  questions = this.data.questions;
  Session.set("deckOwner",this.data.userId);
  Session.set("deckId",this.data._id);
}

Template.singleDeck.helpers({
  ownsDeck : function(){
    return Session.get("deckOwner") === Meteor.userId();
  }
});

Template.singleDeck.events({

  "submit #new-question-card" : function(e){
    e.preventDefault();

    var questionCard = {
      questionId : Random.id(),
      question : e.target.newQuestionText.value,
      answer : e.target.newAnswerText.value
    };

    if(!questionCard.question || !questionCard.answer){
      alert("you must enter both a question and answer");
      return;
    }

    Meteor.call("insertCard",this._id,questionCard);
    
    /*bandiad solution to close modal and also fix issue that caused other question cards to use the wrong questionId
    * when trying to edit or delete after the creation of a new card*/
    //window.location.reload()
    $("#newCardModal").modal("hide");

  },

  "click #editCard" : function(e){
    e.preventDefault();
    Session.set("questionId",this.questionId);
    populateEditFields(Session.get("questionId"));
  },

  "submit #edit-question-card" : function(e){
    e.preventDefault();
    var newQuestionCard = {
      question : e.target.editQuestionText.value,
      answer: e.target.editAnswerText.value
    }

    var updatedQuestions = updateQuestions(Session.get("questionId"),newQuestionCard);

    Meteor.call("updateQuestions",Session.get("deckId"),updatedQuestions,function(error){
    });

    $("#editCardModal").toggle();
  },

  "click #deleteCard" : function(e){
    Session.set("questionId",this.questionId);
  },

  "click #confirm-delete-card" : function(e) {
    e.preventDefault();
    Meteor.call("removeQuestion",Session.get("deckId"),Session.get("questionId"),function(error){
      console.log(error);
    });
  },


  "click #confirm-delete-deck" : function(e) {
    e.preventDefault();
    Meteor.call("removeDeck", Session.get("deckId"));

    /*using location.href instead of Router.go() because location.href waits until focus returns after the modal close
    before changing pages other wise the app remains unfocused and requires page refresh in order to regain focus*/
    window.location.href = "/myDecks";
  }

});

function populateEditFields(questionId){
  for(var i = 0; i < questions.length; i++){
    if(questions[i].questionId == questionId){
      $("#editQuestionText").val(questions[i].question);
      $("#editAnswerText").val(questions[i].answer);
    }
  }
}

function updateQuestions(questionId,newContent){
  for(var i = 0; i < questions.length; i++){
    if(questions[i].questionId == questionId){
      questions[i].question = newContent.question;
      questions[i].answer = newContent.answer;
      console.log("changed");
      $('#editCardModal').modal('toggle');
      return questions;
    }
  }
  alert("question was not correctly updated");
}
