import axios from "axios";
import { BASE_API_URL } from "../common/constants";

const API_URL=BASE_API_URL+"/review";

class ReviewService {
    saveReview(review, p_id, mid) {
        return axios.post(`${API_URL}/add/${p_id}/${mid}`, review);
    }
    deleteReview(rno) {
        return axios.delete(API_URL + "/" + rno);
    }
    getAllReviews() {
        return axios.get(API_URL + "/list");
    }
    getReviewById(rno) {
        return axios.get(API_URL + "/read" + "/" + rno);
    }
    modifyReview(rno, review) {
        return axios.post(API_URL + "/modify" + "/" + rno, review);
    }
}

const reviewService = new ReviewService();
export default reviewService;