
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.ts';



createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
    <BrowserRouter basename="/10_task_manager_ts_29_01_2025/">
      <App />
    </BrowserRouter>
  </Provider>
);
