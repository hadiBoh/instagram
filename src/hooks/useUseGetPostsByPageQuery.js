import { useGetPostsByPageQuery } from '../features/main/posts/postApiSlice'
import { useGetAllCountQuery } from '../features/main/posts/postCountSlice'

const useUseGetPostsByPageQuery = (page=1) => {


    const hasNext = true

    
    const {data , isLoading , isSuccess , isError , error , isFetching } = useGetPostsByPageQuery(page)
    const {data:length} = useGetAllCountQuery()
    /*,{
      selectFromResult: ({result , isLoading}) => {
        return {
          data: itemsSelector.selectAll(
              result ?? postAdapter.getInitialState(),
              isLoading
            ),
        };
      },
    } */

    

    if (length?.length - data?.ids?.length === 0) {
        
        return {data , isLoading , isSuccess , isError , error , isFetching, hasNext:false }
    }
    
  return {data , isLoading , isSuccess , isError , error ,isFetching, hasNext }
}

export default useUseGetPostsByPageQuery