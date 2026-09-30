import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Table,
    Button,
    Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function AvailabilityList() {

    let [availability, setAvailability] = useState([]);
    let navigate = useNavigate();

    function getAvailability() {

        axios({
            url: apiUrl + "/availability",
            method: "get"
        })
        .then((res) => {
            setAvailability(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Availability load nahi ho rahi");
        });
    }

    useEffect(() => {
        getAvailability();
    }, []);

    function deleteAvailability(id) {

        if (!window.confirm("Are you sure you want to delete this availability?")) {
            return;
        }

        axios({
            url: apiUrl + "/delete/availability/" + id,
            method: "delete"
        })
        .then((res) => {
            alert("Availability deleted successfully");
            getAvailability();
        })
        .catch((err) => {
            console.log(err);
            alert("Delete nahi ho rahi");
        });
    }

    return (
        <Container className="mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3>
                    Manage Availability
                </h3>

                <Button
                    variant="primary"
                    onClick={() => navigate("/add/availability")}
                >
                    + Create Availability
                </Button>

            </div>

            <Table
                striped
                bordered
                hover
                responsive
                className="shadow"
            >

                <thead className="table-dark">

                    <tr>
                        <th>#</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {availability.length === 0 ? (

                        <tr>
                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Availability Found
                            </td>
                        </tr>

                    ) : (

                        availability.map((item, index) => (

                            <tr key={item._id}>

                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    {item.book?.bookTitle}
                                </td>

                                <td>
                                    {item.book?.authorName}
                                </td>

                                <td>
                                    {item.quantity}
                                </td>

                                <td>

                                    {item.status === "Available" ? (

                                        <Badge bg="success">
                                            Available
                                        </Badge>

                                    ) : (

                                        <Badge bg="danger">
                                            Out of Stock
                                        </Badge>

                                    )}

                                </td>

                                <td>

                                    {/* EDIT BUTTON */}
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() =>
                                            navigate(
                                                "/edit/availability/" +
                                                item._id
                                            )
                                        }
                                    >
                                        ✏️
                                    </Button>

                                    {/* DELETE BUTTON */}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() =>
                                            deleteAvailability(item._id)
                                        }
                                    >
                                        🗑️
                                    </Button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </Table>

        </Container>
    );
}

export default AvailabilityList;