import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:8080/",
  responseType: "json",
  headers: { "X-Requested-Width": "XMLHttpRequest" , "Access-Control-Allow-Origin": "*"},
});

export default instance;
