import { useEffect, useState } from "react";
import api from "../util/api";
import toast from "react-hot-toast";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function auth() {
      try {
        const userRes = await api.get("/api/getUser");
        setUser(userRes.data)
      } catch (err) {
        toast.error("Unauthorized");
        navigate("/login");
      }
    }
    async function fetchOrders() {
      try {
        const res = await api.get("/api/getOrders");
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to load orders");
      }
    }
    auth();
    fetchOrders();
  }, []);
const deleteOrder = async (id) => {
  try {
    await api.delete(`/api/orders/${id}`);
    setOrders(orders.filter(order => order._id !== id));
    toast.success("Order deleted");
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
  }
};
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map(order => (
        <div key={order._id} className="bg-white shadow p-4 rounded-xl mb-4">
          <p className="font-semibold">
            Order ID: <span className="text-gray-600">{order._id}</span>
          </p>
          <p>Shipping Address: <b>{user.address}</b></p>
          <p>Phone: <b>{user.phone}</b></p>
          <p>Status: <b>{order.orderStatus}</b></p>
          <p>Payment: <b>{order.paymentMethod}</b></p>
          <p>Total: ₹{order.totalAmount}</p>
           <button
  onClick={() => deleteOrder(order._id)}
  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
  Delete Order
</button>
          <div className="mt-2 border-t pt-2">
            {order.items.map(item => (
              <div key={item.product._id} className="flex justify-between text-sm">
                <span>{item.product.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
