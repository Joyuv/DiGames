const API_URL = process.env.BACKEND_URL;

export const GET_JOGOS_URL = () => `${API_URL}/jogos`;

export const POST_ADD_JOGO_URL = () => `${API_URL}/jogos`;
export const GET_JOGO_URL = (id: string | number) => `${API_URL}/jogos/${id}`;
export const DELETE_JOGO_URL = (id: string | number) => `${API_URL}/jogos/${id}`;
export const PUT_JOGO_URL = (id: string | number) => `${API_URL}/jogos/${id}`;

export const GET_GENEROS_URL = () => `${API_URL}/generos`;