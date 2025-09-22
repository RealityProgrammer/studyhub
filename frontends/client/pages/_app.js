import "@/assets/scss/style.scss";
import { Providers } from "@/redux/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {CartProvider} from "@/hooks/CartContext";

function StudyHubNextJS({ Component, pageProps }) {
    return (
        <Providers>
            <CartProvider>
            <Component {...pageProps} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                closeButton={false}
            />
            </CartProvider>
        </Providers>
    );
}

export default StudyHubNextJS;
