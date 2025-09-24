# Just-dreams-2
Objetivo: Alfabetizar e letrar crianças de 8 a 10 anos, de forma lúdica e interativa, utilizando profissões como fio condutor do aprendizado.

<<<<<<< HEAD
# 🎮 JustDreams - Sistema Educacional Gamificado

Sistema completo de gerenciamento de turmas e acompanhamento de progresso de alunos com interface web e API REST.

## 🌟 Funcionalidades

- **👨‍🏫 Painel do Professor**: Gerenciar turmas, cadastrar alunos e acompanhar progresso
- **👨‍🎓 Painel do Aluno**: Acessar jogos educacionais e acompanhar próprio progresso
- **🎮 Jogo Educacional**: Sistema gamificado para aprendizado
- **📊 Relatórios**: Acompanhamento detalhado do progresso dos alunos
- **🔐 Autenticação Segura**: Sistema de login com JWT

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização moderna
- **JavaScript** - Interatividade
- **Responsive Design** - Interface adaptável

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **MySQL** (versão 5.7 ou superior) - [Download aqui](https://dev.mysql.com/downloads/)
- **Git** - [Download aqui](https://git-scm.com/)

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd API-JustDrems
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados MySQL

1. Abra o MySQL Workbench ou terminal do MySQL
2. Execute o comando para criar o banco:
```sql
CREATE DATABASE justdreams;
```

### 4. Configure as variáveis de ambiente

1. Copie o arquivo de configuração:
```bash
cp config.example.js .env
```

2. Edite o arquivo `.env` com suas configurações:
```env
# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados
DB_HOST=localhost
DB_NAME=justdreams
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql

# JWT Secret (IMPORTANTE: Altere em produção)
JWT_SECRET=seu_segredo_super_seguro_e_aleatorio_para_jwt

# Configurações de Desenvolvimento
NODE_ENV=development
```

### 5. Inicie o servidor
```bash
npm run dev
```

### 6. Acesse o sistema
- **API**: `http://localhost:3000`
- **Interface Web**: Abra o arquivo `Just-dreams-main/JustDreams/professor_login.html` no navegador

## 🎯 Como Testar o Sistema

### 1. Cadastro de Professor
1. Acesse `professor_cadastro.html`
2. Preencha os dados do professor
3. Clique em "Cadastrar"

### 2. Login do Professor
1. Acesse `professor_login.html`
2. Use as credenciais criadas
3. Acesse o painel do professor

### 3. Cadastro de Aluno
1. Acesse `aluno_cadastro.html`
2. Preencha os dados do aluno
3. Clique em "Cadastrar"

### 4. Login do Aluno
1. Acesse `aluno_login.html`
2. Use as credenciais criadas
3. Acesse o painel do aluno

### 5. Criar Turma (Professor)
1. No painel do professor, clique em "Criar Nova Turma"
2. Preencha os dados da turma
3. Gere um código para os alunos

### 6. Adicionar Aluno à Turma
1. No painel do professor, clique em "Cadastrar Alunos"
2. Adicione alunos à turma usando o código gerado

### 7. Testar o Jogo
1. Faça login como aluno
2. Acesse o jogo educacional
3. Complete as atividades para gerar progresso

## 📚 Endpoints da API

### Autenticação

#### POST /api/auth/register
Registra um novo usuário (professor ou aluno).

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "tipo": "professor", // ou "aluno"
  "idade": 25 // obrigatório apenas para alunos
}
```

#### POST /api/auth/login
Realiza login do usuário.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

### Turmas (Apenas Professores)

#### POST /api/turmas
Cria uma nova turma.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "nome": "Matemática Básica",
  "codigo": "MAT001",
  "descricao": "Curso de matemática para iniciantes"
}
```

#### GET /api/turmas
Lista todas as turmas do professor.

**Headers:**
```
Authorization: Bearer <token>
```

#### POST /api/turmas/:turmaId/alunos
Adiciona um aluno à turma.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "alunoEmail": "aluno@email.com"
}
```

#### GET /api/turmas/:turmaId/alunos
Lista todos os alunos de uma turma.

**Headers:**
```
Authorization: Bearer <token>
```

### Progresso

#### GET /api/progresso/:alunoId
Consulta o progresso de um aluno.

**Headers:**
```
Authorization: Bearer <token>
```

**Acesso:**
- Alunos podem consultar apenas seu próprio progresso
- Professores podem consultar o progresso de alunos de suas turmas

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Inclua o token no header `Authorization`:

```
Authorization: Bearer <seu_token>
```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais:
- **professores** - Dados dos professores
- **alunos** - Dados dos alunos
- **turmas** - Dados das turmas
- **progresso** - Progresso dos alunos por turma

### Tabelas de Relacionamento:
- **professores_turmas** - Relacionamento professor-turma
- **alunos_turmas** - Relacionamento aluno-turma

## 🚦 Códigos de Status HTTP

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Dados inválidos
- **401** - Não autorizado
- **403** - Acesso negado
- **404** - Não encontrado
- **409** - Conflito (recurso já existe)
- **500** - Erro interno do servidor

## 📝 Exemplo de Resposta de Sucesso

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    // dados específicos da operação
  }
}
```

