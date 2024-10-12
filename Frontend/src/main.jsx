import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create a context with an initial value
export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  // State variables for authentication, user info, blogs, and mode
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState('light');

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        blogs,
        setBlogs,
        mode,
        setMode,
      }}
    >
      <App />
    </Context.Provider>
  );
};

// Create root instance only once
const container = document.getElementById('root');
if (!container._reactRootContainer) {
  // Store root in a property on the container to ensure it's only created once
  container._reactRootContainer = createRoot(container);
}

// Render the AppWrapper inside StrictMode
container._reactRootContainer.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
