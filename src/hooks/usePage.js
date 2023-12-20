import { useSelector } from "react-redux"
import { selectPage } from "../features/main/posts/pageSlice"

const usePage = () => {

    const page = useSelector(selectPage)

  return page
}

export default usePage