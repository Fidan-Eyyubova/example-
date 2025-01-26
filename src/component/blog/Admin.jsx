import React, { useEffect, useState } from "react";
import "./Blog.scss";
import axios from "axios";

const Admin = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
      .then((res) => setData(res?.data))
      .catch((err) => alert("Failed to fetch data. Please try again later."));
  };

  const handlePost = () => {
  
    axios
      .post(
        base_url,
        {
          img: image,
          title: title,
          desc: desc,
        },
        {
          headers: {
            apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then(() => fetchData())
      .catch((err) => alert("Failed to add new blog post."));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin m-3">
      <div>
        <div className="d-flex justify-content-evenly align-items-center">
          <h1>Admin Panel</h1>
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            +
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Adding new blogs
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column">
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    className="my-2"
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="my-2"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="my-2"
                    id="description"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-warning" onClick={handlePost}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <img src={item.img} alt={item.title} style={{ width: "150px", height: "auto" }} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
