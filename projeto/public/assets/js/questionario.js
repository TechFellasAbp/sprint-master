const questionNumberIndicator = document.getElementById("question-number-indicator",);
const progressIndicator = document.getElementById("progress-indicator");
const nextButton = document.getElementById("next-button");
const questionTextElement = document.getElementById("enunciado");
const alternativeA = document.getElementById("text-a");
const alternativeB = document.getElementById("text-b");
const alternativeC = document.getElementById("text-c");
const alternativeD = document.getElementById("text-d");
const questionImage = document.getElementById("question-image");

function setQuestionNumberIndicator(idQuestao, numero) {
  questionNumberIndicator.innerHTML = `Questão ${idQuestao}`;
  let percentage = numero * 10;
  progressIndicator.style.width = `${percentage}%`;
}

function setQuestionHtml(question, a, b, c, d, image) {
  questionTextElement.textContent = question;
  alternativeA.textContent = a;
  alternativeB.textContent = b;
  alternativeC.textContent = c;
  alternativeD.textContent = d;
  if(image != null){
    questionImage.src = `assets/img/questionario/${image}`;
  } else{
    questionImage.src = "";
  }
}

async function getQuestion() {
  var token = localStorage.getItem("token");
  let endpoint = `api/questoes/proxima-questao`;

  const response = await fetch(endpoint, {
    method: "GET",
    //headers: { Authorization: `Bearer ${token}` },
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozMywiaWF0IjoxNzc5MjgyNDQyLCJleHAiOjE3NzkyODM2NDJ9.vDBCsIiqtZ3yzirQ3R4rhRO-DtkMZwGMzRsJEoeKa9M` },
  });

  const data = await response.json();

  if(data.numero == undefined){
    window.location.href = "resultado-questionario.html";
  }
  setQuestionNumberIndicator(data.id_questao, data.numero);
  setQuestionHtml(data.enunciado, data.alternativa_a, data.alternativa_b, data.alternativa_c, data.alternativa_d, data.imagem);
}

async function nextQuestion() {
  var token = localStorage.getItem("token");

  let endpoint = `api/questoes/proxima-questao`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization:
        //`Bearer ${token}`,
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozMywiaWF0IjoxNzc5MjgyNDQyLCJleHAiOjE3NzkyODM2NDJ9.vDBCsIiqtZ3yzirQ3R4rhRO-DtkMZwGMzRsJEoeKa9M`,
    },
  });
  const data = await response.json();

  //checa se o 'numero' é maior que 10, se sim, ir para tela de resultado questionário
  if(data.numero == undefined){
    window.location.href = "resultado-questionario.html";
  }

  let id_exame = 12; //TODO: achar uma forma de pegar o idexame automaticamente do banco de dados ou o backend
  let id_questao = data.id_questao;
  let resposta = "b";

  endpoint = `api/questoes/responder`;

  const next_response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozMywiaWF0IjoxNzc5MjgyNDQyLCJleHAiOjE3NzkyODM2NDJ9.vDBCsIiqtZ3yzirQ3R4rhRO-DtkMZwGMzRsJEoeKa9M`,
    },
    body: JSON.stringify({ id_exame, id_questao, resposta }),
  });

  getQuestion();
}

getQuestion();

nextButton.addEventListener("click", nextQuestion);
