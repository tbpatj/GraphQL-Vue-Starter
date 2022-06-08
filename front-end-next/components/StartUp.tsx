import { useContext, useEffect, useState } from "react";
import { getUser } from "../scripts/userFunctions";
import { DataContext } from "./mainContext/globalData";

export default function StartUp() {
  const { dispatch } = useContext(DataContext);
  const [loaded, setLoaded] = useState(false);
  //another preventative measure as to not run the command twice
  let loading = false;
  useEffect(() => {
    //upon load up of the app if the user has a token sign in
    if (loaded === false && loading === false) {
      loading = true;
      setLoaded(true);
      let token = localStorage.getItem("token");
      if (token) {
        getUser(dispatch);
      }
    }
  }, []);

  return null;
}
