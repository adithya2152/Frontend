import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Update the interceptors to be more detailed
api.interceptors.request.use(request => {
  console.log('Starting Request', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Rules API functions
export const rulesAPI = {
  addRule: async (managerId: number, rule: string, points: number) => {
    const response = await api.post('/add-rule', {
      manager_id: managerId,
      rule,
      points
    });
    return response.data;
  },

  getRules: async (managerId?: number) => {
    const params = managerId ? { manager_id: managerId } : {};
    const response = await api.get('/rules', { params });
    return response.data;
  }
};

// Badges API functions
export const badgesAPI = {
  addBadge: async (badgeData: { badge_name: string; reason?: string }) => {
    const response = await api.post('/badges', badgeData);
    return response.data;
  },

  getBadges: async () => {
    const response = await api.get('/badges');
    return response.data;
  }
};

// Badges Mapping API functions
export const badgesMappingAPI = {
  assignBadge: async (driverId: number, badgeId: number, managerId: number) => {
    const response = await api.post('/badges-mapping', {
      driver_id: driverId,
      badge_id: badgeId,
      manager_id: managerId
    });
    return response.data;
  },

  getBadgesMapping: async () => {
    const response = await api.get('/badges-mapping');
    return response.data;
  }
};

// Points API functions
export const pointsAPI = {
  updatePoints: async (managerId: number, rule: string, points: number) => {
    const response = await api.put('/update-points', {
      manager_id: managerId,
      rule,
      points
    });
    return response.data;
  }
};

export default api;