import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Product = ({ product, addProduct }) => {
  const variants = [
    {
      id: 1,
      name: "Default",
      price: product.price,
    },
    {
      id: 2,
      name: "Variant 2",
      price: product.price + 10,
    },
  ];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const isOutOfStock = product.stock === 0;
  return (
    <div
      id={product.id}
      key={product.id}
      className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
    >
      <div className="card h-100  border-0 product-card shadow-sm">
        <div className="position-relative overflow-hidden">
          <img
            className="card-img-top"
            src={product.image}
            alt={product.title}
            style={{
              height: "250px",
              objectFit: "contain",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
          {isOutOfStock && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h5
            className="card-title text-truncate mb-2"
            title={product.title.substring(0, 12)}
          >
            {product.title.substring(0, 12)}
          </h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description.substring(0, 90)}...
          </p>

          {variants.length > 1 && (
            <div className="mb-3">
              <label className="form-label small fw-semibold d-block mb-2">
                Options:
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={`btn btn-sm ${
                      selectedVariant.id === variant.id
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={isOutOfStock}
                  >
                    {variant.name}
                    {variant.price !== product.price &&
                      ` ($${(variant.price - product.price).toFixed(2)})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <span className="h5 text-primary fw-bold mb-0">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mt-auto">
            <div className="d-grid gap-2">
              <button
                className={`btn btn-primary ${isOutOfStock ? "disabled" : ""}`}
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
                disabled={isOutOfStock}
              >
                <i className="fa fa-shopping-cart me-2"></i>
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-secondary btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          transition: all 0.3s ease;
          border-radius: 12px;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }

        .card-img-top {
          border-radius: 12px 12px 0 0;
        }

        @media (max-width: 576px) {
          .product-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Product;
