import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useItem } from "../context/ProductContext";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { addProduct } = useItem();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) return;

    const result = await addProduct(name, parseFloat(price), image);

    if (result.success) {
      setName("");
      setPrice("");
      setImage("");
    } else {
      alert(result.message);
    }
  };

  return (
    <Card className="auth-card border-0 mb-4 form-card overflow-hidden">
      <Card.Body className="p-4 rounded-4">
        
        <h4 className="mb-4 fw-bold text-center text-white">
          Publicar Producto
        </h4>

        <Form onSubmit={handleSubmit}>

          {/* ✅ NOMBRE */}
          <Form.Group className="mb-4">
            <Form.Label className="text-light">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: iPhone 17"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                height: "50px",
                borderRadius: "10px"
              }}
              required
            />
          </Form.Group>

          {/* ✅ PRECIO */}
          <Form.Group className="mb-4">
            <Form.Label className="text-light">Precio CLP</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ej: 999999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                height: "50px",
                borderRadius: "10px"
              }}
              required
            />
          </Form.Group>

          {/* ✅ IMAGEN */}
          <Form.Group className="mb-4">
            <Form.Label className="text-light">URL de la imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{
                height: "50px",
                borderRadius: "10px"
              }}
              required
            />
          </Form.Group>

          {/* ✅ BOTÓN */}
          <Button
            variant="accent"
            type="submit"
            className="btn-accent w-100 py-3 shadow-lg"
          >
            Añadir al Catálogo
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductForm;
