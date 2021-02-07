import axios from 'axios'
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class ClassService {
    createClass(username, name, capacity) {
        return axios.post(API_URL + "classes", {
            username,
            name,
            capacity
        }, { headers: authHeader() });
    }
}

export default new ClassService();