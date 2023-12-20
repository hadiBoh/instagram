

const useDate = () => {

    const getDate = (date)=>{
        const year = Number(date.substring(0 , 4))
        const month = Number(date.substring(4 , 6))
        const day = Number(date.substring(6 , 8))
        return {year , month , day}
    }

    const turnData = (date)=>{
        const {year:oldYear , month:oldMonth , day:oldDay} = getDate(date)
        const now = new Date()
        const format = `${now.getFullYear()}${now.getMonth()+1 < 10 ? "0"+now.getMonth()+1 : now.getMonth()+1}${now.getDate()<10 ? "0"+now.getDate() : now.getDate()}`
        const {year:newYear , month:newMonth , day:newDay} = getDate(format)
        const defYear = (newYear - oldYear)*365
        const defMonth = (newMonth - oldMonth)*30
        const defDay = newDay - oldDay

        const allDays = defYear +defMonth+ defDay
        if(allDays === 0){
            return "today"
        }else if (allDays < 30) {
            return allDays + " days ago"
        }else if(allDays%30 === 0){
            return allDays/30 + " month(s) ago"
        }else{
            return 'about ' + Math.floor(allDays/7) + " weeks ago"
        }

    } 

  return turnData
}

export default useDate