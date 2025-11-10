import { useState } from "react";
import { useProject } from "../hooks/useProject";
import { Tasks } from "../components/Tasks";
import { Milestones } from "../components/Milestones";
import { ProjectUsers } from "../components/ProjectUsers";
import "./project.css";

function Project({ id }: { id: number }) {
    const { project, updateProject, loading } = useProject(id);
    const [projectMenu, setProjectMenu] = useState<string>("overview");

    const handleProjectUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const changes = {
            name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
            description: (form.elements.namedItem("description") as HTMLTextAreaElement)?.value,
            status: (form.elements.namedItem("status") as HTMLSelectElement)?.value,
        };

        await updateProject(changes);
        setProjectMenu("overview");
    };

    if (loading) return <p>Loading...</p>;

    return (
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
                    <button onClick={() => setProjectMenu("edit")}>Edit Project</button>
                </div>
            </div>

            {projectMenu === "overview" && <iframe className="project-tools" src={project?.overview} />}
            {projectMenu === "files" && <iframe className="project-tools" src={project?.files} />}
            {projectMenu === "milestones" && <Milestones milestones={project?.milestones} ProjectId={id} />}
            {projectMenu === "team" && <ProjectUsers users={project?.users} projectId={id} />}

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
                    <button type="submit">Update Project</button>
                </form>
            )}

            {project?.tasks && (
                <Tasks projectId={id} projectTasks={project.tasks} projectUsers={project.users} />
            )}
        </main>
    );
}

export { Project };
