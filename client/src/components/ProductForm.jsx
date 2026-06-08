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

    if (!name || !price || !image) {
      alert("Completa todos los campos");
      return;
    }

    const result = await addProduct(name, parseFloat(price), image);

    if (result.success) {
      setName("");
      setPrice("");
      setImage("");
    } else {
      alert(result.message);
    }
  };

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Card className="auth-card border-0 mb-4 form-card overflow-hidden">
      <Card.Body className="p-4 rounded-4">
        {/*TÍTULO */}
        <h4 className="fw-bold text-center text-white mb-2">
          Publicar Producto
        </h4>

        <p className="text-center text-muted mb-4">
          Completa la información del producto
        </p>

        <Form onSubmit={handleSubmit}>
          {/*NOMBRE */}
          <Form.Group className="mb-4">
            <Form.Label className="text-light d-block mb-2">Nombre</Form.Label>

            <Form.Control
              type="text"
              placeholder="Ej: iPhone 17"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
              style={{
                height: "50px",
                borderRadius: "10px",
              }}
            />
          </Form.Group>

          {/*PRECIO */}
          <Form.Group className="mb-4">
            <Form.Label className="text-light d-block mb-2">
              Precio CLP
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Ej: 999999"
              value={price}
              onChange={(e) => {
                const formatted = formatNumber(e.target.value);
                setPrice(formatted);

                const cleanPrice = price.replace(/\./g, "");
                parseFloat(cleanPrice);
              }}
              className="mb-3"
              style={{
                height: "50px",
                borderRadius: "10px",
              }}
            />
          </Form.Group>

          {/*IMAGEN / WEB*/}
          <Form.Group className="mb-4">
            <Form.Label className="text-light d-block mb-2">
              URL de la página web o imagen
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mb-3"
              style={{
                height: "50px",
                borderRadius: "10px",
              }}
            />
          </Form.Group>

          {/*PREVIEW */}
          {image && (
            <div className="text-center mb-4">
              <img
                src={image}
                alt="preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/*BOTÓN */}
          <Button type="submit" className="btn-accent w-100 py-3 shadow-lg">
            Añadir al Catálogo
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductForm;
