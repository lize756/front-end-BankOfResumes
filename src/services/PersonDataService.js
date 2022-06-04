import http from "../http-common";

class PersonDataService {
  getAll() {
    return http.get("/persons");
  }
  get(id) {
    return http.get(`/persons/${id}`);
  }
  create(data) {
    return http.post("/persons/add", data);
  }
  update(id, data) {
    return http.put(`/persons/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/persons/${id}`);
  }
  deleteAll() {
    return http.delete(`/persons`);
  }
  
}

export default new PersonDataService();
