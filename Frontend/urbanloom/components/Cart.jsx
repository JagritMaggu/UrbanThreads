import { useEffect, useState } from "react";
import { Trash2, CreditCard, Banknote, IndianRupee, Truck, CheckCircle, Wallet, ShoppingCart, ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";
import api from "../util/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCart() {
      try {
        await api.get("/api/getUser"); 
        const res = await api.get("/api/getcart"); 
        setCart(res.data.items);
      } catch (err) {
        toast.error("Unauthorized");
        navigate("/login");
      }
    }

    loadCart();
  }, []);

  const removeItem = async (id) => {
    await api.delete(`/api/cart/${id}`);
    setCart(cart.filter(item => item.product._id !== id));
  };

  const total = cart.reduce((t, item) => t + item.product.price * item.quantity, 0);
 const handleCheckout = async () => {
    try {
      const res = await api.post("/api/orders", { paymentMethod });

      toast.success("Order Placed Successfully ✅");
      navigate("/myOrders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed ❌");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl flex items-center font-semibold mb-4"> <ShoppingCart className="text-gray-800  mr-2 h-5 w-5"/>Your Cart</h2>

      {cart.map(item => (
        <div key={item.product._id} className="flex justify-between items-center mb-4 bg-white shadow p-3 rounded-xl">
          <div>
            <p className="font-medium">{item.product.name}</p>
            <p className="text-sm text-gray-600">
              ₹{item.product.price} × {item.quantity}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => removeItem(item.product._id)}
            className="p-2 rounded-full border"
          >
            <Trash2 className="text-gray-800  h-5 w-5 hover:scale-105"/>
          </motion.button>
        </div>
      ))}
{/* className=" text-pink-100 flex items-center transition duration-200 justify-center bg-linear-to-r mx-2 from-pink-600 to-red-700 px-4 py-2 rounded-lg hover:scale-105" */}
{/* className="text-amber-100 mr-2 h-5 w-5" */}
      <h3 className="text-xl flex items-center font-bold"><IndianRupee className=" text-gray-800 mr-2 h-5 w-5"/>Total: ₹{total}</h3>

      <div className="p-5">
      <h2 className="text-2xl flex items-center font-bold mb-4"> <ArrowRightCircle className="text-gray-800 mr-2 h-5 w-5"/> Checkout</h2>

      {/* Select Payment Method */}
      <div className="mb-4">
        <h3 className="font-semibold flex items-center mb-2"><CreditCard className="text-gray-800 mr-2 h-5 w-5"/>Choose Payment Method</h3>

        <label className="block mb-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
                    className="flex items-center justify-center"
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          <div className="flex items-center"><Truck className="text-gray-800 mr-2 h-5 w-5"/><p> Cash on Delivery</p></div>
        </label>

        <label className="block">
          <input
            type="radio"
            name="payment"
            value="ONLINE"
            className="flex items-center justify-center"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />{" "}
          <div className="flex items-center"><Wallet className="text-gray-800 mr-2 h-5 w-5"/> <p>Online Payment</p></div>
        </label>
      </div>

      <button
        onClick={handleCheckout}
        className="transition duration-200 flex items-center from-green-500  to-green-600 bg-linear-to-r  text-white px-5 py-2 rounded-md hover:scale-105"
      >
       <CheckCircle className="text-white mr-2 h-5 w-5"/> Place Order
      </button>
    </div>

    </div>
  );
}
