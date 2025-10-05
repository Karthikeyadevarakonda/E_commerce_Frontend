import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaSyncAlt,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaEye,
} from "react-icons/fa";
import useApi from "../../utils/useApi";
import Dropdown from "../admin/components/Dropdown";

const getStatusIcon = (status) => {
  switch (status.toUpperCase()) {
    case "DELIVERED":
      return <FaCheckCircle className="text-green-500" />;
    case "SHIPPED":
      return <FaTruck className="text-blue-500" />;
    case "PENDING":
      return <FaClock className="text-yellow-500" />;
    default:
      return <FaBoxOpen className="text-gray-500" />;
  }
};

const UpdateProductStatus = ({ refreshMetrics }) => {
  const {
    fetchData,
    putData,
    data: orders,
    loading,
    error,
  } = useApi(`${import.meta.env.VITE_BASE_URL}/api/orders`);

  const [updating, setUpdating] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    await fetchData("/");
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    const res = await putData(`/${orderId}/status`, { status: newStatus });
    if (res && res.data) {
      await loadOrders(); // refresh orders
      refreshMetrics?.(); // refresh metrics immediately
    }
    setUpdating(null);
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">Failed to fetch orders</p>}
      {!loading && Array.isArray(orders) && orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full bg-white shadow-md overflow-y-auto">
          <thead className="bg-pink-100 text-pink-600">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Update</th>
              <th className="p-3 text-left">Items</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(orders) ? orders : []).map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="p-3 font-mono text-gray-700">{order.id}</td>
                <td className="p-3 text-gray-600">{order.userId}</td>
                <td className="p-3 flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize font-medium">
                    {order.status.toLowerCase()}
                  </span>
                </td>
                <td className="p-3 min-w-[180px]">
                  <Dropdown
                    label=""
                    options={[
                      "PENDING",
                      "PAID",
                      "SHIPPED",
                      "DELIVERED",
                      "CANCELED",
                    ]}
                    value={order.status}
                    setValue={(val) => handleStatusChange(order.id, val)}
                    className="text-sm w-full"
                  />
                  {updating === order.id && (
                    <FaSyncAlt className="inline ml-2 animate-spin text-pink-500" />
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
              {selectedOrder.products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    src={p.product?.image || "/placeholder.png"}
                    alt={p.product?.productType || "Product"}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">
                      {p.product?.productType || "Unknown Product"}
                    </p>
                    <p className="text-gray-500">Quantity: {p.quantity}</p>
                    {p.product?.price && (
                      <p className="text-gray-500">Price: ${p.product.price}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProductStatus;
