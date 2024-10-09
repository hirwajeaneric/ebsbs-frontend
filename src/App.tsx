import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreateAccountForHospital from "./pages/hospital/CreateAccountForHospital";
import ApplyForHospital from "./pages/ApplyForHospital";
import NotFound from "./pages/NotFound";

import HospitalAuthLayout from "./pages/hospital/auth/HospitalAuthLayout";
import BloodBankAuthLayout from "./pages/bloodbank/auth/BloodBankAuthLayout";

import HospitalDashboardLayout from "./pages/hospital/dashboard/HospitalDashboardLayout";
import BloodBankDashboardLayout from "./pages/bloodbank/dashboard/BloodBankDashboardLayout";

import HospitalSignIn from "./pages/hospital/auth/SignIn";
import BloodBankSignIn from "./pages/bloodbank/auth/SignIn";

import HospitalForgotPassword from "./pages/hospital/auth/ForgotPassword";
import BloodBankForgotPassword from "./pages/bloodbank/auth/ForgotPassword";

import ResetPassword from "./pages/bloodbank/auth/ResetPassword";
import HospitalResetPassword from "./pages/hospital/auth/ResetPassword";

import HospitalProfile from "./pages/hospital/dashboard/Profile";
import BloodBankProfile from "./pages/bloodbank/dashboard/Profile";

import BloodBankSettings from "./pages/bloodbank/dashboard/Settings";
import HospitalSettings from "./pages/hospital/dashboard/Settings";

import HospitalOverview from "./pages/hospital/dashboard/Overview";
import BloodBankOverview from "./pages/bloodbank/dashboard/Overview";

import BloodBankUsers from "./pages/bloodbank/dashboard/users/Users";
import BloodBankAddUser from "./pages/bloodbank/dashboard/users/AddUser";
import BloodBankUpdateUser from "./pages/bloodbank/dashboard/users/UpdateUser";

import HospitalUsers from "./pages/hospital/dashboard/users/Users";

import BloodBankStock from "./pages/bloodbank/dashboard/Stock";
import HospitalStock from "./pages/hospital/dashboard/Stock";

import BloodBankRequests from "./pages/bloodbank/dashboard/requests/Requests";
import BloodBags from "./pages/bloodbank/dashboard/bloodBags/BloodBags";
import Applications from "./pages/bloodbank/dashboard/Applications";
import ApplicationDetails from "./pages/bloodbank/dashboard/ApplicationDetails";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import AddNewBloodbag from "./pages/bloodbank/dashboard/bloodBags/AddNewBloodBag";
import UpdateBloodbag from "./pages/bloodbank/dashboard/bloodBags/UpdateBloodBag";

import HospitalAddUser from "./pages/hospital/dashboard/users/AddUser";
import HospitalUpdateUser from "./pages/hospital/dashboard/users/UpdateUser";

import HospitalBloodBags from "./pages/hospital/dashboard/bloodBags/BloodBags"
import CreateRequest from "./pages/hospital/dashboard/requests/CreateRequest";
import SentRequests from "./pages/hospital/dashboard/requests/SentRequests";
import ReceivedRequests from "./pages/hospital/dashboard/requests/ReceivedRequests";
import RecievedRequestDetails from "./pages/hospital/dashboard/requests/RecievedRequestDetails";
import SentRequestDetails from "./pages/hospital/dashboard/requests/SentRequestDetails";
import BloodBankRequestsDetails from "./pages/bloodbank/dashboard/requests/RequestDetails";
import LandingPage from "./pages/LandingPage";
import Hospitals from "./pages/bloodbank/dashboard/hospital/Hospitals";
import HospitalDetails from "./pages/bloodbank/dashboard/hospital/HospitalDetails";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountStatus: string;
  userType: string;
  hospitalId: string;
  role: string;
  hospitalName: string;
  id: string;
}

/**
 * The main application component that handles routing and navigation for the blood bank and hospital management system.
 *
 * @returns {JSX.Element} - The JSX element representing the application.
 */
