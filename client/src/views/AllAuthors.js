import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";





export const AllAuthors = (props) => {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/authors")
          .then((res) => {
            setAuthors(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const handleDeleteClick = (idToDelete) => {
        axios
          .delete(`http://localhost:8080/api/authors/${idToDelete}`)
          .then((res) => {
            const filteredAuthors = authors.filter((author) => {
              const isAuthorToDelete = idToDelete === author._id;
    
              if (isAuthorToDelete) {
                return false;
              }
              return true;
            });
    
            setAuthors(filteredAuthors);
          })
          .catch((error) => {
            console.log(error);
          });
      };



return (
    <div className="w-75 p-4 mx-auto">

<div className="shadow mb-4 rounded border p-4 text-center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Author</th>
                                <th scope="col">Actions available</th>
                            </tr>
                        </thead>
                        {authors.map((author,i) => {
            const {_id,name} = author;
            return (
                <tbody>
                <tr key={i}>
                    <td className="align-middle fs-4"><Link to={`/author/${_id}`}>{name}</Link></td>
                    <td><Link to={`/author/${_id}/edit`} className="btn btn-outline-warning mx-1">Edit</Link>
                    <button onClick={(event) => {
                        handleDeleteClick(_id);
                    }} className="btn btn-outline-danger mx-1">Delete</button>
                    </td>
                </tr>
                </tbody>
            )
        })}

                    </table>
                </div>

    </div>
)
}