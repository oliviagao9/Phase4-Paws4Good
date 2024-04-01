import { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "./Form.css";

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

    onSubmit: (values) => {
      fetch("/api/login", {
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
          Username
      </label>
      <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
      <label>
          Password
      </label>
      <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
      <input type='submit' value={'Login'} />
    </form>
  );
}

export default Login;

