import Select from "react-select";
import { useState, useEffect } from "react";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { CartList } from "./CartList";
import { Alert } from "./Alert";

const getOrderStorage = () => {
  const orderJSON = window.localStorage.getItem("order");
  return JSON.parse(orderJSON);
};

function Shop() {
  const initialOrders = getOrderStorage();

  const [goods, setGoods] = useState([]);
  const [options, setOptions] = useState([{ value: "", label: "All" }]);
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState(initialOrders || []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartShown, setShowCart] = useState(false);
  const [alertName, setAlertName] = useState("");

  const getGoods = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setGoods(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
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
        setOptions([...options, ...result]);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const handleShowCart = () => {
    setShowCart(!isCartShown);
  };

  const addToLocalStorage = (newOrder) => {
    window.localStorage.setItem("order", JSON.stringify([...newOrder]));
  };

  const removeFromCart = (id) => {
    const newOrder = order.filter((item) => item.id !== id);
    setOrder(newOrder);

    addToLocalStorage(newOrder);
  };

  const changeQuantity = (id, direction) => {
    const newOrder = order.map((item) => {
      if (item.id === id) {
        const newQuantity =
          direction === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return { ...item };
    });
    setOrder(newOrder);

    addToLocalStorage(newOrder);
  };

  const addToCart = (item) => {
    let outOfRange = false;

    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    let newOrder = [];
    if (itemIndex < 0) {
      const newItem = { ...item, quantity: 1 };
      newOrder = [...order, newItem];
    } else if (order[itemIndex].quantity < 999) {
      newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return { ...orderItem, quantity: orderItem.quantity + 1 };
        }
        return { ...orderItem };
      });
    } else {
      outOfRange = true;
    }

    if (!outOfRange) {
      setOrder([...newOrder]);
      setAlertName(item.name);

      addToLocalStorage(newOrder);
    } else {
      alert("Item's quantity should be in range 1-999.");
    }
  };

  const inputValue = (value, id) => {
    const newOrder = order.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: value };
      }
      return { ...item };
    });
    setOrder(newOrder);

    addToLocalStorage(newOrder);
  };

  const changeSelectedCategory = (value) => {
    let url;
    setSelectedCategory(value);
    if (value) {
      url = `https://fakestoreapi.com/products/category/${value}`;
    } else {
      url = `https://fakestoreapi.com/products`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => setGoods(json));
  };

  const closeAlert = () => {
    setAlertName("");
  };

  useEffect(() => {
    getGoods();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="container content">
      <Select
        className="select"
        styles={{ marginBottom: "50px" }}
        placeholder="Choose a category"
        defaultValue={selectedCategory}
        options={options}
        onChange={(e) => changeSelectedCategory(e.value)}
      />

      <Cart order={order} showCart={handleShowCart} />

      {isLoading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToCart={addToCart} order={order} />
      )}
      {isCartShown && (
        <CartList
          order={order}
          showCart={handleShowCart}
          removeFromCart={removeFromCart}
          changeQuantity={changeQuantity}
          inputValue={inputValue}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
  );
}

export { Shop };
