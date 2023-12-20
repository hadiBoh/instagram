import {parseISO , formatDistanceToNow} from "date-fns"



const findTime = (timeStamp) =>{
    const date = parseISO(timeStamp)
    const timeAgo = formatDistanceToNow(date)

    return timeAgo +" ago"

}

export default findTime