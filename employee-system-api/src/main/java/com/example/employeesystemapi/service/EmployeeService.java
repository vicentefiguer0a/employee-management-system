package com.example.employeesystemapi.service;

import com.example.employeesystemapi.entity.EmployeeEntity;
import com.example.employeesystemapi.model.Employee;
import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    List<Employee> viewEmployees();
    boolean deleteEmployee(Long id);
    Employee getEmployeeById(Long id);
    Employee updateEmployee(Long id, Employee employee);
}
