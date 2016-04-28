Template.newDeck.created = function() {
  Session.set('newDeckErrors', {});
}

Template.newDeck.helpers({
  errorMessage: function(field) {
    return Session.get('newDeckErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('newDeckErrors')[field] ? 'has-error' : '';
  }
});

Template.newDeck.events({
  'submit form': function(e) {
    e.preventDefault();

    var deck = {
      title: $(e.target).find('[name=title]').val(),
      description : $(e.target).find('[name=description]').val(),
      questions : [
        {
          questionId : Random.id(),
          question : "demo question",
          answer : "demo answer"
        }
      ]
    };

    var errors = validatePost(deck);
    if (errors.title || errors.description)
      return Session.set('newDeckErrors', errors);

    Meteor.call('deckInsert', deck, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
    });

    Router.go("/myDecks");
  }
});
