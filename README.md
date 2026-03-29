# Sprint Master - ABP I
[ logo do projeto aqui ]

Aplicação Web desenvolvida para ensinar metodologias ágeis

<br>

## 📚 Sumário
[Sobre o Projeto](#-sobre-o-projeto) | [Requisitos](#-requisitos) | [Product Backlog](#-product-backlog) | [Sprints](#-sprints)  | [Tecnologias](#%EF%B8%8F-tecnologias) | [Nossa Equipe](#%E2%80%8D-nossa-equipe)

<br>

## 📌 Sobre o Projeto
  **Sprint Master** é uma plataforma web desenvolvida pela equipe **TechFellas** com a missão de facilitar o aprendizado de metodologias ágeis. O portal combina teoria e prática, oferecendo artigos, materiais complementares e atividades interativas. Ao concluir os quizzes com sucesso, o estudante é recompensado com um certificado de conclusão.

<br>

## 📋 Requisitos 

### Requisitos Funcionais (RF)
| ID | Descrição |
| :- | :-------- |
| RF01 | O sistema deve permitir o cadastro do usuário utilizando CPF (como identificador único), nome completo, e-mail e senha.| 
| RF02 | O login no sistema deve ser realizado exclusivamente por meio de CPF e senha. | 
| RF03 | Para cada nível, o sistema deve selecionar aleatoriamente 10 questões a partir de um banco com 30 questões daquele nível, respeitando a classificação de dificuldade.| 
| RF04 | As questões de cada nível devem ser classificadas em três graus de dificuldade: fáceis, médias e difíceis. | 
| RF05 | Cada avaliação de nível apresentada ao usuário deve ser composta obrigatoriamente por 3 questões fáceis, 4 questões médias e 3 questões difíceis, selecionadas de forma aleatória dentro de cada categoria. | 
| RF06 | O usuário deve poder realizar no máximo 2 tentativas por nível. | 
| RF07 | Para cada nível, a nota final do usuário deve ser a maior nota obtida entre as tentativas realizadas.| 
| RF08 | O sistema deve calcular o resultado final do usuário como a média das notas finais obtidas em cada nível.| 
| RF09 |  O sistema deve emitir um certificado final contendo, no mínimo: nome completo, CPF, email, data de emissão, e a média final (com discriminação das notas por nível, se desejável). | 
| RF10 | O sistema deve manter histórico das tentativas por nível (data/hora, pontuação, questões sorteadas) para auditoria e acompanhamento. | 
| RF11 | O sistema deve permitir a consulta do progresso do usuário (níveis concluídos, tentativas restantes, melhor nota por nível). | 
| RF12 | O sistema pode disponibilizar uma área administrativa para cadastro e manutenção das questões, níveis e imagens. | 

<br>

### Requisitos Não Funcionais (RNF)
| ID | Descrição |
| :- | :-------- |
| RNF01 | A interface deve ser simples, clara e responsiva, permitindo uso em dispositivos móveis |
| RNF02 | A aplicação deve apresentar tempo de resposta adequado para carregamento de páginas e registro de respostas. |
| RNF03 |  Os dados pessoais (nome, e-mail e CPF) devem ser tratados em conformidade com a LGPD, com armazenamento e acesso restritos ao necessário |
| RNF04 | O sistema deve evitar fraudes triviais, garantindo que a contagem de tentativas e o cálculo das notas não possam ser alterados apenas por manipulação no front-end.|
| RNF05 | O projeto deverá adotar práticas básicas de desenvolvimento ágil, incluindo gestão de backlog, planejamento em sprints, versionamento de código e definição de critérios de pronto (DoD).|
| RNF06 |  Deve existir documentação mínima do projeto (modelo de dados, instruções de execução e descrição das rotas/funcionalidades). |

<br>

### Restrição do Projeto (RP)
| ID | Descrição |
| :- | :-------- |
| RP01 | O front-end deve ser desenvolvido utilizando HTML, CSS e JavaScript, sem frameworks. |
| RP02 | O banco de dados deve ser PostgreSQL, com uso explícito de DDL (criação de tabelas) e DML (inserção/consulta/atualização) |
| RP03 | O back-end deve implementar a comunicação com o PostgreSQL e expor as funcionalidades necessárias ao front-end (por páginas dinâmicas e/ou endpoints HTTP), utilizando tecnologia compatível com aplicações web modernas.|
| RP04 | O sistema deve armazenar, no banco de dados, usuários, níveis, questões, alternativas, tentativas e resultados.|
| RP05 | O escopo do projeto deverá ser compatível com o tempo disponível para desenvolvimento ao longo do semestre, priorizando um MVP funcional.|

<br>

## 📄 Product Backlog

<br>
  
## 🎯 Sprints

| Sprints | Data | Stauts | Relatório | Burn-Down | Vídeo | 
| --------| ---- | ------ | --------- | --------- | ----- |
| 1 | 13/04/2026 | ⬜ | [Ver relatório](#-sprint-backlog) | [Ver Burn-Down](#-burn-down) | Ver vídeo |
| 2 | 04/05/2026 | ⬜ | [Ver relatório](#-sprint-backlog-1) | [Ver Burn-Down](#-burn-down-1) | Ver vídeo |
| 3 | 25/05/2026 | ⬜ | [Ver relatório](#-sprint-backlog-2) | [Ver Burn-Down](#-burn-down-2) | Ver vídeo |

### Legenda: 
- ⬜ : Não iniciado
- ⌛ : Em andamento
- ✅ : Concluído

<br>

## 🎯 Sprint 01:

### 📄 Sprint Backlog

### 📉 Burn-Down

<br>

## 🎯 Sprint 02:

### 📄 Sprint Backlog

### 📉 Burn-Down

<br>

## 🎯 Sprint 03:

### 📄 Sprint Backlog

### 📉 Burn-Down

<br>

## 🛠️ Tecnologias
[![My Skills](https://skillicons.dev/icons?i=html,css,js,nodejs,git,figma)](https://skillicons.dev)

<br>

## 👩‍💻 Nossa Equipe
<table>
  <tr>
    <td align="center" width="160px">
      <a href="https://github.com/HeyLavenderBee" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/132353184?v=4" width="100px;" alt="Júlia Rodrigues"/><br>
        <strong>Júlia Rodrigues</strong>
      </a><br>
       Product Owner
      <br>
      <a href="https://www.linkedin.com/in/juliarodrigues3141/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td> 
    <td align="center" width="160px">
      <a href="https://github.com/abeatrizoliveira" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/132356935?v=4" width="100px;" alt="Beatriz Oliveira"/><br>
        <strong>Beatriz Oliveira</strong>
      </a><br>
       Scrum Master
      <br>
      <a href="https://www.linkedin.com/in/a-beatrizoliveira" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td> 
    <td align="center"  width="160px">
      <a href="https://github.com/fernandafonseca-dev" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/263787851?v=4" width="100px;" alt="Fernanda Fonseca"/><br>
        <strong>Fernanda Fonseca</strong>
      </a><br>
       Desenvolvedora
      <br>
      <a href="https://www.linkedin.com/in/fernanda-fonseca-37b9893b6/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
     <td align="center" width="160px">
      <a href="https://github.com/GMP-Tech9" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/263511136?v=4" width="100px;" alt="Guilherme Matos"/><br>
        <strong>Guilherme Matos</strong>
      </a><br>
       Desenvolvedor
      <br>
      <a href="https://www.linkedin.com/in/guilherme-matos-120827365/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
</table>

<table style="width: 600px;">
  <tr>
    <td align="center" width="160px">
      <a href="https://github.com/juliasilverio-dev" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/262029760?v=4" width="100px;" alt="Júlia de Oliveira"/><br>
        <strong>Júlia de Oliveira</strong>
      </a><br>
       Desenvolvedora
      <br>
      <a href="https://www.linkedin.com/in/j%C3%BAlia-silv%C3%A9rio-593b423b9/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
   <td align="center" width="160px"> 
      <a href="https://github.com/Darcyasn08" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/132584182?v=4" width="100px;" alt="Darcy Salmazzo"/><br>
        <strong>Darcy Salmazzo</strong>
      </a><br>
       Desenvolvedora
      <br>
      <a href="https://www.linkedin.com/in/lucas-salmazzo-9852343a0/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
    <td align="center" width="160px">
      <a href="https://github.com/KauaCristian-Dev" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/260771590?v=4" width="100px;" alt="Kauã Cristian"/><br>
        <strong>Kauã Cristian</strong>
      </a><br>
       Desenvolvedor
      <br>
      <a href="#" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
     <td align="center" width="160px">
      <a href="https://github.com/Mari432hz" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/213532358?v=4" width="100px;" alt="Mariana Tavares"/><br>
        <strong>Mariana Tavares</strong>
      </a><br>
       Desenvolvedora
      <br>
      <a href="https://www.linkedin.com/in/mariana-tavares-perfil/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
</table>
