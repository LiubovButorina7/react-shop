function GoodsItem({ good, addToCart, order }) {
  const { id, title: name, price, description, image } = good;

  const index = order.findIndex((item) => item.id === id);

  return (
    <div className="card card-panel hoverable" id={id}>
      <div className="card-image">
        <img src={image} alt={name} />
      </div>

      <div className="card-title">
        <div className="card-name">{name}</div>
        <i
          title="Learn more"
          className="more activator right material-icons waves-effect waves-block waves-light"
        >
          more_vert
        </i>
      </div>

      <div className="card-reveal">
        <div className="card-title">
          <div className="card-name grey-text text-darken-4">{name}</div>
          <i className="reveal-close material-icons right">close</i>
        </div>
        <p className="card-description">{description}</p>
      </div>

      <div className="card-price">
        <span style={{ fontSize: "1.8rem" }}>{price}$</span>
        {/* eslint-disable-next-line */}
        <span
          className="right material-icons add-to-cart "
          onClick={() => addToCart({ id, name, price, image })}
        >
          add_shopping_cart
        </span>
        {index >= 0 && (
          <span className="cart-quantity right">{order[index].quantity}</span>
        )}
      </div>
    </div>
  );
}

export { GoodsItem };
