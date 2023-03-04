import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { employeeSchema } from '../validations/EmployeeValidation';

const AddEmployee = () => {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]: value})
    }

    const saveEmployee = async (e) => {
        e.preventDefault();
        const isValid = await employeeSchema.isValid(employee);
        if (isValid) {
            EmployeeService.saveEmployee(employee)
            .then((response) => {
                console.log(response);
                navigate("/");
            }).catch((error) => {
                console.log(error);
            });
        } else {
           alert('Please enter valid credentials.');
        }
    }

    const reset = (e) => {
        e.preventDefault();
        setEmployee({
            id: "",
            firstName: "",
            lastName: "",
            email: ""
        });
    }

    return (
        <div className="flex max-w-2xl mx-auto my-8 shadow border-b">
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking-wide">
                    <h1>Add Employee</h1>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={(e) => handleChange(e)}
                        className="h-8 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={(e) => handleChange(e)}
                        className="h-8 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={(e) => handleChange(e)}
                        className="h-8 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                    <button
                        onClick={saveEmployee}
                        className="rounded text-white font-semibold bg-green-400 px-6 py-2 hover:bg-green-500">Save</button>
                    <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red-400 px-6 py-2 hover:bg-red-500">Clear</button>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;