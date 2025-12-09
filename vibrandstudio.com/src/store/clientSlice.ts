import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClientServices, { type Client } from '../services/clientServices';

interface ClientState {
    clients: Client[];
    loading: boolean;
    error: string | null;
}

const initialState: ClientState = {
    clients: [],
    loading: false,
    error: null,
};

/**
 * Async thunk for fetching all clients from the API.
 *
 * Handles:
 * - API request via `ClientServices.getAll()`
 * - Returning normalized data for the Redux store
 * - Error propagation via `rejectWithValue`
 *
 * @async
 * @function fetchClients
 * @returns {Promise<Client[]>}
 *
 * @example
 * dispatch(fetchClients());
 */
export const fetchClients = createAsyncThunk(
    'clients/fetchClients',
    async (_, { rejectWithValue }) => {
        try {
            const clients = await ClientServices.getAll();
            return clients;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch clients');
        }
    }
);

/**
 * Redux slice for managing client-related state.
 *
 * Includes:
 * - Loading and error tracking
 * - Fetched client list
 * - Automatic state transitions via extraReducers
 */
const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        /**
         * Clears the current error message from state.
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
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = clientSlice.actions;
export default clientSlice.reducer;
