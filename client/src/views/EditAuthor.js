import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";



export const EditAuthor = (props) =>{
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');

    const [validationErrors, setValidationErrors] = useState(null);

    useEffect(() => {
        axios
          .get(`http://localhost:8080/api/authors/${id}`)
          .then((res) => {
            const { name } = res.data
            
            setName(name)
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);

      const handleEditSubmit = (event) => {
        event.preventDefault();
        const editedAuthor = {name};

        axios
        .put(`http://localhost:8080/api/authors/${id}`, editedAuthor)
        .then((res) => {
          console.log(res.data);
          navigate(`/author/${id}`)
        })
        .catch((error) => {
          console.log(error);
          setValidationErrors(error?.response?.data?.errors);
        });
        };


    return (
        <div className="w-50 p-4 rounded mx-auto shadow mt-4">
        <h3 className="text-center">Edit author!</h3>
        <form onSubmit={(event) =>{
            handleEditSubmit(event);
        }}>
            <div className="formGroup">
                <label>Name</label>
                {validationErrors?.name && <span className="text-danger ms-1">- {validationErrors.name.message}</span>}
                <input type="text" className="form-control" onChange={(event)=>{
                    setName(event.target.value)
                }}
                value={name}/>
            </div>
        <button className="btn btn-outline-primary me-1 mt-2">Submit</button>
        <Link to={'/'} className="btn btn-outline-danger mx-1 mt-2">Cancel</Link>
        </form>
    </div>
    )
}