import { useEffect, useReducer } from "react";
import { ShopContext, ShopDispatchContext } from "../Context";
import { ShopReducer } from "../ShopReducer";

import { Preloader } from "./Preloader";
import { SelectComp } from "./Select";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { CartList } from "./CartList";
import { Alert } from "./Alert";

const getOrderStorage = () => {
  const orderJSON = window.localStorage.getItem("order");
  return JSON.parse(orderJSON);
};

const initialShopState = {
  goods: [],
  options: [{ value: "", label: "All" }],
  isLoading: true,
  order: getOrderStorage() || [],
  selectedCategory: null,
  isCartShown: false,
  alertName: "",
};

function Shop() {
  const [shopState, dispatch] = useReducer(ShopReducer, initialShopState);

  const getGoods = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "setGoods",
          payload: data,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((json) =>
        json.map((item) => ({
          value: item,
          label: item,
        }))
      )
      .then((result) => {
        dispatch({ type: "setCategories", payload: result });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addToLocalStorage = (newOrder) => {
    window.localStorage.setItem("order", JSON.stringify([...newOrder]));
  };

  useEffect(() => {
    getCategories();
    getGoods();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    addToLocalStorage(shopState.order);
  }, [shopState.order]);

  return (
    <ShopContext.Provider value={shopState}>
      <ShopDispatchContext.Provider value={dispatch}>
        <main className="container content">
          <SelectComp />
          <Cart />
          {shopState.isLoading ? <Preloader /> : <GoodsList />}
          {shopState.isCartShown && <CartList />}
          {shopState.alertName && <Alert />}
        </main>
      </ShopDispatchContext.Provider>
    </ShopContext.Provider>
  );
}

export { Shop };
