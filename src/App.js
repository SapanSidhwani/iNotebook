import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function RootLayout() {
  return (
    <>
      <Navbar />
      <Alert message="This is amazing react course"/>
      <div className="container">
        <Outlet />
      </div>

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
          element: <Home key="home" />
        },
        {
          path: "/about",
          element: <About key="about" />
        }
      ]
    }
  ]);
  return (
    <>
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    </>
  );
}

export default App