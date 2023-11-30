import { useContext, useEffect } from "react";
import { ShopContext, ShopDispatchContext } from "../Context";

function Alert() {
  const { alertName } = useContext(ShopContext);
  const dispatch = useContext(ShopDispatchContext);

  useEffect(() => {
    const timerId = setTimeout(() => dispatch({ type: "closeAlert" }), 2000);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line
  }, [alertName]);

  return (
    <div id="toast-container">
      <div className="toast">{alertName} is added to Cart</div>
    </div>
  );
}

export { Alert };
