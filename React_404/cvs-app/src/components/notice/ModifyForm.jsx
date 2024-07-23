import React from 'react';

const ModifyForm = ({ dto, onSubmitModify, onSubmitRemove }) => {
  const handleSubmitModify = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const modifiedNotice = {
      bno: formData.get('bno'),
      title: formData.get('title'),
      content: formData.get('content'),
      writer: formData.get('writer')
    };
    onSubmitModify(modifiedNotice);
  };

  const handleSubmitRemove = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noticeToDelete = {
      bno: formData.get('bno'),
      writer: formData.get('writer')
    };
    onSubmitRemove(noticeToDelete);
  };

  return (
    <div>
      <form onSubmit={handleSubmitModify}>
        <input type="hidden" name="bno" value={dto.bno} />
        <div>
          <input type="text" placeholder="title" name="title" defaultValue={dto.title} />
        </div>
        <div>
          <textarea placeholder="content" name="content" defaultValue={dto.content}></textarea>
        </div>
        <div>
          <input type="text" placeholder="writer" name="writer" defaultValue={dto.writer} readOnly />
        </div>
        <div>
          <button type="button" onClick={() => window.location.href='/notice/list'}>목록</button>
          <input type="submit" value="수정" />
        </div>
      </form>

      <form onSubmit={handleSubmitRemove}>
        <input type="hidden" name="bno" value={dto.bno} />
        <input type="hidden" name="writer" value={dto.writer} />
        <input type="submit" value="삭제" />
      </form>
    </div>
  );
};

export default ModifyForm;