export default function App() {
  const isAdminToken = localStorage.getItem("bloodbankAdminToken");
  const isBloodBankRecorderToken = localStorage.getItem("bloodbankRecorderToken");
  const isHospitalAdminToken = localStorage.getItem("hospitalAdminToken");
  const isHospitalWorkerToken = localStorage.getItem("hospitalWorkerToken");

  let user: User | undefined = undefined;

  if (isHospitalWorkerToken) {
    user = JSON.parse(localStorage.getItem("hospitalWorker") as string);
  } else if (isHospitalAdminToken) {
    user = JSON.parse(localStorage.getItem("hospitalAdmin") as string);
  }

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/create-account" element={<CreateAccountForHospital />} />
          <Route path="/apply/:applicantId" element={<ApplyForHospital />} />

          <Route path="/hauth" element={(!isHospitalAdminToken && !isHospitalWorkerToken) ? <HospitalAuthLayout /> : <Navigate replace to={`/hdash/${user?.hospitalId}/${isHospitalAdminToken ? 'a' : 'r'}`} />}>
            <Route path="" element={<HospitalSignIn />} />
            <Route path="signin" element={(!isHospitalAdminToken && !isHospitalWorkerToken) ? <HospitalSignIn /> : <Navigate replace to={`/hdash/${user?.hospitalId}/${isHospitalAdminToken ? 'a' : 'r'}`} />} />
            <Route path="forgotpassword" element={<HospitalForgotPassword />} />
            <Route path="reset-password/:token/:id" element={<HospitalResetPassword />} />
          </Route>

          <Route path="/bauth" element={(!isAdminToken && !isBloodBankRecorderToken) ? <BloodBankAuthLayout /> : <Navigate replace to={`/dashboard/${isAdminToken ? 'a' : 'r'}`} />}>
            <Route path="" element={<BloodBankSignIn />} />
            <Route path="signin" element={(!isAdminToken && !isBloodBankRecorderToken) ? <BloodBankSignIn /> : <Navigate replace to={`/dashboard/${isAdminToken ? 'a' : 'r'}`} />} />
            <Route path="forgotpassword" element={<BloodBankForgotPassword />} />
            <Route path="reset-password/:token/:id" element={<ResetPassword />} />
          </Route>

          <Route
            path="/hdash/:hospitalId/:userType"
            element={
              (isHospitalAdminToken || isHospitalWorkerToken)
                ? <HospitalDashboardLayout />
                : <Navigate replace to='/hauth/signin' />
            }
          >
            <Route path="" element={<HospitalOverview />} />
            <Route path="overview" element={<HospitalOverview />} />
            <Route path="profile" element={<HospitalProfile />} />
            <Route path="settings" element={<HospitalSettings />} />
            <Route path="users" element={<HospitalUsers />} />
            <Route path="users/new" element={<HospitalAddUser />} />
            <Route path="users/:userId" element={<HospitalUpdateUser />} />
            <Route path="stock" element={<HospitalStock />} />
            <Route path="bags" element={<HospitalBloodBags />} />
            <Route path="requests/incoming" element={<ReceivedRequests />} />
            <Route path="requests/incoming/:requestId" element={<RecievedRequestDetails />} />
            <Route path="requests/sent" element={<SentRequests />} />
            <Route path="requests/sent/:requestId" element={<SentRequestDetails />} />
            <Route path="requests/sent/new" element={<CreateRequest />} />
          </Route>

          <Route
            path="dashboard/:userType"
            element={
              (isAdminToken || isBloodBankRecorderToken)
                ? <BloodBankDashboardLayout />
                : <Navigate replace to='/bauth/signin' />
            }
          >
            <Route path="" element={<BloodBankOverview />} />
            <Route path="overview" element={<BloodBankOverview />} />
            <Route path="settings" element={<BloodBankSettings />} />
            <Route path="applications" element={<Applications />} />
            <Route path="application/:id/edit" element={<ApplicationDetails />} />
            <Route path="users" element={<BloodBankUsers />} />
            <Route path="users/new" element={<BloodBankAddUser />} />
            <Route path="users/:userId" element={<BloodBankUpdateUser />} />
            <Route path="stock" element={<BloodBankStock />} />
            <Route path="bags" element={<BloodBags />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="hospitals/:hospitalId" element={<HospitalDetails />} />
            <Route path="bags/add" element={<AddNewBloodbag />} />
            <Route path="bags/:bagId" element={<UpdateBloodbag />} />
            <Route path="profile" element={<BloodBankProfile />} />
            <Route path="requests" element={<BloodBankRequests />} />
            <Route path="requests/:requestId" element={<BloodBankRequestsDetails />} />
          </Route>

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to={"/not-found"} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}
