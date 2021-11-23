import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = ({ isNew }) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          backgroundImage:
            "url(" +
            require("../../assets/img/theme/profile-cover.jpg").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h1 className="text-white">{isNew ? "Create" : "Update"}</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
