import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

function CreateAvailability() {

    let [books, setBooks] = useState([]);

    let [availability, setAvailability] = useState({
        book: "",
        quantity: "",
        status: "Available"
    });

    useEffect(() => {
        axios({
            url: apiUrl + "/books",
            method: "get"
        })
        .then((res) => {
            setBooks(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Books load nahi ho pa rahe");
        });
    }, []);

    function manageAvailability(e) {
        let { name, value } = e.target;

        setAvailability({
            ...availability,
            [name]: value
        });
    }

    function createAvailability(e) {
        e.preventDefault();

        if (
            availability.book === "" ||
            availability.quantity === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        axios({
            url: apiUrl + "/add/availability",
            method: "post",
            data: {
                book: availability.book,
                quantity: Number(availability.quantity),
                status: availability.status
            }
        })
        .then((res) => {
            alert("Availability created successfully!");

            setAvailability({
                book: "",
                quantity: "",
                status: "Available"
            });
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }

    return (
        <Container className="mt-4">

            <Row className="justify-content-center">

                <Col lg={8}>

                    <Card className="shadow border-0">

                        <Card.Header className="bg-dark text-white">
                            <h4 className="mb-0">
                                Create Availability
                            </h4>
                        </Card.Header>

                        <Card.Body>

                            <Form onSubmit={createAvailability}>

                                {/* BOOK */}
                                <Row className="mb-3">
                                    <Col>

                                        <Form.Group>

                                            <Form.Label>
                                                Select Book
                                            </Form.Label>

                                            <Form.Select
                                                name="book"
                                                value={availability.book}
                                                onChange={manageAvailability}
                                            >

                                                <option value="">
                                                    Select Book
                                                </option>

                                                {
                                                    books.map((book) => (
                                                        <option
                                                            key={book._id}
                                                            value={book._id}
                                                        >
                                                            {book.bookTitle}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>
                                </Row>

                                {/* QUANTITY */}
                                <Row className="mb-3">
                                    <Col>

                                        <Form.Group>

                                            <Form.Label>
                                                Available Quantity
                                            </Form.Label>

                                            <Form.Control
                                                type="number"
                                                name="quantity"
                                                value={availability.quantity}
                                                onChange={manageAvailability}
                                                placeholder="Enter quantity"
                                                min="0"
                                            />

                                        </Form.Group>

                                    </Col>
                                </Row>

                                {/* STATUS */}
                                <Row className="mb-4">
                                    <Col>

                                        <Form.Group>

                                            <Form.Label>
                                                Status
                                            </Form.Label>

                                            <Form.Select
                                                name="status"
                                                value={availability.status}
                                                onChange={manageAvailability}
                                            >

                                                <option value="Available">
                                                    Available
                                                </option>

                                                <option value="Out of Stock">
                                                    Out of Stock
                                                </option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>
                                </Row>

                                <Button
                                    type="submit"
                                    variant="primary"
                                >
                                    Create Availability
                                </Button>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>
    );
}

export default CreateAvailability;