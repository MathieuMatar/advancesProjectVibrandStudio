import { useEffect, useState } from "react";
import { projectService } from "../services/projectService";

/**
 * Project
 * Lightweight typed shape for the project object used by the hook.
 * Fields marked `any` reflect nested backend objects and can be tightened later.
 */
interface Project {
  id: number;
  code?: string;
  name: string;
  description?: string;
  status?: string;
  overview: string;
  files?: string;
  client?: any;
  users?: any;
  milestones?: any;
  tasks?: any;
  public?: boolean;
  services?: any;
}

/**
 * useProject
 *
 * Hook to fetch and manage a single project's data.
 *
 * Parameters:
 * - id: project id to fetch
 *
 * Returns:
 * - project: Project | null — the fetched project payload
 * - setProject: setter to update local project state
 * - updateProject(changes): helper that sends changes to backend and refreshes local state
 * - loading: boolean — whether the project is currently being loaded
 * - error: Error | null — any error encountered while fetching or updating
 *
 * Notes:
 * - The hook calls `projectService.getProjectById` on mount and whenever `id` changes.
 * - `updateProject` calls `projectService.updateProject` then re-fetches to ensure the
 *   local state matches backend canonical data.
 *
 * Example:
 * const { project, updateProject, loading } = useProject(projectId)
 */
export function useProject(id: number) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setProject(null);
    setError(null);

    projectService
      .getProjectById(id)
      .then((fetched) => {
        setProject(fetched);
      })
      .catch((err: any) => {
        let message = 'Error fetching project';
        if (err?.message) message += `: ${err.message}`;
        setError(new Error(message));
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateProject = async (changes: Partial<Project>) => {
    setError(null);
    try {
      await projectService.updateProject(id, changes);
      const refreshed = await projectService.getProjectById(id);
      setProject(refreshed);
      return refreshed;
    } catch (err: any) {
      let message = 'Error updating project';
      if (err?.message) message += `: ${err.message}`;
      setError(new Error(message));
      throw err;
    }
  };

  return { project, setProject, updateProject, loading, error, setError };
}
