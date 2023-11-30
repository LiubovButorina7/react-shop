import Select from "react-select";
import { useContext } from "react";
import { ShopContext, ShopDispatchContext } from "../Context";

function SelectComp() {
  const { selectedCategory, options } = useContext(ShopContext);
  const dispatch = useContext(ShopDispatchContext);

  const changeSelectedCategory = (value) => {
    let url;
    dispatch({ type: "selectCategory", payload: value });

    if (value) {
      url = `https://fakestoreapi.com/products/category/${value}`;
    } else {
      url = `https://fakestoreapi.com/products`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        dispatch({
          type: "setGoods",
          payload: json,
        })
      )
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Select
      className="select"
      styles={{ marginBottom: "50px" }}
      placeholder="Choose a category"
      defaultValue={selectedCategory}
      options={options}
      onChange={(e) => changeSelectedCategory(e.value)}
    />
  );
}

export { SelectComp };
