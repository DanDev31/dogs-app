import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../axios/axios.config";
import { uiActions } from "../../features/iuReducer/iuReducer";
import Swal from "sweetalert2";

let tempId = 0;

export const CreateBreed = () => {
  const [temps, setTemps] = useState([]);
  const [newTemps, setNewTemps] = useState([]);
  const [formValues, handleInputChange, setValues] = useForm({
    name: "",
    height: "",
    weight: "",
    image: "",
    life_span: "",
  });

  const { name, height, weight, image, life_span } = formValues;

  const dispatch = useDispatch();
  let { errorMessage } = useSelector((state) => state.ui);

  const getTemps = async () => {
    try {
      const response = await axiosInstance.get("temperament");
      const data = await response.data;
      setTemps(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postNewDog = async () => {
    try {
      await axiosInstance.post("dogs", formValues);
      Swal.fire({
        icon: "success",
        title: "Great!",
        text: "New dog breed created!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      console.log(error.message);
    }
    setValues({
      name: "",
      height: "",
      weight: "",
      image: "",
      life_span: "",
    });
  };

  useEffect(() => {
    getTemps();
  }, []);

  const addTemps = (e) => {
    let tempObj = {
      id: tempId++,
      value: e.target.value,
    };
    setNewTemps(newTemps.concat(tempObj));
  };

  useEffect(() => {
    setValues({
      ...formValues,
      temperament: newTemps.map((temp) => temp.value).join(", "),
    });
  }, [newTemps]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      postNewDog();
    }
    setNewTemps([]);
  };

  const formValidation = () => {
    if (!name.match(/^[a-zA-Z_ ]*$/)) {
      dispatch(
        uiActions.setError("Name must have only letters or cant be blank")
      );
      return false;
    } else if (height <= 1 || weight <= 1 || life_span <= 1) {
      dispatch(
        uiActions.setError(
          "Height, Weight or Life expactancy must be higher than 1"
        )
      );
      return false;
    } else if (newTemps.length === 0) {
      dispatch(uiActions.setError("Please select al least one temperament"));
      return false;
    }

    dispatch(uiActions.removeError());
    return true;
  };

  const handleDelete = (id) => {
    const deletedTemps = newTemps.filter((temp) => temp.id !== id);
    setNewTemps(deletedTemps);
    setValues({
      ...formValues,
      temperament: newTemps.map((temp) => temp.value).join(", "),
    });
  };

  return (
    <div className="create__breed-container container">
      <h2>Create a new dog</h2>
      {errorMessage && (
        <div className="create__breed-container-error__message">
          {errorMessage}
        </div>
      )}
      <form
        onSubmit={handleFormSubmit}
        className="create__breed-container-form"
      >
        <fieldset>
          <legend>Enter your new dog info:</legend>
          <label>Breed's Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
          <label>Height:</label>
          <input
            type="number"
            name="height"
            value={height}
            onChange={handleInputChange}
            required
          />
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={handleInputChange}
            required
          />
          <label>Image url:</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleInputChange}
            required
          />
          <label>Life Expectancy:</label>
          <input
            type="number"
            name="life_span"
            value={life_span}
            onChange={handleInputChange}
            required
          />

          <label>Select a one or more temperaments</label>
          <select name="temperaments" onChange={addTemps}>
            {temps.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <div className="create__breed-option-container">
            {newTemps.map((newTemp, i) => (
              <div key={i}>
                <p>{newTemp.value}</p>
                <button type="button" onClick={() => handleDelete(newTemp.id)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </div>
  );
};
