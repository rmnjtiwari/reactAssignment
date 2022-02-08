import { useState, useReducer } from "react"
import * as yup from "yup"
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
const authConstants = {
  setEmail: "SET_EMAIL",
  setPassword: "SET_PASSWORD",
  setEmailError: "SET_EMAIL_ERROR",
  setPasswordError: "SET_PASSWORD_ERROR"
};
const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(8)
});

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case authConstants.setEmail: {
      return {
        ...state,
        email: payload
      };
    }
    case authConstants.setPassword: {
      return {
        ...state,
        password: payload
      };
    }
    case authConstants.setPasswordError: {
      return {
        ...state,
        passwordError: payload
      };
    }
    case authConstants.setEmailError: {
      return {
        ...state,
        emailError: payload
      };
    }
    default:
      return state;
  }
};

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
};

export default function Login(props) {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const [state, dispatch] = useReducer(reducer, initialState);

  const { email, password, emailError, passwordError } = state;


  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch({ type: authConstants.setEmailError, payload: "" });
    dispatch({ type: authConstants.setPasswordError, payload: "" });
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((res) => {
        axios.post(`https://reqres.in/api/login`, {
          email: email,
          password: password,
        }).then(
          (response) => {
            props.onLoginSuccess()
          },
          (error) => {
            console.log(error)
          }
        )
      })
      .catch((err) => {
        err.inner.forEach((e) => {
          console.log(e.path, e.message)
          if (e.path === "email") {
            dispatch({ type: authConstants.setEmailError, payload: e.message });
          }

          if (e.path === "password") {
            dispatch({
              type: authConstants.setPasswordError,
              payload: e.message
            });
          }
        });
      });
    // const els = event.target.elements
    // const email = els.email.value
    // const password = els.password.value 
    // console.log(email,password)

    //Validate password -- should have atleast 8 characters and no spaces
    // const isLongEnough = password.length >= 8
    // const hasSpace = password.indexOf(" ") === -1
    // const isValid = isLongEnough && hasSpace
    // if(isValid){
    // alert("Login Successfull")
    // console.log("In LoginNew")
    // console.log(email, password)
    // try {
    //   let res = await fetch("https://reqres.in/api/login", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       "email": email,
    //       "password": password,
    //     }),
    //   });
    //   let resJson = await res.json();
    //   console.log(resJson)
    //   if (res.status === 200) {
    //     dispatch({type: authConstants.setEmail,payload: ""})
    //     dispatch({type: authConstants.setEmail,payload: ""})
    //     props.onLoginSuccess()
    //   } else {
    //     console.log("Some error occured");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // }
    // else{
    //     console.log(email,password)
    // }
  }
  const clearEmailField = () => {
    // const email = document.getElementById("email")
    // email.value = ""
    // setEmail("")
    dispatch({ type: authConstants.setEmail, payload: "" });
  }

  const clearPasswordField = () => {
    // setPassword("")
    dispatch({ type: authConstants.setPassword, payload: "" });
  }

  const handleEmailChange = (event) => {
    const {
      target: { value }
    } = event;
    dispatch({ type: authConstants.setEmail, payload: value });
  };

  const handlePasswordChange = (event) => {
    const {
      target: { value }
    } = event;
    dispatch({ type: authConstants.setPassword, payload: value });
  };

  return (
    // <form onSubmit={onSubmit}>
    //   <input type="email" value={email} onChange={
    //     // (e) => setEmail(e.target.value)
    //     handleEmailChange
    //   } />
    //   <button onClick={clearEmailField}>&times;</button>
    //   <input type="password" value={password} onChange={
    //     // (p) => setPassword(p.target.value)
    //     handlePasswordChange
    //   } />
    //   <button onClick={clearPasswordField}>&times;</button>
    //   <button type="submit">Submit</button>
    //   <button type="reset">Reset</button>
    // </form>

<Form inline onSubmit={onSubmit}>
<FormGroup className="mb-2 me-sm-2 mb-sm-0">
  <Label
    className="me-sm-2"
    for="exampleEmail"
  >
    Email
  </Label>
  <Input
    name="email"
    placeholder="something@idk.cool"
    type="email"
    value={email}
    onChange={handleEmailChange}
  />
  <div>{emailError && <sub>{emailError} </sub>}</div>
  <Button onClick={clearEmailField}>
  &times;
</Button>
</FormGroup>
<FormGroup className="mb-2 me-sm-2 mb-sm-0">
  <Label
    className="me-sm-2"
    for="examplePassword"
  >
    Password
  </Label>
  <Input
    name="password"
    placeholder="don't tell!"
    type="password"
    value={password}
    onChange={handlePasswordChange}
  />
  <div>{passwordError && <sub>{passwordError} </sub>}</div>
  <Button onClick={clearPasswordField}>
  &times;
</Button>
</FormGroup>
<Button color="primary mt-1" type="submit">
  Submit
</Button>
<Button color="danger mt-1 mx-2" type="reset">
  Reset
</Button>
</Form>
  );
}