export const API = import.meta.env.VITE_API_URL;

export const SIGNUP = API + "/user/register";
export const LOGIN = API + "/user/login";
export const GET_ALL_ROOM = API + "/room/getall";
export const CREATE_ROOM = API + "/room/add";
export const CANCEL_ROOM = API + "/room/cancel/:roomId";
export const BOOK_ROOM = API + "/room/bookroom";
export const TRANSACTIONS = API + "/room/bookings";
export const CHECKOUT = API + "/room/checkOut";
export const DOWNLOAD_CSV = API + "/room/csvFile";
export const DOWNLOAD_PDF = API + "/room/pdfFile";
