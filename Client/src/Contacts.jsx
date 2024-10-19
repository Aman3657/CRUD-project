import React from "react";
import axios from "axios";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = ({ contacts,opacity ,url, reload,setReload,id,setId,handleModal}) => {
  const blur=opacity ?"0.2":"1";

  const deleteContact=async(id)=>{
    const api=await axios.delete(
      `${url}/${id}`,
      {
        headers:{
          "Content-Type":"application/json",
        },
      }
    );
    console.log("deleted data=",api)
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

    setReload(!reload)

  }

  
  return (
    <>
      <div className="container my-5" style={{ width: "650px",opacity:`${blur}` }}>
        {contacts.map((data) => (
          <div
            key={data._id}
            className="bg-black p-3 my-3"
            style={{
              borderRadius: "10px",
              border: "2px solid yellow",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div>
              <h1>
                <span className="material-symbols-outlined mx-3">
                  account_circle
                </span>{" "}
                {data.name}
              </h1>
              <h3>
                <span className="material-symbols-outlined mx-3">mail</span>
                {" "}
                {data.gmail}
              </h3>
              <h3>
                <span className="material-symbols-outlined mx-3">call</span>{" "}
                {data.phone}
              </h3>
            </div>
            <div
              style={{
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button className="btn btn-primary" onClick={()=>{

                setId(data._id);
                handleModal();
              }}>Edit</button>
              <button className="btn btn-danger" onClick={()=>deleteContact(data._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
