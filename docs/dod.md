# 🏆 Definition of Done (DoD)


## RF01 - Cadastro de usuário
- CPF é validado 
- E-mail válido 
- Senha armazenada com hash
- Dados persistidos corretamente no banco
- Mensagens de erro exibidas 
- Testado manualmente 
<br>

## RF02 - Login com CPF e senha
- Login aceita apenas CPF + senha
- Validação de credenciais com segurança
- Retorno de erro para login inválido
- Testado fluxo completo (login/logout)
<br>

## RF03 - Seleção aleatória de 10 questões
- Sistema seleciona exatamente 10 questões
- Questões pertencem ao nível correto
- Não há repetição de questões
- Randomização 
- Testado com múltiplas execuções
<br>

## RF04 - Classificação de dificuldade
- Todas as questões possuem campo: fácil/médio/difícil
- Banco contém distribuição válida
- Testado via consulta ao banco
<br>

## RF05 - Distribuição das questões (3F, 4M, 3D)
- Sistema garante:3 fáceis, 4 médias e 3 difíceis
- Randomização dentro de cada categoria
- Testado com diferentes cenários
<br>

## RF06 - Máximo de 2 tentativas por nível
- Contador de tentativas implementado
- Bloqueio após 2 tentativas
- Mensagem clara ao usuário
- Testado (tentativa 1, 2, 3)
<br>

## RF07 - Melhor nota por nível
- Sistema compara tentativas
- Armazena apenas a maior nota como “final”
- Não sobrescreve com nota menor
- Testado com cenários
<br>

## RF08 - Média final do usuário
- Cálculo correto da média entre níveis
- Considera apenas notas finais
- tualização automática após conclusão
- Testado com múltiplos níveis
<br>

## RF09 - Emissão de certificado
- Contém: Nome, CPF, E-mail, Data e Média final
- Layout legível
- Dados corretos e consistentes
- Gerado em formato exportável
- Testado
<br>

## RF10 - Histórico de tentativas
- Armazena: Data/hora, pontuação e questões sorteadas
- Persistência garantida
- Consulta funcional
- Testado com múltiplas tentativas
<br>

## RF11 - Consulta de progresso
- Exibe: níveis concluídos, tentativas restantes e melhor nota
- Dados atualizados em tempo real
- Interface clara
- Testado com diferentes estados do usuário
<br>

## RF12 - Área administrativa (opcional)
- CRUD de: questões, níveis, imagens
- Validação de dados
- Acesso restrito (auth)
- Testado com criação/edição/exclusão

<br>

---
<br>


## RNF01 - Interface responsiva
- Funciona em mobile e desktop
- Layout adaptável (flex/grid)
- Sem quebra visual
- Testado em diferentes telas
<br>

## RNF02 - Tempo de resposta
- Tempo de carregamento aceitável 
- Queries otimizadas
- Feedback visual (loading)
- Testado com dados reais
<br>

## RNF03 - LGPD
- Dados sensíveis protegidos
- CPF e senha não expostos
- Testado com análise de segurança básica
<br>

## RNF04 - Segurança contra fraude
- Tentativas e notas validadas no servidor
- Proteção contra manipulação de requisições
- Testado via tentativa de alteração manual 
<br>

## RNF05 - Práticas ágeis
- Eventos do SCRUM (planning, daily, review, retrospective)
- Backlog organizado
- Uso de versionamento (Git)
- Commits descritivos
- DoD definido
<br>

## RNF06 - Documentação
- Banco de dados documentado
- Rotas descritas
- Instruções de execução claras
- Diagramas UML (caso de uso e sequência)
- README presente no projeto