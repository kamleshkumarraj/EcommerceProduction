
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([{
  path : '/',
  element : <App />,
  children : [{
    path : '/',
    element : <Home />
  }]
}])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
