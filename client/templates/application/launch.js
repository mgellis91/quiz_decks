var questionIndex = 1;

Template.launch.rendered = function(){
  Session.set("questions",this.data.questions);
  console.log(this.data);
}

Template.launch.helpers({
  shuffledQuestions : function(){
        return shuffle(Session.get("questions"));
      },
  count : function(){
        return Session.get("questions").length;
  },
  questionIndex : questionIndex,
  indexPercent : function(){
    return (questionIndex / Session.get("questions").length) * 100 + "%";
  }
});

Template.launch.events({

    "click #next-question" : function(e){
      var count = Session.get("questions").length;
      if(questionIndex < count){
        questionIndex++;
        updateProgressCSS(questionIndex,getIndexPercent(questionIndex,count))

      }else if(questionIndex == count){
        questionIndex = 1;
        updateProgressCSS(questionIndex,getIndexPercent(questionIndex,count))
      }
    },

    "click #prev-question" : function(e){
      var count = Session.get("questions").length;
      if(questionIndex > 1){
        questionIndex--;
        updateProgressCSS(questionIndex,getIndexPercent(questionIndex,count));
      }else if(questionIndex == 1){
        questionIndex = count;
        updateProgressCSS(questionIndex,getIndexPercent(questionIndex,count));
      }
    }
});

function getIndexPercent(index,count){
  return(index / count) * 100 + "%";
}

function updateProgressCSS(index,percent){
  $(".progress-bar").css("width",percent);
  $("#cards-progression span").text(index);
}

//function for shuffling an array then returning the result
//created by Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Template.registerHelper("withIndex",function(list){
  var withIndex = _.map(list,function(v,i){
    v.index = i;
    if(i == 0) {
      v.first = true;
    }
    return v;
  });
  return withIndex;
});
