import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractQueryUrl } from "src/helpers/helper";
import { RootState } from "src/redux";
import { navigate } from "src/redux/slice/route.slice";

const BigWeek = () => {
  const dispatch = useDispatch();
  const path = useSelector((state: RootState) => state.route.path);
  const [oneTime, setOneTime] = useState(true);
  const [query, setQuery] = useState<any>(null);

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      const url = path.split("?");
      if (!!url[1]) {
        setQuery(extractQueryUrl(url[1]));
      }
    }
  }, [path, oneTime]);
  return (
    <>
      <button
        type="button"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(navigate("/"))}
      >
        Calendar
      </button>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </>
  );
};

export default BigWeek;
