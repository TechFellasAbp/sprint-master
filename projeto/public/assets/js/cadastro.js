const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cpfInput = document.getElementById("cpf");
const passwordInput = document.getElementById("password");
const cadastrarInput = document.getElementById("button-cadastrar");

async function cadastrarUsuario() {
  // fazer processamento dos valores dos inputs com trim, e passar para as variaveis
  // colocar validação de input aqui (use um if para cada campo)

  var nome = nameInput.value;
  var email = emailInput.value;
  var cpf = cpfInput.value;
  var senha = passwordInput.value;

  const endpoint = `api/usuarios`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, cpf, senha }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return console.log(
        errorData.message ? errorData.message : "Ocorreu um erro",
      );
    }
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "index.html";
  } catch (e) {
    //qualquer erro de conexão a internet ou coisas que não foi o erro do usuário
    alert(e.message ? e.message : "Ocorreu um erro interno.");
  }
}

nameInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    cadastrarUsuario();
  }
});

cadastrarInput.addEventListener("click", cadastrarUsuario);
