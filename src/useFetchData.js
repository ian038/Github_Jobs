// make calls to api and take in params, page as args
import { useReducer, useEffect } from 'react'
import axios from 'axios'

// set actions type
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_NEXT_PAGE: 'update-next-page'
}

const url = '/positions.json'

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        case ACTIONS.UPDATE_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
        default:
            return state
    }
}

export default function useFetchData(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {
        // get new cancel token using axios
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(url, {
            cancelToken: cancelToken1.token, 
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data }}) 
        }).catch(error => {
            // if using cancel error, ignore it
            if(axios.isCancel(error)) return 
            dispatch({ type: ACTIONS.ERROR, payload: { error: error} })
        })
        
        // check if theres next page
        const cancelToken2 = axios.CancelToken.source()
        axios.get(url, {
            cancelToken: cancelToken2.token, 
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 }}) 
        }).catch(error => {
            // if using cancel error, ignore it
            if(axios.isCancel(error)) return 
            dispatch({ type: ACTIONS.ERROR, payload: { error: error} })
        })


        // clean up using return function
        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])
    return state
}



