import axios from "axios";

const API = axios.create({
  baseURL: "real-estate-sand-five.vercel.app/api/",
});

export const getServices = () => API.get("/");

export const getService = (id) => API.get(`/${id}`);

export const createService = (data) => API.post("/", data);

export const updateService = (id, data) => API.put(`/${id}`, data);

export const deleteService = (id) => API.delete(`/${id}`);