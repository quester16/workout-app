import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../../redux/slices/authSlice.js";
import AuthService from "../../../services/auth.service.js";

export const useAuthPage = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      AuthService.main(email, password, type),
    onSuccess: () => {
      dispatch(setIsAuth(true));
      navigate("/");
      console.log("success");
    },
    onError: (error) => {
      console.log("error", error.message);
    },
  });
  const handleAuth = (data) => {
    mutate(data);
  };

  return {
    navigate,
    handleSubmit,
    handleAuth,
    isPending,
    register,
    errors,
    setType,
  };
};
