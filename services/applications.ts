import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Application } from "./jobs";
import { APIKit } from "@/helpers/api-kit";

export type CreateApplicationPayload = {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
};

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation<Application, Error, CreateApplicationPayload>({
    mutationFn: async (payload: CreateApplicationPayload) => {
      const res = (await APIKit.applications.createApplication(
        payload as Record<string, unknown>,
      )) as {
        data: { success: boolean; data: Application };
      };
      return res.data.data as Application;
    },
    onSuccess: (_, variables) => {
      // Invalidate the specific job and the applications list if you add one later
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.job_id] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
