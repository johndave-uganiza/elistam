import { SORT_BY } from "../../utilities/constants";
const { name, price, defaultSortBy } = SORT_BY;
function SortDropdown({ handleSortBy }) {
  return (
    <select
      className="form-select"
      onChange={handleSortBy}
      // value={sortBy || ""}
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
