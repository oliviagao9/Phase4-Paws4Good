import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSession, logoutSession } from "../Redux/Session";

const EditProfile = () => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleDelete = () => {
    fetch(`/api/users/${user.user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then(r => {
          if (r.ok) {
            alert(`user ${user.name} is successfuly deleted`)
            dispatch(logoutSession(null));
            navigate("/login")
          }
      })
  }

  const formSchema = yup.object().shape({
    name: yup.string().required().max(20),
    username: yup.string().required().max(15),
    password: yup.string().required()
  })

  const formik = useFormik({

    initialValues: {
      name: '',
      username: '',
      password: '',
    },

    validationSchema: formSchema,

    onSubmit: (values) => {
      fetch(`/api/users/${user.user.user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(loginSession(data));
            alert('Profile Updated Success')
          })
        } else {
          response.json().then(data => {
            setErrors(data.errors);
          })
        }
      })
    },
  })

  return (
    <>
      <h1 style={{textAlign:"center",
                  paddingTop: "10px"}}>
                    Profile Edit
      </h1>
      <form className= "formStyling" onSubmit={formik.handleSubmit}>
        {errors&& <h3 style={{color:'red', textAlign: 'center'}}>{errors}</h3>}
        <label>
          Name
        </label>
        <p style={{color:'red'}}> {formik.errors.name}</p>
        <input type='text' name='name' placeholder = {user.name} value={formik.values.name} onChange={formik.handleChange} />
        <label>
          Username
        </label>
        <p style={{color:'red'}}> {formik.errors.username}</p>
        <input type='text' name='username' placeholder = {user.username} value={formik.values.username} onChange={formik.handleChange} />
        <label>
            Password
        </label>
        <p style={{color:'red'}}> {formik.errors.password}</p>
        <input type='password' name='password' placeholder = 'new password' value={formik.values.password} onChange={formik.handleChange} />
        <input type='submit' value={'Update Profile'} />
      </form>
      <button className="delete_button" onClick={() => handleDelete()}>
        Delete User
      </button>
    </>

  );
}

export default EditProfile;

