# Desafio Fullstack - Kinebot

Antes de tudo, obrigado pelo interesse em querer trabalhar conosco. O projeto visa avaliar habilidades técnicas e desafios enfrentados no dia-a-dia. 
Logo abaixo você encontrará mais informações necessárias para o seu teste.


## Avisos importantes

-   Leia com calma em tudo o que está escrito aqui e tente seguir as instruções o mais fielmente possível;
-   Crie um repositório no seu GitHub **sem mencionar o Kinebot em nenhum momento**;
-   Vá fazendo seus commits no repositório enquanto for avançando;
-   Envie o link do seu repositório como resposta do email ao recrutador;
-   Se surgir alguma dúvida, é só perguntar;
-   Boa sorte!

_Corpo do email com o link do repositório do desafio_

> Seu nome
> 
> Link do repositório
>


### Sobre o ambiente da aplicação:

 - A aplicação deverá ser composta de uma API, front-end e banco de dados.

#### Front-end
- Deve ser feito em ReactJS em qualquer framework;
- Usar Typescript é essencial;
- Pode utilizar qualquer biblioteca de componentes.

 #### Back-end
 - Deve ser feito com NodeJS;
 - Pode ser feito em JS puro;
 - Pode utilizar ORM ou raw queries.
 
 #### Banco de dados
 - Usar o MySQL na versão 8.0+.
 
 **Observação**: O banco de dados deverá rodar em uma imagem docker local.

### O que é a aplicação
A "**Hero Factory**" é uma plataforma de gestão de heróis no qual podemos informar principais características e poderes do nosso herói. 
Na aplicação é possível realizar a criação, listagem, updates e exclusão dos mesmos. 

#### Requisitos
A seguir estão algumas regras de negócio importantes para o funcionamento:

- A resposta da API para criação de herói deve seguir o seguinte padrão:
```json
{
	id: "e314636e-1ca6-4925-a0e7-da5eb5ae2403",
	name: "Robert Bruce Banner",
	nickname: "Hulk",
	date_of_birth: "1962-04-10 00:00:00",
	universe: "Marvel"
	main_power: "Force"
	avatar_url: "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
	is_active: true,
	created_at: "2024-09-18 21:41:43",
	updated_at: "2024-09-18 21:41:43"
}
```
- As demais respostas da API devem seguir o modelo apresentado acima;
- A listagem dos heróis já criados devem ser ordenados pela data de criação `created_at` (os mais recentes primeiro);
- Registos inativos devem ter uma coloração "cinza" para diferenciar dos registros ativos;
- Na lista cada registro deverá conter um botão de ações. Ao clicar deverá aparecer as seguintes opções: "Excluir", "Editar" ou "Ativar";
	- Ao clicar em "Editar" o usuário será redirecionado para o modal de edição;
	- Ao clicar em "Excluir" deverá aparecer um modal de confirmação ao usuário;
	- Caso o herói esteja desativado a opção ''Ativar" deve substituir a opção "Excluir", ao clicar deverá aparecer um modal de confirmação ao usuário;
	- Qualquer interação de confirmação deverá atualizar a lista de heróis;
- Não é possível editar um herói desativado;
- A tela inicial é a listagem dos heróis;
- A tela inicial contém um botão que abre um modal e permite a criação do herói;
- Todas as interações assíncronas deverão ter algum "loading" na tela;
- Todas as ações deveram ter mensagens de "erros" ou "sucesso" para o usuário;
- Na tela de listagem deverá existir um campo de texto, que busque registros a partir do `name` ou `nickname`;
- Ao clicar em um herói deve abrir um modal mostrando as informações referentes ao herói;
- A lista de heróis deve ter paginação e retornar 10 registros por vez (5 por linha);
- No modal de edição deverá mostrar todos os dados do herói, porém, apenas os campos "Nome completo", "Nome de guerra", "Data de nascimento", "Universo", "Habilidade" e "Avatar" poderão ser editados;
- Todos os serviços devem ser RESTFul;
- Não é necessário qualquer tipo de autenticação.

## Frontend esperado

![Tela inicial](https://kinebot-statics.s3.us-east-1.amazonaws.com/heroes_1.png)
![Criação](https://kinebot-statics.s3.us-east-1.amazonaws.com/heroes_2.png)
![Detalhado](https://kinebot-statics.s3.us-east-1.amazonaws.com/heroes_3.png)
![Visualização do herói](https://kinebot-statics.s3.us-east-1.amazonaws.com/heroes_4.png)

## Exemplo do fluxo

https://github.com/user-attachments/assets/f4215a88-aeef-453f-920f-83852d548043

## Avaliação
Apresente sua solução utilizando o framework que você desejar, justificando a escolha. Atente-se a cumprir a maioria dos requisitos propostos.

## O que será avaliado

**Habilidades básicas de criação de projetos backend**
-   Conhecimentos sobre REST;
-   Uso do Git;
-   Capacidade analítica;
-   Apresentação de código limpo e organizado.

**Conhecimentos intermediários de construção de projetos**
-	Aplicação e conhecimentos de SOLID;
-	Identificação e aplicação de Design Patterns;
-	Conhecimentos sobre conceitos de containers (Docker);
-	Documentação e descrição de funcionalidades e manuseio do projeto;
-	Implementação e conhecimentos sobre testes de unidade e integração;
-	Identificar e propor melhorias.

**Aptidões para criar e manter aplicações de alta qualidade**
-	Aplicação de testes unitários;
-	Estrutura de pastas e nomes de arquivos;
-	Noções de escalabilidade.

## O que será um diferencial
-   Uma cobertura de testes consistente
-   Uso de Design Patterns
-   Documentação
-   Proposta de melhoria na arquitetura
-   Ser consistente e saber argumentar suas escolhas
-   Apresentar soluções que domina
-   Tratamento de erros