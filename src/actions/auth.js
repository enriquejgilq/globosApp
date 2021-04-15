import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading, startLoginBack } from "./ui";
import Swal from "sweetalert2";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
//bdFirebase
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire(
          "Error",
          "Ha  ocurrido un error al momento de iniciar sesión",
          "error"
        );
      });
  };
};
export const startRegisterwithEmailPassword = (
  email,
  password,
  name,
  phone
) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: name,
          phoneNumber: phone.toString(),
        });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire(
          "Error",
          "Ha  ocurrido un error al momento de registrar su cuenta",
          "error"
        );
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});

//Heroku
export const startLogin = (email, password) => {
  return async (dispatch) => {
    //    dispatch(startLoginBack(email,password))
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        loginback({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      console.log(body.msg);
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (email, password, name, phone) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { email, password, name, phone },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        loginback({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startcheking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        loginback({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish =()=>({
  type: types.authCheckingFinish
})


const loginback = (user) => ({
  type: types.authLogin,
  payload: user,
});
export const LogoutSystem=()=>{
  return (dispatch)=>{
    localStorage.clear();
    dispatch(logoutS());
  }
}
const logoutS =()=>({type:types.authLogout})