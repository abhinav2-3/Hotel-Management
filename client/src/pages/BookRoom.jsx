import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../utils/currencyFormat";
import axios from "axios";
import { BOOK_ROOM } from "../utils/API";
import toast from "react-hot-toast";

const BookRoom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [document, setDocument] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    documentType: "Aadhar",
    documentNumber: "",
    numberOfPeople: "",
    roomNumber: state?.roomNumber,
    amount: state?.price,
    checkIn: "",
    checkOut: "",
    // image: null,
    paymentMode: "Cash",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleImageCapture = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setFormData({ ...formData, image: imageUrl });
  //   }
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDocument(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document) {
      alert("Please upload a document.");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("image", document);
      const response = await axios.post(BOOK_ROOM, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/transactions");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Booking Form for Room No. {params.id}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
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
            value={formData.numberOfPeople}
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
              value={formData.checkIn}
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
              value={formData.checkOut}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Document Type and Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Document Type
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Aadhar">Aadhar</option>
              <option value="DL" disabled>
                DL
              </option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Document Number
            </label>
            <input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Image Capture */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Capture Document
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {document && (
            <img src={document} alt="Captured" className="mt-4 max-w-sm" />
          )}
        </div>

        {/* Payment */}
        <div className="grid grid-cols-2 justify-between ">
          <div className="w-4/5">
            <label className="block text-gray-600 font-medium mb-1">
              Payment Value
            </label>

            <div
              className="w-full border border-gray-300 p-2 rounded
            focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {formatPrice(state.price)}
            </div>
          </div>
          <div className="self-end">
            <label className="block text-gray-600 font-medium mb-1">
              Payment Type
            </label>
            <select
              name="paymentMode"
              id="paymentMode"
              onChange={handleInputChange}
              className="border w-3/5 px-4 py-2"
            >
              <option value="cash">Cash</option>
              <option value="upi" disabled>
                UPI
              </option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default BookRoom;
