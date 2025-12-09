import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clientSlice';
import projectReducer from './projectSlice';

/**
 * The central Redux store for the application.
 *
 * Combines the client and project slices, enabling
 * global state management across the app.
 *
 * @constant
 */
export const store = configureStore({
    reducer: {
        clients: clientReducer,
        projects: projectReducer,
    },
});

/**
 * Root state type derived from the store's reducers.
 *
 * Use with `useSelector` for proper state typing.
 * @example
 * const clients = useSelector((state: RootState) => state.clients);
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Typed version of the Redux `dispatch` function.
 *
 * Use with `useDispatch` hook.
 * @example
 * const dispatch = useDispatch<AppDispatch>();
 */
export type AppDispatch = typeof store.dispatch;
