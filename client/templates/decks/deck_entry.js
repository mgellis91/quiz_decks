var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.deckEntry.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  questionCount: function(){
    return this.questions.length;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
  dateSubmitted : function(){
    return this.submitted.toLocaleDateString();
  },
});

Template.deckEntry.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
