import { parseJSON, formatDistanceToNow } from "date-fns";

const timeAgo = (time) => {
    const parsedTime = parseJSON(time);
    const timePeriod = formatDistanceToNow(parsedTime);
    return timePeriod;
};

export default timeAgo;
