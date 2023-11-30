export function ShopReducer(shopState, { type, payload }) {
  switch (type) {
    case "setGoods": {
      return {
        ...shopState,
        goods: [...payload],
        isLoading: false,
      };
    }
    case "setCategories": {
      return {
        ...shopState,
        options: [...shopState.options, ...payload],
      };
    }
    case "addToCart": {
      const itemIndex = shopState.order.findIndex(
        (orderItem) => orderItem.id === payload.id
      );
      let newOrder = [];
      if (itemIndex < 0) {
        const newItem = { ...payload, quantity: 1 };
        newOrder = [...shopState.order, newItem];
      } else {
        newOrder = shopState.order.map((orderItem, index) => {
          if (index === itemIndex) {
            return { ...orderItem, quantity: orderItem.quantity + 1 };
          }
          return { ...orderItem };
        });
      }
      return {
        ...shopState,
        order: newOrder,
        alertName: payload.name,
      };
    }
    case "changeQuantity": {
      const newOrder = shopState.order.map((item) => {
        if (item.id === payload.id) {
          const newQuantity =
            payload.direction === "inc" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity };
        }
        return { ...item };
      });
      return {
        ...shopState,
        order: newOrder,
      };
    }
    case "inputValue": {
      const newOrder = shopState.order.map((item) => {
        if (item.id === payload.id) {
          return { ...item, quantity: payload.value };
        }
        return { ...item };
      });
      return {
        ...shopState,
        order: newOrder,
      };
    }
    case "removeFromCart": {
      return {
        ...shopState,
        order: shopState.order.filter((item) => item.id !== payload),
      };
    }
    case "closeAlert": {
      return {
        ...shopState,
        alertName: "",
      };
    }
    case "selectCategory": {
      return {
        ...shopState,
        selectedCategory: payload,
      };
    }
    case "showCart": {
      return {
        ...shopState,
        isCartShown: !shopState.isCartShown,
      };
    }
    default:
      return { ...shopState };
  }
}
