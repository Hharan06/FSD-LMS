import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const { COURSE_ENROLL_DIRECTLY_API } = studentEndpoints;


// ================ buyCourse (Direct Enrollment) ================ 
export async function buyCourse(token, coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Enrolling in course...");
    dispatch(setPaymentLoading(true));

    try {
        // Direct enrollment without payment
        const response = await apiConnector("POST", COURSE_ENROLL_DIRECTLY_API,
            { coursesId },
            {
                Authorization: `Bearer ${token}`,
            })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Successfully enrolled in the course!");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }
    catch (error) {
        console.log("DIRECT ENROLLMENT ERROR.....", error);
        toast.error(error.response?.data?.message || "Could not enroll in course");
    }
    
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
