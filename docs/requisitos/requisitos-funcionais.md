## Requisitos Funcionais (RF)

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