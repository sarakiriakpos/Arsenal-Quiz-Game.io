const body = document.querySelector(".body");
const btnStart = document.getElementById("quiz-start");
const footer = document.querySelector(".footer");
const nextButton = document.querySelector("#next");
const quizWrapper = document.querySelector(".quiz__wrapper");
const quizBox = document.querySelector(".quiz__box");
const quizQuestion = document.querySelector(".quiz__heading");
const quizList = document.querySelector(".quiz__options");
const quiz = document.querySelector(".quiz");
const quizEnd = document.querySelector("#quiz__end");
const score = document.querySelector(".quiz__score-number");
let counter = document.querySelector(".quiz__counter-number");

let points = 0;

let sortQuestions, currentIndex, currentQuestion;

body.classList.add("body-flex");

function startQuiz() {
	quizWrapper.classList.add("hide");

	setTimeout(() => {
		
		body.classList.remove("body-flex");
		quizBox.classList.remove("hide");
	}, 500);

	currentIndex = 0;
	points = 0;
	sortQuestions = questions.sort(() => {
		return Math.random() - 0.5;
	});
	nextQuesiton();
}

const resetState = () => {
	nextButton.classList.add("hide");
	if (quizList.firstChild) {
		quizList.innerHTML = "";
	}
};

const nextQuesiton = () => {
	resetState();
	currentQuestion = sortQuestions[currentIndex];
	showQuestions(currentQuestion);
};

const showQuestions = (question) => {
	quizQuestion.textContent = question.question;
	question.answers.forEach((answer, index) => {
		index += 1;
		const button = document.createElement("button");
		button.innerHTML = answer.option;
		button.classList.add("quiz__options-list");
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		quizList.classList.remove("pointer-fix");
		button.addEventListener("click", checkAnswer);

		quizList.appendChild(button);
	});

	counter.innerText = `${currentIndex + 1} of ${sortQuestions.length}`;
};

const checkAnswer = (event) => {
	selectedOption = event.target;
	correct = selectedOption.dataset.correct;

	clearStatus(selectedOption);
	if (correct) {
		points += 5;
		score.textContent = `${points}`;
		quizList.classList.add("pointer-fix");
		selectedOption.classList.add("correct");
	} else {
		selectedOption.classList.add("wrong");
	}

	Array.from(quizList.children).forEach((button) => {
		setStatus(button, button.dataset.correct);
	});

	if (sortQuestions.length > currentIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		showResults();
	}
};

const setStatus = (element, correct) => {
	clearStatus(element);
	if (correct) {
		element.classList.add("correct");
	} else {
		element.classList.add("wrong");
	}
};

const clearStatus = (element) => {
	element.classList.remove("correct");
	element.classList.remove("wrong");
};

const showResults = () => {
	quiz.innerHTML = "";
	
	document.body.classList.add("body-flex");
	const markup = `
    <div class="quiz__end quiz-margin">
        <h1 class="end__heading-1">Game Over!</h1>
        <h2 class="end__heading-2">
        Your score is: 
        </h2>
        <p class="score">${points}</p>
        <button id="btn__reload" class="btn__reload next">
            Return to homepage
        </button>
    </div>
    `;

	quiz.insertAdjacentHTML("afterbegin", markup);

	document.getElementById("btn__reload").addEventListener("click", () => {
		window.location.reload();
	});
};

// Quiz Questions
 
const questions = [
	{
		question: "Who is Arsenal's highest goal scorer of all time?",
		answers: [
			{ option: "a: Mesut Ozil", correct: false },
			{ option: "b: Patrick Viera", correct: false },
			{ option: "c: Thierry Henry", correct: true },
			{ option: "d: Ian Wright", correct: false },
		],
	},

	{
		question: "Where is Arsenal's current home?",
		answers: [
			{ option: "a: Highbury Stadium", correct: false },
			{ option: "b: The London Stadium", correct: false },
			{ option: "c: The Emirates Stadium", correct: true },
			{ option: "d: Emirates Art Stadium", correct: false },
		],
	},

	{
		question: "How many times have Arsenal won the English Premier League?",

		answers: [
			{ option: "a: Ten", correct: false },
			{ option: "b: Fifteen", correct: false },
			{ option: "c: Zero", correct: false },
			{ option: "d: Thirteen", correct: true },
		],
	},

	{
		question: "Which part of London is Arsenal located?",

		answers: [
			{ option: "a: West London", correct: false },
			{ option: "b: North London", correct: true },
			{ option: "c: East London;", correct: false },
			{ option: "d: Central London", correct: false },
		],
	},

	{
		question: "Who is Arsenal's Longest serving manager?",

		answers: [
			{ option: "a: Mikel Arteta", correct: false },
			{ option: "b: Unai Emery", correct: false },
			{ option: "c: Arsene Wenger", correct: true },
			{ option: "d: Akpos Sarakiri", correct: false },
		],
	},
];

// Adding Event Listeners 

btnStart.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
	currentIndex++;
	nextQuesiton();
});
