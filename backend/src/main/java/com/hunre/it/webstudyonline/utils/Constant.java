package com.hunre.it.webstudyonline.utils;




public class Constant {
    public static final String ROLE_ADMIN="ADMIN";
    public static final String ROLE_USER="USER";
    public static final String ROLE_EMPLOYEE="TEACHER";
    public static final String ROLE_CENSOR="CENSOR";

    public class HTTP_MESSAGE{
        public static final String SUCCESS="request successfully";
        public static final String FAILED="request failed";
        public static final String NOTFOUND="Not Found";
        public static final String EMPTY="Please fill out the variable";
        public static final String StringToLong="Please enter a number";



        //password
        public static final String CONFIRMPASSWORD = "Confirmation password does not match.";
        public static final String OLDPASSWORD = "Old password is incorrect.";
        public static final String NEWPASSWORD = "The new password cannot be the same as the old password.";
    }
    public static String VNP_TMN_CODE = "B0L2A3BX";
    public static String VNP_HASH_SECRET = "AHXYEVPIZJZDUWCKCTQVRPIMZTDMGMFT";
    public static String VNP_PAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static String VNP_PAY_VERSION = "2.1.0";
}
