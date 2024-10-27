import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// Function to fetch all persons
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

// Function to add a new person
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

// Function to update an existing person
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
};

// Function to delete a person
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
