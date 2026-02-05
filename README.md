# 🎮 DiGames

Loja de games simples feita em FastAPI + Next.js.

## Logo
![](./logo_digames.svg)



## Setup rápido

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Acesse em `http://localhost:3000` — a loja já vai listar os jogos da API.

## O que faz

- Loja com grid de games (clica em qualquer um pra ver detalhes)
- Adiciona, edita e remove jogos
- Filtra por gênero
- Dark/Light mode
- Responsive

## API (FastAPI)

Base: `http://localhost:8000`

| Método | Rota | O que faz |
|--------|------|----------|
| GET | `/get/jogos` | Lista todos os jogos |
| GET | `/get/jogo/{id}` | Detalhes de um jogo |
| GET | `/get/generos` | Lista de gêneros |
| POST | `/add/jogo` | Cria jogo (body: `nome`, `generos`[], `preco`, `status`, `descricao`) |
| POST | `/update/jogo/{id}` | Atualiza campos |
| POST | `/remove/jogo/{id}` | Deleta jogo |
| POST | `/add/genero` | Adiciona gênero |
| POST | `/remove/genero/{id}` | Deleta gênero |


## Tech

- **Backend**: Python + FastAPI + SQLAlchemy (SQLite)
- **Frontend**: Next.js 16 + React 19 + TailwindCSS
- **Tema**: next-themes (dark/light)
- **Extras**: axios, lucide-react, sweetalert2


## Prints

falta aqui
