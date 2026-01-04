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
import NotFound from './NotFound/NotFound.jsx';
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx';

import MyProfile from './components/MyProfile/MyProfile.jsx';
import PrivateRoute from './context/PrivateRoute.jsx';



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
      { path: "*", Component: NotFound}
    ],
  },
  {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <p className='text-center text-2xl'>Welcome to your Dashboard</p>,
    },
    {
      path:'/dashboard/my-profile',
      element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
    },
    {

    }
  ],
}

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
