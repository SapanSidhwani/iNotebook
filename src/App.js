import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App() {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App