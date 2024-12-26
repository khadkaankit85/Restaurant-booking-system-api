import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../states/Contexts";

export const Homepage = () => {
  const navigate = useNavigate();
  const userInfoContextConsumed = useContext(UserInfoContext);

  useEffect(() => {
    if (!userInfoContextConsumed || !userInfoContextConsumed.userInformation) {
      navigate("/login");
      return;
    }
  });

  if (!userInfoContextConsumed || !userInfoContextConsumed.userInformation)
    return <h1>Loading...</h1>;
  return <div>hi user you are logged in</div>;
};
