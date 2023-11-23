import { GoodsItem } from "./GoodsItem";

function GoodsList({ goods, addToCart, order }) {
  if (!goods.length) {
    return <h3>Nothing was found</h3>;
  }
  return (
    <div className="goods">
      {goods.map((good) => (
        <GoodsItem
          key={good.mainId}
          good={good}
          addToCart={addToCart}
          order={order}
        />
      ))}
    </div>
  );
}

export { GoodsList };
