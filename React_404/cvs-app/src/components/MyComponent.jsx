import React from 'react';
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();
  
  // 디버깅을 위한 콘솔 로그 추가
  console.log('location:', location);

  // 객체가 정의되어 있는지 확인하고 pathname을 사용
  if (location && location.pathname) {
    return <div>Current Path: {location.pathname}</div>;
  } else {
    return <div>Path not found</div>;
  }
};

export default MyComponent;
