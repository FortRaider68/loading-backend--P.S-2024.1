# CA Bulletin - API
## Proposta de projeto Backend - Loading 2024.1

CA Bulletin é um feed para notícias, divugações e editais para o Centro Acadêmico de Engenharia de Computação.
Esta ideia foi criada como proposta de projeto backend para o processo seletivo da Loading (Empresa junior do curso de Engenharia de Computação UFC/Sobral).

## Projeto
O projeto se encontra na forma de uma APIRest. Ele não tem uma interface gráfica convencional (Página Web) e por isso o uso de programas como o [Postman](https://www.postman.com/), [insomnia](https://insomnia.rest/) ou Curl se fazem necessários. 

API: 

- [NodeJS](https://nodejs.org/)
- [Postgres](https://www.postgresql.org/)
- ExpressJS
- Sequelize
- JWT

### Desenvolvimento:
- Nodemon
- Postman
- [VSCode](https://code.visualstudio.com/)

## Ambiente de desenvolvimento

Para rodar o projeto precisaremos instalar:

- VSCode (IDE para edição do código)
- [Git](https://git-scm.com/downloads) (Versionador de código. Vamos obter o código do repositório online por aqui.)
- NodeJS (Runtime de javascript. Linguagem escolhida para o nosso projeto.)

Vamos abrir o VSCode na raiz do nosso projeto e executar no terminal.

`npm init `

Os pacotes necessários serão então instalados.

### Variáveis de Ambiente
Há 4 variáveis de ambiente que precisam ser declaradas em um arquivo `.env` na raiz do projeto antes de executá-lo.

        PORT_NODE = <escolha a porta em que vai acessar pelo localhost. Sugestão:3000>
        CONNECTION_STRING = <url de conexão com o banco de dados>
        SECRET_JWT_HASH = <hash MD5 aleatória. Você pode gerar uma pela internet>
        POSTS_PER_PAGE = <é o número de posts por página no sistema de paginação. Sugestão: 3>

### Banco de Dados
Para o desenvolvimento deste projeto, uma instancia online do sistema de gerenciamento de banco de dados Postgres, foi usada. Esta instância é provida temporariamente por [Render](https://render.com/), que em maio de 2024 provê um plano gratuito com disponibilidade para uma instancia do Postgres.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/)

Clique [aqui](https://docs.render.com/databases) para um tutorial sobre como dar deploy em um banco postgres no Render. 

Não esqueça de copiar Dashboard>Connections>External Database URL e definí-lo como sua variável `CONNECTION_STRING` para conexão com o Banco.

## Rodando

`npm run dev`

Para iniciar a aplicação.

## Documentação da API

Clique [aqui](https://documenter.getpostman.com/view/35331637/2sA3QwaURE) para consultar a documentação da API pelo Postman.
