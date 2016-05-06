
// Add default Decks
if (Decks.find().count() === 0) {

  var now = new Date().getTime();
  var demoId = Random.id();


  //Programming Terms
  Decks.insert({
    title: "Programming Terms",
    author: "Quiz Decks",
    description: "collection of terms used in programming",
    userId: demoId,
    questions: [
      {
        question: "integer",
        answer: "whole numbers"
      },
      {
        question: "floating point",
        answer: "decimal numbers"
      },
      {
        question: "boolean",
        answer: "true / false"
      },
      {
        question: "character",
        answer: "single keystroke"
      },
      {
        question: "string",
        answer: "collection of characters"
      },
      {
        question: "byte",
        answer: "whole numbers (0 - 255)"
      },
      {
        question: "long",
        answer: "whole numbers (-2 billion to 2 billion)"
      },
      {
        question: "constant",
        answer: "constant item of data with only one specific value"
      },
    ],
    submitted: new Date(),
    upvoters: [], votes: 0
  });

  //poker terms
  Decks.insert({
    title: "Poker Terms",
    author: "Quiz Decks",
    description: "collection of terms used in poker",
    userId: demoId,
    questions: [
      {
        question: "Bankroll",
        answer: "The total amount of money a player has put aside to gamble with."
      },
      {
        question: "Button",
        answer: "The disk used to indicate the current dealer position."
      },
      {
        question: "Connectors",
        answer: "Hole cards that are sequential in value, such as 45 or TJ"
      },
      {
        question: "Cut-off",
        answer: "The seat position directly to the right of the button"
      },
      {
        question: "Flop",
        answer: "The first three community cards, that all players can use to make their hand, dealt after the initial betting around"
      },
      {
        question: "Gut-shot",
        answer: "Any straight draw that requires only one end to be filled example if your hand consists of 3467 by hitting a 5 you have made a gutshot straight"
      },
      {
        question: "Kicker",
        answer: "Any unpaired card used to determine the outcome if 2 or more players have identical paired cards"
      }
    ],
    submitted: new Date(),
    upvoters: [], votes: 0
  });

      //chemisty
      Decks.insert({
        title: "Basic Chemistry Terms",
        author: "Quiz Decks",
        description: "collection of basic terms used in chemistry",
        userId: demoId,
        questions: [
          {
            question: "Atomic mass",
            answer: "equal to the number of protons and neutrons in an atom."
          },
          {
            question: "proton",
            answer: "A subatomic particle that has a positive charge and that is found in the nucleus of an atom"
          },
          {
            question: "neutron",
            answer: "A subatomic particle that has no charge and that is found in the nucleus of an atom"
          },
          {
            question: "electron",
            answer: "A subatomic particle that has a negative charge"
          },
          {
            question: "isotope",
            answer: "Atoms of the same element that have different numbers of neutrons"
          },
          {
            question: "covalent bond",
            answer: "A chemical bond formed when two atoms share electrons"
          },
          {
            question: "Ionic bond",
            answer: "A chemical bond resulting from the attraction between oppositely charged ions."
          },
          {
            question: "Ion",
            answer: "An atom or molecule with a net electric charge due to the loss or gain of one or more electrons"
          }
        ],
        submitted: new Date(),
        upvoters: [], votes: 0
      });

          //probabilty terms
        Decks.insert({
          title: "Probability Terms",
          author: "Quiz Decks",
          description: "collection of terms used in probabilty",
          userId: demoId,
          questions: [
            {
              question: "sample space",
              answer: "the set of all possible outcomes"
            },
            {
              question: "theoretical probability",
              answer: "the likelihood of an event based on mathematical reasoning"
            },
            {
              question: "probability",
              answer: "probability the numerical value from 0 to 1 that measures the likelihood of an event;\nP(event) = (number of favorable outcomes) ÷ (number of possible outcomes)"
            },
            {
              question: "experimental probability",
              answer: "measures the likelihood that the event occurs based on the actual results of the experiment;\nP(event) = (number of times the event occurs) ÷ (number of times the experiment is done)"
            },
            {
              question: "frequency table",
              answer: "frequency table a data display that shows how often an item appears in a category"
            },
            {
              question: "two-way frequency table",
              answer: "displays the frequencies of data in two different categories; also known as a contingency table"
            },
            {
              question: "relative frequency",
              answer: "the ratio of the frequency of a category to the total frequency"
            },
            {
              question: "combination",
              answer: "a selection of items in which order is not important"
            }
          ],
          submitted: new Date(),
          upvoters: [], votes: 0
     });
}
