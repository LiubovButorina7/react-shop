import { useContext } from "react";
import { ShopContext, ShopDispatchContext } from "../Context";
import { CartItem } from "./CartItem";

function CartList() {
  const { order } = useContext(ShopContext);
  const dispatch = useContext(ShopDispatchContext);

  const totalCost = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-list z-depth-5">
      <div className="list-header">
        <b className="cart-title">Shopping Cart</b>
        {/* eslint-disable-next-line */}
        <i
          className="right material-icons cart-close"
          onClick={() => dispatch({ type: "showCart" })}
        >
          close
        </i>
      </div>

      {order.length ? (
        <div className="list-content">
          <div>
            {order.map((orderItem) => (
              <CartItem key={orderItem.id} orderItem={orderItem} />
            ))}
          </div>
        </div>
      ) : (
        <div className="cart-empty">Shopping Cart is empty.</div>
      )}

      {totalCost > 0 && (
        <div className="list-footer">
          <div className="total">
            <b>
              Total: {"  "}
              {totalCost.toFixed(2)}$
            </b>
          </div>
          <button
            type="button"
            className="right checkout btn waves-effect waves-light"
            onClick={() => alert("Sorry, no connection with backend.")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
export { CartList };
