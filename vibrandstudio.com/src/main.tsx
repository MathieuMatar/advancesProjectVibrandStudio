import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'

/**
 * Entry point for the React application.
 *
 * - Wraps the app in `StrictMode` for highlighting potential issues.
 * - Provides the Redux store to all components using `Provider`.
 * - Uses `BrowserRouter` to enable client-side routing.
 *
 * @example
 * // index.html contains <div id="root"></div>
 * // This renders the React app into that div
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
