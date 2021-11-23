import {
    Button,
    Card,
    CardHeader,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { dateFormat } from "helpers/dateFormat";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import makeToast from "helpers/makeToast";


const UsersTable = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios.get(`/users`)
            .then(res => {
                const users = res.data;
                setUsers(users);
            }).catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getUsers()
    }, []);

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete it?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/users/${id}`)
                    .then(res => {
                        makeToast("sucess", "User deleted successfully");
                        getUsers();
                    }).catch(err => {
                        console.error(err);
                    })
            }
        })
    };


    const columns = [
        {
            name: 'Name',
            selector: row => row.username,
            sortable: true,
        }, {
            name: 'Email',
            selector: row => row.email,
        }, {
            name: 'Created At',
            selector: row => dateFormat(row.createdAt, "Y-M-D"),
        }, {
            name: 'Action',
            cell: row => (
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={(e) => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <Link to={`user/edit/${row._id}`}>
                            <DropdownItem>
                                Edit
                            </DropdownItem>
                        </Link>
                        <DropdownItem
                            onClick={() => deleteUser(row._id)}
                        >
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            ),
            allowOverflow: true,
            button: true,
            width: '56px',
        },

    ];
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col xl="6">
                                        <h3 className="mb-0">Users Table</h3>
                                    </Col>
                                    <Col xl="6" className="text-right">
                                        <Link to="user/create">
                                            <Button
                                                color="primary"
                                                size="md"
                                            >
                                                Create
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <DataTable
                                columns={columns}
                                data={users}
                                pagination
                            />
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default UsersTable;
