## Requisitos

1) O usuário deve poder criar seu cadastro com nome, email e senha
2) O sistema deve criar as configurações padrão de distribuição de receita após o cadastro do usuário
3) O usuário pode editar as configurações de distribuição de receita
4) O usuário deve poder cadastrar um ou mais valores de rendas para um mês
5) O sistema deve gerar sugestões dos valores distribuidos conforme os percentuais configuradas para a distribuição de renda
6) O usuãrio poderá indicar se efetuou a alocação da renda sugerida ou não
7) O usuário poderá indicar quanto alocou de cada valor entre: investimentos, despesas, reserva de emergência, planos e reserva de oportunidade
8) Os investimentos podem ser investimentos nacional ou no exterior
9) O usuário poderá informar o valor atual do investimento por dia
10) O usuário poderá ver em sua dashboard os investimentos
11) O usuário poderá ver em sua dashboard as rentabilidades do seus investimentos
12) O usuário poderá ver em sua dashboard os gastos totais de despesas
13) O usuário poderá ver em sua dashboard o valor de sua reserva de emergência
14) O usuário poderá ver em sua dashboard o quanto falta para atingir seus planos financeiros
15) O usuãrio poderá ver em sua dashboard o valor de sua reserva de oportunidade
15) O usuãrio poderá ver em sua dashboard valores ainda não alocadados da distribuição de renda
16) O usuário poderá fazer aportes dos valores ainda não alocados da distribuição de renda
17) O sistema deverá avisar o usuário quando utilizar o valor da reserva de oportunidade para balancear seus investimentos
18) O usuário deverá informar ao iniciar um novo investimento, reserva de emergência, plano ou reserva de oportunidade, se ja posui algum valor alocado para que esse seja inicializado como valor inicial
19) O usuário pode fazer um resgate de realocação, nesse caso o sistema deve gerar um MonthlyIncome com apenas uma linha de IncomeDistribution para que esse valor seja realocado

DB LISTS

investments
* id
* user_id
* name (B3 - Ações)
-> investments_values
  * id
  * investment_id
  * value
  * origin_id (FK to IncomeDistribution)

expenses
* id
* user_id
* name (Gastos mensais, Educação)
-> expenses_values
  * id
  * expense_id
  * value
  * origin_id (FK to IncomeDistribution)

plans
* id
* user_id
* name (Comprar PC Gamer)
-> plans_values
  * id
  * plan_id
  * value
  * origin_id (FK to IncomeDistribution)


POST http://localhost:3333/incomes-distribution/{id}/investment/{investmentId} (Faz aporte)
POST http://localhost:3333/investment (Cria a lista para aportes)