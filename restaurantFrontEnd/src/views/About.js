import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const About = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-info-square">  </i>
            About Restaurant Recipe Manager
          </CardTitle>
          <CardBody className="p-4">
            <Row>
              <Col lg="">
                <h2 className="mt-4">Restaurant Recipe Manager</h2>
                <h5 className=" mb-4">
                This application allows restaurant employees to manage customer orders. It includes modules for adding recipes, updatind and deleting recipes from the menu list. The application is designed to simplify order and reservation management for restaurants to replace traditional paper-based systems.
                </h5>
                <img
                  src="https://img.freepik.com/free-photo/3d-delicious-burger-bright-light-podium_23-2150914797.jpg?t=st=1722082515~exp=1722086115~hmac=f23aba4aa37b088cebd00307bfe634ec5ede68b69ed88071304e52ac384182f1&w=1800"
                  alt="my" className="w-inherits"
                />
                <br />
                <Button
                  className="mt-3"
                  color="primary"
                  href="https://github.com/edwiix"
                  target="_blank"
                >
                  Github Repository of Restaurant Recipe Manager
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
