import { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

const Login = ( {onLogin, user}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (user) {
      navigate("/fundingpage")
    }
  }, [user, location])

  const formSchema = yup.object().shape({
    username: yup.string().required()
  })

const formik = useFormik({

    initialValues: {
      username:'',
      password:''
    },

    validationSchema: formSchema,

    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        
        if (data.errors) {
          alert (data.errors);
          return setErrors(data.errors);
        }
        onLogin(data)
        navigate("/fundingpage");
      } catch (error) {
        console.log(error);
      }
  }
});

  return (
    <Form onSubmit={formik.handleSubmit}>
    {errors&& <h3 style={{color:'red', textAlign: 'center'}}>{errors}</h3>}
    <label>
        Username
    </label>
    <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
    <label>
        Password
    </label>
    <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
    <input type='submit' value={'Login'} />
    </Form>
  );
}

export default Login;

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