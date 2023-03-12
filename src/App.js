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

function RootLayout() {
  return (
    <>
      {/* <noteState> */}
      <Navbar />
      <Outlet />
      {/* </noteState> */}
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