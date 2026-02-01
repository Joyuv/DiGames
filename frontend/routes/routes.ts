const API_URL = process.env.BACKEND_URL;

export const POST_ADD_JOGO_URL = () => `${API_URL}/add/jogo`;
export const GET_JOGO_URL = (id: string) => `${API_URL}/get/jogo/${id}`;
export const DELETE_JOGO_URL = (id: string) => `${API_URL}/remove/jogo/${id}`;
export const UPDATE_JOGO_URL = () => `${API_URL}/update/jogo`;

export const GET_JOGOS_URL = () => `${API_URL}/get/jogos`;

export const GET_GENEROS_URL = () => `${API_URL}/get/generos`;