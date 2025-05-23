import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import productsData from "../api/products";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setData(productsData);
      setFilter(productsData);
      setLoading(false);
    }, 1000); // simulate fetch delay

    return () => clearTimeout(timeout);
  }, []);

  const filterProduct = (region) => {
    const updatedList = data.filter((item) => item.region === region);
    setFilter(updatedList);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Europe")}
          >
            Europe
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("North America")}
          >
            North America
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Asia")}
          >
            Asia
          </button>
        </div>

        {filter.map((product) => (
          <div
            key={product.id}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <div className="card text-center h-100">
              <img
                className="card-img-top p-3"
                src={product.image}
                alt={product.name}
                height={200}
                style={{ objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <b>{product.name.substring(0, 40)}</b>
                </h5>
                <p className="card-text"><b>Price:</b> {product.price}</p>
                <p className="card-text"><b>Region:</b> {product.region}</p>
              </div>
              <div className="card-body">
                <Link
                  to={"/product/" + product.id}
                  className="btn btn-success m-1"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-success m-1"
                  onClick={() => {
                    toast.success("Added to cart");
                    addProduct(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="text-2xl font-bold tracking-wide text-green-600">
            Marketplace
          </h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
