import { useContext } from "react";
import { ShopContext } from "../Context";

import { GoodsItem } from "./GoodsItem";

function GoodsList() {
  const { goods } = useContext(ShopContext);

  if (!goods.length) {
    return <h3>Nothing was found</h3>;
  }
  return (
    <div className="goods">
      {goods.map((good) => (
        <GoodsItem key={good.mainId} good={good} />
      ))}
    </div>
  );
}

export { GoodsList };
