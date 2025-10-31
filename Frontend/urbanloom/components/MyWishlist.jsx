import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../util/wishlist";
import toast from "react-hot-toast";
import { Trash2, ShoppingCart } from "lucide-react";
import {addToCart} from "../util/cart"
export default function MyWishlist() {
  const [wishlist, setWishlist] = useState([]);
   const [cart, setCart] = useState({})
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      console.log(res.data) 
      setWishlist(res.data?.products || res.data?.items || []);

    } catch (err) {
      toast.error("Failed to load wishlist");
    }
  };
 const handleAdd = async (id) => {
    await addToCart(id);
    toast.success("Added to cart");
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const removeWish = async (id) => {
    await removeFromWishlist(id);
    setWishlist(prev => prev.filter(p => p._id !== id));
    toast.success("Removed ❌");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist ❤️</h2>

      {wishlist.length === 0 && <p>No items in wishlist 🥹</p>}

      {wishlist.map(item => (
        <div key={item._id} className="flex justify-between items-center bg-white shadow p-3 rounded-xl mb-3">
          <p className="font-medium">{item?.name}</p>
          <div className="flex justify-end ">
          <button   className=" text-pink-100 flex items-center transition duration-200 justify-center bg-linear-to-r from-orange-600 to-orange-700 px-4 py-2 rounded-lg hover:scale-105" onClick={()=>{handleAdd(item._id)}}><ShoppingCart className="text-amber-100 mr-2 h-5 w-5"/> Add to cart</button>
          <button className="transition duration-200 hover:scale-105 p-2 " onClick={() => removeWish(item._id)} >
            <Trash2 />
          </button>
          </div>
        </div>
      ))}
    </div>
  );
}