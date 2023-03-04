import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        id: id,
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]: value})
    }

    const updateEmployee = (e) => {
        e.preventDefault();
        EmployeeService.updateEmployee(employee, id)
        .then((response) => {
            navigate("/employeelist");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                EmployeeService.getEmployeeById(id)
                    .then((response) => (response.json()))
                    .then((data) => (setEmployee(data)));
            } catch (error) {
                console.log(error)
            }
        };
        fetchEmployee();
    }, [])
    

  return (
    <div className="flex max-w-2xl mx-auto my-8 shadow border-b">
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking-wide">
                    <h1>Update Employee</h1>
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
                        onClick={updateEmployee}
                        className="rounded text-white font-semibold bg-blue-400 px-6 py-2 hover:bg-blue-500">Update</button>
                    <button
                        onClick={() => {navigate("/employeelist")}}
                        className="rounded text-white font-semibold bg-red-400 px-6 py-2 hover:bg-red-500">Cancel</button>
                </div>
            </div>
        </div>
  )
}

export default UpdateEmployee