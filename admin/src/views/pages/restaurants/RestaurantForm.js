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
import { useHistory } from "react-router-dom";
import UserHeader from "components/Headers/UserHeader.js";
import axios from 'axios';
import makeToast from 'helpers/makeToast';
import * as Yup from 'yup';

function RestaurantForm() {
    const history = useHistory();
    return (
        <>
            <UserHeader isNew={true} />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Restaurant Form</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{ title: '', location: '', image_url: '' }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        axios.post('/auth/register', values).then(res => {
                                            makeToast("success", "User sucessfully created");
                                            history.push('/admin/users');
                                        }).catch(err => {
                                            makeToast("error", err.response.data.message)
                                        })
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
                                                                htmlFor="input-title"
                                                            >
                                                                Title<span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-title"
                                                                placeholder="Title"
                                                                name="title"
                                                                type="text"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.username}
                                                            />
                                                            <p className="text-danger ml-2">{errors.title && touched.title && errors.title}</p>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-location"
                                                            >
                                                                Location <span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-location"
                                                                placeholder="Location"
                                                                type="location"
                                                                name="text"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.location}
                                                            />
                                                            <p className="text-danger ml-2">{errors.location && touched.location && errors.location}</p>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-location"
                                                            >
                                                                Image <span className="text-danger ml-1">*</span>
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-location"
                                                                placeholder="Location"
                                                                type="location"
                                                                name="text"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.location}
                                                            />
                                                            <p className="text-danger ml-2">{errors.location && touched.location && errors.location}</p>
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

export default RestaurantForm