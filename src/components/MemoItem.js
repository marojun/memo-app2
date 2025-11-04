import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import './MemoItem.css';

function MemoItem({ memo, onUpdate, onDelete, onEdit, onSave }) {
  const [title, setTitle] = useState(memo.title || '');
  const [content, setContent] = useState(memo.content || '');

  // 메모가 변경될 때마다 상태 업데이트
  useEffect(() => {
    setTitle(memo.title || '');
    setContent(memo.content || '');
  }, [memo]);

  // 수정 모드에서 입력값 변경 시 실시간 업데이트
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdate(memo.id, { title: newTitle });
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onUpdate(memo.id, { content: newContent });
  };

  // 저장 버튼 클릭
  const handleSave = () => {
    onSave(memo.id);
  };

  // 삭제 버튼 클릭
  const handleDelete = () => {
    onDelete(memo.id);
  };

  // 수정 버튼 클릭
  const handleEdit = () => {
    onEdit(memo.id);
  };

  return (
    <Card className={`memo-item h-100 shadow-sm ${memo.isEditing ? 'border-primary' : ''}`}>
      {memo.isEditing ? (
        <Card.Body className="d-flex flex-column h-100">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={handleTitleChange}
              autoFocus
              className="fw-bold"
            />
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-1">
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="메모 내용을 입력하세요"
              value={content}
              onChange={handleContentChange}
              className="flex-grow-1"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handleSave}>
              <i className="bi bi-check-circle me-2"></i>
              저장
            </Button>
          </div>
        </Card.Body>
      ) : (
        <Card.Body className="d-flex flex-column h-100">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title className="mb-0 flex-grow-1 me-2">
              {title || <span className="text-muted">제목 없음</span>}
            </Card.Title>
            <ButtonGroup size="sm">
              <Button variant="outline-primary" onClick={handleEdit}>
                <i className="bi bi-pencil me-1"></i>
                수정
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                <i className="bi bi-trash me-1"></i>
                삭제
              </Button>
            </ButtonGroup>
          </div>
          <Card.Text className="flex-grow-1 text-muted">
            {content || <span className="fst-italic">내용 없음</span>}
          </Card.Text>
          {memo.createdAt && (
            <small className="text-muted mt-auto">
              <i className="bi bi-clock me-1"></i>
              {new Date(memo.createdAt).toLocaleString('ko-KR')}
            </small>
          )}
        </Card.Body>
      )}
    </Card>
  );
}

export default MemoItem;
