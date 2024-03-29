import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required()
  })

  const formik = useFormik({

      initialValues: {
        name:'',
        username:'',
        password:''
      },

      validationSchema: formSchema,

      onSubmit: (values) => {
        fetch("http://localhost:5555/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        .then(r => {
          if (r.ok) {
            r.json().then(user => {
              onLogin(user);
              navigate("/");
            })
          } else {
            r.json().then(data => {
              alert(data.errors);
              setErrors(data.errors);
            })
          }
        })
      },
    })

  return (
    <Form onSubmit={formik.handleSubmit}>
    {errors&& <h3 style={{color:'red', textAlign: 'center'}}>{errors}</h3>}
    <label>
        Name
    </label>
    <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
    <label>
        Username
    </label>
    <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
    <label>
        Password
    </label>
    <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
    <input type='submit' value={'Signup'} />
    </Form>
  );
}

export default Signup;

const Form = styled.form`
  display: flex;
  flex-direction:column;
  width: 300px;
  margin:auto;
  font-family:arial;
  font-size:20px;
  input[type=text]{
    margin-bottom: 10px;
    padding-bottom: 1px;
    font-size: 100%;
    font-family: arial;
  }
  input[type=password]{
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  input[type=submit]{
    background-color:pink;
    color: black;
    height:40px;
    font-family:Arial;
    font-size:30px;
    margin-top:10px;
    margin-bottom:10px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;