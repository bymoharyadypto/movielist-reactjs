import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieById } from "../store/actionCreators/movieCreator";
export default function TableRow ({movies}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickDetail = (event, id) => {
        event.preventDefault()
        console.log(id);
        dispatch(getMovieById(id))
            .then(()=> {
                navigate(`/detailMovies/${id}`)
            })
    }
    return (
        <>
            <tbody>
                {movies.map((element) => {
                        return (
                            <tr key={element.id}>
                                <td><img src={element.poster_path} width="100" height="100"></img></td>
                                <td>{element.title}</td>
                                <td>{element.overview}</td>
                                <td>{element.popularity}</td>
                                <td>{element.release_date}</td>
                                <td>{element.vote_average}</td>
                                <td>{element.vote_count}</td>
                                <td>
                                <button onClick={(event) => handleClickDetail(event, element.id)} className="btn btn-primary" id="edit">Detail</button>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </>
    )
}