import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContacts = ({
  handleModal,
  showModal,
  url,
  reload,
  setReload,
  id,
  setId,
  contacts,
}) => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      for (let i = 0; i < contacts.length; i++) {
        if (id == contacts[i]._id) {
          setName(contacts[i].name);
          setGmail(contacts[i].gmail);
          setPhone(contacts[i].phone);
          break;
        }
      }
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, gmail, phone);
    handleModal();
    if(id){
      const api = await axios.put(
        `${url}/${id}`,
        { name, gmail, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

    }else{
// send data to api
const api = await axios.post(
  `${url}/`,
  { name, gmail, phone },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
toast.success(api.data.message, {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
  });


    }
    
    setReload(!reload);
    setName("")
    setGmail("")
    setPhone("")
    setId("")
  };
  return (
    <>
      <div className="container text-center mt-5">
        <button className="btn btn-warning " onClick={handleModal}>
          Add Contact
        </button>

        {/*Modal Code */}
        {showModal && (
          <div
            className="modal "
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content p-3">
                <div
                  className="modal-header bg-dark d-flex justify-content-center align-items-center"
                  style={{ border: "2px solid yellow" }}
                >
                  <h3 className="text-center ">
                    {" "}
                    {id ? "Edit Contact" : "Add Contact"}
                  </h3>
                </div>
                <div className="modal-body">
                  {/* Modal Body */}
                  <form onSubmit={submitHandler}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Gmail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      {id ? (
                        <button type="submit" className="btn btn-primary mx-3">
                          Edit Contact
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary mx-3">
                          Add Contact
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddContacts;
