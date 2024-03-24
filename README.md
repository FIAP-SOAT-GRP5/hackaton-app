# Hackaton App

Este repositório contém uma aplicação MVC de um sistema de registro de ponto eletrônico da Hackaton Company SA. A API permite autenticar usuários com login e senha, registrar os pontos nos horários de entrada, saída e retorno do almoço e saída. Também emite um relatório mensal com o espelho de ponto dos registros do mês.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FIAP-SOAT-GRP5_ms-order&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=FIAP-SOAT-GRP5_ms-order)

## Pré-requisitos

- Node.js
- Docker

## Começando

Siga as instruções abaixo para obter uma cópia do projeto localmente e executá-lo para fins de desenvolvimento e teste.

1. Faça o download do repositório do projeto:

```shell
git clone [https://github.com/FIAP-SOAT-GRP5/ms-order.git](https://github.com/FIAP-SOAT-GRP5/hackaton-app.git)
```

2. Instale as dependências necessárias, se necessário:

```shell
cd hackaton-app
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes informações de banco de dados:

```
NODE_ENV="development"
TZ="America/São Paulo"
PORT="3000"

DB_TYPE="mysql"
DB_HOST="localhost"
DB_PORT="3306"
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE="app"

JWT_KEY=""

EMAIL_USER="email@gmail.com"
EMAIL_PASS=""
```

## Documentação das rotas

### Usuario(s)

A tabela "usuario" já foi previamente preenchida na migration

Esses usuários foram inseriodos para permitir sua autenticação para acessar funções restritas do sitema, como registro de ponto. 

#### Autenticar

Para autenticar um usuário, utilize o endpoint `/autenticacao` com o método POST.

Endpoint: `POST /autenticacao`

Exemplo de dados para autenticar um usuario:

```json
{
	"matricula": "0000001",
	"senha": "Mudar.123
}
```
Utilize o token enviado nesta rota no header da requisição para utilizar as demais rotas.

### Registro Ponto(s)

A tabela "registro_ponto" contém as informações de data e horário de entrada, saída para almoço, retorno do almoço e saída de todos os usuários. O token do header é utilizado para identificar o usuário e registrar os horários trabalhados do dia.

#### Registrar Ponto

Para registrar o ponto, inserir o token recebido na rota de autenticação no header desta requisição e utilize o endpoint `/registro-ponto` com o método POST.

#### Relatório por usuário

Para gerar o espelho de registro de pontos mensal do usuário, inserir o token recebido na rota de autenticação no header desta requisição e utilize o endpoint `/registro-ponto//relatorio-por-usuario/:{id}` com o método GET.

Lembre-se de substituir {id} pelo ID real do pedido.
