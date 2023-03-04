import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
               await EmployeeService.getEmployees()
               .then((response) => (response.json()))
               .then((data) => (setEmployees(data)));
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchEmployees();
    }, []);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployee(id)
        .then((response) => {
            if (employees) {
                setEmployees((previousElement) => {
                    return previousElement.filter((employee) => employee.id !== id);
                })
            }
        })
    }
    

    return (
        <div className="container mx-auto my-8">
            <div className="h-12">
                <button
                    onClick={() => {navigate("/addemployee")}}
                    className="rounded bg-slate-600 text-white px-6 py-2 font-normal">Add Employee</button>
            </div>
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left font-medium text-gray-500 px-2 py-2">Last Name</th>
                            <th className="text-left font-medium text-gray-500 px-2 py-2">First Name</th>
                            <th className="text-left font-medium text-gray-500 px-2 py-2">Email</th>
                            <th className="text-right font-medium text-gray-500 px-2 py-2">Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {employees.map((employee) => (
                                <Employee 
                                    employee={employee}
                                    deleteEmployee={deleteEmployee}
                                    key={employee.id}></Employee>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}

export default EmployeeList;