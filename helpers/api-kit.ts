import axiosClient from "@/lib/axiosClient";

// Lightweight APIKit tailored for QuickHire
// Each domain groups related endpoints together.

const jobs = {
  listJobs: (params?: Record<string, unknown>) => {
    const url = "/jobs";
    return axiosClient.get(url, { params });
  },
  createJob: (payload: Record<string, unknown>) => {
    const url = "/jobs";
    return axiosClient.post(url, payload);
  },
  deleteJob: (id: string) => {
    const url = `/jobs/${id}`;
    return axiosClient.delete(url);
  },
  getJobById: (id: string) => {
    const url = `/jobs/${id}`;
    return axiosClient.get(url);
  },
};

const applications = {
  createApplication: (payload: Record<string, unknown>) => {
    const url = "/applications";
    return axiosClient.post(url, payload);
  },
};

export const APIKit = {
  applications,
  jobs,
};
