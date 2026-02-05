# DiGames
Projeto de PSI

## Logo
![](./logo_digames.svg)

## Visão geral
DiGames é uma aplicação full-stack (backend em FastAPI + frontend em Next.js) para gerenciar jogos e gêneros.

## Estrutura do repositório
- `backend/`: API em FastAPI (rotas, modelos e validações)
- `frontend/`: aplicação Next.js (interface do usuário)

## Requisitos
- Python 3.10+ (recomenda-se criar um `venv`)
- Node.js 18+ / npm

## Rodando o backend
1. Entre na pasta `backend`:

	 cd backend

2. Crie e ative um ambiente virtual (exemplo):

	 python -m venv .venv
	 source .venv/bin/activate

3. Instale dependências:

	 pip install -r requirements.txt

4. Execute a API (modo desenvolvimento):

	 uvicorn main:app --reload --host 0.0.0.0 --port 8000

Observações:
- O banco e as tabelas são criados automaticamente na primeira execução (veja `backend/models/models.py` para detalhes do `engine`).
- A aplicação já semeia uma lista inicial de gêneros na primeira execução.

## Rodando o frontend
1. Na pasta raiz do projeto entre em `frontend`:

	 cd frontend

2. Instale dependências:

	 npm install

3. Inicie em modo desenvolvimento:

	 npm run dev

4. A aplicação estará acessível por padrão em `http://localhost:3000`.

Observação sobre CORS:
- O backend permite requisições vindas de `http://localhost:3000`.

## URLs e Endpoints da API
Base URL (local): `http://localhost:8000`

- **GET /**
	- Descrição: rota de verificação básica
	- Exemplo de resposta: `{"API Operante"}`

- **GET /get/jogo/{id}**
	- Descrição: retorna os dados de um jogo por ID
	- Resposta de sucesso (200):
		{
			"jogo": { ...dados do jogo... }
		}
	- Erro (404): Jogo não encontrado

- **GET /get/jogos**
	- Descrição: lista todos os jogos
	- Resposta (200):
		{
			"jogos": [ { ... }, { ... } ]
		}

- **POST /add/jogo**
	- Descrição: adiciona um novo jogo
	- Body (`application/json`) — `JsonJogoAdicionar`:
		{
			"nome": "Nome do jogo",          // obrigatório, min 3 chars
			"status": "Disponível",         // opcional (valores permitidos: Disponível, Em desenvolvimento, Descontinuado)
			"generos": [1, 2],                // array de IDs de gêneros
			"preco": 29.99,                   // float
			"descricao": "..."              // string
		}
	- Resposta de sucesso (200):
		{
			"sucesso": true,
			"mensagem": "Jogo adicionado com sucesso!",
			"jogo": { ... }
		}
	- Validações retornam 400 com formato:
		{
			"sucesso": false,
			"erro": "Validação falhou",
			"detalhes": [ {"campo":"nome","mensagem":"..."}, ... ]
		}

- **POST /update/jogo/{id}**
	- Descrição: atualiza campos do jogo (parciais permitidas)
	- Body (`JsonJogoAtualizar`) — campos opcionais:
		{
			"nome": "Novo nome",
			"status": "Em desenvolvimento",
			"generos": [1,3],
			"preco": 19.9,
			"descricao": "Nova descrição"
		}
	- Resposta de sucesso (200):
		{
			"sucesso": true,
			"mensagem": "Jogo atualizado com sucesso!",
			"jogo": { ... }
		}

- **POST /remove/jogo/{id}**
	- Descrição: remove um jogo
	- Resposta de sucesso (200):
		{ "sucesso": true, "mensagem": "Jogo removido com sucesso: <nome>" }

- **POST /add/genero**
	- Descrição: adiciona um novo gênero
	- Body: `{ "nome": "Nome do gênero" }` (min 3 chars)
	- Resposta (200): `{ "sucesso": true, "mensagem": "Gênero adicionado com sucesso!", "genero": { ... } }`

- **POST /remove/genero/{id}**
	- Descrição: remove um gênero
	- Resposta (200): `{ "sucesso": true, "mensagem": "Gênero removido com sucesso: <nome>" }`

- **GET /get/generos**
	- Descrição: lista todos os gêneros
	- Resposta (200): `{ "generos": [ { ... }, ... ] }`

Erros de validação do FastAPI/Pydantic seguem o formato padronizado definido no handler, com `sucesso: false` e `detalhes` contendo campo+mensagem.


## Screenshots (instruções)


aqui falta adicionar os prints com as instruções 
