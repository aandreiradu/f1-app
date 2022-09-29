import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
// import { AuthContextProvider } from './store/auth-context';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('f1-app'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);





