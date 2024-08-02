// DaumPostcodeComponent.js
import React from "react";
import DaumPostcode from "daum-postcode";

const DaumPostcodeComponent = ({ onComplete }) => {
  const handleClick = () => {
    new DaumPostcode({
      oncomplete: (data) => {
        onComplete(data);
      },
    }).open();
  };

  return (
    <button type="button" onClick={handleClick}>
      주소 검색
    </button>
  );
};

export default DaumPostcodeComponent;
