import { useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";
import { OrderContext } from "../../context/OrderContext";
import Toolbar from "../../components/common/Toolbar";
import ProductModal from "../../components/products/ProductModal";
import OrderModal from "../../components/orders/OrderModal";
import { toast } from "react-toastify";
import PageTitle from "../../components/common/PageTitle";

function Products() {
  const { createOrder, addOrderDetail, getOrder } = useContext(OrderContext);
  const { getProducts, isLoading } = useContext(ProductContext);

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [orderDetail, setOrderDetail] = useState({
    itemId: null,
    name: "",
    description: "",
    price: 0,
    quantity: 1,
    image: "",
  });

  const fetchProducts = async () => {
    const { data } = await getProducts();
    const products = data.map((product) => ({
      itemId: product.itemId,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    }));

    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    // switch (sortBy) {
    //   case "name-asc":
    //     result.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    //     break;

    //   case "name-desc":
    //     result.sort((a, b) => (b.name ?? "").localeCompare(a.name ?? ""));
    //     break;

    //   case "price-asc":
    //     result.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
    //     break;

    //   case "price-desc":
    //     result.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
    //     break;

    //   default:
    //     break;
    // }

    return result;
  }, [products, searchInput /* sortBy */]);

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  function handleOrderProduct(product) {
    const { description, itemId, image, name, price } = product;

    setSelectedProduct(product);

    setOrderDetail({
      itemId: itemId,
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
    const { data: order } = await getOrder();

    const product = products?.find(
      (product) => product.itemId === orderDetail.itemId,
    );

    const detail = order?.orderDetails?.find(
      (current) => current.itemId === orderDetail.itemId,
    );

    if (product?.stock <= detail?.quantity) {
      toast.warn(
        <span>
          Maximum quantity for <strong>{product.name}</strong> was already added
          to order.
        </span>,
        {
          autoClose: 3500,
        },
      );

      return;
    }

    try {
      let result;
      if (!order) {
        result = await createOrder(orderDetail);
      } else {
        result = await addOrderDetail(order?.id, orderDetail);
      }

      if (result?.isSuccess) {
        setShowModal(false);
        setSelectedProduct(null);

        toast.success("Product added successfully!", {
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
      quantity: value < 1 ? 0 : value,
    }));
  }

  const handleConfirmOrder = async () => {
    await fetchProducts();
  };

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Page Title */}
      <PageTitle
        title={"Product Catalog"}
        description={"Browse available products and place your orders."}
        label={"Product"}
        total={products?.length ?? 0}
      />

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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item}>
                  <div className="card border-0 shadow-sm h-100">
                    <div
                      className="placeholder-glow"
                      style={{ minHeight: "100%" }}
                    >
                      <div
                        className="placeholder w-100 rounded-2"
                        style={{
                          height: "180px",
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
                  key={product.itemId}
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
      {showOrderModal && (
        <OrderModal
          onClose={handleCloseOrderModal}
          onSubmit={handleConfirmOrder}
        />
      )}
    </div>
  );
}

export default Products;
