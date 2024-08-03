# Fake GymPass

Projeto de uma RESTful API. O projeto foi criado para fins didáticos para solidifcar os conhecimentos com o micro-framework Fasitfy e a realização de testes com o Vitest.

Um dos focos do projeto foi trabalhar com alguns conceitos para criação de aplicações. Seguindo alguns princípios do SOLID, utilizei repository pattern para melhor divisão de camadas e suas responsabilidades, separando completamente as regras de negócio da aplicação do mundo externo, tanto do banco de dados, quanto dos endpoints. Isso, somado com a Injeção de Dependências, facilita e muito o processo de criação de testes, principalmente os testes unitários das regras de negócio, que são os testes mais importantes da aplicação. Além disso, os casos de uso (use-cases), foi desenvolvidos usando uma dinâmica de TDD.

#

Rotas disponíveis:

Users:

- /me (GET) - Retorna os dados do usuário com JWT válido

- /users (POST) - Cadastra um novo usuário

- /session (POST) - Autentica usuário, gerando token e refresh token

- /token/refresh (PATCH) - Atualiza autenticação do usuário com base em refresh token

Gyms:

- /gyms/search (GET) - Retorna o resultado da busca baseado no nome da academia (com paginação)

- /gyms/nearby (GET) - Retorna todas as academias proximas ao usuario

- /gyms (POST) - Cadastra uma nova academia (rota privada para usuários com a role "ADMIN")

Check-ins:

- /check-ins/history (GET) - Retorna todos os check-ins do usuário com JWT válido (com paginação)

- /check-ins/metrics (GET) - Retorna a quantidade de check-ins do usuário com JWT válido

- /gyms/:gymId/check-ins (POST) - Cadastra um novo check-in para o usuário com JWT válido

- /check-ins/:checkInId/validate (PATCH) - Valida o check-in do usuário (rota privada para usuários com a role "ADMIN")

#

### 🔨 Guia de instalação

Para visualizar o projeto é necessário possuir o NodeJS instalado em sua máquina. Você pode fazer um clone do repositório e executar os seguintes comandos no terminal para visualizar o projeto:

Clone o projeto

```
  git clone https://github.com/gctoledo/fake_gympass
```

Entre no diretório do projeto

```
  cd fake_gympass
```

Instale as dependências

```
  npm install
```

Inicie o servidor

```
  npm run start:dev
```

## 📦 Tecnologias usadas:

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
- ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
