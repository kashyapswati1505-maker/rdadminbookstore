import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function EditAvailability() {

    let { id } = useParams();
    let navigate = useNavigate();

    let [availability, setAvailability] = useState({
        book: "",
        bookName: "",
        quantity: "",
        status: "Available"
    });

    useEffect(() => {

        axios({
            url: apiUrl + "/availability/for/edit/" + id,
            method: "get"
        })
        .then((res) => {

            let data = res.data.data;

            setAvailability({
                book: data.book?._id,
                bookName: data.book?.bookTitle,
                quantity: data.quantity,
                status: data.status
            });

        })
        .catch((err) => {
            console.log(err);
            alert("Availability load nahi ho rahi");
        });

    }, [id]);


    function manageUpdate(e) {

        let { name, value } = e.target;

        setAvailability({
            ...availability,
            [name]: value
        });

    }


    function updateAvailability(e) {

        e.preventDefault();

        axios({
            url: apiUrl + "/edit/availability/" + id,
            method: "put",
            data: {
                quantity: Number(availability.quantity),
                status: availability.status
            }
        })
        .then((res) => {

            alert("Availability updated successfully");

            navigate("/availability");

        })
        .catch((err) => {

            console.log(err);
            alert("Availability update nahi ho rahi");

        });

    }


    return (

        <Container className="mt-4">

            <Row className="justify-content-center">

                <Col lg={8}>

                    <Card className="shadow border-0">

                        <Card.Header className="bg-dark text-white">

                            <h4 className="mb-0">
                                Edit Availability
                            </h4>

                        </Card.Header>


                        <Card.Body>

                            <Form onSubmit={updateAvailability}>

                                {/* BOOK NAME */}

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Book Name
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        value={availability.bookName}
                                        readOnly
                                    />

                                </Form.Group>


                                {/* QUANTITY */}

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Available Quantity
                                    </Form.Label>

                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={availability.quantity}
                                        onChange={manageUpdate}
                                        min="0"
                                    />

                                </Form.Group>


                                {/* STATUS */}

                                <Form.Group className="mb-4">

                                    <Form.Label>
                                        Status
                                    </Form.Label>

                                    <Form.Select
                                        name="status"
                                        value={availability.status}
                                        onChange={manageUpdate}
                                    >

                                        <option value="Available">
                                            Available
                                        </option>

                                        <option value="Out of Stock">
                                            Out of Stock
                                        </option>

                                    </Form.Select>

                                </Form.Group>


                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="me-2"
                                >
                                    Update Availability
                                </Button>


                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        navigate("/availability")
                                    }
                                >
                                    Cancel
                                </Button>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}

export default EditAvailability;