function Cart({ order, showCart }) {
  const totalQuantity = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="general-cart">
      {/* eslint-disable-next-line */}
      <i
        className="material-icons"
        style={{ fontSize: "3rem" }}
        onClick={showCart}
      >
        shopping_cart
      </i>
      {totalQuantity ? (
        <span className="cart-quantity offset">{totalQuantity}</span>
      ) : null}
    </div>
  );
}
export { Cart };
