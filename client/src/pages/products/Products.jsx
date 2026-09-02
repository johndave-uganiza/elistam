import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";
import { OrderContext } from "../../context/OrderContext";
import SearchBar from "../../components/common/SearchBar";
import SortDropdown from "../../components/common/SortDropdown";
import ToastAlert from "../../components/common/ToastAlert";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import AddToOrderForm from "../../components/products/AddToOrderForm";
import { Modal } from "bootstrap";
import { Navigate } from "react-router-dom";

function Products() {
  const { orders, setOrders } = useContext(OrderContext);
  const { products, isLoading } = useContext(ProductContext);

  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAddToOrderForm, setShowAddToOrderForm] = useState(false);

  // Filter products
  const filteredProducts = products?.filter((product) =>
    product.name.includes(searchInput),
  );

  // Sort products
  const { name, price } = sortBy;

  switch (sortBy) {
    case price?.asc.value:
      filteredProducts.sort((current, next) => current.price - next.price);
      break;
    case price?.desc.value:
      filteredProducts.sort((current, next) => next.price - current.price);
      break;
    case name?.asc.value:
      filteredProducts.sort((current, next) =>
        current.name.localeCompare(next.name),
      );
      break;
    case name?.desc.value:
      filteredProducts.sort((current, next) =>
        next.name.localeCompare(current.name),
      );
      break;
    default:
      break;
  }

  function handleSearchInput(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  function handleAddToOrder(product) {
    setShowAddToOrderForm(true);
    setCurrentProduct(product);
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="row p-3">
          <div className="p-0 d-flex justify-content-between align-items-center">
            <h3 className="">Product Catalog</h3>
            <h6 className="">Total Products:{products?.length}</h6>
          </div>
        </div>
        <div className="row py-2 mb-2 p-3">
          <ProductsToolbar
            handleSearchInput={handleSearchInput}
            handleSortBy={handleSortBy}
            products={products}
            sortBy={sortBy}
          />
        </div>
        <hr className="border border-1 border-dark" />
        <div className="row justify-content-center justify-content-sm-start">
          {isLoading && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
              <div className="col">
                <div className="card h-100 placeholder-glow">
                  <div
                    className="card-img-top bg-body-secondary"
                    style={{ height: "180px" }}
                  ></div>
                  <div className="card-body">
                    <h5 className="card-title placeholder col-6"></h5>
                    <p className="card-text placeholder col-9"></p>
                    <p className="card-text placeholder col-4"></p>
                    <div className="d-flex gap-2 mt-3">
                      <span className="placeholder btn btn-primary disabled col-6"></span>
                      <span className="placeholder btn btn-outline-primary disabled col-6"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isLoading && filteredProducts?.length > 0
            ? filteredProducts.map((product, index) => {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    orders={orders}
                    setOrders={setOrders}
                    // setShowToast={setShowToast}
                    handleAddToOrder={handleAddToOrder}
                  />
                );
              })
            : null}
        </div>
      </div>

      <AddToOrderForm
        showAddToOrderForm={showAddToOrderForm}
        setShowAddToOrderForm={setShowAddToOrderForm}
        currentProduct={currentProduct}
      />
    </>
  );
}

export default Products;
