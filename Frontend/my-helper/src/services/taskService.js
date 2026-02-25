import api, { USE_MOCK } from "./api";

const taskService = {
  async getAllTasks(filters = {}) {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.urgency) params.urgency = filters.urgency;
    if (filters.status) params.status = filters.status;
    if (filters.search) params.search = filters.search;

    const res = await api.get("/tasks", { params });
    return res.data;
  },

  async getTaskById(id) {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  async createTask(taskData) {
    const res = await api.post("/tasks", taskData);
    return res.data;
  },

  async applyForTask(taskId, application) {
    const res = await api.post(`/tasks/${taskId}/apply`, application);
    return res.data;
  },

  async acceptApplication(taskId, applicationId) {
    const res = await api.put(
      `/tasks/${taskId}/applications/${applicationId}/accept`
    );
    return res.data;
  },

  async completeTask(taskId) {
    const res = await api.put(`/tasks/${taskId}/complete`);
    return res.data;
  },

  async getTasksByUser(userId) {
    const res = await api.get(`/tasks/user/${userId}`);
    return res.data;
  },

  async getAppliedTasks(userId) {
    const res = await api.get(`/tasks/applied/${userId}`);
    return res.data;
  },
};

export default taskService;