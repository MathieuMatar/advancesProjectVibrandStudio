/**
 * Project.tsx
 * 
 * Main project page component displaying all project details and sub-components.
 */

import { useState } from "react";
import { ErrorNotification } from "../components/ErrorNotification";
import { useProject } from "../hooks/useProject";
import { Tasks } from "../components/Tasks";
import { Milestones } from "../components/Milestones";
import { ProjectUsers } from "../components/ProjectUsers";
import "./project.css";
import { Upload } from "../utils/upload";
import { ProjectServices } from "../components/ProjectServices";

/**
 * Project
 * 
 * Displays detailed project information with tabs for different sections:
 * - Overview: Embedded project overview URL
 * - Files: Embedded project files URL
 * - Milestones: Project milestones timeline
 * - Team: Project team members management
 * - Services: Project services/tools
 * - Edit Project: Form to update project details
 * - Tasks: Project tasks and to-do items
 * 
 * Features:
 * - Tab-based navigation between project sections
 * - Edit project information including name, description, status
 * - Upload project image
 * - Make project public/private
 * - Display loading state while fetching
 * - Error notifications for failed operations
 * 
 * Props:
 * - id: number - The project ID to display
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.id - The project ID
 * @returns {JSX.Element} The project page component
 * 
 * @example
 * <Project id={123} />
 */
function Project({ id }: { id: number }) {
    const { project, updateProject, loading, error, setError } = useProject(id);
    const [projectMenu, setProjectMenu] = useState<string>("overview");

    const handleProjectUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        let uploadResult = undefined;
        const imageInput = form.elements.namedItem("image") as HTMLInputElement;
        if (imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            uploadResult = await Upload.upload(file);
            console.log("Uploaded image path:", uploadResult.path);
        }

        const changes = {
            name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
            description: (form.elements.namedItem("description") as HTMLTextAreaElement)?.value,
            status: (form.elements.namedItem("status") as HTMLSelectElement)?.value,
            overview: (form.elements.namedItem("overview") as HTMLInputElement)?.value,
            files: (form.elements.namedItem("files") as HTMLInputElement)?.value,
            public: (form.elements.namedItem("public") as HTMLInputElement)?.checked,
            image: uploadResult?.path,
        };

        await updateProject(changes);
        setProjectMenu("overview");
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <ErrorNotification error={error?.message || null} onClose={() => setError(null)} />
            <main>
            <div className="info" style={{ fontSize: 10 }}>
                {project ? (
                    <>
                        <h2>
                            {project.name} <span>{project.status}</span>
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: project.description || "" }}></p>
                        <span>
                            <strong>Client Name:</strong> {project?.client?.name}
                        </span>
                    </>
                ) : (
                    <p>No project found</p>
                )}
                <div className="project-menu">
                    <button onClick={() => setProjectMenu("overview")}>Overview</button>
                    <button onClick={() => setProjectMenu("files")}>Files</button>
                    <button onClick={() => setProjectMenu("milestones")}>Milestones</button>
                    <button onClick={() => setProjectMenu("team")}>Team</button>
                    <button onClick={() => setProjectMenu("services")}>Services</button>
                    <button onClick={() => setProjectMenu("edit")}>Edit Project</button>
                </div>
            </div>

            {projectMenu === "overview" && <iframe className="project-tools" src={project?.overview} />}
            {projectMenu === "files" && <iframe className="project-tools" src={project?.files} />}
            {projectMenu === "milestones" && <Milestones milestones={project?.milestones} ProjectId={id} />}
            {projectMenu === "team" && <ProjectUsers users={project?.users} projectId={id} />}
            {projectMenu === "services" && <ProjectServices services={project?.services} projectId={id} />}

            {projectMenu === "edit" && (
                <form className="updateProject" onSubmit={handleProjectUpdate}>
                    <input type="text" name="name" defaultValue={project?.name} placeholder="Project Name" />
                    <textarea name="description" defaultValue={project?.description} placeholder="Project Description"></textarea>
                    <select name="status" defaultValue={project?.status}>
                        <option>Upcoming</option>
                        <option>Pending</option>
                        <option>InProgress</option>
                        <option>Completed</option>
                    </select>
                    <input type="text" name="overview" defaultValue={project?.overview} placeholder="Project Overview URL" />
                    <input type="text" name="files" defaultValue={project?.files} placeholder="Project Files URL" />
                    <input type="checkbox" name="public" defaultChecked={project?.public} /> <p>Make Project Public</p>
                    <input type="file" name="image" />
                    <button type="submit">Update Project</button>
                </form>
            )}

            {project?.tasks && (
                <Tasks projectId={id} projectTasks={project.tasks} projectUsers={project.users} />
            )}
        </main>
        </>
    );
}

export { Project };
