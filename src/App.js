import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  onAutStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase/firebase.utils";
import Home from "./routers/hone/home.component";
import Navigation from "./routers/navigations/navigation.component";
import Authentication from "./routers/authentication/authentication";
import Shop from "./routers/shop/shop.component";
import CheckOut from "./routers/checkout/checkout.component";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
