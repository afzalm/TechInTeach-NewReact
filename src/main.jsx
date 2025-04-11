import { createRoot } from 'react-dom/client';
import App from './App.tsx'; // Change to .jsx if App.tsx doesn’t exist
import './index.css';

createRoot(document.getElementById("root")).render(<App />);