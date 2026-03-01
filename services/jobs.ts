import { useMutation, useQuery } from "@tanstack/react-query";
import { APIKit } from "@/helpers/api-kit";

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type CreateJobPayload = {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
};

export type JobListFilters = {
  searchTerm?: string;
  category?: string;
  location?: string;
};

// Add these to your existing services/jobs.ts file

export type Application = {
  _id: string;
  job_id: string;
  name: string;
  email: string;
  resume_url: string;
  cover_note?: string;
  created_at: string;
};

export function useJobById(id: string) {
  return useQuery<Job>({
    queryKey: ["jobs", id],
    queryFn: async () => {
      const res = (await APIKit.jobs.getJobById(id)) as {
        data: { success: boolean; data: Job };
      };
      return res.data.data as Job;
    },
    enabled: !!id,
  });
}

export function useJobs() {
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = (await APIKit.jobs.listJobs()) as {
        data: { success: boolean; data: Job[] };
      };
      // backend shape: { success: boolean; data: Job[] }
      return res.data.data as Job[];
    },
  });
}

export function useFilteredJobs(filters: JobListFilters) {
  const { searchTerm, category, location } = filters;

  return useQuery<Job[]>({
    queryKey: ["jobs", { searchTerm, category, location }],
    queryFn: async () => {
      const params: Record<string, string> = {};

      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;
      if (location) params.location = location;

      const res = (await APIKit.jobs.listJobs(params)) as {
        data: { success: boolean; data: Job[] };
      };

      return res.data.data as Job[];
    },
  });
}

export function useCreateJob() {
  return useMutation<Job, Error, CreateJobPayload>({
    mutationFn: async (payload: CreateJobPayload) => {
      const res = (await APIKit.jobs.createJob(payload)) as {
        data: { success: boolean; data: Job };
      };
      // backend shape: { success: true; data: Job }
      return res.data.data as Job;
    },
  });
}

export function useDeleteJob() {
  return useMutation<void, Error, string>({
    mutationFn: async (jobId: string) => {
      await APIKit.jobs.deleteJob(jobId);
    },
  });
}
