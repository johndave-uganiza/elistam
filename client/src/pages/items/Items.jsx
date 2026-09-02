import { useContext, useState, useEffect } from "react";
import ItemsToolbar from "../../components/items/ItemsToolbar";
import { ItemContext } from "../../context/ItemContext";
import ItemModal from "../../components/items/ItemModal";
import ItemTable from "../../components/items/ItemTable";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Items() {
  const { items, createItem, getItems, updateItem, deleteItem } =
    useContext(ItemContext);

  useEffect(() => {
    getItems();
  }, []);

  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    expirationDate: "",
    image: null,
  });

  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      expirationDate: "",
      image: null,
    });
  };

  // Filter items
  // const filteredItems = items.filter((item) => item.name.includes(searchInput));

  // // Sort items
  // const { name, price } = sortBy;
  // switch (sortBy) {
  //   case price?.asc.value:
  //     filteredItems.sort((current, next) => current.price - next.price);
  //     break;
  //   case price?.desc.value:
  //     filteredItems.sort((current, next) => next.price - current.price);
  //     break;
  //   case name?.asc.value:
  //     filteredItems.sort((current, next) =>
  //       current.name.localeCompare(next.name),
  //     );
  //     break;
  //   case name?.desc.value:
  //     filteredItems.sort((current, next) =>
  //       next.name.localeCompare(current.name),
  //     );
  //     break;
  //   default:
  //     break;
  // }

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name == "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    resetFormData();
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Description", formData.description);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("Quantity", formData.quantity);
      formDataToSend.append("File", formData.image);

      let result;
      if (selectedItem) {
        result = await updateItem(selectedItem.id, formDataToSend);
      } else {
        result = await createItem(formDataToSend);
      }

      if (result?.isSuccess) {
        await getItems();
        setShowModal(false);
        Swal.fire({
          title: `Item ${selectedItem ? "updated" : "created"} successfully!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: true,
        });
      }

      // toast.success("Success!");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);

    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      expirationDate: item.expirationDate,
      image: null,
    });

    setShowModal(true);
  };

  const handleDeleteItem = async (item) => {
    setSelectedItem(item);
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to delete ${item.name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const result = await deleteItem(item.id);

        if (result?.isSuccess) {
          Swal.fire({
            title: "Deleted!",
            timer: 2000,
            text: `${item.name} has been deleted.`,
            icon: "success",
          });

          await getItems();
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-0">
      <div className="container">
        <div className="row p-3">
          <div className="p-0 d-flex justify-content-between align-items-center">
            <h3 className="">List of Items</h3>
            <h6 className="">Total Items:{items?.length}</h6>
          </div>
        </div>
        <div className="row py-2 mb-2 p-3">
          <ItemsToolbar
            onAdd={handleAddItem}
            onSearch={handleSearchInput}
            onSort={handleSortBy}
            items={items}
            sortBy={sortBy}
          />
        </div>
        <ItemTable
          items={items}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </div>
      {showModal && (
        <ItemModal
          onClose={handleCloseModal}
          isEditing={!!selectedItem}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          formData={formData}
        />
      )}
    </div>
  );
}

export default Items;
