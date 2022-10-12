import "../App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "../HomePage";
import Layout from "../common/components/Layout";
import CustomContainer from "../common/components/CustomContainer";
import LoginPage from "../features/auth/LoginPage";
import DashBoardLayout from "../common/components/DashBoardLayout";
import BatchDashBoardLayout from "../common/components/BatchDashBoardLayout";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../common/components/ProtectedRoute";
import DashboardPage from "../features/auth/DashboardPage";
import PersistLogin from "../features/auth/PersistLogin";
import Prefetch from "../features/auth/Prefetch";
import SingleBatchPage from "../features/batches/SingleBatchPage";
import DrugsPage from "../features/drugs/DrugsPage";
import RevenuesPage from "../features/revenue/RevenuesPage";
import FeedsPage from "../features/feeds/FeedsPage";
import HousingsPage from "../features/housing/HousingsPage";
import MortalitiesPage from "../features/mortality/MortalitiesPage";
import SingleDrugPage from "../features/drugs/SingleDrugPage";
import SingleFeedPage from "../features/feeds/SingleFeedPage";
import SingleHousingPage from "../features/housing/SingleHousingPage";
import SingleRevenuePage from "../features/revenue/SingleRevenuePage";
import SingleMortalityPage from "../features/mortality/SingleMortalityPage";
import CreateDrugPage from "../features/drugs/CreateDrugPage";
import CreateFeedPage from "../features/feeds/CreateFeedPage";
import CreateHousingPage from "../features/housing/CreateHousingPage";
import CreateMortalityPage from "../features/mortality/CreateMortalityPage";
import CreateRevenuePage from "../features/revenue/CreateRevenuePage";
import CreateBatchPage from "../features/batches/CreateBatchPage";
import PageNotFound from "../common/components/PageNotFound";
import EditBatchPage from "../features/batches/EditBatchPage";
import EditDrugPage from "../features/drugs/EditDrugPage";
import EditFeedPage from "../features/feeds/EditFeedPage";
import EditHousingPage from "../features/housing/EditHousingPage";
import EditMortalityPage from "../features/mortality/EditMortalityPage";
import EditRevenuePage from "../features/revenue/EditRevenuePage";
import BatchSummaryPage from "../features/batches/BatchSummaryPage";
import AnimalSalesPage from "../features/animalSale/AnimalSalesPage";
import CreateAnimalSalePage from "../features/animalSale/CreateAnimalSalePage";
import SingleAnimalSalePage from "../features/animalSale/SingleAnimalSalePage";
import EditAnimalSalePage from "../features/animalSale/EditAnimalSalePage";
import OtherExpensesPage from "../features/otherExpenses/OtherExpensesPage";
import CreateOtherExpensePage from "../features/otherExpenses/CreateOtherExpensePage";
import SingleOtherExpensePage from "../features/otherExpenses/SingleOtherExpensePage";
import EditOtherExpensePage from "../features/otherExpenses/EditOtherExpensePage";
import UserPage from "../features/user/UserPage";
import UpdateUserPage from "../features/user/UpdateUserPage";
import PasswordVerifyPage from "../features/user/PasswordVerifyPage";
import PasswordResetPage from "../features/user/PasswordResetPage";

const App = () => {
  return (
    <div className="App">
      <CustomContainer width="xxl">
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>

            {/* ProtectedRoutes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Prefetch />}>
                <Route path="dashboard" element={<DashBoardLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="userdetails" element={<UserPage />} />
                  <Route
                    path="updateuserdetails"
                    element={<UpdateUserPage />}
                  />
                  <Route
                    path="verifycurrentpassword"
                    element={<PasswordVerifyPage />}
                  />
                  <Route path="resetpassword" element={<PasswordResetPage />} />
                  <Route path="batches/create" element={<CreateBatchPage />} />
                </Route>
                <Route path="batch/:batchId" element={<BatchDashBoardLayout />}>
                  <Route index element={<SingleBatchPage />} />
                  <Route path="summary" element={<BatchSummaryPage />} />
                  <Route path="edit" element={<EditBatchPage />} />
                  <Route path="drugs" element={<DrugsPage />} />
                  <Route path="drugs/create" element={<CreateDrugPage />} />
                  <Route path="drugs/:drugId" element={<SingleDrugPage />} />
                  <Route path="drugs/:drugId/edit" element={<EditDrugPage />} />
                  <Route path="feeds" element={<FeedsPage />} />
                  <Route path="feeds/create" element={<CreateFeedPage />} />
                  <Route path="feeds/:feedId" element={<SingleFeedPage />} />
                  <Route path="feeds/:feedId/edit" element={<EditFeedPage />} />
                  <Route path="housings" element={<HousingsPage />} />
                  <Route
                    path="housings/create"
                    element={<CreateHousingPage />}
                  />
                  <Route
                    path="housings/:housingId"
                    element={<SingleHousingPage />}
                  />
                  <Route
                    path="housings/:housingId/edit"
                    element={<EditHousingPage />}
                  />
                  <Route path="otherexpenses" element={<OtherExpensesPage />} />
                  <Route
                    path="otherexpenses/create"
                    element={<CreateOtherExpensePage />}
                  />
                  <Route
                    path="otherexpenses/:expenseId"
                    element={<SingleOtherExpensePage />}
                  />
                  <Route
                    path="otherexpenses/:expenseId/edit"
                    element={<EditOtherExpensePage />}
                  />
                  <Route path="animalsales" element={<AnimalSalesPage />} />
                  <Route
                    path="animalsales/create"
                    element={<CreateAnimalSalePage />}
                  />
                  <Route
                    path="animalsales/:animalSaleId"
                    element={<SingleAnimalSalePage />}
                  />
                  <Route
                    path="animalsales/:animalSaleId/edit"
                    element={<EditAnimalSalePage />}
                  />
                  <Route path="revenues" element={<RevenuesPage />} />
                  <Route
                    path="revenues/create"
                    element={<CreateRevenuePage />}
                  />
                  <Route
                    path="revenues/:revenueId"
                    element={<SingleRevenuePage />}
                  />
                  <Route
                    path="revenues/:revenueId/edit"
                    element={<EditRevenuePage />}
                  />
                  <Route path="mortalities" element={<MortalitiesPage />} />
                  <Route
                    path="mortalities/create"
                    element={<CreateMortalityPage />}
                  />
                  <Route
                    path="mortalities/:mortalityId"
                    element={<SingleMortalityPage />}
                  />
                  <Route
                    path="mortalities/:mortalityId/edit"
                    element={<EditMortalityPage />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <ToastContainer autoClose={3000} hideProgressBar={false} />
      </CustomContainer>
    </div>
  );
};

export default App;
