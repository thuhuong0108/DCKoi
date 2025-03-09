import { ArrowLeft, X } from "lucide-react";


const PaymentFailed = ({
    amount,
    time,
    paymentId,
    method,
    projectName,
    service,
    customerName,
    customerEmail,
    description,
    onBack
}) => {
    return (
        <div className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-xl p-6">
            <div className="flex flex-col items-center justify-center space-y-4 mb-12">
                <div className="relative flex items-center justify-center m-12">
                    <div className="absolute w-28 h-28 rounded-full animate-pulse bg-red-200/60"></div>
                    <div className="absolute w-24 h-24 rounded-full animate-pulse bg-red-300/70"></div>
                    <div className="absolute w-20 h-20 rounded-full animate-pulse bg-red-400/80"></div>
                    <div className="absolute w-16 h-16 rounded-full animate-pulse bg-red-500/90"></div>
                    <div className="relative w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-8 h-8 text-white" strokeWidth={3} />
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Thanh toán thất bại
                </h2>
                <h2 className="text-2xl font-bold text-red-600">
                    {amount}
                </h2>
                <p className="text-gray-500">
                    {time}
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 px-4">
                        Chi tiết thanh toán
                    </h2>
                    <div className="bg-gray-50 shadow-sm rounded-xl px-8 py-4 space-y-4">
                        <div className="space-y-3 border-b border-gray-200 pb-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Tên khách hàng:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {customerName}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Email:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {customerEmail}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 border-b border-gray-200 pb-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Mã thanh toán:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {paymentId}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Phương thức thanh toán:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {method}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Mô tả:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {description}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Tên dự án:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {projectName}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Hạng mục:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {service}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-gray-800 font-semibold">
                                    Số tiền:
                                </span>
                                <span className="font-bold text-red-600">
                                    {amount}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onBack}
                    className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Quay lại trang chủ</span>
                </button>
            </div>
        </div>
    );
};


export default PaymentFailed