import axios from 'axios';

const baseURL = 'http://localhost:5500';

export const loginUser = (username, password) => {
  return axios.post(`${baseURL}/user/login`, {
    username: username,
    password: password,
  });
};

export const getStakeholders = (table) => { 
   return axios.get(`${baseURL}/stakeholder/${table}`);
}

export const getConnections = (table, name) => {
  return axios.get(`${baseURL}/stakeholder/connections/${table}/${name}`);
}

export const getRelatedTracts = (table, name) => {
  return axios.get(`${baseURL}/stakeholder/getTracts/${table}/${name}`);
} 

export const getDeliverys = (table) => {
  return axios.get(`${baseURL}/delivery/deliveries/${table}_delivery`);
}

export const getDeliveryStats = (table) => {
  return axios.get(`${baseURL}/delivery/stats/report/${table}_delivery`);
}

export const getStakeholderStats = (table) => {
  return axios.get(`${baseURL}/stakeholder/report/${table}`);
}
