import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import pointApi from '../../route/point'

export default function DashboarPoint() {
    const paginatePerPage = 5;

    const [totalPaginate, setTotalPaginate] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [forcePage, setForcePage] = useState(0);

    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        setForcePage(selectedPage);
    };
    const totalPages = Math.ceil(totalPaginate / paginatePerPage);
    const [points, setPoint] = useState([]);
    useEffect(() => {
        pointApi.getPoints(currentPage,paginatePerPage).then((res) => {
            setPoint(res.content)
            console.log(res)
            setTotalPaginate(res.totalElements)
        })
    }, [currentPage,paginatePerPage]);
    return (
        <div className="container">
            <div className="rts-reviewd-area-dashed table-responsive">
                <table className="table-reviews quiz">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên bài thi</th>
                        <th>Thời gian</th>
                        <th>Điểm</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        points.map((point, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <span>{key + 1 + currentPage * paginatePerPage}</span>
                                    </td>
                                    <td>
                                        <span>{point.examDto.name}</span>
                                    </td>
                                    <td>
                                        <span>{point.completionTime} </span>
                                    </td>
                                    <td>
                                        <span>{point.score}</span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <div className="pagination-full-width">
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <div className="pagination">
                        <ReactPaginate
                            key={totalPages}
                            breakLabel="..."
                            onPageChange={handlePageChange}
                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                            previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                            pageRangeDisplayed={3}
                            forcePage={forcePage}
                            pageCount={Math.ceil(
                                totalPaginate / paginatePerPage
                            )}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
