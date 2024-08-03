import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'

const AddRecipe= () => {

  const [formdata, setFormdata] = useState({})

    
  // Handling Input inside Form
  const handleInput =(e)=>{
      const {name, value} = e.target;
      setFormdata({...formdata, [name]: value})
  }

  // Handling Submit Button On Form
  const handleSubmit = async(e)=>{
      e.preventDefault();

      try{

      const res = await axios.post(`http://127.0.0.1:8000/createRecipe/`, formdata,
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })

          if (res.status === 201){
              toast("🍔 Recipe Added Successfully",
              {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              }
              
          )}

      }catch(error){
          console.log(error)
      }
  }

    // Handling Image File Input
    const handleInputImageFile = (e)=>{
      const file = e.target.files[0];
      const formDataImage = new FormData();
      formDataImage.append('name', formdata.name);
      formDataImage.append('prep_time', formdata.prep_time);
      formDataImage.append('difficulty', formdata.difficulty)
      formDataImage.append('vegetarian', formdata.vegetarian);
      formDataImage.append('recipe_img', file);
      formDataImage.append('description',formdata.description);

      setFormdata(formDataImage)
  }


  return (
    <div>

        <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-plus-lg">  </i>
          Add Recipe
        </CardTitle>
        <CardBody className="">

        <form onSubmit={handleSubmit}>
                <div className='form-group '>
                    <label class="form-label">Recipe Name</label>
                    <input type="text" name ='name' class="form-control" onChange={handleInput}/>

                    <label class="form-label">Recipe Preparation Time</label>
                    <input type="text" class="form-control" name= 'prep_time' onChange={handleInput}/>

                    <label class="form-label">Recipe Type Of Food</label>
                    <input type="text" class="form-control" name='vegetarian' onChange={handleInput}/>

                    <label  class="form-label">Recipe Description</label>
                    <input type="text" class="form-control"  name='description' onChange={handleInput}/>

                    <label  class="form-label">Destination Image</label>
                    <input type="file" accept='image/*' class="form-control"  name='recipe_img' onChange={handleInputImageFile}/>

                  <br></br>

                    <button type="submit" class="btn btn-success">Submit</button>


                </div>
            </form>

        </CardBody>
        </Card>
    </div>
  );
};

export default AddRecipe;
