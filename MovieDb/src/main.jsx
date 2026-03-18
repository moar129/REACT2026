import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';


// Select the root HTML element
const rootElement = document.getElementById('root');
// Create a React root
const root = createRoot(rootElement);

// Render your app in StrictMode (recommended for development)
// Provider store: Wrap the App component with the Provider component and pass the Redux store as a prop to make the store available to all components in the app
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);