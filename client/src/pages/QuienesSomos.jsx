import React from "react";
import { Container } from "react-bootstrap";

const QuienesSomos = () => {
  return (
    <Container className="mt-5 text-light">
      <h1 className="text-center mb-4">Quiénes Somos</h1>

      <p className="text-center fs-5">
        En SRM somos una tienda especializada en tecnología dedicada a ofrecer
        una amplia gama de productos como celulares, laptops y accesorios de alta calidad.
        Nos enfocamos en brindar soluciones modernas que se adapten a las necesidades
        de nuestros clientes, acompañándolos en su crecimiento digital y facilitando su día a día.
      </p>

      <p className="text-center fs-5 mt-3">
        Nos caracterizamos por nuestro compromiso con la innovación, la confianza
        y el excelente servicio, garantizando una experiencia de compra segura,
        rápida y satisfactoria.
      </p>
    </Container>
  );
};

export default QuienesSomos;
``