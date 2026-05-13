import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useItem } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { items, loading } = useItem();

  return (
    <div style={{ backgroundColor: "#0b1a2f", minHeight: "100vh" }}>
      <Container className="py-5 animate-fade-in">

        {/* ✅ HEADER */}
        <Row className="justify-content-center text-center mb-5 mt-4">
          <Col md={10} lg={8}>
            <h1 className="display-2 fw-bold text-accent">
              Nuestros Productos
            </h1>

            <p className="lead text-muted fs-5 mt-3">
              Descubre una experiencia de compra única con diseño de vanguardia.
            </p>
          </Col>
        </Row>

        {/* ✅ PRODUCTOS */}
        <Row className="g-4">
          {loading ? (
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Cargando catálogo...</p>
            </Col>
          ) : items && items.length > 0 ? (
            items.map((item, index) => (
              <Col
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={item} />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <div
                className="p-5 rounded-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3 className="text-light fw-bold">
                  No hay productos disponibles.
                </h3>
                <p className="text-muted">
                  ¡Sé el primero en añadir uno!
                </p>
              </div>
            </Col>
          )}
        </Row>

      </Container>
    </div>
  );
};

export default Home;