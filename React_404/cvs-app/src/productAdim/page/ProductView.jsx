import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

function ProductView() {

  const { id } = useParams();
  

  return (
    <div>
      <h1>상품 상세 페이지</h1>
      <p>상품 ID: {id}</p>

      
    </div>
  );
}
export default ProductView;
