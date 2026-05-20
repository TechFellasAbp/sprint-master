const questionNumberIndicator = document.getElementById("question-number-indicator");
const progressIndicator = document.getElementById("progress-indicator");
const nextButton = document.getElementById("next-button");

function setQuestionNumberIndicator(idQuestao, numero){
    questionNumberIndicator.innerHTML = `Questão ${idQuestao}`
    /*
        TODO: aqui, colocar código para, com base na variavel 'numero', gerar uma função de porcentagem
        e mudar o valor da width do 'progressIndicator', que foi importado aqui
    */
}

function setQuestionHtml(a, b, c, d, e){
    //TODO: fazer o mesmo que foi feito na função de number indicator mas para o título da questão e as alternativas
    //enunciado
    //alternativa a
    //alternativa b
    //alternativa c
    //alternativa d
}

async function getQuestion(){
    let endpoint = `api/questoes/proxima-questao`;

    const response = await fetch(
        endpoint,
        {
            method: "GET",
            headers: {"Authorization": "Bearer SEU_TOKEN"},
        }
    )

    const data = await response.json();
    console.log(data.id_questao);
    setQuestionNumberIndicator(data.id_questao, data.numero);
}

async function nextQuestion(){
    //TODO: fazer um if para checar se o 'numero' é maior que 10, se sim, ir para tela de resultado questionário
    //window.location.href = "resultado-questionario.html";

    let endpoint = `api/questoes/proxima-questao`;
    const response = await fetch(
        endpoint,
        {
            method: "GET",
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyNywiaWF0IjoxNzc5MDQ5MTA1LCJleHAiOjE3NzkwNTAzMDV9._W2dVyBH9VJCQSt_1AuNUmy1gaf5Gon7EBbgMnJKaD4"},
        }
    )
    const data = await response.json();

    //essas variaveis tem que ser exatamente o que é desestruturado no backend
    let id_exame = 10; //TODO: achar uma forma de pegar o idexame automaticamente do banco de dados ou o backend
    let id_questao = data.id_questao;
    let resposta = "b";

    endpoint = `api/questoes/responder`;

    const next_response = await fetch(
        endpoint,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer SEU_TOKEN"
            },
            body: JSON.stringify({id_exame, id_questao, resposta})
        }
    )

    getQuestion();
} 

getQuestion();

nextButton.addEventListener("click", nextQuestion);
