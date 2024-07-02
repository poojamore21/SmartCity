import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Registration from "./pages/Registration.jsx";
import Homepage from "./pages/Homepage.jsx";
import Users from "./pages/Users.jsx";
import Administrator from "./pages/Administrator.jsx";
import Viewinfo from "./routes/tourist/Viewinfo.jsx";
import TouristPage from "./routes/tourist/TouristPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AdminHomepage from "./routes/admin/AdminHomepage.jsx";
import CreatePlace from "./routes/admin/CreatePlace.jsx";
import PlaceDetailsAdmin from "./routes/admin/PlaceDetailsAdmin.jsx";
import PlaceDetails from "./routes/tourist/PlaceDetails.jsx";
import Studentadmin from "./routes/admin/Studentadmin.jsx";
import Bussinessmanadmin from "./routes/admin/Bussinessmanadmin.jsx";
import AllUsers from "./routes/admin/AllUsers.jsx";
import StudentPage from "./routes/student/StudentPage.jsx";
import StudentPlaceDetails from "./routes/student/StudentPlaceDetails.jsx";
import StudentViewInfo from "./routes/student/StudentViewInfo.jsx";
import JobseekerPage from "./routes/JobSeeker/JobseekerPage.jsx";
import JobSeekerPlace from "./routes/JobSeeker/JobSeekerPlace.jsx";
import AddJobs from "./routes/admin/AddJobs.jsx";
import JobSeekerViews from "./routes/JobSeeker/JobSeekerView.jsx";
import BussinessmanPage from "./routes/bussinessman/BussinessmanPage.jsx";
import BussinessView from "./routes/bussinessman/BussinessView.jsx";
import BussinessmanPlace from "./routes/bussinessman/BussinessmanPlace.jsx";
import CreateCaurosel from "./routes/admin/CreateCaurosel.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/registration",
          element: <Registration />,
        },
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/administrator",
          element: <Administrator />,
        },
        {
          path: "/tourist",
          element: <TouristPage />,
          children: [
            {
              path: "viewplace/:state/:city/:category",
              element: <PlaceDetails />,
            },
            {
              path: "viewinfo",
              element: <Viewinfo />,
            },
          ],
        },
        {
          path: "/student",
          element: <StudentPage />,
          children: [
            {
              path: "sviewplace/:state/:city/:category",
              element: <StudentPlaceDetails />,
            },
            {
              path: "sviewinfo",
              element: <StudentViewInfo />,
            },
          ],
        },
        {
          path: "/bussinessman",
          element: <BussinessmanPage />,
          children: [
            {
              path: "bviewplace/:state/:city/:category",
              element: <BussinessmanPlace />,
            },
            {
              path: "bviewinfo",
              element: <BussinessView />,
            },
          ],
        },
        {
          path: "/jobseeker",
          element: <JobseekerPage />,
          children: [
            {
              path: "jviewplace/:state/:city/:category",
              element: <JobSeekerPlace />,
            },
            {
              path: "jviewinfo",
              element: <JobSeekerViews />,
            },
          ],
        },
        {
          path: "/admin",
          element: <AdminHomepage />,
          children: [
            {
              path: "placedetails",
              element: <PlaceDetailsAdmin />,
            },
            {
              path: "updatecaurosel",
              element: <CreateCaurosel />,
            },
            {
              path: "createplace",
              element: <CreatePlace />,
            },
            {
              path: "addstudent",
              element: <Studentadmin />,
            },
            {
              path: "addbussiness",
              element: <Bussinessmanadmin />,
            },
            {
              path: "allusers",
              element: <AllUsers />,
            },
            {
              path: "jobs",
              element: <AddJobs />,
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
