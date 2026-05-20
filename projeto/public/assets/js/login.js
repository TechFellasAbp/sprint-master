const cpfInput = document.getElementById("log-cpf");
const senhaInput = document.getElementById("log-password");
const btnLogin = document.getElementById("btn-login");

function normalizarCPF(cpf) {
    const txtSemEspaco = cpf.replace(/\s/g, "").trim();
    const txtSemPontuacao = txtSemEspaco.replace(/[^0-9]/g, "");
    return txtSemPontuacao;
}

async function loginUsuario() {
    var cpf = normalizarCPF(cpfInput.value); 
    var senha = document.getElementById("log-password").value.trim();

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

    const endpoint = `api/auth/login`;
    var token = "";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf, senha })
        });

        const data = await response.json();
        token = data.token;

        if(!response.ok) {
            return alert(data.message ? data.message : "Ocorreu um erro");
        }

        localStorage.setItem("token", token);
        alert("Usuário logado com sucesso!");
        window.location.href = "home.html";
    } catch (e) {
        alert("Erro interno do servidor");
    }
}

btnLogin.addEventListener("click", loginUsuario)
