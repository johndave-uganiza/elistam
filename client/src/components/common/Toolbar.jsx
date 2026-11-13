function Toolbar({ onAction, onSearch, label, icon }) {
  return (
    <div className="card border-0 shadow-sm mb-2">
      <div className="card-body d-flex p-2 p-md-3">
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
            <button onClick={onAction} className="btn btn-primary">
              <span>
                {icon}
                <span className="d-none d-md-inline">{label}</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
