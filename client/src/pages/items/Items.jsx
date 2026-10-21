import { useContext, useEffect, useState, useMemo } from "react";
import Toolbar from "../../components/common/Toolbar";
import { ItemContext } from "../../context/ItemContext";
import ItemModal from "../../components/items/ItemModal";
import ItemTable from "../../components/items/ItemTable";
import Swal from "sweetalert2";
import PageTitle from "../../components/common/PageTitle";

function Items() {
  const { createItem, getItems, updateItem, deleteItem, isLoading } =
    useContext(ItemContext);

  const [items, setItems] = useState([]);
  // const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    cost: 0,
    quantity: 0,
    expirationDate: "",
    image: null,
  });

  // Fetch items
  const fetchItems = async () => {
    try {
      const result = await getItems();
      setItems(result || []);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    let result = [...(items ?? [])];

    // Search
    if (searchInput.trim()) {
      const search = searchInput.toLowerCase().trim();

      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search),
      );
    }
    return result;
  }, [items, searchInput /* sortBy */]);

  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      cost: 0,
      quantity: 0,
      expirationDate: "",
      image: null,
    });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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
      formDataToSend.append("Cost", formData.cost);
      formDataToSend.append("Stock", formData.stock);
      formDataToSend.append("ExpirationDate", formData.expirationDate);

      if (formData.image) {
        formDataToSend.append("ImageFile", formData.image);
      }

      let result;

      if (selectedItem) {
        result = await updateItem(selectedItem.id, formDataToSend);
      } else {
        result = await createItem(formDataToSend);
      }

      if (result?.isSuccess) {
        await fetchItems();
        setShowModal(false);
        setSelectedItem(null);
        resetFormData();

        await Swal.fire({
          title: `Item ${selectedItem ? "updated" : "created"} successfully!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Failed to save item:", error);

      Swal.fire({
        title: "Something went wrong",
        text: "Unable to save the item.",
        icon: "error",
      });
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);

    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? 0,
      quantity: item.quantity ?? 0,
      cost: item.cost ?? 0,
      expirationDate: item.expirationDate
        ? String(item.expirationDate).split("T")[0]
        : "",
      image: null,
    });

    setShowModal(true);
  };

  const handleDeleteItem = async (item) => {
    try {
      const result = await Swal.fire({
        title: `Delete ${item.name}`,
        html: `
        <p style="margin-bottom: 8px; color: #555;">
            Are you sure you want to delete
            <strong style="color: #d33;">${item.name}</strong>?
        </p>
        <p style="font-size: 13px; color: #888; margin-bottom: 0;">
            This action cannot be undone.
        </p>
    `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true,
      });

      if (result.isConfirmed) {
        const deleteResult = await deleteItem(item.id);

        if (deleteResult?.isSuccess) {
          await fetchItems();

          await Swal.fire({
            title: "Deleted!",
            text: `${item.name} has been deleted.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      }
    } catch (error) {
      console.error("Failed to delete item:", error);

      Swal.fire({
        title: "Something went wrong",
        text: "Unable to delete the item.",
        icon: "error",
      });
    }
  };

  // const handleSortBy = (e) => {
  //   setSortBy(e.target.value);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    resetFormData();
  };

  return (
    <div className="container px-2 px-sm-3 px-md-4 py-2">
      {/* Page Title */}
      <PageTitle
        title={"Item List"}
        description={"Manage your products, inventory, and item details."}
        label={"Item"}
        total={items?.length ?? 0}
      />

      {/* Toolbar */}
      <Toolbar
        onShow={handleAddItem}
        onSearch={handleSearchInput}
        label={
          <>
            <i className="bi bi-plus-circle me-1"></i>
            Add Item
          </>
        }
      />

      {/* Items Table */}
      <div className="card border-0 shadow-sm p-3">
        <ItemTable
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </div>

      {/* Item Modal */}
      {showModal && (
        <ItemModal
          onClose={handleCloseModal}
          isEditing={!!selectedItem}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          formData={formData}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Items;
