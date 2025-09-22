import SingleInstructor from "@/components/Instructor";
import Instructors from "@/data/instructors.json";
import {useEffect, useRef, useState} from "react";
import ex from "@/route/exam";
import ReactPaginate from "react-paginate";
import point from "@/route/point";
import Pagination from "@/modules/ShowExamDetails/Pagination";
export default function ExamDetailsPoint({item}) {
    if (!item) return <p>Loading...</p>;
    const paginatePerPage = 5;
    const [totalPaginate, setTotalPaginate] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [forcePage, setForcePage] = useState(0);
    const [data, setData] = useState([]);
    const [points, setPoints] = useState([]);
    useEffect(() => {
        ex.getExamDetailsByExamId(currentPage, paginatePerPage, item.data.id)
            .then((response) => {
                if (response && response.content) {
                    setData(response.content);
                    setTotalPaginate(response.totalElements);
                }
            })
            .catch((error) => console.error(error));
    }, [currentPage, paginatePerPage, item.data.id]);

    const totalPages = Math.ceil(totalPaginate / paginatePerPage);
    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        setForcePage(selectedPage);
    };

    const paginatePerPage2 = 10;
    const [totalPaginate2, setTotalPaginate2] = useState(0);
    const [currentPage2, setCurrentPage2] = useState(0);
    const [forcePage2, setForcePage2] = useState(0);
    useEffect(() => {
        point.getAllPoints(item.data.id,currentPage2,paginatePerPage2).then((res) => {
            setPoints(res.content)
            setTotalPaginate2(res.totalElements);
        })
    }, [item.data.id,currentPage2,paginatePerPage2]);

    const totalPages2 = Math.ceil(totalPaginate2 / paginatePerPage2);
    const handlePageChange2 = (event) => {
        const selectedPage2 = event.selected;
        setCurrentPage2(selectedPage2);
        setForcePage2(selectedPage2);
    };

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.setProperty("padding", "60px 0", "important");
        }
    }, []);
    return (
        <>
            <div ref={ref} className="rts-events-area rts-section-gap">
                <div className="container">
                    <div className="row">
                        <h3 style={{
                            backgroundColor: '#f4f4f9',
                            padding: '16px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '18px',
                            color: '#333',
                            gap: '12px'
                        }}>
                            <span style={{ color: '#4CAF50', fontSize: '24px' }}>📝</span>
                            Bài thi: <strong style={{ color: '#4CAF50' }}>{item.data.name}</strong>,
                            <span style={{ color: '#f44336' }}>⏳ {item.data.duration} phút</span>,
                            <span style={{ color: '#2196F3' }}>❓ {item.data.number_question} câu hỏi</span>
                        </h3>
                        <div className="col-lg-6">

                            <div className="rts-events-details-area-information quiz-details">
                                {data.map((question, key) => {
                                    const parts = question.description.split(/(?=[A-D]\.)/);
                                    const questionText = parts[0];
                                    const answers = parts.slice(1);

                                    return (
                                        <div key={key} style={{
                                            padding: '16px',
                                            border: '1px solid #ddd',
                                            marginBottom: '12px',
                                            borderRadius: '8px',
                                        }}>
                                            <h6>{question.name}</h6>
                                            <p>{questionText}</p>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '8px'
                                            }}>
                                                {answers.map((answer, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            padding: "8px",
                                                            border: "1px solid #eee",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                            backgroundColor:
                                                                answer.trim().startsWith(question.answer)
                                                                    ? "rgb(119 100 217)"
                                                                    : "#f9f9f9",
                                                            color:
                                                                answer.trim().startsWith(question.answer)
                                                                    ? "#ffffff"
                                                                    : "#333",
                                                            transition: 'background-color 0.3s ease'
                                                        }}
                                                    >
                                                        {answer}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />

                        </div>

                        <div className="col-lg-6 rts-sticky-column-item">
                            <div className="events-information-wrapper">
                                <h4 className="title">🏆 Xếp hạng</h4>

                                <table
                                    style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        marginTop: '20px',
                                        fontSize: '16px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <thead>
                                    <tr style={{backgroundColor: 'rgb(119 100 217)', color: 'white'}}>
                                        <th style={{
                                            padding: '12px 16px',
                                            textAlign: 'center',
                                            textTransform: 'uppercase'
                                        }}>STT
                                        </th>
                                        <th style={{
                                            padding: '12px 16px',
                                            textAlign: 'center',
                                            textTransform: 'uppercase'
                                        }}>Họ tên
                                        </th>
                                        <th style={{
                                            padding: '12px 16px',
                                            textAlign: 'center',
                                            textTransform: 'uppercase'
                                        }}>Điểm
                                        </th>
                                        <th style={{
                                            padding: '12px 16px',
                                            textAlign: 'center',
                                            textTransform: 'uppercase'
                                        }}>Thời gian
                                        </th>
                                        <th style={{
                                            padding: '12px 16px',
                                            textAlign: 'center',
                                            textTransform: 'uppercase'
                                        }}>Xếp hạng
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {points.map((rank, index) => (
                                        <tr
                                            key={index}
                                            style={{
                                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                                transition: 'background-color 0.2s ease-in-out',
                                                cursor: 'pointer',
                                            }}
                                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                            onMouseOut={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff'}
                                        >
                                            <td style={{
                                                padding: '12px 16px',
                                                textAlign: 'center',
                                                borderBottom: '1px solid #ddd'
                                            }}>
                                                {index + 1 + currentPage2 * paginatePerPage2}
                                            </td>
                                            <td style={{
                                                padding: '12px 16px',
                                                textAlign: 'center',
                                                borderBottom: '1px solid #ddd'
                                            }}>
                                                {rank.accountName}
                                            </td>
                                            <td style={{
                                                padding: '12px 16px',
                                                textAlign: 'center',
                                                borderBottom: '1px solid #ddd'
                                            }}>
                                                {rank.score} điểm
                                            </td>
                                            <td style={{
                                                padding: '12px 16px',
                                                textAlign: 'center',
                                                borderBottom: '1px solid #ddd'
                                            }}>
                                                {rank.completionTime}p
                                            </td>
                                            <td
                                                style={{
                                                    padding: '12px 16px',
                                                    textAlign: 'center',
                                                    borderBottom: '1px solid #ddd',
                                                    fontWeight: 'bold',
                                                    color:
                                                        index === 0
                                                            ? '#FFD700'
                                                            : index === 1
                                                                ? '#C0C0C0'
                                                                : index === 2
                                                                    ? '#CD7F32'
                                                                    : '#333',
                                                }}
                                            >
                                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <Pagination
                                    totalPages={totalPages2}
                                    currentPage={currentPage2}
                                    onPageChange={handlePageChange2}
                                />


                            </div>

                        </div>


                    </div>
                </div>
            </div>


            <div className="instructor-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area">
                                <div className="title-area-left-style">
                                    <h2 className="title">Quiz Instructors</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 mt--10">
                        {
                            Instructors.map((instructor, index) => {
                                return (
                                    <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <SingleInstructor
                                            Slug={instructor.slug}
                                            Img={instructor.img}
                                            Name={instructor.name}
                                            Position={instructor.position}
                                            imgWidth={instructor.imgWidth}
                                            imgHeight={instructor.imgHeight}
                                        />
                                    </div>
                                );
                            }).slice(0, 4)
                        }
                    </div>
                </div>
            </div>

            <div className="rts-section-gap"></div>

        </>

    )
}
