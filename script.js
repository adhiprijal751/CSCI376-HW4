// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "What country is to the North of Nepal?",
      answers: [
        { text: "China", correct: true },
        { text: "India", correct: false },
        { text: "Bangladesh", correct: false },
        { text: "Bhutan", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // All the ids are defined in the html file that references this js file. We can look through the html file and decide what we need with the context of what we want. 
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");

  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // This is being created dynamically because we need the buttons to change depending on what question we are showing. 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // Add a button to the buttons container so we can see the button on screen
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "block";
    hintButton.disabled = false;
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // Its important to do this because if not done so the button wouldn't be visible and the quiz would essentially be stuck since there is no next button to click to go to the next question.
    nextButton.style.display = "block";
    hintButton.style.display = "none";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    hintButton.style.display = "none";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // In case the questions havent run out it moves on to the next question (runs handlenextButton())and when it has run out it runs the startquiz() to restart the quiz.
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  hintButton.addEventListener("click", () => {
    const buttons = Array.from(answerButtonsElement.children);
    const wrongAnswers = buttons.filter(
      btn => btn.dataset.correct !== "true" && !btn.classList.contains("wrong")
    );
  
    if (wrongAnswers.length > 0) {
      const randomWrong = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      randomWrong.classList.add("wrong");
      randomWrong.disabled = true;
    }
  
    hintButton.disabled = true;
  });
  
  startQuiz();
  