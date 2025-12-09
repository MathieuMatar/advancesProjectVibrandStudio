import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectServices from '../services/projectServices';

interface Client {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    description?: string;
    image?: string;
    client?: Client;
    status?: string;
}

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};

/**
 * Async thunk for fetching all projects from the API.
 *
 * Wraps the `ProjectServices.getAll()` call and ensures API
 * errors are handled gracefully using `rejectWithValue`.
 *
 * @async
 * @function fetchProjects
 * @returns {Promise<Project[]>}
 *
 * @example
 * dispatch(fetchProjects());
 */
export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const projects = await ProjectServices.getAll();
            return projects;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch projects');
        }
    }
);

/**
 * Redux slice for managing project-related state.
 *
 * Tracks:
 * - Loading state
 * - Error messages
 * - List of fetched projects
 */
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        /**
         * Clears any existing error from the project state.
         *
         * @example
         * dispatch(clearError());
         */
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;
