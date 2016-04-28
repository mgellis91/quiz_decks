
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

DeckListController = RouteController.extend({
  template: 'decksList',
  increment: 8,
  decksLimit: function() {
    return parseInt(this.params.decksLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.decksLimit()};
  },
  subscriptions: function() {
    this.decksSub = Meteor.subscribe('decks', this.findOptions());
  },
  decks: function() {
    return Decks.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.decks().count() === this.decksLimit();
    return {
      posts: this.decks(),
      ready: this.decksSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewDecksController = DeckListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newDecks.path({decksLimit: this.decksLimit() + this.increment})
  }
});

MyDecksController = DeckListController.extend({
  decks: function(){
    return Decks.find({userId: Meteor.userId()},this.findOptions());
  },
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.myDecks.path({decksLimit: this.decksLimit() + this.increment})
  }
});

BestDecksController = DeckListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestDecks.path({decksLimit: this.decksLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewDecksController
});

Router.route('/new/:decksLimit?', {name: 'newDecks'});

Router.route('/best/:decksLimit?', {name: 'bestDecks'});

Router.route('/myDecks/:decksLimit?', {name: 'myDecks'});

Router.route('/newDeck', {name: 'newDeck'});

Router.route('/singleDeck/:_id',{
  name: 'singleDeck',
  waitOn: function() {
    return Meteor.subscribe('singleDeck', this.params._id);
  },
  data : function(){ return Decks.findOne(this.params._id); }
});

Router.route('/launch/:_id',{
  name: 'launch',
  waitOn : function(){
    return Meteor.subscribe('singleDeck', this.params._id);
  },
  data : function() { 
    return Decks.findOne(this.params._id);
  }
 });

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin, {only: 'newDeck'});
