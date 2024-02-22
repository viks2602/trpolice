import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'react-redux'
import store from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './Global.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
  domain='dev-7lomyqgocwe4ctov.us.auth0.com'
  clientId='TyPgTVd2lt4nqBV1PLdRu7kNlzWmvgJO'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>
  </Auth0Provider>
)
