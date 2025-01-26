import React, { useEffect, useState } from "react";
import "./Blog.scss";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { Link } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      .catch(() => alert("Failed to fetch data. Please try again later."));
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
      .then(() => {
        fetchData();
        setImage("");
        setTitle("");
        setDesc("");
        setIsAddModalOpen(false); // Close modal
        toast.warn("🦄 Wow so easy!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch(() => alert("Failed to add new blog post."));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}?id=eq.${id}`, {
        headers: {
          apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then(() => fetchData())
      .catch(() => console.error("Failed to delete blog post."));
  };

  const handleEditClick = (id, img, title, desc) => {
    setEditId(id);
    setEditImage(img);
    setEditTitle(title);
    setEditDesc(desc);
  };

  const handleUpdate = () => {
    axios
      .patch(
        `${base_url}?id=eq.${editId}`,
        {
          img: editImage,
          title: editTitle,
          desc: editDesc,
        },
        {
          headers: {
            apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then(() => {
        fetchData();
        setEditId(null);
        setEditImage("");
        setEditTitle("");
        setEditDesc("");
      })
      .catch(() => alert("Failed to update blog post."));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin m-3">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Link to={"/blog"}>Blog</Link>
      <div>
        <div className="d-flex justify-content-evenly align-items-center">
          <h1>Admin Panel</h1>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setIsAddModalOpen(true)} // Open modal
          >
            +
          </button>
        </div>
        {/* Add Modal */}
        {isAddModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Adding New Blog</h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsAddModalOpen(false)} // Close modal
                  />
                </div>
                <div className="modal-body">
                  <form className="d-flex flex-column">
                    <label htmlFor="image">Image</label>
                    <input
                      type="text"
                      className="my-2"
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="my-2"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="my-2"
                      id="description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsAddModalOpen(false)} // Close modal
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      handlePost();
                      notify();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Edit Modal */}
        {editId && (
          <div
            className="modal fade show"
            id="editModal"
            tabIndex={-1}
            aria-labelledby="editModalLabel"
            aria-hidden="false"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="editModalLabel">
                    Edit Blog
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setEditId(null)}
                  />
                </div>
                <div className="modal-body">
                  <form className="d-flex flex-column">
                    <label htmlFor="editImage">Image</label>
                    <input
                      type="text"
                      className="my-2"
                      id="editImage"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                    />
                    <label htmlFor="editTitle">Title</label>
                    <input
                      type="text"
                      className="my-2"
                      id="editTitle"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="editDescription">Description</label>
                    <input
                      type="text"
                      className="my-2"
                      id="editDescription"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditId(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ul className="list-unstyled d-flex flex-wrap gap-3">
        {data.map((item) => (
          <li key={item.id} className="card p-3" style={{ width: "200px" }}>
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="d-flex justify-content-between align-items-center">
              <FaEdit
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() =>
                  handleEditClick(item.id, item.img, item.title, item.desc)
                }
              />
              <MdDelete
                onClick={() => handleDelete(item.id)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
