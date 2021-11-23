import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Spinner,
} from "reactstrap";
import { Formik } from 'formik';
import { useHistory, useParams } from "react-router-dom";
import UserHeader from "components/Headers/UserHeader.js";
import axios from 'axios';
import makeToast from 'helpers/makeToast';
import * as Yup from 'yup';


const userCreateSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const userUpdateSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string(),
    confirm_password: Yup.string().when("password", {
        is: value => value && value.length > 0,
        then: Yup.string()
            .required(
                "Required"
            )
            .oneOf([Yup.ref("password"), null], "Must match new password."),
        otherwise: Yup.string()
    }),
});

const UserForm = () => {
    const history = useHistory();
    const [user, setUser] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`/users/find/${id}`)
                .then(res => {
                    const user = res.data;
                    setUser(user);
                }).catch(err => {
                    makeToast("error", err.response.data.message)
                })
        }
    }, []);
    return (
        <>
            <UserHeader isNew={!id && true} />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">User Form</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{ username: user.username, email: user.email, password: '', confirm_password: '' }}
                                    validationSchema={id ? userUpdateSchema : userCreateSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        var data = {};
                                        if (id) {
                                            if (values.password) {
                                                data = values;
                                            } else {
                                                data.email = values.email;
                                                data.username = values.username;
                                            }
                                            axios.put(`/users/${id}`, data).then(res => {
                                                makeToast("success", "User sucessfully updated");
                                                history.push('/admin/users');
                                            }).catch(err => {
                                                makeToast("error", err.response.data.message)
                                            })
                                        } else {
                                            axios.post('/auth/register', values).then(res => {
                                                makeToast("success", "User sucessfully created");
                                                history.push('/admin/users');
                                            }).catch(err => {
                                                makeToast("error", err.response.data.message)
                                            })
                                        }
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        < Form onSubmit={handleSubmit}>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup >
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Username<span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Username"
                                                                name="username"
                                                                type="text"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.username}
                                                            />
                                                            <p className="text-danger ml-2">{errors.username && touched.username && errors.username}</p>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Email address <span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-email"
                                                                placeholder="Email Address"
                                                                type="email"
                                                                name="email"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                            />
                                                            <p className="text-danger ml-2">{errors.email && touched.email && errors.email}</p>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-first-name"
                                                            >
                                                                Password<span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Password"
                                                                type="password"
                                                                name="password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                            />
                                                            <p className="text-danger ml-2">{errors.password && touched.password && errors.password}</p>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-last-name"
                                                            >
                                                                Confirm Password<span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                name="confirm_password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.confirm_password}
                                                            />
                                                            <p className="text-danger ml-2">{errors.confirm_password && touched.confirm_password && errors.confirm_password}</p>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    color="info"
                                                    type="submit" disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? <Spinner animation="grow" variant="light" /> : "SUBMIT"}
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserForm
