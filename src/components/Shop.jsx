import Select from "react-select";
import { useEffect, useReducer } from "react";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { CartList } from "./CartList";
import { Alert } from "./Alert";

import { ShopContext, ShopDispatchContext } from "../Context";
import { ShopReducer } from "../ShopReducer";

const getOrderStorage = () => {
  const orderJSON = window.localStorage.getItem("order");
  return JSON.parse(orderJSON);
};

function Shop() {
  const initialOrders = getOrderStorage();

  const initialShopState = {
    goods: [],
    options: [{ value: "", label: "All" }],
    isLoading: true,
    order: initialOrders || [],
    selectedCategory: null,
    isCartShown: false,
    alertName: "",
  };

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

  const changeSelectedCategory = (value) => {
    let url;
    dispatch({ type: "selectCategory", payload: value });

    if (value) {
      url = `https://fakestoreapi.com/products/category/${value}`;
    } else {
      url = `https://fakestoreapi.com/products`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        dispatch({
          type: "setGoods",
          payload: json,
        })
      )
      .catch((error) => {
        alert(error);
      });
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
          <Select
            className="select"
            styles={{ marginBottom: "50px" }}
            placeholder="Choose a category"
            defaultValue={shopState.selectedCategory}
            options={shopState.options}
            onChange={(e) => changeSelectedCategory(e.value)}
          />
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
