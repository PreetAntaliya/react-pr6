import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ViewData = () => {
    const [show, setShow] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [record, setRecord] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault()
        let obj = {
            id: Math.floor(Math.random() * 100), fname, lname, email
        }

        let old = [...record, obj]
        setRecord(old)
        localStorage.setItem('employee', JSON.stringify(old))
        setFname("")
        setLname("")
        setEmail("")
        setShow(false);
    }

    useEffect(() => {
        let allData = JSON.parse(localStorage.getItem("employee")) ? JSON.parse(localStorage.getItem("employee")) : []
        setRecord(allData)
    }, [])

    const deleteData = (id) => {
        let deleteEmp = record.filter(item => item.id != id)
        setRecord(deleteEmp)
        localStorage.setItem('employee', JSON.stringify(deleteEmp));
    }

    return (
        <div align="center">
            <div>
                <h1 className='mb-4 mt-3'>Employees Data</h1>
                <div className='my-3'>
                    <Button varient="primary" onClick={handleShow}>Add Employee</Button>

                    {/* pop up */}
                    <Modal show={show} onHide={handleClose} backdrop="static" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className='text-center'>
                                <div className='py-2'>
                                    <label htmlFor="name" className='pe-3'>First Name:</label>
                                    <input type="text" id='fname' value={fname} onChange={(e) => setFname(e.target.value)} required />
                                </div>
                                <div className='py-2'>
                                    <label htmlFor="lname" className='pe-3'>Last Name:</label>
                                    <input type="text" id='lname' value={lname} onChange={(e) => setLname(e.target.value)} required />
                                </div>
                                <div className='py-2'>
                                    <label htmlFor="email" className='pe-3'>Email:</label>
                                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant='primary' onClick={handleSubmit}>Submit</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
                <Table striped bordered className='w-50'>
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            record.map((item) => {
                                return (
                                    <tr key={item.id} className='text-center'>
                                        <td>{item.id}</td>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <Link to={`/update/${item.id}`}>
                                                <Button variant='success'>Update</Button>
                                            </Link>
                                            <Button className='ms-3' onClick={() => deleteData(item.id)} variant='danger'>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>


        </div>
    )
}

export default ViewData