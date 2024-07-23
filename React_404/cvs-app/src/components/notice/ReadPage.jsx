import React from 'react';

const ReadPage = ({ dto }) => {
  return (
    <div>
      <div>
        <input type="hidden" name="bno" value={dto.bno} /> {/* hidden 필드에 bno 값을 전달 */}
      </div>
      <div>
        <input type="text" name="title" value={dto.title} readOnly /> {/* 제목 필드, 읽기 전용 */}
      </div>
      <div>
        <textarea value={dto.content} readOnly></textarea> {/* 내용 필드, 읽기 전용 */}
      </div>
      <div>
        <input type="text" placeholder="writer" name="writer" value={dto.writer} readOnly /> {/* 작성자 필드, 읽기 전용 */}
      </div>
      <div>
        <button onClick={() => window.location.href='/notice/list'}>목록</button> {/* 목록으로 돌아가는 버튼 */}
        <a href={`/notice/modify/${dto.bno}`}><button>수정</button></a> {/* 수정 페이지로 이동하는 버튼 */}
      </div>
    </div>
  );
};

export default ReadPage;
