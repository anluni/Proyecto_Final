import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useItem } from "../context/ProductContext";

const EditProductModal = ({ show, handleClose, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateProduct } = useItem();

  // ✅ FORMATEADOR DE MILES 🔥
  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // ✅ CARGAR DATOS DEL PRODUCTO

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(""); // ✅ QUEDA VACÍO
      setImage(product.image || "");
    }
  }, [product]);

  // ✅ GUARDAR (LIMPIA PUNTOS)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPrice = price.replace(/\./g, "");

    setLoading(true);

    const result = await updateProduct(
      product.id,
      name,
      parseFloat(cleanPrice),
      image,
    );

    setLoading(false);

    if (result.success) {
      handleClose();
    } else {
      alert(result.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div
        style={{
          backgroundColor: "#0f2a44",
          borderRadius: "20px",
        }}
      >
        {/* ✅ HEADER SIN NEGRO 🔥 */}
        <Modal.Header
          closeButton
          className="border-0 justify-content-center position-relative"
          style={{ backgroundColor: "#0f2a44" }}
        >
          <Modal.Title className="text-white fw-bold text-center w-100">
            Editar Producto
          </Modal.Title>
        </Modal.Header>

        {/* ✅ BODY OSCURO */}
        <Modal.Body
          style={{
            backgroundColor: "#0f2a44",
            color: "white",
          }}
        >
          <Form onSubmit={handleSubmit}>
            {/* ✅ NOMBRE */}
            <Form.Group className="mb-4">
              <Form.Label className="d-block mb-2 text-light">
                Nombre
              </Form.Label>

              <Form.Control
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#1f3b57",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* ✅ PRECIO CON FORMATO 🔥 */}
            <Form.Group className="mb-4">
              <Form.Label className="d-block mb-2 text-light">
                Precio CLP
              </Form.Label>

              <Form.Control
                type="text"
                value={price || ""}
                placeholder="Ej: 999999"
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  const formatted = formatNumber(onlyNumbers);
                  setPrice(formatted);
                }}
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#1f3b57",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* ✅ URL */}
            <Form.Group className="mb-4">
              <Form.Label className="d-block mb-2 text-light">
                URL de la página web o imagen
              </Form.Label>

              <Form.Control
                type="text"
                value={image || ""}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#1f3b57",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* ✅ PREVIEW */}
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

            {/* ✅ BOTONES */}
            <div className="d-flex gap-2">
              <Button
                variant="outline-light"
                className="flex-grow-1"
                onClick={handleClose}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                className="flex-grow-1 btn-accent"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditProductModal;
