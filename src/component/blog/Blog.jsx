import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const [data, setData] = useState([]);
  const base_url = "https://xvpntbshyysyskxxzjdv.supabase.co/rest/v1/blog";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cG50YnNoeXlzeXNreHh6amR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNDI4MTAsImV4cCI6MjA0NTYxODgxMH0.NTwoS8Rjbv6NCmjUr-qp72AC4riBSFFTwk8R6mtlMGM";

  const fetchData = () => {
    axios
      .get(`${base_url}?select=*`, {
        headers: {
          apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => setData(res?.data || []))
      .catch(() => alert("Failed to fetch data. Please try again later."));
  };

  useEffect(() => {
    fetchData();
  }, []); // Dependency array ensures fetchData is called only once

  return (
    <div>
      <Link to="/">Admin</Link>
      <div>
        {data.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "150px", height: "auto", marginBottom: "10px" }}
            />
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Description:</strong> {item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
