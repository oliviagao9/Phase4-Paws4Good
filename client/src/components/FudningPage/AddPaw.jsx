import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as yup from 'yup'
import "../Auth/Form.css";
import { useSelector, useDispatch } from "react-redux";
import { setPaw } from "../Redux/Paw";

const AddPaw = () => {
  const navigate = useNavigate();
  const user = useSelector (state=> state.session.user);
  const pets = useSelector(state => state.paw.pet);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required().max(15),
    age: yup.number().required().positive().integer(),
    image: yup.string().required(),
    cause: yup.string().required(),
    goal: yup.number().required().positive().integer()
  })

  const formik = useFormik({

      initialValues: {
        name:'',
        age: '',
        image: '',
        cause: '',
        goal: '',
        owner_id: user.user_id
      },

      validationSchema: formSchema,

      onSubmit: (values) => {
        fetch("/api/pets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        .then(response => {
          if (response.ok) {
            response.json().then(pet => {
              dispatch(setPaw([...pets, pet]));
              alert(`${pet.name} is added successfully`)
              navigate("/fundingpage");
            })
          } else {
            response.json().then(data => {
              alert(data.errors);
              setErrors(data.errors);
            })
          }
        })
      },
    })

  return (
    <form className= "formStyling" onSubmit={formik.handleSubmit}>
      {errors&& <h3 style={{color:'red', textAlign: 'center'}}>{errors}</h3>}
      <label>
          Name
      </label>
      <p style={{color:'red'}}> {formik.errors.name}</p>
      <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
      <label>
          Age
      </label>
      <p style={{color:'red'}}> {formik.errors.age}</p>
      <input type='text' name='age' value={formik.values.age} onChange={formik.handleChange} />
      <label>
          Image
      </label>
      <p style={{color:'red'}}> {formik.errors.image}</p>
      <input type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
      <label>
          Cause
      </label>
      <p style={{color:'red'}}> {formik.errors.cause}</p>
      <input type='text' name='cause' value={formik.values.cause} onChange={formik.handleChange} />
      <label>
          Goal
      </label>
      <p style={{color:'red'}}> {formik.errors.goal}</p>
      <input type='number' name='goal' value={formik.values.goal} onChange={formik.handleChange} />
      <input type='submit' value={'Add Paw'} />
    </form>
  );
}

export default AddPaw;