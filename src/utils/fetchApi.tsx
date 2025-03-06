import axios from "axios";

const makeApi = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
};

// Funciones para realizar las operaciones CRUD
export const getData = async <T,>(path: string): Promise<T> => {
  const api = makeApi();
  const { data } = await api.get<T>(path);
  return data;
};

export const createData = async <T,>(path: string, entity: T) => {
  const api = makeApi();
  const { data } = await api.post(path, entity);
  return data;
};

export const updateData = async <T,>(path: string, id: string, entity: T) => {
  const api = makeApi();
  const { data } = await api.put(`${path}/${id}`, entity);
  return data;
};

export const deleteData = async (path: string, id: number) => {
  const api = makeApi();
  const { data } = await api.delete(`${path}/${id}`);
  return data;
};
