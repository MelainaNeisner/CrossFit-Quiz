let questionNumber = 0;
let displayNumber = 1;
let score = 0;

function welcomeMessage () {
  $('header').height(250)
  return `
    <div class="startQuiz">
      <h1 role="header" class="box-2">CrossFit Coaching 101</h1>
      <div class="box-3">
        <h3>Test your brain like you test your athletes!</h3>
      </div>
      <button type="button" class="startButton">Go!</button>
    </div>
  `
}
function questionTemplate () {
  $('header').height(150)
  return `
    <div class="questionForm">
    <h3 class="question">${displayNumber}></h3>
    <h2>${STORE[questionNumber].question}</h2>
    <div class="answerForm">
      <form class="answerForm">
        <fieldset>
          <ul>
            <li>
              <input name="answerOption" required type ="radio" class="answerOption" value="${STORE[questionNumber].answers[0]}">
              <span class="answerText">${STORE[questionNumber].answers[0]}</span>
            </li>
            <li>
              <input name="answerOption" required type="radio" class="answerOption" value="${STORE[questionNumber].answers[1]}">
              <span class="answerText">${STORE[questionNumber].answers[1]}</span>
            </li>
            <li>
              <input name="answerOption" required type="radio" class="answerOption" value="${STORE[questionNumber].answers[2]}">
              <span class="answerText">${STORE[questionNumber].answers[2]}</span>
            </li>
            <li>
              <input name="answerOption" required type="radio" class="answerOption" value="${STORE[questionNumber].answers[3]}">
              <span class="answerText">${STORE[questionNumber].answers[3]}</span>
            </li>
          </ul>
        </fieldset>   
        </div>    
      </form>
    </div> 
    <div class="buttonHolder">
      <button type="submit" for="answerForm" class="submitButton">Submit!</button>
    </div>
    <div class="scoreBox">
      <h3>Question: <span class="questionTracker">${displayNumber}</span>/10 Score: <span class="score">${score}</span>/10</h3>
    </div>
  `
}
function renderQuiz() {
  $('#main').html(welcomeMessage())
  $('.startButton').click(function() {
    $('.startQuiz').html(questionTemplate());
    handleAnswer();
  });
}
function renderQuestions () {
  $('.startQuiz').html(questionTemplate());
  handleAnswer();
}
function handleAnswer () {
  $('.submitButton').click(function (e) {
    // console.log('this was clicked');
    e.preventDefault();
    if ($('input:checked').length > 0) {
      let userAnswer = $('input:checked').val();
      let correctAnswer = STORE[questionNumber].correctAnswer;
      if (userAnswer === correctAnswer) {
        scoreBox();
        handleCorrectAnswer();
      } else {
        handleIncorrectAnswer ();
      }
    }
  });
}
function handleCorrectAnswer () {
  let correctAnswer = STORE[questionNumber].correctAnswer;
  $('.startQuiz').html(`
  <div>
    <h2>You got it right!</h2>
    <button class="nextButton">Next!</button>
  </div>`);
  nextQuestion()
}

function handleIncorrectAnswer (){
 let correctAnswer = STORE[questionNumber].correctAnswer;
  $('.startQuiz').html(`
  <div>
    <h2>No rep! The correct answer is ${correctAnswer}</h2>
    <button class="nextButton">Next!</button>
  </div>`);
  nextQuestion()
}
function nextQuestion() {
  $('.nextButton').click(function(){
    displayNumber++;
    questionNumber++;
    renderQuestions();
    handleAnswer();
  });
}
function scoreBox () {
  score++;
}
function renderResults() {
  if (score > 7) {
    $('.startQuiz').html(`
      <div class="results">
        <h3>Congrats!
        <h2>You got ${score}/10.</h2>
        <h3>Keep doing what you are doing!</h3>
        <button class="restartButton">Restart Quiz</button>
      </div>
    `);
  } else if (score == 7) {
    $('.startQuiz').html(`
      <div class="results">
        <h3>Almost!</h3>
        <h2>You got ${score}/10.</h2>
        <h3>Might want to bursh up on your CrossFit Coaching handbook!</h3>
        <button class="restartButton">Restart Quiz</button>
      </div>
    `);
  } else if (score <= 6) {
    $('.startQuiz').html(`
      <div class="results">
        <h3>Keep your day job, my friend!</h3>
        <h2>You got ${score}/10.</h2>
        <h3>That's okay! Keep practicing those coaching cues and make sure to crack open those CrossFit handbooks!</h3>
        <button class="restartButton">Restart Quiz</button>
      </div>
    `);
  }
  restartQuiz();
}

function restartQuiz () {
  $('.restartButton').click(function () {
    questionNumber = 0;
    displayNumber = 1;
    score = 0;
    renderQuiz();
  })
}

$(renderQuiz);
