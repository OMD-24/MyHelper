import { MOCK_TASKS } from "../data/mockData";
import api, { USE_MOCK } from "./api";

let tasks = [...MOCK_TASKS];

const taskService = {
  async getAllTasks(filters = {}) {
    if (USE_MOCK) {
      let result = [...tasks];
      if (filters.category) {
        result = result.filter((t) => t.category === filters.category);
      }
      if (filters.urgency) {
        result = result.filter((t) => t.urgency === filters.urgency);
      }
      if (filters.status) {
        result = result.filter((t) => t.status === filters.status);
      }
      if (filters.search) {
        const s = filters.search.toLowerCase();
        result = result.filter(
          (t) =>
            t.title.toLowerCase().includes(s) ||
            t.description.toLowerCase().includes(s)
        );
      }
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return result;
    }
    const res = await api.get("/tasks", { params: filters });
    return res.data;
  },

  async getTaskById(id) {
    if (USE_MOCK) {
      const task = tasks.find((t) => t.id === id);
      if (!task) throw new Error("Task not found");
      return task;
    }
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  async createTask(taskData) {
    if (USE_MOCK) {
      const newTask = {
        id: "t" + Date.now(),
        ...taskData,
        status: "OPEN",
        createdAt: new Date().toISOString(),
        applications: [],
        acceptedWorker: null,
      };
      tasks.unshift(newTask);
      return newTask;
    }
    const res = await api.post("/tasks", taskData);
    return res.data;
  },

  async applyForTask(taskId, application) {
    if (USE_MOCK) {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) throw new Error("Task not found");
      const newApp = {
        id: "a" + Date.now(),
        ...application,
        status: "PENDING",
        appliedAt: new Date().toISOString(),
      };
      task.applications.push(newApp);
      return newApp;
    }
    const res = await api.post(`/tasks/${taskId}/apply`, application);
    return res.data;
  },

  async acceptApplication(taskId, applicationId) {
    if (USE_MOCK) {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) throw new Error("Task not found");
      const app = task.applications.find((a) => a.id === applicationId);
      if (!app) throw new Error("Application not found");
      app.status = "ACCEPTED";
      task.status = "ACCEPTED";
      task.acceptedWorker = app.workerId;
      task.applications.forEach((a) => {
        if (a.id !== applicationId) a.status = "REJECTED";
      });
      return task;
    }
    const res = await api.put(
      `/tasks/${taskId}/applications/${applicationId}/accept`
    );
    return res.data;
  },

  async completeTask(taskId) {
    if (USE_MOCK) {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) throw new Error("Task not found");
      task.status = "COMPLETED";
      return task;
    }
    const res = await api.put(`/tasks/${taskId}/complete`);
    return res.data;
  },

  async getTasksByUser(userId) {
    if (USE_MOCK) {
      return tasks.filter((t) => t.createdBy === userId);
    }
    const res = await api.get(`/tasks/user/${userId}`);
    return res.data;
  },

  async getAppliedTasks(userId) {
    if (USE_MOCK) {
      return tasks.filter((t) =>
        t.applications.some((a) => a.workerId === userId)
      );
    }
    const res = await api.get(`/tasks/applied/${userId}`);
    return res.data;
  },
};

export default taskService;