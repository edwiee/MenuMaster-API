import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ItemsinRecipe from "./ui/ItemsinRecipe";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";


import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const BlogData = [



//   {
//     image: bg1,
//     title: "This is simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg2,
//     title: "Lets be simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg3,
//     title: "Don't Lamp blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg4,
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
// ];




const Starter = () => {

  const [data, setData] = useState([])

  const [update, setUpdate] = useState({})
  
  useEffect(()=>{
    axios
    .get('http://127.0.0.1:8000/destinationCreate/')
    .then((response)=>{
        setData(response.data)
    })
    .catch((error)=>{
        console.log(error)
    })
  },[data])
  
   // GET DETAILS TO UPDATE -- FUNCTION
   const viewDestination=(id)=>{
    fetch(`http://127.0.0.1:8000/destinationUpdate/${id}/`)
    .then(response=>response.json())
    .then(res=>setUpdate(res))
  }
  
  
  
      // UPDATE DETAILS ON SUBMIT BUTTON CONFUIRGATION
      const handleUpdatesubmit = async(e, id)=>{
        e.preventDefault();
  
        const requestData = {
          id: update.id,
          place_name: update.place_name,
          weather : update.weather,
          state : update.state,
          district : update.district,
          google_map_link : update.google_map_link,
          image : update.img,
          description : update.description,
        };
        const response = await axios.put(`http://127.0.0.1:8000/destinationUpdate/${id}/`, requestData, { 
          headers:{
            'Content-Type':'multipart/form-data'
          },
      });
      toast("🗺️ Details of the Destination Updated", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
  
      })
    }



  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ItemsinRecipe />
        </Col>
      </Row>
      {/***Blog Cards***/}
      
    </div>
  );
};

export default Starter;
