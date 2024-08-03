import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

const ItemsinRecipe = () => {
  
  const [data, setData] = useState([])

  const [update, setUpdate] = useState({})

  useEffect(()=>{
    axios
    .get('http://127.0.0.1:8000/createRecipe/')
    .then((response)=>{
        setData(response.data)
    })
    .catch((error)=>{
        console.log(error)
    })
},[data])

   // GET DETAILS TO UPDATE -- FUNCTION
   const viewDestination=(id)=>{
    fetch(`http://127.0.0.1:8000/updateRecipe/${id}/`)
    .then(response=>response.json())
    .then(res=>setUpdate(res))
  }



      // UPDATE DETAILS ON SUBMIT BUTTON CONFUIRGATION
      const handleUpdatesubmit = async(e, id)=>{
        e.preventDefault();

        const requestData = {
          id: update.id,
          name: update.name,
          prep_time : update.prep_time,
          vegetarian : update.vegetarian,
          recipe_img : update.recipe_img,
          description : update.description,
        };
        const response = await axios.put(`http://127.0.0.1:8000/updateRecipe/${id}/`, requestData, { 
          headers:{
            'Content-Type':'multipart/form-data'
          },
      });
      toast("🍔 Details of the Recipe Updated", {
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

    // HAndling Input Change
    const handleInputChange = (event, fieldName)=>{
      const value = event.target.value;
       setUpdate((prevUpdate)=>({
         ...prevUpdate, 
         [fieldName]: value,
       }))
     }

  // HANDLING DELETE
  const handleDelete = ((id)=>{
    fetch(`http://127.0.0.1:8000/deleteRecipe/${id}/`,
      {method: 'DELETE'})
      .then(()=>{
        console.log("Recipe Deleted !!")
      })
      toast.error("Recipe Removed Database", {
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

  })

   // SEARCH FUNCTIONALITY
      const [searchItem, setSearchItem] = useState('')
      const filterData = data.filter((item)=>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    
    // PAGINATION 
    const [currentPage, setPage]=useState(1) 
    const recordPerPage = 10
    const LastIndex = currentPage * recordPerPage;
    const FirstIndex = LastIndex - recordPerPage;
    const records = filterData.slice(FirstIndex, LastIndex);
    const pageNumbers = Math.ceil(data.length / recordPerPage);
    const numbers = [...Array(pageNumbers +1).keys()].slice(1)
  
    function prevPage(){
      if (currentPage !== FirstIndex)
        setPage(currentPage - 1)
    }
  
    function nextpage(){
      if(currentPage !== LastIndex)
        setPage(currentPage + 1)
    }
  
    function changePage(id){
      setPage(id)
    }



  return (
    <>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-menu-up"> </i>
          Items in Recipe
        </CardTitle>
        <CardBody className="">

        <div className='row'>
    <input type= "text" placeholder='Search Recipe' value={searchItem} className= "form-control" style={{width:215, marginLeft:15, marginBottom:7}}
    
    onChange={(e)=>{
    setSearchItem(e.target.value)
    setPage(1)

    }}></input>

      </div>

{/* <table class="table table-striped shadow">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Destination</th>
    <th scope="col">OPERATIONS</th>
  </tr>
</thead>
<tbody>

 
{records.map((dest, index)=>{
      return(
          <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{dest.place_name}, {dest.state}, {dest.district}</td>
          <td>
          <button className='btn btn-dark'  data-bs-toggle="modal" data-bs-target="#exampleModalView" onClick={()=>{viewDestination(dest.id)}}>Detailed View</button> &nbsp;
          </td>
        </tr>
      )
  })}
 
  </tbody>
  </table>  */}


  {records.map((dest, index)=>{
    return(
  // <div key={index}>

  <div className="card shadow" style={{width: "18rem", display:"inline-block", margin:"50px"}}>
  <div key={index}>
  <img src={dest.recipe_img} className="card-img-top" alt="..."/>
  <div className="card-body">
  <h5 className="card-title"><b>{dest.name}</b></h5>
  <button className='btn btn-dark'  data-bs-toggle="modal" data-bs-target="#exampleModalView" onClick={()=>{viewDestination(dest.id)}}>Detailed View</button> &nbsp;
  {/* <button className='btn btn-danger' onClick={()=>{handleDelete(update.id)}}>Delete</button> */}
  </div>
  </div>
  </div> 
    )
              
  })}




    {/* PAGINATOR */}
  <nav aria-label="Page navigation">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous"  onClick={prevPage}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {
      numbers.map((number)=>
        <li key={number} className={`page-item ${currentPage === number? 'active' : ''}`} onClick={()=>changePage(number)}>
          <a className="page-link" href="#">{number}</a>
        </li>
      )  
    }
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={nextpage}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
  </nav> 

    </CardBody>
    </Card>
   
    {/* ------- View Destination ------- */}
  <div class="modal fade" id="exampleModalView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Recipe Item</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <h5><b>{update.name}: </b></h5>
        <p><b>{update.description}</b><br></br>
        Preparation Time: <b>{update.prep_time}</b><br></br>
        Type of Food: <b>{update.vegetarian}</b></p>
        {/* <p><b>{update.image}</b></p> */}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">Update</button>
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModalDelete">Delete</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
  </div>

  {/* ------- View Destination ENDS HERE ------- */}

  {/* ------- Update Destination ------- */}

  <div class="modal fade" id="exampleModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Details of Recipe Item: {update.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='container'>
            <form onSubmit={(e)=>handleUpdatesubmit(e, update.id)}>
                <div className='form-group'>
                    <label class="form-label">Recipe Name</label>
                    <input type="text" class="form-control"  value={update.name} onChange={(event)=>handleInputChange(event, 'name')}/>

                    <label class="form-label">Recipe Preparation Time</label>
                    <input type="text" class="form-control"  value={update.prep_time} onChange={(event)=>handleInputChange(event, 'prep_time')}/>

                    <label class="form-label">Recipe Type of Food</label>
                    <input type="text" class="form-control"  value={update.vegetarian} onChange={(event)=>handleInputChange(event, 'vegetarian')}/>

                    <label  class="form-label">Recipe Description</label>
                    <input type="textarea" class="form-control"  value={update.description} onChange={(event)=>handleInputChange(event, 'description')}/>

                    <label  class="form-label">Recipe Image</label>
                    <input type="file" accept='image/*' class="form-control" />
                
                   <br></br>

                    <button type="submit" class="btn btn-success">Update Details</button>


                </div>
            </form>
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>

    {/* ------- Update Destination ENDS HERE ------- */}

    {/* ------- DElete Destination ------- */}


  <div class="modal fade" id="exampleModalDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Recipe Item: {update.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Want to Delete Recipe <b>{update.recipe_name}</b> from Database ?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" onClick={()=>{handleDelete(update.id)}}>Delete</button>
      </div>
    </div>
  </div>
</div>



    {/* ------- Delete Destination ends hrere ------- */}

    </>
  );
};

export default ItemsinRecipe;
