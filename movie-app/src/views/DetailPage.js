import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getMovieById } from "../store/actionCreators/movieCreator"
export default function DetailPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { movie, movieLoading, movieError } = useSelector((state) => state.moviesReducer)

    useEffect(() => {
        dispatch(getMovieById(id))
    }, [dispatch])

    const handleHomePage = (path) => {
        navigate(path)
    }
    const handleGenrePage = (path) => {
        navigate(path)
    }
    return (
        <>
            {/* <div>{JSON.stringify(movie)}</div> */}

            {movieLoading && <h3>loading...</h3>}
            {!movieLoading && movieError && <h3>{movieError}</h3>}
            {!movieLoading && !movieError && (
                <div id="wrapper">
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center" href="">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-1">Admin Dashboard</div>
                        </Link>
                        <li className="nav-item active">
                            <a onClick={() => handleHomePage('/')} className="nav-link" href="">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </a>
                            <a onClick={() => handleGenrePage('/genre')} className="nav-link" href="">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Genre</span>
                            </a>
                        </li>

                    </ul>

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>

                                <ul className="navbar-nav ml-auto">
                                    <div className="topbar-divider d-none d-sm-block"></div>
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">budi as admin</span>
                                            <img className="img-profile rounded-circle"
                                                src="/src/img/undraw_profile.svg"></img>
                                        </a>
                                    </li>
                                </ul>

                            </nav>
                            <div className="container-fluid">
                                <div class="row">

                                    <div class="col-lg-7">

                                        <div className="card shadow mb-2">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">{movie.title}</h6>
                                            </div>
                                            <div className="card-body">
                                                    <img src={movie.belongs_to_collection.poster_path} width="600" height="250"></img><br/><br/>
                                                    <p>Genre: {movie.genres.map(el => {
                                                        return el.name
                                                    })}</p>
                                                    <p>Website: {movie.homepage}</p>
                                                    <p>Popularity: {movie.popularity}</p>
                                                    <p>Revenue: {movie.revenue}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2022</span>
                                </div>
                            </div>
                        </footer>

                    </div>

                </div>
            )}
        </>
    )
}