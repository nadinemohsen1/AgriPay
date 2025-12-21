import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountType from "./pages/auth/AccountType";

import FarmerOptions from "./pages/FarmerOptions/FarmerOptions";
import Transactions from "./pages/transactions/transactions";
import FarmerProfile from "./pages/FarmerProfile/FarmerProfile";
import Loan from "./pages/loan/loan";

import SearchFarmer from "./pages/bank/SearchFarmer";
import DashboardView from "./pages/bank/DashboardView";
import FinancialHistoryView from "./pages/bank/FinancialHistoryView";

import AppLayout from "./components/AppLayout";

/* =====================
   ROUTES
===================== */
function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth pages (no sidebar/header) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-type" element={<AccountType />} />

      {/* Farmer pages (with AppLayout: sidebar + header) */}
      <Route
        path="/FarmerOptions"
        element={
          <AppLayout>
            <FarmerOptions />
          </AppLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <AppLayout>
            <Transactions />
          </AppLayout>
        }
      />
      <Route
        path="/farmer-profile"
        element={
          <AppLayout>
            <FarmerProfile />
          </AppLayout>
        }
      />
      <Route
        path="/loan"
        element={
          <AppLayout>
            <Loan />
          </AppLayout>
        }
      />

      {/* Bank pages (with AppLayout: sidebar + header) */}
      <Route
        path="/bank"
        element={
          <AppLayout>
            <SearchFarmer />
          </AppLayout>
        }
      />
      <Route
        path="/bank/dashboard/:farmerId"
        element={
          <AppLayout>
            <DashboardView />
          </AppLayout>
        }
      />
      <Route
        path="/bank/financial-history/:farmerId"
        element={
          <AppLayout>
            <FinancialHistoryView />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;
