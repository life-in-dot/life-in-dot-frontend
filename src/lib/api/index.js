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

export const getJournalList = async ({ userId }) => {
  const { data } = await API.get(`/api/users/${userId}/journals`);

  return data;
};

export const getJournal = async ({ userId, journalId }) => {
  const { data } = await API.get(`/api/users/${userId}/journals/${journalId}`);

  return data;
};

export const createJournal = async ({ userId, journalData }) => {
  const { data } = await API.post(`/api/users/${userId}/journals/`, {
    ...journalData,
  });

  return data;
};

export const updateJournal = ({ userId, journalId, dateId, journalData }) => {
  API.patch(`/api/users/${userId}/journals/${journalId}`, {
    dateId,
    ...journalData,
  });
};

export const replaceJournal = (userId, journalId, dateId, journal) =>
  API.put(`/api/users/${userId}/journals/${journalId}`, {
    dateId,
    ...journal,
  });

export const deleteJournal = ({ userId, journalId }) =>
  API.delete(`/api/users/${userId}/journals/${journalId}`);
