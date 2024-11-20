// reference to all the relevant html elements to the quiz
const startButton = document.getElementById('start-button');
const quizFrame = document.getElementById('quiz-frame');
const textQuestion = document.getElementById('text-question');
const choicesSection = document.getElementById('choices-section');
const currentQuestion = document.getElementById('current-question');
const totalQuestions = document.getElementById('total-questions');
const nextButton = document.getElementById('nxt-button');
const resultScreen = document.getElementById('result-screen');
const theScore = document.getElementById('the-score');
const reviewButton = document.getElementById('review-button');
const reviewScreen = document.getElementById('review-screen');
const reviewList = document.getElementById('list-of-reviews');
const restartButton = document.getElementById('restart-button');
const restartButton2 = document.getElementById('restart-button-2');
const progressBar = document.getElementById('progress');

// variables to keep track of progres
let currentQuestionIndex = 0;
let score = 0;
let selectedChoices = [];

// questions and the right answers
const questions = [
    {
      question: 'What is the capital city of Norway?',
      choices: ['Bergen', 'Stavanger', 'Oslo', 'Trondheim'],
      answer: 2
    },
    {
      question: 'What is Norway’s official language?',
      choices: ['Swedish', 'Finnish', 'Danish', 'Norwegian'],
      answer: 3
    },
    {
      question: 'Which of these is a traditional Norwegian dish?',
      choices: ['Tacos', 'Sushi', 'Fårikål', 'Pizza'],
      answer: 2
    },
    {
      question: 'What currency is used in Norway?',
      choices: ['Euro', 'Krone', 'Dollar', 'Pound'],
      answer: 1
    },
    {
      question: 'What is Norway’s national animal?',
      choices: ['Brown Bear', 'Moose', 'Wolf', 'Eurasian Lynx'],
      answer: 1
    },
    {
      question: 'Which country borders Norway to the east?',
      choices: ['Sweden', 'Denmark', 'Finland', 'Russia'],
      answer: 0
    },
    {
      question: 'Which ocean is Norway’s coastline along?',
      choices: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Southern Ocean'],
      answer: 2
    },
    {
      question: 'What is the traditional Norwegian Christmas drink?',
      choices: ['Gløgg', 'Cider', 'Lemonade', 'Beer'],
      answer: 0
    },
    {
      question: 'What is the name of the longest fjord in Norway?',
      choices: ['Sognefjord', 'Hardangerfjord', 'Geirangerfjord', 'Romsdalsfjord'],
      answer: 0
    },
    {
      question: 'Which of these is a famous Norwegian explorer?',
      choices: ['Leif Erikson', 'Vasco da Gama', 'Christopher Columbus', 'Ferdinand Magellan'],
      answer: 0
    },
    {
      question: 'What is the name of the Norwegian national football team’s stadium?',
      choices: ['Camp Nou', 'Ullevål Stadion', 'Wembley Stadium', 'Maracanã'],
      answer: 1
    },
    {
      question: 'In which city would you find the famous Bryggen wharf?',
      choices: ['Oslo', 'Stavanger', 'Tromsø', 'Bergen'],
      answer: 3
    },
    {
      question: 'Which of these animals is commonly found in Norway’s wilderness?',
      choices: ['Polar Bears', 'Kangaroos', 'Reindeer', 'Penguins'],
      answer: 2
    },
    {
      question: 'What is the name of Norway’s national anthem?',
      choices: ['Ja, vi elsker dette landet', 'God Save the Queen', 'The Star-Spangled Banner', 'O Canada'],
      answer: 0
    },
    {
      question: 'Which Norwegian city is known for hosting the Nobel Peace Prize ceremony?',
      choices: ['Bergen', 'Oslo', 'Trondheim', 'Kristiansand'],
      answer: 1
    },
    {
      question: 'Which of these countries does NOT share a border with Norway?',
      choices: ['Sweden', 'Finland', 'Russia', 'Germany'],
      answer: 3
    },
    {
      question: 'What is the traditional Norwegian winter sport?',
      choices: ['Surfing', 'Skiing', 'Cricket', 'Golf'],
      answer: 1
    },
    {
      question: 'Which country was Norway in union with until 1905?',
      choices: ['Sweden', 'Denmark', 'Finland', 'Germany'],
      answer: 0
    },
    {
      question: 'What is Norway’s highest mountain?',
      choices: ['Galdhøpiggen', 'Mount Everest', 'Mont Blanc', 'Mount Kilimanjaro'],
      answer: 0
    },
    {
      question: 'What is the famous Norwegian cheese called?',
      choices: ['Cheddar', 'Brunost', 'Gouda', 'Mozzarella'],
      answer: 1
    }
  ];

  // to set the total of number of questions in the file
  totalQuestions.textContent = questions.length;

  // function to start the quis
  function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    quizFrame.classList.remove('hidden');
    showQuestion();
  }

  // function to show questions and choices
  const showQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    textQuestion.textContent = currentQuestion.question;
    choicesSection.innerHTML = '';
    //create button for choices that can be styled 
    currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.classList.add('choice-button');
      button.textContent = choice;
      button.addEventListener('click', () => selectChoice(index));
      choicesSection.appendChild(button);
    });
    // to update the progress bar and number
    updateProgress();
  };
  
  // so you can select answer and have the choice button
  function selectChoice(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const buttons = document.querySelectorAll('.choice-button');
    // highlights so user can know if its correct or wrong with styling posibility
    if (selectedIndex === correctIndex) {
      buttons[selectedIndex].classList.add('correct');
      score++;
    } else {
      buttons[selectedIndex].classList.add('incorrect');
      buttons[correctIndex].classList.add('correct');
    }
  
    // saves the answers for review
    selectedChoices.push({
      question: currentQuestion.question,
      selected: currentQuestion.choices[selectedIndex],
      correct: currentQuestion.choices[correctIndex]
    });
  
    // disable buttons so you cant choose multiple and shows "next" button 
    buttons.forEach(button => button.disabled = true);
    nextButton.classList.remove('hidden');
  }

  // updates the bar and question number
  function updateProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    currentQuestion.textContent = currentQuestionIndex + 1;
  }

  // shows next question or ends quiz if there are no more quesitons left
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      nextButton.classList.add('hidden');
      showQuestion();
    } else {
      endQuiz();
    }
  }

  // this function will show an result screen with score but hides the frame 
  function endQuiz() {
    quizFrame.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    theScore.textContent = `${score} / ${questions.length}`;
  }
 
  // shows a more detailed review of answers
  function reviewAnswers() {
    resultScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
    reviewList.innerHTML = '';
  
    // shows each review for the questions 
    selectedChoices.forEach((choice, index) => {
      const li = document.createElement('li');
      

      const textQuestion = document.createElement('div');
      textQuestion.classList.add('review-question');
      textQuestion.textContent = `${index + 1}: ${choice.question}`;
      
      const userAnswer = document.createElement('div');
      userAnswer.classList.add('review-user-answer');
      userAnswer.textContent = `You chose: ${choice.selected}`;
      
      const correctAnswer = document.createElement('div');
      correctAnswer.textContent = `Correct answer: ${choice.correct}`;
  
      li.appendChild(textQuestion);
      li.appendChild(userAnswer);
      li.appendChild(correctAnswer);
  
      
      if (choice.selected === choice.correct) {
        li.classList.add('correct-answer');
      } else {
        li.classList.add('incorrect-answer');
      }
  
      reviewList.appendChild(li);
    });
  }

  // restarts the quiz hides the result and review screen then displays quiz frame then shows first question again and updates progress
  function restartQuiz() {

    currentQuestionIndex = 0;
    score = 0;
    selectedChoices = []; 
  

    resultScreen.classList.add('hidden');
    reviewScreen.classList.add('hidden');
  
    
    quizFrame.classList.remove('hidden');
    nextButton.classList.add('hidden'); 
  

    showQuestion();
  

    progressBar.style.width = '0%';
    updateProgress();
  }

  // event listeners for when user clicks
  restartButton.addEventListener('click', restartQuiz);

  restartButton2.addEventListener('click', restartQuiz);

  startButton.addEventListener('click', startQuiz);

  nextButton.addEventListener('click', nextQuestion);

  reviewButton.addEventListener('click', reviewAnswers);
