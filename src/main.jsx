import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoodLayout from './layout/RoodLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllJobs from './components/AllJobs/AllJobs.jsx';
import Register from './components/Register/Register.jsx';
import AddAJobs from './components/AddAJobs/AddAJobs.jsx';
import MyAcceptedTasks from './components/MyAcceptedTasks/MyAcceptedTasks.jsx';
import ViewDetails from './components/ViewDetails/ViewDetails.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import UpDate from './components/update/UpDate.jsx';

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    Component: RoodLayout,
    children: [
      { index: true, Component: Home },
      { path: "allJobs", Component: AllJobs },
      { path: "register", Component: Register },
      { path: "addaJob", Component: AddAJobs },
      { path: "myAcceptedTasks", Component: MyAcceptedTasks },
      { path: "viewDetails/:id", Component: ViewDetails },
      { path: "/updateJob", Component: UpDate },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
