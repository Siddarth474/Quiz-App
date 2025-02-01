document.addEventListener('DOMContentLoaded' , () => {

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const questionText = document.getElementById('question-text');
    const choiceList = document.getElementById('choices-list');
    const scoreDisplayText = document.getElementById('score');
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const displayPoints = document.getElementById('points');
    const displayHowManyRight = document.getElementById('howManyright');

    const questions = [
        {
            questions : "Which country won the 2024 T20 cricket World Cup?",
            choices : ['England' , 'Australia' , 'India' , 'South Africa'],
            answer : "India",
            points : 15,
        },
        {
            questions : "Which planet is know as the Red Planet?",
            choices : ['Earth' , 'Mars' , 'Saturn' , 'Jupiter'],
            answer : "Mars",
            points: 10,
        },
        {
            questions : "How many continents are there in the world?",
            choices : ['5','6','8','7'],
            answer : "7",
            points : 5,
        },
        {
            questions : "What is the capital of India?",
            choices : ['New Delhi', 'Madrid' ,'London' ,'Berlin'],
            answer : "New Delhi",
            points : 15,
        },
        {
            questions : "Which AI Model is Microsoft owning?",
            choices : ['GeminiAI' , 'ChatGpt' , 'Copilot' ,'MetaAI'],
            answer : "Copilot",
            points : 10,
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let points = 0;

    let selectedLi = null;
    let selectedAns = null;
    let answerResult = [];

    startBtn.addEventListener('click' , startQuiz);

    nextBtn.addEventListener('click' , () => {
        const isCorrect = selectedAns === questions[currentQuestionIndex].answer;
        answerResult.push(isCorrect);
        if(isCorrect) {
            score++;
            points += questions[currentQuestionIndex].points;
        }
        /*if(selectedAns === questions[currentQuestionIndex].answer) {
            score++;
            points += questions[currentQuestionIndex].points;
        }*/
        selectedLi = null;
        selectedAns = null;
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length) {
            nextBtn.classList.add('hidden');
            displayQuestions();
        }
        else {
            showResults();
        }
    });

    restartBtn.addEventListener('click' , () => {
        currentQuestionIndex = 0;
        score = 0;
        selectedLi = null;
        points = 0;
        answerResult = [];
        startQuiz();
    });

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');

        displayQuestions();
    }

    function displayQuestions() {
        questionText.textContent =questions[currentQuestionIndex].questions;
        choiceList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach((choice) => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click' , () => selectAnswer(choice,li));
            choiceList.appendChild(li);
        })
    }

    function selectAnswer(choice,li) {
        if(selectedLi) {
            selectedLi.style.backgroundColor = "";
        }
        li.style.backgroundColor = "#69dc9e";
        selectedLi = li;

        selectedAns = choice;
        nextBtn.classList.remove('hidden');
    }

    function showResults() {
        nextBtn.classList.add('hidden');
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        scoreDisplayText.textContent = `${score} out of ${questions.length}`;
        displayPoints.textContent = points;

        displayHowManyRight.innerHTML = "";

        answerResult.forEach((isCorrect,index) => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = `${index + 1}`;
            resultDiv.style.backgroundColor = isCorrect ? "#69dc9e" : "#ff474c";

            displayHowManyRight.appendChild(resultDiv);
        });
    }
    
});



