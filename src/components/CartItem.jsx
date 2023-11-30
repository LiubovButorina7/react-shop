import { useContext } from "react";
import { ShopDispatchContext } from "../Context";

function CartItem({ orderItem }) {
  const dispatch = useContext(ShopDispatchContext);

  const { id, name, price, quantity, image } = orderItem;

  return (
    <div className="item-list">
      <div className="item-image">
        <img src={image} alt={name} />
      </div>
      <div className="item-name">{name}</div>
      <div className="item-price">{price}</div>

      <div className="item-amount">
        {quantity > 1 ? (
          // eslint-disable-next-line
          <span
            className="material-icons inc-dec"
            onClick={() =>
              dispatch({
                type: "changeQuantity",
                payload: { id, direction: "dec" },
              })
            }
          >
            remove
          </span>
        ) : (
          <span
            className="material-icons inc-dec"
            style={{
              backgroundColor: "#e0e0e0",
              color: "#bdbdbd",
              cursor: "auto",
            }}
          >
            remove
          </span>
        )}
        <span className="item-quantity">
          <input
            type="text"
            title="Enter number from 1 to 999"
            value={quantity}
            minLength="1"
            maxLength="3"
            size="3"
            style={{
              cursor: "pointer",
              width: "32px",
              border: "none",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "0 10px",
            }}
            onChange={(e) => {
              if (e.target.value > 0 && e.target.value < 1000) {
                dispatch({
                  type: "inputValue",
                  payload: { value: Number(e.target.value), id },
                });
              }
            }}
          />
        </span>

        {quantity > 998 ? (
          <span
            className="material-icons inc-dec"
            style={{
              backgroundColor: "#e0e0e0",
              color: "#bdbdbd",
              cursor: "auto",
            }}
          >
            add
          </span>
        ) : (
          // eslint-disable-next-line
          <span
            className="material-icons inc-dec"
            onClick={() =>
              dispatch({
                type: "changeQuantity",
                payload: { id, direction: "inc" },
              })
            }
          >
            add
          </span>
        )}
      </div>

      <div className="item-cost">{(price * quantity).toFixed(2)}</div>

      <div className="item-del">
        {/* eslint-disable-next-line */}
        <i
          className="material-icons cart-delete"
          onClick={() => dispatch({ type: "removeFromCart", payload: id })}
        >
          delete
        </i>
      </div>
    </div>
  );
}
export { CartItem };
