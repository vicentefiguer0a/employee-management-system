package com.example.employeesystemapi.service;

import com.example.employeesystemapi.entity.EmployeeEntity;
import com.example.employeesystemapi.model.Employee;
import com.example.employeesystemapi.repository.EmployeeRepository;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        // Method copies all values from employee to employeeEntity.
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return employee;
    }

    @Override
    public List<Employee> viewEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
        // Getting list of employee entities from repository, then converting to list of employee models for UI.
        List<Employee> employees = employeeEntities
                .stream()
                .map(employee -> new Employee(
                        employee.getId(),
                        employee.getFirstName(),
                        employee.getLastName(),
                        employee.getEmail()))
                .toList();
        return employees;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        // Grabbing and storing employee with matching ID.
        EmployeeEntity employee = employeeRepository.findById(id).get();
        // Deleting employee from database.
        employeeRepository.delete(employee);
        return true;
    }

    @Override
    public Employee getEmployeeById(Long id) {
        // Grabbing and storing employee entity with matching ID.
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        // Instantiating new Employee model.
        Employee employee = new Employee();
        // Copying properties from employee entity to employee model.
        BeanUtils.copyProperties(employeeEntity, employee);
        // Returning employee model.
        return employee;
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        // Grabbing and storing employee with matching ID to update.
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        // Updating employee.
        employeeEntity.setEmail(employee.getEmail());
        employeeEntity.setFirstName(employee.getFirstName());
        employeeEntity.setLastName(employee.getLastName());
        // Saving updated employee to database.
        employeeRepository.save(employeeEntity);
        // Returning employee model.
        return employee;
    }
}
