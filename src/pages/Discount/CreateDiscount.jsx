import { Container, Row, Col, Form, Button } from "react-bootstrap"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL
function CreateDiscount(){
    const navigate = useNavigate();
    let [books, setBooks] = useState([])
    let [book, setBook] = useState('')
    let [discountName, setDiscountName] = useState('')
    let [discountValue, setDiscountValue] = useState(0)
    let [discountType, setDiscountType] = useState('')
    let [validFrom, setValidFrom] = useState('')
    let [validTo, setValidTo] = useState('')

    useEffect(()=>{
        axios({
            url: apiUrl + '/books/for/discount',
            method: 'get'
        }).then((res)=>{
            setBooks(res.data.data)
        }).catch((err)=>{
            alert(err)
        })
    },[])
    function addDiscount(){
        let data= {
            book: book,
            discountName: discountName,
            discountValue: discountValue,
            discountType: discountType,
            validFrom: validFrom,
            validTo: validTo
        }
        axios({
            url: apiUrl + '/add/discount',
            method: 'POST',
            data: data
        }).then((res)=>{
            alert('Discount has been added successfully..')
            navigate('/discounts')
        }).catch((err)=>{
            alert(err);
        })
    }
    return(
        <Container>

            <Row>
                <Col>
                    <Form>
                        <h3 className="mt-5 text-center text-danger" >Add Discount on Book</h3>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group>
                    <Form.Label>Select Book</Form.Label>
                    <Form.Select onChange={(e) => setBook(e.target.value)}>
                        <option>----SelectBook----</option>
                        {
                            books.map((book)=>
                                <option value={book._id}>{book.bookTitle}</option>
                            )
                        }
                    </Form.Select>
                </Form.Group>
                </Col>
            </Row>

            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Discount Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => setDiscountName(e.target.value)}></Form.Control>
                </Form.Group>
            </Row>

            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Discount Type</Form.Label>
                    <Form.Select onChange={(e) => setDiscountType(e.target.value)}>
                        <option value="">----Select----</option>
                        <option value="Percentage"> Percentage</option>
                        <option value="Fixed"> Fixed</option>
                    </Form.Select>
                </Form.Group>
            </Row>

           <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Discount Value (in Number Only)</Form.Label>
                    <Form.Control type="number" onChange={(e) => setDiscountValue(e.target.value)}></Form.Control>
                </Form.Group>
            </Row>

            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Valid From</Form.Label>
                    <Form.Control type="date" onChange={(e) => setValidFrom(e.target.value)}></Form.Control>
                </Form.Group>
            </Row>

            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Valid To</Form.Label>
                    <Form.Control type="date" onChange={(e) => setValidTo(e.target.value)}></Form.Control>
                </Form.Group>
            </Row>

            <Button className="mt-2" variant="success" onClick={addDiscount}> Add Discount</Button>

        </Container>
    )
}
export default CreateDiscount