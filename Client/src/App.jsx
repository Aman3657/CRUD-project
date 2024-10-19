import React, { useEffect, useState } from "react"; // Added useState import
import axios from "axios";
import Contacts from "./Contacts";
import AddContacts from "./AddContacts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts, setContacts] = useState([]); // Initialize useState for contacts
  const [showModal, setShowModal] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");
  const url = "http://localhost:2000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await axios.get(`${url}/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("This data is coming from API", api.data.contact);

        // Set the contacts state only after fetching the data
        setContacts(api.data.contact);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reload]); // Empty dependency array to call useEffect only once

  const handleModal = () => {
    setShowModal(!showModal);
    setOpacity(!opacity);
  };
  console.log("getting id for edit", id);
  return (
    <>
    <ToastContainer/>
      <AddContacts
        handleModal={handleModal}
        showModal={showModal}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        setId={setId}
        contacts={contacts}
      />
      <Contacts
        contacts={contacts}
        opacity={opacity}
        url={url}
        reload={reload}
        setReload={setReload}
        setId={setId}
        handleModal={handleModal}
      />
    </>
  );
};

export default App;
