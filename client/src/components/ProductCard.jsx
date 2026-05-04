function ProductCard({
  productItem,
  handleEditProduct,
  handleAddToBasket,
  handleDeleteProduct,
}) {
  const { title, price, thumbnail, stock } = productItem;
  return (
    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-5 col-12 card bg-primary-subtle p-1 shadow border border-2 border-primary">
      <div className="card-header bg-primary text-white small fw-medium">
        <span>{title}</span>
      </div>
      <div className="card-body d-flex flex-column gap-3 justify-content-center align-items-center mb-2 bg-white">
        <img className="w-50" src={thumbnail} alt="" />

        <div className="align-self-start">
          <div className="d-flex align-items-center">
            <span className="fs-6 text-black">${price}</span>
            <span
              className={`badge bg-${stock > 10 ? "success" : "warning"} text-white ms-2`}
            >
              In Stock - {stock}
            </span>
          </div>
          <div className="text-black fs-6 fw-bold">
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        {/* {price > 100 ? (
          <span className="badge bg-warning text-black">Premium</span>
        ) : null} */}
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              handleDeleteProduct(productItem);
            }}
            className="btn btn-danger btn-sm border shadow form-control text-white fw-medium"
          >
            Delete
          </button>
          <button
            onClick={() => {
              handleEditProduct(productItem);
            }}
            className="btn btn-warning btn-sm border shadow form-control text-white fw-medium"
          >
            Edit
          </button>
        </div>

        <button
          onClick={() => {
            handleAddToBasket(productItem);
          }}
          className="btn btn-success btn-lg border shadow form-control text-white fw-medium"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
