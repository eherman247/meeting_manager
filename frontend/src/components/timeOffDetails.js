import { minToTime } from "../utils/timeConvert";
import { useTimeOffContext } from "../hooks/useTimeOffsContext";
import apiClient from "../utils/apiClient";

const TimeOffDetails = ({ timeOff }) => {
  const { dispatch } = useTimeOffContext();

  const handleClick = async () => {
    try {
      const json = await apiClient(`/times/${timeOff._id}`, {
        method: "DELETE",
        requireAuth: true,
      });
      dispatch({ type: "DELETE_TIMEOFF", payload: json });
    } catch (err) {
      // Handle delete error silently or wire in a user-facing message if needed
    }
  };

  return (
    <div className="time-off-details">
      <h4>{timeOff.name}</h4>
      <p>
        {minToTime(timeOff.timeStart)} - {minToTime(timeOff.timeEnd)}
      </p>
      <button onClick={handleClick}>delete</button>
    </div>
  );
};

export default TimeOffDetails;
