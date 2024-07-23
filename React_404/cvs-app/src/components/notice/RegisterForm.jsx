import React from 'react';

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newNotice = {
      title: formData.get('title'),
      content: formData.get('content'),
      writer: formData.get('writer')
    };
    // 등록 처리 로직을 추가할 수 있습니다.
    console.log('새로운 공지사항:', newNotice);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="/notice/register" method="post">
        <div>
          <input type="text" placeholder="title" name="title" />
        </div>
        <div>
          <textarea placeholder="content" name="content"></textarea>
        </div>
        <div>
          <input type="text" placeholder="writer" name="writer" readOnly />
          {/* React에서는 #authentication.principal.writer를 바로 사용할 수 없으므로,
              필요한 경우 해당 값을 props로 받아와서 설정해야 합니다. */}
          {/* 예를 들어, 부모 컴포넌트에서 writer 값을 props로 넘겨받아 사용할 수 있습니다. */}
        </div>
        <div>
          <button onClick={() => window.location.href='/notice/list'}>목록</button> {/* 목록으로 돌아가는 버튼 */}
          <input type="submit" value="등록" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
