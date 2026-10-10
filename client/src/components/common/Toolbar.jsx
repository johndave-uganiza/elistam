function Toolbar({ onShow, onSearch, label }) {
  return (
    <div className="card border-0 shadow-sm mb-2">
      <div className="card-body d-flex">
        <div className="col-6 d-flex align-items-center gap-2 flex-column flex-md-row">
          <input
            className=" form-control text-black bg-white"
            type="search"
            placeholder="Search..."
            onChange={onSearch}
          />
        </div>
        {label && (
          <div className="col-6 text-end p-0">
            <button onClick={onShow} className="btn btn-dark">
              <span>{label}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
