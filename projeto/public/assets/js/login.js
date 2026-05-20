const cpfInput = document.getElementById("log-cpf");

async function loginUsuario(){
    // processar dados com trim()
    // colocar validação de input aqui (use um if para cada campo)
    const endpoint = `api/auth/login`
    var cpf = "";
    var senha = "";
    //TODO: fazer forma de armazenar esse token pro usuário poder usar na pagina de questionário, por exemplo
    var token = ""; 

    try{
        const response = await fetch(
            endpoint,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({cpf, senha})
            }
        )

        const data = await response.json();
        token = data.token;

        if(!response.ok){
            return console.log(data.message ? data.message : "Ocorreu um erro");
        }
        console.log("resposta: ",response);
        alert("Usuário logado com sucesso!");
        //window.location.href = "home.html";
    } catch(e){ //qualquer erro de conexão a internet ou coisas que não foi o erro do usuário
        alert("Erro interno do servidor");
    }
}

cpfInput.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        loginUsuario();
    }
});
