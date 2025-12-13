import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API, CHECKOUT } from "../utils/API";
import { formatPrice } from "../utils/dayCounter";

const CheckOut = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkOutAmount, setChekOutAmount] = useState();
  const [paymentMode, setpaymentMode] = useState("Cash");
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookedRoomData = async () => {
      const GET_BOOKED_DATA = API + "/room/" + id + "/booked-data";
      try {
        const response = await axios.get(GET_BOOKED_DATA);
        if (response.data.success) {
          const booking = response.data.booking;
          setFormData(booking);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch room data.");
      }
    };

    fetchBookedRoomData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.put(CHECKOUT, {
        roomNumber: id,
        checkOutAmount,
        paymentMode,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/transactions");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Check Out Form for Room No. {id}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            required
            disabled
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData?.age}
            onChange={handleInputChange}
            disabled
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Number of People
          </label>
          <input
            type="number"
            name="numberOfPeople"
            value={formData?.numberOfPeople}
            disabled
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Check-in and Check-out Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Check-In Date
            </label>
            <input
              type="date"
              name="checkIn"
              value={formData?.checkIn?.split("T")[0]}
              disabled
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Check-Out Date
            </label>
            <input
              type="date"
              name="checkOut"
              value={formData?.checkOut?.split("T")[0]}
              disabled
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-2 justify-between ">
          <div className="w-4/5">
            <label className="block text-gray-600 font-medium mb-1">
              Payment Value
            </label>
            <div className="text-sm mt-2">
              Total : {formatPrice(formData?.totalAmount)}
            </div>
            <div className="text-sm text-green-600">
              Paid Amount : {formatPrice(formData?.checkInAmount)}
            </div>
            <div className="text-sm text-red-600 mb-2">
              Remaining Amount : {formatPrice(formData?.remainAmount)}
            </div>
            <input
              name="amount"
              id="amount"
              type="number"
              value={checkOutAmount}
              required
              onChange={(e) => setChekOutAmount(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded
                 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="self-end">
            <label className="block text-gray-600 font-medium mb-1">
              Payment Type
            </label>
            <select
              name="paymentMode"
              id="paymentMode"
              value={paymentMode}
              onChange={(e) => setpaymentMode(e.target.value)}
              className="border w-3/5 px-4 py-2"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          {loading ? "Loading..." : "Check Out"}
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
