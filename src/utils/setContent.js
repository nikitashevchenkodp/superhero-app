import ErrorIndicator from "../components/errorIndicator/errorIndicator"
import Skeleton from "../components/skeleton/Skeleton"
import Spinner from "../components/spinner/spinner"


const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton />
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data = {data}/>
        case 'error':
            return <ErrorIndicator/>
        default:
            throw new Error("Unexpected process state")
    }
}

export default setContent;