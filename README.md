# REACT E NODE CHALLANGE

ENG: Challenge project in React.js and Node.js of an application solving the case of a professional who needs a system to monitor his clients' treatments, as well as his accounting from each service.

PT: Projeto de desafio em React.js e Node.js de uma aplicação resolvendo o caso de um profissional que precisa de um sistema para monitorar os tratamentos de seus clientes, bem como sua contabilidade de cada serviço.

# TECHNOLOGIES

Workspace:

- Yarn workspaces;

Deploy:

- Heroku

Backend:

- Node.js;
- ORM Sequelize using PostgreSQL;

* Dependencies:

  - express;
  - cors;
  - crypto;
  - dotenv;
  - http-status-codes;
  - joi;
  - md5;
  - pg;
  - sequelize;

* DevDependencies:

  - eslint;
  - eslint-config-airbnb-base;
  - eslint-plugin-import;
  - nodemon;
  - sequelize-cli;

Frontend:

- Dependencies:

  - @testing-library/jest-dom;
  - @testing-library - react;
  - @testing-library/user-event;
  - axios;
  - history;
  - jwt-decode;
  - react;
  - react-dom;
  - react-phone-input-2;
  - react-router-dom;
  - react-scripts;
  - react-touch-carousel;
  - web-vitals.

# RUNNING THE APPLICATION:

ENG: When cloning this project, use the "yarn" package manager with the command "yarn install" to install the packages needed to run this application.

PT: Ao clonar este projeto, use o gerenciador de pacotes "yarn" com o comando "yarn install" para instalar os pacotes necessários para executar esta aplicação.

ENG: To run the application locally, you will need to configure the following files:

PT: Para executar o aplicativo localmente, você precisará configurar os seguintes arquivos:

STEP 1/2: ".env.example" for ".env" with environment variable and value, as: DEV=true.
STEP 2/2: "jwt.evaluation.key.example" for "jwt.evaluation.key" with environment variable and value, as: secret.

- Running both workspaces.

```zsh
yarn start
```

- Running the backend with Nodemon.

```zsh
yarn start:server-dev
```

- Running the backend with Node.

```zsh
yarn start:server
```

- Running the frontend.

```zsh
yarn start:client
```

### Tests:

- Running all tests.

```zsh
yarn test
```

- Running one test.

```zsh
yarn test __tests__/integration/admin.test.js
```

### Sequelize:

- Drop database.

```zsh
yarn db:drop
```

- Create database.

```zsh
yarn db:create
```

- Migrate tables.

```zsh
yarn db:migrate
```

# CURRENT APPLICATION VERSION:

ENG: This version includes development of a good part of the back end and full development of the planned database. The development included tests of integration in TDD methodology throughout the back end so far, as well as adjustments when starting the front end.

PT: Esta versão conta com desenvolvimento de boa parte do back end e total desenvolvimento do banco de dados planejado. O desenvolvimento contou com testes de integração em metodologia TDD em todo o back end até aqui, assim como ajustes ao iniciar o front end.

# ISSUES:

ENG: As of this date, the application has problems deploying on Heroku that have not yet been resolved. There were also delays in the schedule due to the existence of other tasks in the same period, mainly harming the development of the front end and calculations for new API consumption queries.

PT: Até esta data, a aplicação tem problema em seu deploy no Heroku ainda não solucionados. Houveram também atrasos no cronograma pela existência de outras tarefas no mesmo período, prejudicando principalmente o desenvolvimento do front end e cálculos para novas queries de consumo da API.

# RESPONSIBLE:

<div>
  <table>
    <thead>
      <tr>
        <th>Autor</th>
      </tr>
    </thhead>
    <tbody>
      <tr>
        <td><img src="https://avatars.githubusercontent.com/u/47261292?v=4" alt="Adriano Monteiro" width="100x" /></td>
      </tr>
      <tr>
        <td style="text-align: center">
          <a href="https://www.linkedin.com/in/adrianomonteirodev/" target="_blank">Adriano Monteiro</a>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <a href="https://www.linkedin.com/in/adrianomonteirodev/" target="_blank">LinkedIn</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
