import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard";
import { BasketContext } from "../../context/BasketContext";
import SearchBar from "../../components/SearchBar";
import SortDropdown from "../../components/SortDropdown";
import ToastAlert from "../../components/ToastAlert";
import ProductsToolbar from "../../components/ProductsToolbar";
import AddToOrderForm from "../../components/AddToOrderForm";
import { Modal } from "bootstrap";
import { productsSortBy } from "../../data/productsSortBy";

import AddItemForm from "../../components/AddItemForm";
import EditItemForm from "../../components/EditItemForm";
import DeleteItemForm from "../../components/DeleteItemForm";

function ProductList() {
  // const navigate = useNavigate();
  const { basketItems, setBasketItems } = useContext(BasketContext);

  // const [showToast, setShowToast] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [showDeleteProductForm, setShowDeleteProductForm] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const { products, setProducts } = useContext(ProductsContext);
  const [searchTextInput, setSearchTextInput] = useState("");
  const [currentProductItem, setCurrentProductItem] = useState(null);
  const [showAddToBasketForm, setShowAddToBasketForm] = useState(false);
  const [productDetailForm, setProductDetailForm] = useState({
    name: "",
    price: "",
    quantity: 0,
    expirationDate: "",
  });

  // Filter products
  const mutatedProducts = products?.filter((productItem) =>
    productItem.title.includes(searchTextInput),
  );

  // Sort products
  const { name, price } = productsSortBy;

  switch (sortBy) {
    case price.asc.value:
      mutatedProducts.sort((current, next) => current.price - next.price);
      break;
    case price.desc.value:
      mutatedProducts.sort((current, next) => next.price - current.price);
      break;
    case name.asc.value:
      mutatedProducts.sort((current, next) =>
        current.title.localeCompare(next.title),
      );
      break;
    case name.desc.value:
      mutatedProducts.sort((current, next) =>
        next.title.localeCompare(current.title),
      );
      break;
    default:
      break;
  }

  function handleSearchInput(e) {
    e.preventDefault();
    setSearchTextInput(e.target.value);
  }

  function handleAddToBasket(productItem) {
    // navigate("/add-to-basket", { state: { productItem } });
    setShowAddToBasketForm(true);
    setCurrentProductItem(productItem);
    // setShowAddToBasketForm(true);
  }

  function handleAddProductClick() {
    setShowAddProductForm(true);
  }

  function handleEditProduct(productItem) {
    setCurrentProductItem(productItem);

    setProductDetailForm({
      name: productItem.title,
      price: productItem.price,
      quantity: productItem.stock,
      expirationDate: productItem.expirationDate || "",
    });

    setShowEditProductForm(true);
  }

  function handleUpdateProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const expirationDate = new Date(
      formData.get("expirationDate"),
    ).toLocaleDateString("en-US");

    const updatedProducts = products.map((product) => {
      if (product.id === currentProductItem.id) {
        return {
          ...product,
          title: name,
          price: price,
          stock: quantity,
          expirationDate: expirationDate,
        };
      }

      return product;
    });

    setProducts(updatedProducts);
    setShowEditProductForm(false);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function handleDeleteProduct(productItem) {
    setCurrentProductItem(productItem);

    setProductDetailForm({
      name: productItem.title,
      price: productItem.price,
      quantity: productItem.stock,
      expirationDate: productItem.expirationDate || "",
    });

    setShowDeleteProductForm(true);
  }

  function handleRemoveProduct(productId) {
    const newProducts = products.filter((product) => product.id !== productId);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));

    setShowDeleteProductForm(false);
  }

  function handleSortByChange(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className="p-0">
      <div className="container-fluid">
        <div className="row p-3">
          <div className="p-0 d-flex justify-content-between align-items-center">
            <h3 className="">Product Catalog</h3>
            <h6 className="">Total Products:{products?.length}</h6>
          </div>
        </div>
        <div className="row py-2 mb-2 p-3">
          <ProductsToolbar
            handleAddProductClick={handleAddProductClick}
            handleSearchInput={handleSearchInput}
            handleSortByChange={handleSortByChange}
            products={products}
            sortBy={sortBy}
          />
        </div>
        <div className="row justify-content-center p-3 gap-5">
          {mutatedProducts?.length > 0
            ? mutatedProducts.map((product, index) => {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                    // setShowToast={setShowToast}
                    handleAddToBasket={handleAddToBasket}
                    handleEditProduct={handleEditProduct}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                );
              })
            : null}
        </div>
      </div>

      <AddToOrderForm
        showAddToBasketForm={showAddToBasketForm}
        setShowAddToBasketForm={setShowAddToBasketForm}
        currentProductItem={currentProductItem}
      />

      <AddItemForm
        showAddProductForm={showAddProductForm}
        setShowAddProductForm={setShowAddProductForm}
      />

      <EditItemForm
        showEditProductForm={showEditProductForm}
        setShowEditProductForm={setShowEditProductForm}
        currentProductItem={currentProductItem}
        handleUpdateProduct={handleUpdateProduct}
        productDetailForm={productDetailForm}
        setProductDetailForm={setProductDetailForm}
      />

      <DeleteItemForm
        showDeleteProductForm={showDeleteProductForm}
        setShowDeleteProductForm={setShowDeleteProductForm}
        currentProductItem={currentProductItem}
        handleRemoveProduct={handleRemoveProduct}
        productDetailForm={productDetailForm}
        setProductDetailForm={setProductDetailForm}
      />
    </div>
  );
}

export default ProductList;
