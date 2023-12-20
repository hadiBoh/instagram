import { apiSlice } from "../../api/apiSlice"



export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCon: builder.query({
            query:(_arg)=> `/conversation?user=${_arg}`,
        }),
        getMessage: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
              // get conversation
              const result = await fetchWithBQ(`/conversation?user=${_arg}`)
              if (result.error) return { error: result.error }
              const conversation = result.data
              const messages = await fetchWithBQ(`/message?convId=${conversation[0]?._id}`)
              return messages.data ? { data: messages.data } : { error: messages.error }
            },
/*             transformResponse: (responseData)=>{
                const data = responseData.map(message=>{
                    message.id = message._id
                    return message
                })
                console.log(data);
                return data
            } */
            /* providesTags:[{type:"Message" , id:"List"}] */  //consider it later
          }),
        addMessage: builder.mutation({
            query: data =>({
                url:"/message",
                method:"POST",
                body: {...data}
            }),
            invalidatesTags:[{type:"Message" , id:"List"}]
        })
    })
})


export const {useAddMessageMutation ,  useGetMessageQuery , useGetConQuery} = messageApiSlice
