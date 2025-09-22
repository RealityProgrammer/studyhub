import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, FileText, RefreshCcw, Search, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IBill } from '../../types/Bill.ts';
import { deleteBill, findBillByAttribute, getAllBill } from '../../service/BillService.ts';
import { getAllByBillId } from '../../service/BillDetailService.ts';
import { IBillDetail } from '../../types/BillDetail.ts';
import { formatCurrency } from '../../utils/Utils.ts';
import { confirmDelete } from '../../utils/swalUtils.ts';

const BillList = () => {
  const [bill, setBill] = useState<IBill[]>([]);
  const [billDetail, setBillDetails] = useState<IBillDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalBill, setTotalBill] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [searchParams,setSearchParams] = useState({
    code:'',
    accountName:''
  })
  useEffect(() => {
    void setItemsPerPage;
    getAll()

  }, [currentPage, itemsPerPage]);
  const totalPages = Math.ceil(totalBill / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  function getAll(){
    if (searchParams.code || searchParams.accountName){
      dataSearch()
    }else {
      getBill()
    }
  }

  function getBill(){
    getAllBill(currentPage, itemsPerPage)
      .then((response: any) => {
        setBill(response.content);
        setTotalBill(response.totalElements);
      })
      .catch((e: any) => console.error(e));
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getAll()
  };

  const handleShow = (id: number) => {
    getAllByBillId(0, 0, id).then((response: any) => {
      setOpenModal(true);
      setBillDetails(response.content);
    });
  };
  const handleRemove = (id:number) =>{
    confirmDelete('Bạn chắc chắn xóa đơn  hàng này ?','Hành động này không thể hoàn tác !',() =>{
      deleteBill(id).then(() => {
        getBill();
      }).catch((error: any) => console.error(error));
    })
  }
  function dataSearch(){
    findBillByAttribute(searchParams,currentPage,itemsPerPage).then((response:any) => {
      setBill(response.content);
      setTotalBill(response.totalElements);
    })
  }
  const handleSearch = () =>{
    dataSearch()
  }
  const handleRefresh = () =>{
    setSearchParams({code: '',accountName: ''})
    getBill()
  }
  return (
    <>
      <Breadcrumb pageName="Danh sách đơn hàng" />
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[150px]">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="code"
            value={searchParams.code}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                code: e.currentTarget.value,
              })
            }
            className="w-full rounded-lg border-[1.5px] border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Mã đơn hàng"
          />
        </div>
        <div className="relative flex-1 min-w-[150px]">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="certificateName"
            value={searchParams.accountName}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                accountName: e.currentTarget.value,
              })
            }
            className="w-full rounded-lg border-[1.5px] border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tên khách hàng"
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
        >
          <Search size={20} />
          Tìm kiếm
        </button>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
        >
          <RefreshCcw size={20} />
          Làm mới
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Mã đơn hàng</th>
                <th className="py-4 px-6 font-semibold">Tên khách hàng</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {bill.map((bill, index) => (
                <tr
                  key={bill.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="py-4 px-6">{bill.code}</td>
                  <td className="py-4 px-6">{bill.accountName}</td>
                  <td className="py-4 px-6 flex gap-4">
                    <button
                      onClick={() => handleShow(bill.id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleRemove(bill.id)}
                      className="text-red-600 hover:text-red-800 transition">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${
                      currentPage === index ? 'active' : ''
                    }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div style={{marginLeft:220}} className="bg-white p-6 rounded-xl shadow-xl w-[1000px] max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-xl font-semibold mb-4">Chi tiết đơn hàng </h3>

            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                <th className="py-4 px-6 font-semibold">Số lượng</th>
                <th className="py-4 px-6 font-semibold">Giá</th>
              </tr>
              </thead>
              <tbody>
              {billDetail.map((billDetail, index) => (
                <tr
                  key={billDetail.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{billDetail.item.name}</td>
                  <td className="py-4 px-6">{billDetail.quantity}</td>
                  <td className="py-4 px-6">
                    {formatCurrency(billDetail.price)}
                  </td>
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
                    billDetail.reduce(
                      (total, items) => total + items.price * items.quantity,
                      0,
                    ),
                  )}
                </td>
              </tr>
              </tfoot>
            </table>

            <div className="flex justify-end mt-4">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                onClick={() => setOpenModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillList;
