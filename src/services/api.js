import axios from 'axios';

const baseURL = 'http://localhost:5500';

export const loginUser = (username, password) => {
  return axios.post(`${baseURL}/user/login`, {
    username: username,
    password: password,
  });
};

//Grab stakeholders for Stakeholder table
export const getStakeholders = async (project) => {
  try {
    const response = await axios.get(`${baseURL}/stakeholder/${project}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error('Error fetching stakeholders:', error);
    throw error; // You can choose to re-throw the error or handle it further as needed
  }
};

//Grab deliveries for Delivery table
export const getDeliverys = async (table) => {
  try {
    const response = await axios.get(`${baseURL}/delivery/deliveries/${table}_delivery`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    throw error;
  }
}

export const getPojects = async () => {
  try {
    const response = await axios.get(`${baseURL}/project/getAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export const getConnections = (table, name) => {
  return axios.get(`${baseURL}/stakeholder/connections/${table}/${name}`);
}

export const getRelatedTracts = (table, name) => {
  return axios.get(`${baseURL}/stakeholder/getTracts/${table}/${name}`);
}



export const getDeliveryStats = (table) => {
  return axios.get(`${baseURL}/delivery/stats/report/${table}_delivery`);
}

export const getStakeholderStats = (table) => {
  return axios.get(`${baseURL}/stakeholder/report/${table}`);
}

//get statistics for stakeholder
export async function getStakeholderReport(project) {
  try {
    const response = await axios.get(`http://localhost:5500/stakeholder/report/${project}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stakeholder report:', error);
    return null;
  }
}

//get statistics for delivery
export async function getDeliveryReport(project) {
  try {
    const response = await axios.get(`http://localhost:5500/delivery/stats/report/${project}_delivery`);
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery report:', error);
    return null;
  }
}