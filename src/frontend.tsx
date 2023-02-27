import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './client/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
