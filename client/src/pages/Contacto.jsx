import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contacto = () => {
  return (
    <div style={{ backgroundColor: "#0b1a2f", minHeight: "100vh", color: "white" }}>
      
      {/* HERO (imagen arriba) */}
      <div
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "30px", borderRadius: "10px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>CONTACTO</h1>
          <p style={{ maxWidth: "600px" }}>
            Estamos listos para ayudarte. Contáctanos para cualquier consulta o asesoría tecnológica.
          </p>
        </div>
      </div>

      {/* FORMULARIO */}
      <Container className="mt-5">
        <Row>
          
          {/* LADO IZQUIERDO: FORM */}
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Tu correo" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Empresa</Form.Label>
                <Form.Control type="text" placeholder="Opcional" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje..." />
              </Form.Group>

              <Button variant="primary">Enviar</Button>
            </Form>
          </Col>

          {/* LADO DERECHO: INFORMACIÓN */}
          <Col md={6} className="mt-4 mt-md-0">
            <h4>SRM Tecnología</h4>
            <p>Dirección: Santiago, Chile</p>
            <p>Email: contacto@srm.com</p>
            <p>Teléfono: +56 9 1234 5678</p>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Contacto;
