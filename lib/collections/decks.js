Decks = new Mongo.Collection('decks');

Decks.allow({
  update: function(userId, deck) { return ownsDocument(userId, deck); },
  remove: function(userId, deck) { return ownsDocument(userId, deck); },
});

Decks.deny({
  update: function(userId, deck, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Decks.deny({
  update: function(userId, deck, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function (deck) {
  var errors = {};

  if (!deck.title)
    errors.title = "Please fill in a headline";

  if (!deck.description)
    errors.description =  "Please fill in a description";

  return errors;
}

Meteor.methods({
  deckInsert: function(deckAttributes) {
    check(this.userId, String);
    check(deckAttributes, {
      title: String,
      description: String,
      questions : Array
    });

    var errors = validatePost(deckAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title for your post");

    var user = Meteor.user();
    var deck = _.extend(deckAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    var deckId = Decks.insert(deck);

    return {
      _id: deckId
    };
  },

  removeDeck: function(deckId){
    return Decks.remove(deckId);
  },

  insertCard: function(deckId,card){
    return Decks.update(deckId,{ $addToSet: {questions: card} });
  },

  updateQuestions: function(deckId,questions){
    return Decks.update(deckId, { $set: {questions: questions} });
  },

  removeQuestion: function(deckId,questionId){
    return Decks.update(deckId,{ $pull: {questions: { questionId: questionId } } });
  },

  upvote: function(deckId) {
    check(this.userId, String);
    check(deckId, String);

    var affected = Decks.update({
      _id: deckId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});
