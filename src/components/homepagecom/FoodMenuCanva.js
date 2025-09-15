import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./FoodMenuCanva.css";
import guyImg from "../../images/delivery-guy.png"; // Adjust path if needed

const FoodMenuCanva = () => {
  return (
    <section className="food-menu-canva">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h5 className="mb-3">Easy order & fast delivery</h5>
              <h1 className="mb-4 hero__title">
                <span>Enjoy</span> your favorite Food
              </h1>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="delivery-containerss">
              <div className="delivery-image">
                <img src={guyImg} alt="Delivery Guy" />
              </div>
              <div className="delivery-content">
                <h2>Fast Delivery Service</h2>
                <p>
                  Your favorite items delivered quickly and safely to your
                  doorstep.
                </p>

                <div
                  className="btncontainercanva"
                  style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                >
                  <Link to="/FoodStore" className="order__btn">
                    🍔 Order Now
                  </Link>

                  <Link to="/FoodGenerator" className="order__btn">
                    🧑‍🍳 Cook with AI
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FoodMenuCanva;
