import { useReducer} from "react";
import * as yup from "yup";

const authConstants = {
  setUserName: "SET_USERNAME",
  setContact: "SET_CONTACT",
  setAddress: "SET_ADDRESS",
  setEmail: "SET_EMAIL",
  setPassword: "SET_PASSWORD",
  setEmailError: "SET_EMAIL_ERROR",
  setPasswordError: "SET_PASSWORD_ERROR",
  setContactError: "SET_CONTACT_ERROR",
  setUserNameError: "SET_USERNAME_ERROR",
  setAddressError: "SET_ADDRESS_ERROR"
};


const loginSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required().min(8),
  contact: yup.string().matches(
    /^[6-9][0-9]{9}$/,
    "Phone number is not valid"
  ),
  address: yup.string().required()
});

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case authConstants.setUserName: {
      return {
        ...state,
        username: payload
      };
    }
    case authConstants.setEmail: {
      return {
        ...state,
        email: payload
      };
    }
    case authConstants.setContact: {
      return {
        ...state,
        contact: payload
      };
    }
    case authConstants.setPassword: {
      return {
        ...state,
        password: payload
      };
    }
    case authConstants.setAddress: {
      return {
        ...state,
        address: payload
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
    case authConstants.setContactError: {
      return {
        ...state,
        contactError: payload
      };
    }
    case authConstants.setUserNameError: {
      return {
        ...state,
        usernameError: payload
      };
    }
    case authConstants.setAddressError: {
      return {
        ...state,
        addressError: payload
      };
    }
    default:
      return state;
  }
};

const initialState = {
  username: "",
  contact: "",
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  contactError: "",
  usernameError: "",
  addressError: ""
};

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { username, email, password, contact, address, contactError , usernameError, emailError, passwordError, addressError } = state;
  const handleEmailChange = (event) => {
    const {
      target: { value }
    } = event;
    // setEmail(value);
    dispatch({ type: authConstants.setEmail, payload: value });
  };

  const handlePasswordChange = (event) => {
    const {
      target: { value }
    } = event;
    // setPassword(value);
    dispatch({ type: authConstants.setPassword, payload: value });
  };

  const handleContactChange = (event) => {
    const {
      target: { value }
    } = event;
    // setPassword(value);
    dispatch({ type: authConstants.setContact, payload: value });
  };

  const handleAddressChange = (event) => {
    const {
      target: { value }
    } = event;
    // setPassword(value);
    dispatch({ type: authConstants.setAddress, payload: value });
  };

  const handleUserNameChange = (event) => {
    const {
      target: { value }
    } = event;
    // setPassword(value);
    dispatch({ type: authConstants.setUserName, payload: value });
  };

  const handleOnLogin = () => {
    // console.log(Email, password);

    dispatch({ type: authConstants.setEmailError, payload: "" });
    dispatch({ type: authConstants.setPasswordError, payload: "" });
    dispatch({ type: authConstants.setUserNameError, payload: "" });
    dispatch({ type: authConstants.setContactError, payload: "" });
    dispatch({ type: authConstants.setAddressError, payload: "" });
    loginSchema
      .validate({ email, password , username, address, contact }, { abortEarly: false })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err.inner.forEach((e) => {
          console.log(e.path,e.message)
          if (e.path === "email") {
            dispatch({ type: authConstants.setEmailError, payload: e.message });
          }

          if (e.path === "password") {
            dispatch({
              type: authConstants.setPasswordError, payload: e.message });
          }

          if (e.path === "username") {
            dispatch({
              type: authConstants.setUserNameError, payload: e.message });
          }

          if (e.path === "contact") {
            dispatch({
              type: authConstants.setContactError, payload: e.message });
          }

          if (e.path === "address") {
            dispatch({
              type: authConstants.setAddressError, payload: e.message });
          }
        });
      });
  };

  return (
    <div className="App">
      <h1>SignUp</h1>
      <div>
        <label>UserName </label>
        <input value={username} type="text" onChange={handleUserNameChange} />

        <div>{usernameError && <sub>{usernameError} </sub>}</div>
      </div>
      <br/>
      <div>
        <label>Email </label>
        <input value={email} type="text" onChange={handleEmailChange} />

        <div>{emailError && <sub>{emailError} </sub>}</div>
      </div>
      <br />
      <div>
        <label>Password </label>
        <input
          value={password}
          type="password"
          onChange={handlePasswordChange}
        />
        <div>{passwordError && <sub> {passwordError} </sub>}</div>
      </div>
      <br/>
      <div>
        <label>Contact No. </label>
        <input
          value={contact}
          type="text"
          onChange={handleContactChange}
        />
        <div>{contactError && <sub> {contactError} </sub>}</div>
      </div>
      <br/>
      <div>
        <label>Address </label>
        <input
          value={address}
          type="text"
          onChange={handleAddressChange}
        />
        <div>{addressError && <sub> {addressError} </sub>}</div>
      </div>
      <button onClick={handleOnLogin}> Login </button>
    </div>
  );
}