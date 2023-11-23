import { useEffect } from "react";

function Alert({ name, closeAlert }) {
  useEffect(() => {
    const timerId = setTimeout(closeAlert, 2000);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line
  }, [name]);

  return (
    <div id="toast-container">
      <div className="toast">{name} is added to Cart</div>
    </div>
  );
}

export { Alert };
