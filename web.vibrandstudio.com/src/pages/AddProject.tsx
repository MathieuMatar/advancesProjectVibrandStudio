/**
 * AddProject.tsx
 * 
 * Page component for creating a new project with project details and settings.
 */



import { useEffect, useState } from "react";
import { ErrorNotification } from "../components/ErrorNotification";
import { projectService } from "../services/projectService";
import { Upload } from "../utils/upload";
import "./addProject.css";
import Storage from "../utils/storage";

/**
 * AddProject
 * 
 * Page component for creating a new project with the following fields:
 * - Project Name
 * - Project Code
 * - Description (HTML supported)
 * - Client selection from available clients
 * - Status (Upcoming, Pending, InProgress, Completed)
 * - Overview URL (embedded page to display)
 * - Files URL (embedded files to display)
 * - Project image upload
 * - Additional images upload (multiple)
 * - Public/Private toggle
 * 
 * After successful creation:
 * - Adds current user to the project automatically
 * - Navigates to the newly created project
 * 
 * Props:
 * - setProject: (id: number) => void - Callback to navigate to created project
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.setProject - Navigation callback
 * @returns {JSX.Element} The add project form component
 * 
 * @example
 * <AddProject setProject={setCurrentPage} />
 */
function AddProject({ setProject }: { setProject: any }) {
    const [clients, setClients] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        projectService
            .getAllClients()
            .then(fetched => {
                setClients(fetched);
            })
            .catch((error: any) => {
                let message = 'Error fetching clients';
                if (error?.message) message += `: ${error.message}`;
                setError(message);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const imageFile = (form.elements.namedItem("image") as HTMLInputElement).files?.[0];
        let imagePath = "";
        if (imageFile) {
            const uploadResult = await Upload.upload(imageFile);
            imagePath = uploadResult.path;
        }
        const imagesFiles = (form.elements.namedItem("images") as HTMLInputElement).files;
        let imagesPaths: string[] = [];
        if (imagesFiles && imagesFiles.length > 0) {
            for (const file of Array.from(imagesFiles)) {
                const uploadResult = await Upload.upload(file);
                imagesPaths.push(uploadResult.path);
            }
        }

        const data: any = {
            name: formData.get("name"),
            code: formData.get("code"),
            description: formData.get("description"),
            clientId: Number(formData.get("clientId")),
            overview: formData.get("overview"),
            files: formData.get("files"),
            image: imagePath,
            images: imagesPaths,
            public: formData.get("public") === "on",
            status: formData.get("status"),
        };
        const createdProject = await projectService.createProject(data);
        if (!createdProject) {
            alert("Failed to create project");
            return;
        }
        const currentUser = await Storage.getUser();
        if (currentUser) {
            console.log("Adding current user to project:", currentUser);
            projectService.addUserToProject(createdProject.id, currentUser.user.id)
                .then(() => {
                    setProject(createdProject.id);
                })
                .catch((error: any) => {
                    let message = 'Error adding user to project';
                    if (error?.message) message += `: ${error.message}`;
                    setError(message);
                });
        }
    };
    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <main>
            <form className="addForm" onSubmit={handleSubmit}>

                <h1>Add New Project</h1>
                <input type="text" name="name" placeholder="Project Name" />
                <input type="text" name="code" placeholder="Project Code" />
                <textarea name="description" placeholder="Project Description"></textarea>
                <select name="clientId">
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}

                </select>
                <select name="status">
                    <option>Upcoming</option>
                    <option>Pending</option>
                    <option>InProgress</option>
                    <option>Completed</option>
                </select>
                <input type="text" name="overview" placeholder="Project Overview" />
                <input type="text" name="files" placeholder="Files" />
                <input type="file" name="image" placeholder="Project Image" />
                <input type="file" name="images" placeholder="Additional Images" multiple />
                <label>
                    <input type="checkbox" name="public" />
                    Public
                </label>
                <button type="submit">Create Project</button>
            </form>
        </main>
        </>
    );
}

export { AddProject };