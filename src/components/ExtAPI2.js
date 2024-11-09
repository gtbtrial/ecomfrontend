import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';


function ExtAPI2() {
    const [membsdata, setmembsdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10); // Set the number of items per page

    // Fetch data from the API
    async function fetchUsers() {
        try {
            const resp = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
            if (resp.status === 200) {
                setmembsdata(resp.data);
            } else {
                alert("Some error occurred");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // Pagination logic
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = membsdata.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">User's List from Third Party API</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {currentItems.length > 0 ? (
                        <>
                            <h2>List of Users</h2><br />
                            <table className="timetable_sub table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Pic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td><img src={`${item.thumbnailUrl}`} alt={item.title} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table><br />
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={Math.ceil(membsdata.length / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakLinkClassName={'page-link'}
                            />
                        </>
                    ) : (
                        <h2>No data found</h2>
                    )}
                </div>
            </div>
        </>
    );
}

export default ExtAPI2;
