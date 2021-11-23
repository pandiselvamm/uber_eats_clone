import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Spinner,
} from "reactstrap";
import { Formik } from 'formik';
import { login } from "context/authContext/apiCalls";
import { AuthContext } from "context/authContext/authContext";
import makeToast from 'helpers/makeToast';


const Login = () => {
  const { error, user, dispatch, isFetching } = useContext(AuthContext);


  useEffect(() => {
    if (error && isFetching) {
      makeToast("error", error.response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, user]);
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.password) {
                  errors.password = 'Required';
                } else if (values.password.length < 6) {
                  errors.password = 'Must contain 6 characters';
                }
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                login(values, dispatch);
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
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </InputGroup>
                    <p className="text-danger ml-2">{errors.email && touched.email && errors.email}</p>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </InputGroup>
                    <p className="text-danger ml-2">{errors.password && touched.password && errors.password}</p>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      color="info"
                      type="submit" disabled={isSubmitting && !error}
                    >
                      {(isSubmitting && !error) ? <Spinner animation="grow" variant="light" /> : "SIGN IN"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
