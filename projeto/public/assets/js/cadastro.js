const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cpfInput = document.getElementById("cpf");
const passwordInput = document.getElementById("password");
const cadastrarInput = document.getElementById("button-cadastrar");

function normalizarCPF(cpf) {
    const txtSemEspaco = cpf.replace(/\s/g, "");
    const txtSemPontuacao = txtSemEspaco.replace(/[^0-9]/g, "");
    return txtSemPontuacao;
}

async function cadastrarUsuario() {
  var nome = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var cpf = normalizarCPF(document.getElementById("cpf").value.trim());
  var senha = document.getElementById("password").value.trim();

  if (nome == "") {
    alert("O nome é obrigatório.");
    return;
  }
  if (email == "") {
    alert("O e-mail é obrigatório.");
    return;
  }
  if (cpf == "") {
    alert("O CPF é obrigatório.");
    return;
  }
  if (cpf.length !== 11) {
    alert("CPF inválido. Informe os 11 dígitos.");
    return;
  }
  if (senha == "") {
    alert("A senha é obrigatória.");
    return;
  }
  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

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

    localStorage.setItem("token", data.token);
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "index.html";
  } catch (e) {
    //qualquer erro de conexão a internet ou coisas que não foi o erro do usuário
    alert(e.message ? e.message : "Ocorreu um erro interno.");
  }
}

cadastrarInput.addEventListener("click", cadastrarUsuario);
