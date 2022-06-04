import http from "../http-common";

class UserrDataService {
  getAll() {
    return http.get("/userr");
  }
  get(id) {
    return http.get(`/userr/${id}`);
  }
  create(data) {
    return http.post("/userr/add", data);
  }
  update(id, data) {
    return http.put(`/userr/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/userr/${id}`);
  }
  deleteAll() {
    return http.delete(`/userr`);
  }
  
}

export default new UserrDataService();
