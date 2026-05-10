const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || response.statusText);
  }
  return response.json();
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const authService = {
  signup: (userData) => fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse),

  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then(handleResponse),

  getMe: () => fetch(`${API_BASE_URL}/auth/me`, {
    headers: getHeaders(),
  }).then(handleResponse),
};

export const tripService = {
  getTrips: () => fetch(`${API_BASE_URL}/trips`, {
    headers: getHeaders(),
  }).then(handleResponse),

  getTrip: (id) => fetch(`${API_BASE_URL}/trips/${id}`, {
    headers: getHeaders(),
  }).then(handleResponse),

  createTrip: (tripData) => fetch(`${API_BASE_URL}/trips`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(tripData),
  }).then(handleResponse),

  updateTrip: (id, tripData) => fetch(`${API_BASE_URL}/trips/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(tripData),
  }).then(handleResponse),

  deleteTrip: (id) => fetch(`${API_BASE_URL}/trips/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(handleResponse),
};

export const cityService = {
  searchCities: (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return fetch(`${API_BASE_URL}/cities?${queryParams}`).then(handleResponse);
  },
  getCity: (id) => fetch(`${API_BASE_URL}/cities/${id}`).then(handleResponse),
  getCityActivities: (cityId) => fetch(`${API_BASE_URL}/cities/${cityId}/activities`).then(handleResponse),
};

export const itineraryService = {
  addStop: (tripId, stopData) => fetch(`${API_BASE_URL}/trips/${tripId}/stops`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(stopData),
  }).then(handleResponse),

  reorderStops: (tripId, stops) => fetch(`${API_BASE_URL}/trips/${tripId}/stops/reorder`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ stops }),
  }).then(handleResponse),

  addActivity: (tripId, activityData) => fetch(`${API_BASE_URL}/trips/${tripId}/activities`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(activityData),
  }).then(handleResponse),
};

export const budgetService = {
  getBudget: (tripId) => fetch(`${API_BASE_URL}/trips/${tripId}/budget`, {
    headers: getHeaders(),
  }).then(handleResponse),

  saveBudget: (tripId, budgetData) => fetch(`${API_BASE_URL}/trips/${tripId}/budget`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(budgetData),
  }).then(handleResponse),
};

export const checklistService = {
  getChecklist: (tripId) => fetch(`${API_BASE_URL}/trips/${tripId}/checklist`, {
    headers: getHeaders(),
  }).then(handleResponse),

  addItem: (tripId, itemData) => fetch(`${API_BASE_URL}/trips/${tripId}/checklist`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(itemData),
  }).then(handleResponse),

  updateItem: (id, itemData) => fetch(`${API_BASE_URL}/trips/checklist/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(itemData),
  }).then(handleResponse),

  deleteItem: (id) => fetch(`${API_BASE_URL}/trips/checklist/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(handleResponse),
};

export const savedDestinationService = {
  getSaved: () => fetch(`${API_BASE_URL}/saved-destinations`, {
    headers: getHeaders(),
  }).then(handleResponse),

  save: (cityId, status) => fetch(`${API_BASE_URL}/saved-destinations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ cityId, status }),
  }).then(handleResponse),
};
