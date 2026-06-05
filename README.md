[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

# Introducao

Este repositório contém o backend da aplicação **Hero Factory**, uma API REST para cadastro e gerenciamento de heróis.

A aplicação permite criar, listar, buscar, visualizar, editar, ativar, desativar e excluir heróis.

Contato: <a href="https://www.linkedin.com/in/giovani-appezzato" target="_blank">LinkedIn</a> - giovani.appezzato@gmail.com

## Tecnologias

- Node.js 22
- NestJS
- TypeScript
- TypeORM
- MySQL 8
- Docker
- Jest

## Antes de instalar

Certifique-se de que você tenha o Docker instalado. Caso não tenha, siga o guia <a href="https://www.docker.com/get-started" target="_blank">Primeiros passos com o Docker</a>.

Por padrão, a aplicação utiliza as portas abaixo:

- API: `3000`
- MySQL: `3306`

Caso alguma delas já esteja em uso, altere os valores `APP_PORT` e `MYSQL_PORT` no arquivo `.env` antes de subir os containers.

## Guia de instalacao

#### Clone o repositório

```bash
git clone https://github.com/GiovaniAppezzato/heroes-factory-backend
cd heroes-factory-backend
```

#### Copie o arquivo de ambiente

```bash
cp .env.example .env
```

#### Suba os containers

```bash
docker compose up -d --build
```

#### Execute as migrations

```bash
docker compose exec api npm run migration:run
```

Tudo pronto. A API estará disponível em:

```txt
http://localhost:<APP_PORT>
```

## Documentacao da API

A documentação para integração está disponível em:

```txt
docs/api.md
```

## Comandos úteis

#### Rodar migrations

```bash
docker compose exec api npm run migration:run
```

#### Reverter ultima migration

```bash
docker compose exec api npm run migration:revert
```

#### Ver migrations

```bash
docker compose exec api npm run migration:show
```

#### Rodar testes

```bash
docker compose exec api npm test
```

#### Rodar cobertura de testes

```bash
docker compose exec api npm run test:cov
```

#### Rodar lint

```bash
docker compose exec api npm run lint
```

<div align="center">
  Feito com ♡ por <a href="https://www.linkedin.com/in/giovani-appezzato">Giovani Appezzato</a><br>
    <b>Por favor, mantenha o código limpo e organizado. Obrigado!</b>
</div>
