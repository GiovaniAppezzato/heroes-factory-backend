# Documentação da API

Documento de apoio para integração do frontend com a API da aplicação **Hero Factory**.

## Base URL

Em ambiente local, a API fica disponível em:

```txt
http://localhost:<APP_PORT>
```

O valor padrão de `APP_PORT` é `3000`.

Exemplo:

```txt
http://localhost:3000
```

## Headers

Para requests com body JSON, envie:

```http
Content-Type: application/json
```

Não há autenticação.

## Modelo de Hero

Todas as respostas de herói seguem este formato:

```json
{
  "id": "1498ba98-2d4f-488f-8ca6-869897c3bf30",
  "name": "Robert Bruce Banner",
  "nickname": "Hulk",
  "date_of_birth": "1962-04-10 00:00:00",
  "universe": "Marvel",
  "main_power": "Force",
  "avatar_url": "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
  "is_active": true,
  "created_at": "2026-06-05 01:15:10",
  "updated_at": "2026-06-05 01:42:35"
}
```

### Campos

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | string UUID | Identificador único do herói |
| `name` | string | Nome completo |
| `nickname` | string | Nome de guerra |
| `date_of_birth` | string | Data de nascimento formatada como `YYYY-MM-DD HH:mm:ss` |
| `universe` | string | Universo do herói |
| `main_power` | string | Principal poder ou habilidade |
| `avatar_url` | string | URL da imagem/avatar |
| `is_active` | boolean | Indica se o registro está ativo |
| `created_at` | string | Data de criação formatada como `YYYY-MM-DD HH:mm:ss` |
| `updated_at` | string | Data de atualização formatada como `YYYY-MM-DD HH:mm:ss` |

## Listar heróis

```http
GET /heroes
```

Lista heróis paginados, ordenados por `created_at` do mais recente para o mais antigo.

### Query params

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
| --- | --- | --- | --- | --- |
| `page` | number | Não | `1` | Página desejada. Deve ser maior ou igual a 1 |
| `search` | string | Não | - | Busca por `name` ou `nickname` |

### Exemplos

```http
GET /heroes
GET /heroes?page=1
GET /heroes?search=Hulk
GET /heroes?page=1&search=Hulk
```

### Resposta 200

```json
{
  "data": [
    {
      "id": "1498ba98-2d4f-488f-8ca6-869897c3bf30",
      "name": "Robert Bruce Banner",
      "nickname": "Hulk",
      "date_of_birth": "1962-04-10 00:00:00",
      "universe": "Marvel",
      "main_power": "Force",
      "avatar_url": "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
      "is_active": true,
      "created_at": "2026-06-05 01:15:10",
      "updated_at": "2026-06-05 01:42:35"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 10,
    "total": 1,
    "total_pages": 1
  }
}
```

## Criar herói

```http
POST /heroes
```

Cria um novo herói.

### Body

```json
{
  "name": "Robert Bruce Banner",
  "nickname": "Hulk",
  "date_of_birth": "1962-04-10",
  "universe": "Marvel",
  "main_power": "Force",
  "avatar_url": "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg"
}
```

### Validações

| Campo | Obrigatório | Regras |
| --- | --- | --- |
| `name` | Sim | string, máximo 120 caracteres |
| `nickname` | Sim | string, máximo 80 caracteres |
| `date_of_birth` | Sim | data válida em formato ISO, exemplo `1962-04-10` |
| `universe` | Sim | string, máximo 80 caracteres |
| `main_power` | Sim | string, máximo 120 caracteres |
| `avatar_url` | Sim | URL válida, máximo 2048 caracteres |

### Resposta 201

Retorna o herói criado no formato do modelo de Hero.

## Detalhar herói

```http
GET /heroes/:id
```

Busca as informações de um herói pelo `id`.

### Params

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador do herói |

### Resposta 200

Retorna o herói no formato do modelo de Hero.

### Resposta 404

```json
{
  "message": "Hero not found.",
  "error": "Not Found",
  "statusCode": 404
}
```

## Editar herói

```http
PATCH /heroes/:id
```

Edita os dados de um herói ativo.

### Body

Todos os campos são opcionais, mas apenas os campos abaixo podem ser enviados:

```json
{
  "name": "Robert Bruce Banner",
  "nickname": "Hulk",
  "date_of_birth": "1962-04-10",
  "universe": "Marvel",
  "main_power": "Super strength",
  "avatar_url": "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg"
}
```

Exemplo de edição parcial:

```json
{
  "main_power": "Super strength"
}
```

### Validações

As validações são as mesmas da criação, mas todos os campos são opcionais.

### Resposta 200

Retorna o herói atualizado no formato do modelo de Hero.

### Resposta 400

Se o herói estiver inativo:

```json
{
  "message": "Cannot edit an inactive hero.",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Excluir herói

```http
DELETE /heroes/:id
```

Remove o registro do banco de dados.

### Resposta 204

Sem body.

### Resposta 404

Retorna erro caso o herói não exista.

## Desativar herói

```http
PATCH /heroes/:id/deactivate
```

Altera `is_active` para `false`.

### Resposta 200

Retorna o herói atualizado no formato do modelo de Hero.

### Resposta 400

Se o herói já estiver inativo:

```json
{
  "message": "Hero is already inactive.",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Ativar herói

```http
PATCH /heroes/:id/activate
```

Altera `is_active` para `true`.

### Resposta 200

Retorna o herói atualizado no formato do modelo de Hero.

### Resposta 400

Se o herói já estiver ativo:

```json
{
  "message": "Hero is already active.",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Erros de validação

Quando algum campo inválido for enviado, a API retorna `400`.

Exemplo:

```json
{
  "message": [
    "avatar_url must be a URL address"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

Campos fora do contrato também são rejeitados.