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

let currentQuestionIndex = 0;
let score = 0;
let selectedChoices = [];

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

  totalQuestions.textContent = questions.length;

  function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    quizFrame.classList.remove('hidden');
    showQuestion();
  }

  const showQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    textQuestion.textContent = currentQuestion.question;
    choicesSection.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.classList.add('choice-btn');
      button.textContent = choice;
      button.addEventListener('click', () => selectChoice(index));
      choicesSection.appendChild(button);
    });
    updateProgress();
  };
  