Projeto Node.js - Gerenciamento de Usuários e Tarefas
Descrição
Este projeto é uma aplicação Node.js para gerenciamento de usuários e tarefas, que oferece diversas funcionalidades através de uma API RESTful.

Funcionalidades
Usuários
Rota de Login

Endpoint: POST /api/login
Descrição: Permite que um usuário faça login na aplicação.
Rota de Cadastro de Novo Cliente

Endpoint: POST /api/clientes
Descrição: Cria um novo cliente na base de dados.
Rota para Listar Usuários

Endpoint: GET /api/usuarios
Descrição: Retorna a lista de todos os usuários cadastrados.
Rota para Editar um Usuário Específico

Endpoint: PUT /api/usuarios/:id
Descrição: Permite editar as informações de um usuário específico.
Rota para Criar um Novo Usuário

Endpoint: POST /api/usuarios
Descrição: Cria um novo usuário na base de dados.
Rota para Excluir um Usuário Específico

Endpoint: DELETE /api/usuarios/:id
Descrição: Remove um usuário específico da base de dados.
Rota para Contar Usuários por Função

Endpoint: GET /api/usuarios/count-by-role
Descrição: Retorna a quantidade de usuários agrupados por função (Engenheiro de FE, Engenheiro de BE, Analista de Dados, Líder Técnico).
Tarefas
Rota para Listar Tarefas do Usuário Logado

Endpoint: GET /api/tarefas
Descrição: Retorna a lista de tarefas atribuídas ao usuário logado.
Rota para Editar uma Tarefa Específica do Usuário Logado

Endpoint: PUT /api/tarefas/:id
Descrição: Permite editar os detalhes de uma tarefa específica atribuída ao usuário logado.
Rota para Excluir uma Tarefa Específica do Usuário Logado

Endpoint: DELETE /api/tarefas/:id
Descrição: Remove uma tarefa específica atribuída ao usuário logado da base de dados.
Rota para Criar uma Nova Tarefa

Endpoint: POST /api/tarefas
Descrição: Cria uma nova tarefa na base de dados.
Rota para Listar Tarefas sem Dono

Endpoint: GET /api/tarefas/sem-dono
Descrição: Retorna a lista de tarefas que ainda não foram atribuídas a nenhum usuário.
Rota para Adicionar um Dono a uma Tarefa Específica

Endpoint: PUT /api/tarefas/:id/adicionar-dono
Descrição: Atribui um dono específico a uma tarefa que ainda não tinha dono.

