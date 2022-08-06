import { useEffect, useState  } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate'
import { getMovies } from '../store/actionCreators/movieCreator'
import TableRow from "../components/TableRow"


export default function HomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { movies, pages, movieLoading, movieError } = useSelector((state) => state.moviesReducer)

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 20

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(movies.results?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(movies.results?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, movies]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % movies.results?.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch])

    const handleHomePage = (path) => {
        navigate(path)
    }
    const handleGenrePage = (path) => {
        navigate(path)
    }
    return (
        <>
            {/* <div>{JSON.stringify(currentItems)}</div> */}
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
                                <div className="row">
                                    <div className="card-body">
                                        <table className="table table-striped" id="table1">
                                            <thead>
                                                <tr>
                                                    <th>Poster</th>
                                                    <th>Title</th>
                                                    <th>Overview</th>
                                                    <th>Popularity</th>
                                                    <th>Release Date</th>
                                                    <th>Rating</th>
                                                    <th>Vote</th>
                                                    <th>Detail</th>
                                                </tr>
                                            </thead>
                                            <TableRow movies={movies.results} />
                                        </table>
                                    </div>
                                </div>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    renderOnZeroPageCount={null}
                                />

                                {/* <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center" >
                                        <li className="page-item" >
                                            <a className="page-link" href="#">1</a>
                                        </li>
                                    </ul>
                                </nav> */}

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