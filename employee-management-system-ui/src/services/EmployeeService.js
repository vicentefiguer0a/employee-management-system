const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employees";

class EmployeeService {

    saveEmployee(employee) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        };
        return fetch(EMPLOYEE_API_BASE_URL, options);
    }

    getEmployees() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        return fetch(EMPLOYEE_API_BASE_URL, options);
    }

    deleteEmployee(id) {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        return fetch(EMPLOYEE_API_BASE_URL + "/" + id, options);
    }

    getEmployeeById(id) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        return fetch(EMPLOYEE_API_BASE_URL + "/" + id, options);
    }

    updateEmployee(employee, id) {
        const requestOptions = {
            method: "PUT" ,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        }
        return fetch(EMPLOYEE_API_BASE_URL + "/" + id, requestOptions);
    }
}

export default new EmployeeService();