import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RoodLayout from './layout/RoodLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllJobs from './components/AllJobs/AllJobs.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import AddAJobs from './components/AddAJobs/AddAJobs.jsx';
import MyAcceptedTasks from './components/MyAcceptedTasks/MyAcceptedTasks.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RoodLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'allJobs',
        Component: AllJobs
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'addaJob',
        Component: AddAJobs
      },
      {
        path: 'myAcceptedTasks',
        Component: MyAcceptedTasks
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>,
)
