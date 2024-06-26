import { Navigate, Outlet } from "react-router-dom";
import { lazyImport } from "../utils/lazyImport";
import { MainLayout } from "../components/Layout";
import storage from "../utils/storage";

const { Dashboard } = lazyImport(
  () => import("../pages/Dashboard"),
  "Dashboard"
);
const { Messages } = lazyImport(() => import("../pages/Messages"), "Messages");
const { Settings } = lazyImport(() => import("../pages/Settings"), "Settings");
const { Contacts } = lazyImport(() => import("../pages/Contacts"), "Contacts");
const { Events } = lazyImport(() => import("../pages/Events"), "Events");
const { Tasks } = lazyImport(() => import("../pages/Tasks"), "Tasks");
const { Calendar } = lazyImport(() => import("../pages/Calendar"), "Calendar");
const {Statistics} = lazyImport(()=> import("../pages/Statistics"),"Statistics")
const { Categories } = lazyImport(
  () => import("../pages/Categories"),
  "Categories");
const { Alarm } = lazyImport(() => import("../pages/Alarm"), "Alarm");

const App = () => {
  const user = storage.getUser();
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "",
    element: <App />,
    children: [
      { path: "/calendar", element: <Calendar /> },
      { path: "", element: <Dashboard /> },
      { path: "*", element: <Navigate to="." /> },
      { path: "/messages", element: <Messages /> },
      { path: "/settings", element: <Settings /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/events", element: <Events /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/categories", element: <Categories /> },
      { path: "/alarm", element: <Alarm /> },
      { path: "/statistics", element: <Statistics />},
    ],
  },
];
