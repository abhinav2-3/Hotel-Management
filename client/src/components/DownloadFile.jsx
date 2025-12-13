import axios from "axios";
import { DOWNLOAD_CSV, DOWNLOAD_PDF } from "../utils/API";
import { useState } from "react";

const DownloadFile = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleDownload = async () => {
  //   setLoading(true);
  //   if (toDate < fromDate) {
  //     alert("End Date must be greater then Start Date");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       DOWNLOAD_CSV,
  //       { fromDate, toDate },
  //       {
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "Bookings.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading the file:", error.message);
  //     if (error.status === 404) {
  //       alert("Data is not available, Change the date");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDownload = async () => {
    setLoading(true);

    try {
      const response = await axios.get(DOWNLOAD_PDF, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4 justify-center items-center">
      <div className="w-1/2 gap-2">
        <h4 className="text-2xl font-semibold my-2">Filter Transactions</h4>
        <div className="flex flex-col">
          <label htmlFor="" className="text-red-400">
            Start Date
          </label>
          <input
            type="date"
            name="fromdate"
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-red-400">
            End Date
          </label>
          <input
            type="date"
            name="todate"
            onChange={(e) => setToDate(e.target.value)}
            className="border p-1"
          />
        </div>
      </div>
      <button
        className="bg-indigo-600 w-2/5 py-2 px-4 rounded-md text-white font-medium"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Loading..." : "Download CSV"}
      </button>
    </div>
  );
};

export default DownloadFile;
