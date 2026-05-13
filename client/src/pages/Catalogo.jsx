import { Container, Row, Col } from "react-bootstrap";
import ProductForm from "../components/ProductForm";

const Catalogo = () => {
  return (
    <div style={{ backgroundColor: "#0b1a2f", minHeight: "100vh" }}>
      <Container className="py-5">

        <Row className="justify-content-center text-center mb-5 mt-4">
          <Col md={8}>
            <h1 className="fw-bold text-accent">
              Cargar Producto
            </h1>
            <p className="text-muted">
              Agrega nuevos productos a tu catálogo
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={6}>
            <ProductForm />
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default Catalogo;
