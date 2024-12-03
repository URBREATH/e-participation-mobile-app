import axios from "axios";

export const API_URL = "http://127.0.0.1:3000/";

const api = axios.create({ baseURL: API_URL });

export const LOGIN = async (url, values) => {
  const formData = new FormData();
  formData.append("user[email]", values.email);
  formData.append("user[password]", values.password);

  const { data } = await api.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("THIS IS DATA ", data);
  return data;
};

export const POST = async (url, values, token) => {
  headers = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const { data } = await api.post(url, values, headers);
  return data;
};

export const GET = async (url) => {
  const { data } = await api.get(url, headers);
  return data;
};
export const PUT = async (url, values, headers) => {
  const { data } = await api.put(url, values, headers);
  return data;
};

export const DELETE = async (url, values) => {
  const { data } = await api.delete(url, values, headers);
  return data;
};
