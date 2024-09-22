import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";

const useUserInfo = () => useContext(UserInfoContext);

export default useUserInfo;
