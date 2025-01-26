import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Product.scss";

const Product = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const api_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cG50YnNoeXlzeXNreHh6amR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNDI4MTAsImV4cCI6MjA0NTYxODgxMH0.NTwoS8Rjbv6NCmjUr-qp72AC4riBSFFTwk8R6mtlMGM"; // Replace with your actual Supabase API key
  const Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cG50YnNoeXlzeXNreHh6amR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNDI4MTAsImV4cCI6MjA0NTYxODgxMH0.NTwoS8Rjbv6NCmjUr-qp72AC4riBSFFTwk8R6mtlMGM"; // Replace with your actual Bearer token

  useEffect(() => {
    axios
      .get(
        "https://xvpntbshyysyskxxzjdv.supabase.co/rest/v1/product?select=*",
        {
          headers: {
            apiKey: api_key,
            Authorization: Authorization,
          },
        }
      )
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="products">
      <div className="container">
        {data.length > 0 ? (
          data.map((el) => (
            <div key={el.id}>
              <div className="wrapper">
                <div>
                  <img src={el.img} alt="" />
                </div>
                <div>
                  <p>{el.rate}</p>
                  <p>{el.title}</p>
                  <p>{el.desc}</p>
                  <p>{el.cost}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
