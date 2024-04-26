import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateData = () => {

    const { editid } = useParams();
    console.log(editid);
    const navigate = useNavigate()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState("")
    const [record, setRecord] = useState((JSON.parse(localStorage.getItem('employee'))) || []);

    const handleSubmit = (event) => {
        event.preventDefault()

        let old = [...record]
        let up = old.map((val) => {
            if (val.id == editid) {
                return {
                    ...val,
                    fname,
                    lname,
                    email
                }
            }
            return val;
        })
        localStorage.setItem("employee", JSON.stringify(up));
        navigate('/');
    }

    useEffect(() => {
        let data = record.find(item => item.id == editid);
        if (data) {
            setFname(data.fname)
            setLname(data.lname)
            setEmail(data.email)
        }
    }, [editid])

    return (
        <div align="center">
            <h1>Update Data</h1>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <Button type='submit' variant='success'>Update</Button>
                    <Link to={'/'}>
                        <Button type='submit' variant='danger' className='ms-3'>Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default UpdateData