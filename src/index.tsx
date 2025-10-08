import ReactDOM from 'react-dom/client';
import './index.scss';
import AppWrapper from './pages/app/App';
import { Provider } from 'react-redux';
import {HashRouter} from 'react-router-dom'

import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <HashRouter >
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    </HashRouter>
);
