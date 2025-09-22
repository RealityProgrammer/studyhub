import Courses from '@/data/courses.json';
import Image from "next/image";
import {useEffect, useState} from "react";
import api from '../../route/route'
import carts from "../../route/cart";
import {formatCurrency} from "@/utils/utils";
import Link from "next/link";
import pay from '../../route/payment'
import bi from '../../route/bill'
export default function CheckoutArea() {

    const [account, setAccount] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [total,setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        api.getUser().then((response) => {
            setAccount(response.data);
        }).catch((e) => console.error(e));
        carts.getAllCart().then((response) => {
            setSelectedCourses(response.data);
        })
    }, []);

    useEffect(() => {
        const totalAmount = selectedCourses.reduce((item,course) => item + course.item.price * course.quantity * (1-course.item.discount/100), 0);
        setTotal(totalAmount)
    }, [selectedCourses]);

    const handlePayment = async (e) => {
        e.preventDefault()
        if (paymentMethod === "VNPay"){
            try {
                const response = await pay.createVNPay(total, "NCB");
                if (response && response.paymentUrl) {
                    window.location.href = response.paymentUrl;
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
            }
        }else if (paymentMethod === "MoMo"){
            try {
                const amount = total.toString();
                const req ={amount}
                const res = await pay.createMomo(req);
                localStorage.setItem('orderId', res.orderId);
                window.location.href = res.payUrl;
            }catch (e) {
                console.error(e);
            }
        }else if (paymentMethod === "ZaloPay"){
            try {
                const amount = {
                    "amount" : total
                }
                const res = await pay.createZaloPay(amount);
                window.location.href = res.order_url;
            }catch (e) {
                console.error(e);
            }
        }
        else {
            alert("Vui lòng chọn phương thức thanh toán !!!")
        }

    };
    return (
        <div className="ms-main">
            <div className="ms-page-content">
                <header className="ms-sp--header container">
                    <h1 className="ms-sp--title">Thanh toán</h1>
                </header>
                <div className="ms-default-page container entry-content">
                    <div className="woocommerce">
                        <div className="woocommerce-notices-wrapper"></div>
                        <form name="checkout" method="post"
                              className="checkout woocommerce-checkout ms-woocommerce-checkout" action="#"
                              enctype="multipart/form-data" novalidate="novalidate">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="full-grid">
                                        <div className="billing-fields">
                                            <div className="checkout-title">
                                                <h3 className="animated fadeIn">Chi tiết thanh toán</h3>
                                            </div>
                                            <div className="form-content-box">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Họ tên</label>
                                                            <input id="fname" name="fname" value={account?.fullName}
                                                                   className="form-control-mod"
                                                                   type="text" required=""/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Số điện thoại </label>
                                                            <input id="fname" name="fname" value={account?.phone}
                                                                   className="form-control-mod"
                                                                   type="text" required=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Email </label>
                                                        <input id="lname" name="lname" value={account?.email}
                                                               className="form-control-mod"
                                                               type="text" required=""/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Phương thức thanh toán</label>
                                                            <select
                                                                className="d-block"
                                                                style={{height: '60px'}}
                                                                required=""
                                                                value={paymentMethod}
                                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                            >
                                                                <option value="">Chọn phương thức thanh toán</option>
                                                                <option value="VNPay">VN Pay</option>
                                                                <option value="MoMo">Momo</option>
                                                                <option value="ZaloPay">ZaloPay</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 pl--30 pl_sm--15 pl_md--15">
                                    <h3 id="order_review_heading" className="animated fadeIn">Đơn hàng của bạn</h3>
                                    <div id="order_review" className="woocommerce-checkout-review-order">
                                        <table
                                            className="ms-checkout-review-order-table shop_table woocommerce-checkout-review-order-table">
                                            <tbody>
                                            {selectedCourses.map((course) => {
                                                return (
                                                    <tr key={course.id} className="cart_item">
                                                        <td colspan="2">
                                                            <div className="ms-checkout-product">
                                                                <div className="ms-checkout-product__thumbnail" style={{width:'150px'}}>
                                                                    <div className="product-thumb" style={{maxWidth: '150px', position: 'relative'}}>
                                                                        <Image src={course.item.imageUrl} alt="product-thumb" width="100" height="100" style={{width:'150px'}} />
                                                                        {course.item.discount > 0 && (
                                                                            <span style={{position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: 'white', padding: '1px', borderRadius: '3px', display: 'inline-block'
                                                                            }}>{course.item.discount}%</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="ms-checkout-product__content">
                                                                    <h5>{course.item.name}</h5>
                                                                    <span
                                                                        className="woocommerce-Price-amount amount">Sl: {course.quantity} × {formatCurrency((course.item.price)* (1-course.item.discount/100))}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                            <tfoot>
                                            <tr className="cart-subtotal">
                                                <th>Tổng tiền</th>
                                                <td>
                                                    <span className="woocommerce-Price-amount amount">{formatCurrency(total.toFixed(2))}</span>
                                                </td>
                                            </tr>

                                            </tfoot>
                                        </table>
                                        <div id="payment" className="woocommerce-checkout-payment">
                                            <div className="form-row place-order">
                                                <div className="ms-proceed-to-checkout wc-proceed-to-checkout">
                                                    <button onClick={handlePayment}
                                                            className="rts-btn btn-primary button">
                                                        Thanh toán
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    )
}
