import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as yup from 'yup'
import "./Form.css";

const Signup = ({ onLogin }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required().max(20),
    username: yup.string().required().max(15),
    password: yup.string().required()
  })

  const formik = useFormik({

      initialValues: {
        name:'',
        username:'',
        password:''
      },

      validationSchema: formSchema,

      onSubmit: (values) => {
        fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        .then(response => {
          if (response.ok) {
            response.json().then(user => {
              onLogin(user);
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
          Username
      </label>
      <p style={{color:'red'}}> {formik.errors.username}</p>
      <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
      <label>
          Password
      </label>
      <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
      <input type='submit' value={'Signup'} />
    </form>
  );
}

export default Signup;