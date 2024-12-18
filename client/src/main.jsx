
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Shops from './pages/Shops.jsx'
import Details from './pages/Details.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CategoryShops from './pages/CategoryShop.jsx'
import MyAccount from './pages/MyAccount.jsx'
import MyOrder from './components/profile/MyOrder.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
// import Shops from './pages/Shops.jsx'

const router = createBrowserRouter([{
  path : '/',
  element : <App />,
  children : [{
    path : '/',
    element : <Home />
  },
  {
    path : '/shops',
    element : <Shops />
  },
  {
    path : '/product-details/:id',
    element : <Details />
  },
  {
    path : '/login',
    element : <Login />
  },
  {
    path : '/signup',
    element : <Register />
  },
  {
    path : '/:category',
    element : <CategoryShops />
  },
  {
    path : '/cart',
    element : <Cart />
  },
  {
    path : '/wishlist',
    element : <Wishlist />
  },
  {
    path : '/my-account',
    element : <MyAccount />,
    children : [{
      path : '/my-account/my-orders',
      element : <MyOrder />
    },
    {
      path : '/my-account/wishlist',
      element : <Wishlist />
    }
  
  ]
  },
  


]
}])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
