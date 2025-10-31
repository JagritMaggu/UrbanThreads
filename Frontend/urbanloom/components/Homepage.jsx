import { useState, useEffect } from "react";
import { Heart, ShoppingCart, ShoppingBag, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import api from "../util/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addToCart, updateCartQty, removeFromCart } from "../util/cart";
import { addToWishlist } from "../util/wishlist";
export default function Homepage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const addWish = async (id) => {
    try {
      await addToWishlist(id);
      toast.success("Added to Wishlist ❤️");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  useEffect(() => {
    async function auth() {
      try {
        await api.get("/api/getUser");
      } catch (err) {
        toast.error("Unauthorized");
        navigate("/login");
      }
    }

    async function loadProducts() {
      try {
        const res = await api.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        toast.error("Error loading products");
      }
    }

    auth();
    loadProducts();
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id);
    toast.success("Added to cart");
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const increase = async (id) => {
    const qty = cart[id] + 1;
    await updateCartQty(id, qty);
    setCart((prev) => ({ ...prev, [id]: qty }));
  };

  const decrease = async (id) => {
    if (cart[id] === 1) {
      await removeFromCart(id);
      const temp = { ...cart };
      delete temp[id];
      setCart(temp);
      return;
    }
    const qty = cart[id] - 1;
    await updateCartQty(id, qty);
    setCart((prev) => ({ ...prev, [id]: qty }));
  };

  function toMyWishList() {
    navigate("/myWishlist");
  }
  function toOrders() {
    navigate("/myOrders");
  }
  function toCart() {
    navigate("/cart");
  }
  async function handleLogout() {
    try {
      const res = await api.post("/api/logout");

      if (res.data.message === "Logged out") {
        navigate("/login");
        toast.success("Logged Out Successfully!");
      }
    } catch (error) {
      toast.error("Logout unsuccessful", error.message);
    }
  }

  return (
    <div className="p-8">
      <div className="lg:flex lg:items-center lg:justify-between sm:grid sm:text-sm sm:m-3  sm:grid-rows-5">
        <h1 className="text-3xl flex items-center font-bold mb-6">
          <img src="/public/urbanThreads.jpg" className="h-17 w-17 mx-1.5" />{" "}
          Products
        </h1>
        <nav className="flex items-center justify-end w-full h-5 mb-3 sm:text-sm sm:m-3">
          <button
            className="
  text-pink-50
  flex items-center justify-center
  transition duration-200
  bg-linear-to-r from-pink-600 to-red-700
  px-3 py-1.5 text-sm
  rounded-lg mx-1
  hover:scale-105

  sm:px-4 sm:py-2 sm:text-sm sm:m-3
"
            onClick={toMyWishList}
          >
            <Heart className="text-amber-100 mr-2 h-5 w-5" />
            My Wishlist
          </button>
          <button
            className="  text-pink-50
  flex items-center justify-center
  transition duration-200
  bg-linear-to-r from-blue-500 to-indigo-600
  px-3 py-1.5 text-sm
  rounded-lg mx-1
  hover:scale-105

  sm:px-4 sm:py-2 sm:text-sm sm:m-3"
            onClick={toOrders}
          >
            <ShoppingBag className="text-amber-100 mr-2 h-5 w-5" />
            My Orders
          </button>
          <button
            className="  text-pink-50
  flex items-center justify-center
  transition duration-200
  bg-linear-to-r from-orange-600 to-yellow-500
  px-3 py-1.5 text-sm
  rounded-lg mx-1
  hover:scale-105

  sm:text-sm sm:m-3"
            onClick={toCart}
          >
            <ShoppingCart className="text-amber-100 mr-2 h-5 w-5" />
            My Cart
          </button>
          <button
            className="  text-pink-50
  flex items-center justify-center
  transition duration-200
  bg-linear-to-r from-red-600 to-red-700
  px-3 py-1.5 text-sm
  rounded-lg mx-1
  hover:scale-105

  sm:text-sm sm:m-3"
            onClick={handleLogout}
          >
            <LogOut className="text-amber-100 mr-2 h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.04 }}
            className="border-0   rounded-xl p-5 shadow-lg bg-white flex flex-col items-center"
          >
            <img
              src={p.ImageURL || p.imageUrl || "/placeholder.jpg"}
              alt={p.name}
              className="w-32 h-32 object-cover mb-2 rounded"
            />

            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-700">₹{p.price}</p>
            <span className="text-xs px-2 py-1 mt-1 bg-gray-200 rounded">
              {p.category}
            </span>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => addWish(p._id)}
            >
              <Heart className="text-red-500 transition duration-200 my-3 hover:scale-105" />
            </motion.button>
            {!cart[p._id] ? (
              <button
                onClick={() => handleAdd(p._id)}
                className="w-full text-pink-100 flex items-center transition duration-200 justify-center bg-linear-to-r mx-2 from-yellow-400 to-yellow-500 px-4 py-2 rounded-lg hover:scale-105"
              >
                Add to Cart
              </button>
            ) : (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => decrease(p._id)}
                  className="px-3 py-1 bg-gray-200 rounded-md"
                >
                  -
                </button>
                <span className="font-semibold">{cart[p._id]}</span>
                <button
                  onClick={() => increase(p._id)}
                  className="px-3 py-1 bg-gray-200 rounded-md"
                >
                  +
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
