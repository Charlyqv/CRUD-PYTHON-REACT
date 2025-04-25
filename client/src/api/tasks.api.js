import axios from 'axios'

const tasksApi = axios.create({
  baseURL: 'http://127.0.0.1:8001/tasks/api/v1/tasks/'
})

export const getAllTasks = () => tasksApi.get('/');

export const getTask = (id) => tasksApi.get(`/${id}`);

export const ceateTask = (task) => tasksApi.post('/', task);

export const deleteTask = (id) => tasksApi.delete(`/${id}/`);

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);