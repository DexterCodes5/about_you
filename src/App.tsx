import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./layouts/SharedLayout/SharedLayout";
import { ProductsPage } from "./layouts/ProductsPage/ProductsPage";
import { ProductPage } from "./layouts/ProductPage/ProductPage";
import { BasketPage } from "./layouts/BasketPage/BasketPage";
import { AuthGuard } from "./components/AuthGuard";
import { CheckoutLayout } from "./layouts/CheckoutLayout/CheckoutLayout";
import { Delivery } from "./layouts/CheckoutLayout/Delivery/Delivery";


function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<h1>Home</h1>} />
        <Route path="/:clothing" element={<ProductsPage />} />
        <Route path="/p/:brand/:productId" element={<ProductPage />} />
        <Route path="/basket" element={<BasketPage />} />
      </Route>
      <Route path="/checkout" element={<AuthGuard component={CheckoutLayout} />} >
        <Route path="delivery" element={<Delivery />} />
      </Route>
    </Routes>
  );
}

export default App;
