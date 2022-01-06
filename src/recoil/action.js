import { useMutation } from "react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "./auth";

export default function useAuthAction() {
  const setAuth = useSetRecoilState(authAtom);

  const loginMutation = useMutation(
    (credential) => {
      return axios.post(
        "https://checkperfect-api.standfor.info/api/login",
        credential
      );
    },
    {
      onError: (error) => {
        alert(error.response.data.message);
      },
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.data.token);
        setAuth(data.data.data.token);
      },
    }
  );

  return {
    login,
    logout,
  };

  function login(credential) {
    loginMutation.mutate(credential);
  }

  function logout() {
    localStorage.removeItem("token");
    setAuth(null);
  }
}
