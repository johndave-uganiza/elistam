import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";
import { OrderContext } from "../../context/OrderContext";
import Toolbar from "../../components/common/Toolbar";
import ProductModal from "../../components/products/ProductModal";
import OrderModal from "../../components/orders/OrderModal";
import { API_BASE_URL } from "../../utilities/constants";
import Swal from "sweetalert2";

function Products() {
  const { createOrder, isLoading: orderIsLoading } = useContext(OrderContext);
  const { products, isLoading } = useContext(ProductContext);

  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Filter products
  // const filteredProducts = products?.filter((product) =>
  //   product.name.includes(searchInput),
  // );

  // Sort products
  // const { name, price } = sortBy;

  // switch (sortBy) {
  //   case price?.asc.value:
  //     filteredProducts.sort((current, next) => current.price - next.price);
  //     break;
  //   case price?.desc.value:
  //     filteredProducts.sort((current, next) => next.price - current.price);
  //     break;
  //   case name?.asc.value:
  //     filteredProducts.sort((current, next) =>
  //       current.name.localeCompare(next.name),
  //     );
  //     break;
  //   case name?.desc.value:
  //     filteredProducts.sort((current, next) =>
  //       next.name.localeCompare(current.name),
  //     );
  //     break;
  //   default:
  //     break;
  // }

  const [order, setOrder] = useState({
    date: null,
    orderDetail: {
      id: 0,
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      image: "",
    },
  });

  const resetOrder = () => {
    setOrder({
      date: null,
      orderDetail: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        image: "",
      },
    });
  };

  function handleSearchInput(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  function handleOrderProduct(product) {
    const { description, id, image, name, price } = product;
    setShowModal(true);
    setSelectedProduct(product);
    setOrder({
      date: null,
      orderDetail: {
        id: id,
        name: name,
        description: description,
        price: price,
        quantity: 1,
        image: "",
      },
    });
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleViewOrders = () => {
    setShowOrderModal(true);
  };

  const handleSubmit = async (order) => {
    try {
      const result = await createOrder(order);

      if (result?.isSuccess) {
        // await getItems();
        setShowModal(false);
        Swal.fire({
          title: `Product ordered successfully!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: true,
        });
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOrderQty = (value) => {
    // debugger;

    setOrder((prev) => {
      return {
        ...prev,
        orderDetail: {
          ...prev.orderDetail,
          quantity: prev.orderDetail.quantity + value,
        },
      };
    });
  };

  const handleChangeOrderQty = (e) => {
    setOrder((prev) => {
      return {
        ...prev,
        orderDetail: {
          ...prev.orderDetail,
          quantity: e.target.value,
        },
      };
    });
  };

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
          <Toolbar
            onShow={handleViewOrders}
            onSearch={handleSearchInput}
            onSort={handleSortBy}
            // items={items}
            sortBy={sortBy}
            label={
              <>
                <i className="bi bi-list-ul"></i> View Orders
              </>
            }
          />
        </div>
        <hr className="border border-1 border-dark m-1" />
        <div className="row justify-content-center justify-content-sm-start">
          {isLoading && (
            <div
              className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-3 col-12 g-4"
              style={{ maxWidth: "400px" }}
            >
              <div className="placeholder-glow card bg-white p-1 shadow border border-1 border-secondary h-100 p-3">
                <img
                  className="placeholder card-img align-self-center"
                  style={{
                    height: "180px",
                  }}
                />

                <div className="card-body px-0">
                  <h5 className="placeholder col-6 card-title"></h5>
                  <p className="placeholder col-12 card-text"></p>
                  <p className="placeholder col-12 card-text"></p>
                  <button className="placeholder disabled btn btn-secondary form-control"></button>
                </div>
              </div>
            </div>
          )}
          {!isLoading && products?.length > 0
            ? products.map((product, index) => {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    onOrderProduct={handleOrderProduct}
                  />
                );
              })
            : null}
          {showModal && (
            <ProductModal
              selectedProduct={selectedProduct}
              onClose={handleClose}
              onSubmit={handleSubmit}
              order={order}
              onClickOrderQty={handleClickOrderQty}
              onChangeOrderQty={handleChangeOrderQty}
            />
          )}
          {showOrderModal && (
            <OrderModal
              onClose={handleCloseOrderModal}
              isLoading={orderIsLoading}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
