import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NewAuthor = (props) => {
  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState(null);

  const navigate = useNavigate();

  const handleNewAuthorSubmit = (event) => {
    event.preventDefault();
    const newAuthor = { name };

    axios
      .post("http://localhost:8080/api/authors", newAuthor)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setValidationErrors(error?.response?.data?.errors);
      });
  };

  return (
    <div>
      <div className="w-50 p-4 rounded mx-auto shadow mt-4">
        <h3 className="text-center">Add an author!</h3>
        <form
          onSubmit={(event) => {
            handleNewAuthorSubmit(event);
          }}
        >
          <div className="formGroup">
            <label>Name</label>
            {validationErrors?.name && (
              <span className="text-danger ms-1">
                - {validationErrors.name.message}
              </span>
            )}
            <input
              type="text"
              className="form-control"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-outline-primary me-1 mt-2">Submit</button>
          <Link to={"/"} className="btn btn-outline-danger mx-1 mt-2">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};
