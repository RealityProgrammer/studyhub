import {useEffect, useState} from "react";
import api from '../../route/bill'
import {formatDateTime} from "@/utils/dateUtils";
import {formatCurrency} from "@/utils/utils";
export default function DashboardOrder() {
    const [bill, setBill] = useState([]);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        api.getBillByEmail().then(data => {
            setBill(data.content)
            console.log('data bill', data.content)
        }).catch((e)=>{console.error(e)})
    }, [])

    const handleShow = (id) =>{
        api.getBillDetailById(id).then((response) => {
            setData(response.content)
            console.log('data req',response.content)
            setOpenModal(true)
        }).catch((e)=>console.error(e))
        console.log('handleShow', id)
    }
    return (
        <>
            <div className="rts-reviewd-area-dashed table-responsive">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active today" role="tabpanel">
                        <h5 className="title">Khóa học đã mua</h5>
                        <table className="table-reviews quiz mb--0">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn hàng</th>
                                <th>Ngày mua</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                bill.map((bill, index) => (
                                    <tr key={bill.id}>
                                        <td>
                                            <span className="questions">{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className="questions">{bill.code}</span>
                                        </td>
                                        <td>
                                            <span className="marks">{formatDateTime(bill.createdDate)}</span>
                                        </td>
                                        <td>
                                            <div className="hold-area" style={{marginLeft: '20px'}}>
                                                <span onClick={() => handleShow(bill.id)} className="hold-i"><i
                                                    className="fa-regular fa-clipboard-list"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div>
                {openModal && (
                    <div className="modal-overlay" onClick={() => setOpenModal(false)}>
                        <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                            <h3>Danh sách khóa học</h3>

                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th>STT</th>
                                    <th>Tên khóa học</th>
                                    <th>Số lượng</th>
                                    <th>Giá Tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatCurrency(item.price)}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr className="border-t-2 border-gray-300">
                                    <td
                                        colSpan={3}
                                        className="py-4 px-6 font-semibold text-right"
                                    >
                                        Tổng tiền:
                                    </td>
                                    <td className=" text-lg font-bold text-red-600">
                                        {formatCurrency(
                                            data.reduce(
                                                (total, items) => total + items.price * items.quantity,
                                                0,
                                            ),
                                        )}
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                            <div className="search-close-icon" onClick={() => setOpenModal(false)}>
                                <i className="far fa-times"></i>
                            </div>
                        </div>
                    </div>
                )}


                <style jsx>{`
                    /* Overlay (Mờ nền) */
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.6);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                    }

                    /* Modal */
                    .search-modal {
                        background: white;
                        padding: 25px;
                        border-radius: 10px;
                        width: 600px;
                        max-width: 90%;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        position: relative;
                        text-align: center;
                        animation: fadeIn 0.3s ease-in-out;
                    }

                    /* Hiệu ứng xuất hiện */
                    @keyframes fadeIn {
                        from {
                            transform: scale(0.8);
                            opacity: 0;
                        }
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }

                    /* Bảng dữ liệu */
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 15px;
                    }

                    .table th, .table td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: center;
                    }

                    .table thead {
                        background: #007bff;
                        color: white;
                        font-weight: bold;
                    }

                    .table tbody tr:nth-child(even) {
                        background: #f8f9fa;
                    }

                    /* Nút đóng */
                    .search-close-icon {
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        font-size: 24px;
                        cursor: pointer;
                        color: #555;
                        transition: color 0.3s;
                    }

                    .search-close-icon:hover {
                        color: red;
                    }

                    /* Nút mở modal */
                    .open-modal-btn {
                        padding: 10px 15px;
                        font-size: 16px;
                        background: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background 0.3s;
                    }

                    .open-modal-btn:hover {
                        background: #0056b3;
                    }
                `}</style>
            </div>
        </>
    )
}