## ❌ Exemplo de Resposta de Erro

```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

## 🧪 Testando a API

Você pode testar a API usando ferramentas como:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code)

## 📁 Estrutura do Projeto

```
API-JustDrems/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Professor.js
│   │   ├── Aluno.js
│   │   ├── Turma.js
│   │   ├── Progresso.js
│   │   ├── ProfessorTurma.js
│   │   ├── AlunoTurma.js
│   │   └── index.js
│   └── routes/
│       ├── auth.js
│       ├── turmas.js
│       └── progresso.js
├── server.js
├── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm start` - Inicia o servidor em modo produção

## 🚨 Solução de Problemas

### Erro de Conexão com MySQL
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solução**: Verifique se o MySQL está rodando e as credenciais no arquivo `.env` estão corretas.

### Erro de Porta em Uso
```
Error: listen EADDRINUSE :::3000
```
**Solução**: Altere a porta no arquivo `.env` ou pare outros processos usando a porta 3000.

### Erro de Módulos Não Encontrados
```
Cannot find module 'express'
```
**Solução**: Execute `npm install` para instalar todas as dependências.

### Problemas com CORS
Se houver problemas de CORS ao testar a API, verifique se o servidor está rodando na porta correta.

## 📁 Estrutura do Projeto

```
API-JustDrems/
├── src/                          # Código do backend
│   ├── config/
│   │   └── database.js           # Configuração do banco
│   ├── middleware/
│   │   └── auth.js               # Middleware de autenticação
│   ├── models/                   # Modelos do banco de dados
│   │   ├── Professor.js
│   │   ├── Aluno.js
│   │   ├── Turma.js
│   │   ├── Progresso.js
│   │   └── ...
│   └── routes/                   # Rotas da API
│       ├── auth.js
│       ├── turmas.js
│       └── progresso.js
├── Just-dreams-main/             # Interface web
│   └── JustDreams/
│       ├── professor_login.html
│       ├── professor_dashboard.html
│       ├── aluno_login.html
│       ├── aluno_cadastro.html
│       └── ...
├── server.js                     # Servidor principal
├── package.json                  # Dependências
├── config.example.js            # Exemplo de configuração
└── README.md                    # Este arquivo
```

## 🎮 Funcionalidades do Jogo

- **Sistema de Avatares**: Escolha de personagens personalizados
- **Progressão por Níveis**: Sistema de pontuação e conquistas
- **Relatórios Detalhados**: Acompanhamento do desempenho
- **Interface Responsiva**: Funciona em desktop e mobile

## 🔐 Segurança

- Senhas são criptografadas com bcrypt
- Tokens JWT para autenticação
- Validação de dados de entrada
- Middleware de autenticação em rotas protegidas

## 📞 Suporte

Se encontrar problemas:

1. Verifique se todos os pré-requisitos estão instalados
2. Confirme se o MySQL está rodando
3. Verifique as configurações no arquivo `.env`
4. Consulte a seção de solução de problemas acima

## 📄 Licença

Este projeto está sob a licença MIT.


**Desenvolvido com ❤️ para educação gamificada**



