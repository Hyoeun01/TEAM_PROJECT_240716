import axios from "axios";
import { BASE_API_URL } from "../common/constants";

const API_URL=BASE_API_URL+"/review";

class ReviewService {
    saveReview(review) {
        return axios.post(API_URL, review);
    }
    deleteReview(rno) {
        return axios.delete(API_URL + "/" + rno);
    }
    getAllReviews() {
        return axios.get(API_URL + "/list");
    }
    getReviewById(rno) {
        return axios.get(API_URL + "/read" + "/" + rno)
    }
}

const reviewService = new ReviewService();
export default reviewService;