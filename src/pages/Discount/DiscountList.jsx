import { useNavigate } from "react-router-dom"
import { Button, Container, Row, Col, Form, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios"

function DiscountList(){
    let [discounts, setDiscounts] = useState([])
    const navigate = useNavigate()
    function goToAddDiscount(){
        navigate('/add/discount')
}
function goForEdit(id){
    navigate('/edit/discounts/' + id);
}


function getDiscountStatus(validFrom, validTo) {
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let fromDate = new Date(validFrom)
    fromDate.setHours(0, 0, 0, 0)

    let toDate = new Date(validTo)
    toDate.setHours(0, 0, 0, 0)

    if (today >= fromDate && today <= toDate) {
        return "Active"
    } else {
        return "Inactive"
    }
}



useEffect(()=>{
    axios({
        url: apiUrl + '/discounts',
        method: 'get'
    }).then((res) => {
        setDiscounts(res.data.data)
    })
    .catch((err) => {
        alert(err);
    })
},[])
    return(
        <Container>
            <Row>
                <Col>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="type book name to Search"></Form.Control>
                    </Form.Group>
                </Form>
                <Button className="mt-5" variant="success" style={{float:'right'}} onClick={goToAddDiscount}>Add Discount +</Button>
                </Col>
            </Row>
            <Row>
                <h3 className="mt-2 text-center text-danger">Discounts List</h3>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Discount Name</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>
                            <th>Book Name</th>
                            <th>Valid From</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
    <tbody>
{
    discounts.map((discount) => {

        let status = getDiscountStatus(
            discount.validFrom,
            discount.validTo
        )

        return (
        <tr key={discount._id}>
            <td>{discount.discountName}</td>
            <td>{discount.discountType}</td>
            <td>{discount.discountValue}</td>
            <td>{discount.book.bookTitle}</td>
            <td>{new Date(discount.validFrom).toLocaleDateString()}</td>
            <td>{new Date(discount.validTo).toLocaleDateString()}</td>
            <td style={{ color: status === "Active" ? "green" : "red", fontWeight: "bold" }}> {status}</td>
   
            <td>
            <Button variant="primary" size="sm" onClick={() => goForEdit(discount._id)}> Edit</Button>
            </td>
        </tr>
        )
    })

                        
}
    </tbody>

                </Table>
            </Row>
        </Container>
    )
}
export default DiscountList