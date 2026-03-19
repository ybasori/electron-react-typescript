import { useDispatch } from "react-redux";
import { navigate } from "src/redux/slice/route.slice";

const BigWeek = () => {
    const dispatch = useDispatch();
    return <><button type="button" style={{cursor: "pointer"}} onClick={()=>dispatch(navigate("/"))}>Calendar</button></>
}

export default BigWeek;