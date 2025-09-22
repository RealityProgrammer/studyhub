import {useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import pay from '../src/route/payment';
import bi from '../src/route/bill';
import carts from "../src/route/cart";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import {useCart} from "@/hooks/CartContext";
import {useRouter} from 'next/router';

export default function Success() {
    const searchParams = useSearchParams();
    const getParam = useSearchParams();
    const {removeData} = useCart();
    const router = useRouter();
    const isOrderCreated = useRef(false);
    async function createOrder(){
        if (isOrderCreated.current) return;
        isOrderCreated.current = true;
        try {
            const res = await bi.createBill({
                code: 0,
            });
            const billId = res.data.id;
            const selectedCourses = await carts.getAllCart();
            await Promise.all(
                selectedCourses.data.map(async (course) => {
                    return bi.createBillDetails({
                        billId: billId,
                        item: {
                            id: course.item.id,
                        },
                        quantity: course.quantity,
                        price: course.item.price * (1 - course.item.discount / 100),
                    });
                })
            );
            await Promise.all(
                selectedCourses.data.map(cartId => removeData(cartId.id.toString()))
            );
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (searchParams) {
            const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
            if (vnp_ResponseCode) {
                pay.handleVNPayReturn(searchParams).then(async (result) => {
                    if (result && result.status === '00') {
                        createOrder();
                    }
                }).catch((error) => console.error(error));
            } else if (vnp_ResponseCode && vnp_ResponseCode !== '00') {
                router.push('/result_payment');
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (getParam) {
            const params = getParam.get('apptransid');
            if (params) {
                pay.statusZaloPay(params).then(async (result) => {
                    if (result && result.return_code === 1) {
                        createOrder();
                    }
                })
            }
        }
    }, [getParam]);

    useEffect(() => {
        const orderId = localStorage.getItem('orderId');
        console.log(orderId);
        if (orderId) {
            const fetchPaymentStatus = async () => {
                try {
                    const res = await pay.codeMomoReturn(orderId);
                    console.log(res);
                    console.log(res.resultCode);

                    if (res.resultCode === 0) {
                        createOrder()
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPaymentStatus();
        }
    }, []);
    return (
        <main>
            <Header
                headerClass="header-one v-2 header--sticky"
                topbarEnable={true}
                menuItemsLeft={true}
            />

            <div className="payment-success-container">
                <div className="payment-success-box">
                    <img
                        src="https://png.pngtree.com/png-vector/20240705/ourmid/pngtree-green-tick-mark-green-tick-png-image_12888798.png"
                        alt="success"
                        className="success-icon"
                    />
                    <h2 className="success-title">Thanh toán thành công!</h2>
                    <p className="success-description">
                        Cảm ơn bạn đã khóa học
                    </p>
                    <a href="/" className="success-btn">
                        Tiếp tục mua sắm
                    </a>
                </div>
            </div>

            <Footer
                footerClass="footer-callto-action-area bg-light-1"
                footerLogo="/images/logo/logo-1.svg"
            />

            <style jsx>{`
                .payment-success-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 70vh;
                    background-color: #f9fafb;
                    padding: 20px;
                }

                .payment-success-box {
                    text-align: center;
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    width: 100%;
                }

                .success-icon {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 20px;
                }

                .success-title {
                    font-size: 28px;
                    color: #2d3748;
                    margin-bottom: 12px;
                    font-weight: bold;
                }

                .success-description {
                    font-size: 18px;
                    color: #4a5568;
                    margin-bottom: 20px;
                }

                .success-btn {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: #ffffff;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 500;
                    transition: background-color 0.2s ease-in-out;
                }

                .success-btn:hover {
                    background-color: #45a049;
                }
            `}</style>
        </main>
    );

}