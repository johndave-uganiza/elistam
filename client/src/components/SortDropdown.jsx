import { productsSortBy } from "../data/productsSortBy";
const { name, price, defaultSortBy } = productsSortBy;
function SortDropdown({ handleSortByChange, sortBy }) {
  return (
    <select
      className="form-select form-select-sm"
      value={sortBy || ""}
      onChange={handleSortByChange}
    >
      <option value={defaultSortBy.value} disabled>
        {defaultSortBy.label}
      </option>
      <option value={price.asc.value}>{price.asc.label}</option>
      <option value={price.desc.value}>{price.desc.label}</option>
      <option value={name.asc.value}>{name.asc.label}</option>
      <option value={name.desc.value}>{name.desc.label}</option>
    </select>
  );
}

export default SortDropdown;
