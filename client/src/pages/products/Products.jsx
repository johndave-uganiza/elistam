import { useContext, useMemo, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";
import { OrderContext } from "../../context/OrderContext";
import Toolbar from "../../components/common/Toolbar";
import ProductModal from "../../components/products/ProductModal";
import OrderModal from "../../components/orders/OrderModal";
import { toast } from "react-toastify";

function Products() {
  const { createOrder } = useContext(OrderContext);
  const { products, isLoading } = useContext(ProductContext);

  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [orderDetail, setOrderDetail] = useState({
    productId: null,
    name: "",
    description: "",
    price: 0,
    quantity: 1,
    image: "",
  });

  /*
   * Filter and sort products.
   *
   * This assumes the values from Toolbar are similar to:
   * - name-asc
   * - name-desc
   * - price-asc
   * - price-desc
   *
   * If your Toolbar uses different values, adjust these cases.
   */
  const filteredProducts = useMemo(() => {
    let result = [...(products ?? [])];

    // Search
    if (searchInput.trim()) {
      const search = searchInput.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search),
      );
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        break;

      case "name-desc":
        result.sort((a, b) => (b.name ?? "").localeCompare(a.name ?? ""));
        break;

      case "price-asc":
        result.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
        break;

      case "price-desc":
        result.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
        break;

      default:
        break;
    }

    return result;
  }, [products, searchInput, sortBy]);

  const totalProducts = products?.length ?? 0;

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  function handleOrderProduct(product) {
    const { description, id, image, name, price } = product;

    setSelectedProduct(product);

    setOrderDetail({
      productId: id,
      name: name,
      description: description,
      price: price,
      quantity: 1,
      image: image,
    });

    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setSelectedProduct(null);
  }

  function handleCloseOrderModal() {
    setShowOrderModal(false);
  }

  function handleViewOrder() {
    setShowOrderModal(true);
  }

  async function handleSubmit(orderDetail) {
    try {
      const result = await createOrder(orderDetail);

      if (result?.isSuccess) {
        setShowModal(false);
        setSelectedProduct(null);

        toast.success("Product ordered successfully!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Unable to place order.", {
        autoClose: 1500,
      });
    }
  }

  function handleClickOrderQty(value) {
    setOrderDetail((prev) => {
      const newQuantity = Number(prev.quantity) + value;

      if (newQuantity < 1) {
        return prev;
      }

      return {
        ...prev,
        quantity: newQuantity,
      };
    });
  }

  function handleChangeOrderQty(e) {
    const value = Number(e.target.value);

    setOrderDetail((prev) => ({
      ...prev,
      quantity: value < 1 ? 1 : value,
    }));
  }

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <div>
          <h3 className="fw-bold mb-0">Product Catalog</h3>

          <p className="text-muted small mb-0">
            Browse available products and place your orders.
          </p>
        </div>

        <div className="mt-2 mt-md-0">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
            <i className="bi bi-box-seam me-1"></i>
            {totalProducts} {totalProducts === 1 ? "Product" : "Products"}
          </span>
        </div>
      </div>

      {/* Toolbar */}

      <Toolbar
        onShow={handleViewOrder}
        onSearch={handleSearchInput}
        onSort={handleSortBy}
        items={products}
        sortBy={sortBy}
        label={
          <>
            <i className="bi bi-basket me-1"></i>
            <span> Open Orders</span>
          </>
        }
      />

      {/* Product Catalog */}
      <div className="card border-0 shadow-sm">
        {/* Product Body */}
        <div className="card-body p-2 p-md-3">
          {/* Loading State */}
          {isLoading && (
            <div className="row g-3">
              {[1, 2, 3, 4].map((item) => (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item}>
                  <div className="card border-0 shadow-sm h-100">
                    <div
                      className="placeholder-glow"
                      style={{ minHeight: "100%" }}
                    >
                      <div
                        className="placeholder w-100"
                        style={{
                          height: "180px",
                          borderRadius: "0.375rem 0.375rem 0 0",
                        }}
                      ></div>

                      <div className="card-body">
                        <h5 className="placeholder col-7"></h5>

                        <p className="placeholder col-12 mb-2"></p>
                        <p className="placeholder col-9 mb-3"></p>

                        <div className="placeholder col-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="row justify-content-center justify-content-sm-start g-2 g-sm-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  onOrderProduct={handleOrderProduct}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <div className="mb-3">
                <i
                  className="bi bi-box-seam text-muted"
                  style={{ fontSize: "3rem" }}
                ></i>
              </div>

              <h6 className="fw-bold mb-1">
                {searchInput ? "No products found" : "No products available"}
              </h6>

              <p className="text-muted small mb-0">
                {searchInput
                  ? "Try adjusting your search or sort filters."
                  : "There are currently no products available."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Order Modal */}
      {showModal && (
        <ProductModal
          selectedProduct={selectedProduct}
          onClose={handleClose}
          onSubmit={handleSubmit}
          orderDetail={orderDetail}
          onClickOrderQty={handleClickOrderQty}
          onChangeOrderQty={handleChangeOrderQty}
        />
      )}

      {/* Order Modal */}
      {showOrderModal && <OrderModal onClose={handleCloseOrderModal} />}
    </div>
  );
}

export default Products;
