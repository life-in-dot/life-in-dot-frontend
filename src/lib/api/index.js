import axios from "axios";
import config from "../config";

const API = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 2000,
});

API.interceptors.request.use(req => {
  if (localStorage.getItem("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("loginData")).accessToken
    }`;
  }

  return req;
});

export const login = userData => API.post("/api/login", userData);

export const getJournalList = async userId => {
  const { data } = await API.get(`/api/users/${userId}/journals`);

  return data;
};
