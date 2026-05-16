import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";
import { OrderContext } from "../../context/OrderContext";
import SearchBar from "../../components/common/SearchBar";
import SortDropdown from "../../components/common/SortDropdown";
import ToastAlert from "../../components/common/ToastAlert";
import ItemsToolbar from "../../components/items/ItemsToolbar";
import AddToOrderForm from "../../components/products/AddToOrderForm";
import { Modal } from "bootstrap";
import AddItemForm from "../../components/items/AddItemForm";
import EditItemForm from "../../components/items/EditItemForm";
import DeleteItemForm from "../../components/items/DeleteItemForm";
import ItemCard from "../../components/items/ItemCard";
import { ItemContext } from "../../context/ItemContext";

function Items() {
  // const navigate = useNavigate();
  const { items, setItems } = useContext(ItemContext);

  // const [showToast, setShowToast] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [showDeleteItemForm, setShowDeleteItemForm] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [itemDetailForm, setItemDetailForm] = useState({
    name: "",
    price: "",
    quantity: 0,
    expirationDate: "",
  });

  // Filter items
  const filteredItems = items.filter((item) => item.name.includes(searchInput));

  // Sort items
  const { name, price } = sortBy;
  switch (sortBy) {
    case price?.asc.value:
      filteredItems.sort((current, next) => current.price - next.price);
      break;
    case price?.desc.value:
      filteredItems.sort((current, next) => next.price - current.price);
      break;
    case name?.asc.value:
      filteredItems.sort((current, next) =>
        current.name.localeCompare(next.name),
      );
      break;
    case name?.desc.value:
      filteredItems.sort((current, next) =>
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

  function handleAddItem() {
    setShowAddItemForm(true);
  }

  function handleEditItem(item) {
    setCurrentItem(item);

    setItemDetailForm({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      expirationDate: item.expirationDate || "",
    });

    setShowEditItemForm(true);
  }

  function handleUpdateItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const expirationDate = new Date(
      formData.get("expirationDate"),
    ).toLocaleDateString("en-US");
    const updatedItems = items.map((item) => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          name: name,
          price: price,
          stock: quantity,
          expirationDate: expirationDate,
        };
      }

      return item;
    });

    setItems(updatedItems);
    setShowEditItemForm(false);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  function handleDeleteItem(item) {
    setCurrentItem(item);

    // setItemDetailForm({
    //   name: item.name,
    //   price: item.price,
    //   quantity: item.stock,
    //   expirationDate: item.expirationDate || "",
    // });

    setShowDeleteItemForm(true);
  }

  function handleConfirmDeleteItem(item) {
    const newItems = items.filter((singleItem) => singleItem.id !== item.id);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    setShowDeleteItemForm(false);
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className="p-0">
      <div className="container-fluid">
        <div className="row p-3">
          <div className="p-0 d-flex justify-content-between align-items-center">
            <h3 className="">List of Items</h3>
            <h6 className="">Total Items:{items?.length}</h6>
          </div>
        </div>
        <div className="row py-2 mb-2 p-3">
          <ItemsToolbar
            handleAddItem={handleAddItem}
            handleSearchInput={handleSearchInput}
            handleSortBy={handleSortBy}
            items={items}
            sortBy={sortBy}
          />
        </div>
        <div className="row justify-content-between p-3 gap-5">
          {filteredItems?.length > 0
            ? filteredItems.map((item, index) => {
                return (
                  <ItemCard
                    item={item}
                    key={index}
                    items={items}
                    setItems={setItems}
                    // setShowToast={setShowToast}
                    // handleAddToBasket={handleAddToBasket}
                    handleEditItem={handleEditItem}
                    handleDeleteItem={handleDeleteItem}
                  />
                );
              })
            : null}
        </div>
      </div>

      <AddItemForm
        showAddItemForm={showAddItemForm}
        setShowAddItemForm={setShowAddItemForm}
      />

      <EditItemForm
        showEditItemForm={showEditItemForm}
        setShowEditItemForm={setShowEditItemForm}
        currentItem={currentItem}
        handleUpdateItem={handleUpdateItem}
        itemDetailForm={itemDetailForm}
        setItemDetailForm={setItemDetailForm}
        setCurrentItem={setCurrentItem}
      />

      <DeleteItemForm
        showDeleteItemForm={showDeleteItemForm}
        setShowDeleteItemForm={setShowDeleteItemForm}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        handleConfirmDeleteItem={handleConfirmDeleteItem}
      />
    </div>
  );
}

export default Items;
