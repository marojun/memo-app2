import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import MemoItem from './components/MemoItem';
import SearchBar from './components/SearchBar';

function App() {
  const [memos, setMemos] = useState(() => {
    // localStorage에서 메모 불러오기
    const savedMemos = localStorage.getItem('memos');
    return savedMemos ? JSON.parse(savedMemos) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // 메모를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  // 새 메모 생성
  const handleCreateMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: '',
      content: '',
      isEditing: true,
      createdAt: new Date().toISOString(),
    };
    setMemos([newMemo, ...memos]);
  };

  // 메모 업데이트
  const handleUpdateMemo = (id, updatedData) => {
    setMemos(memos.map(memo => 
      memo.id === id ? { ...memo, ...updatedData } : memo
    ));
  };

  // 메모 삭제
  const handleDeleteMemo = (id) => {
    if (window.confirm('메모를 삭제하시겠습니까?')) {
      setMemos(memos.filter(memo => memo.id !== id));
    }
  };

  // 수정 모드 전환
  const handleEditMode = (id) => {
    setMemos(memos.map(memo => 
      memo.id === id ? { ...memo, isEditing: true } : memo
    ));
  };

  // 저장 (수정 모드 종료)
  const handleSaveMemo = (id) => {
    setMemos(memos.map(memo => 
      memo.id === id ? { ...memo, isEditing: false } : memo
    ));
  };

  // 검색된 메모 필터링
  const filteredMemos = memos.filter(memo => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      memo.title.toLowerCase().includes(query) ||
      memo.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="App">
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1 className="mb-0 text-primary">
                    <i className="bi bi-journal-text me-2"></i>
                    메모 앱
                  </h1>
                  <button 
                    className="btn btn-primary btn-lg" 
                    onClick={handleCreateMemo}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    새 메모
                  </button>
                </div>
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          {filteredMemos.length === 0 ? (
            <Col>
              <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                {searchQuery ? '검색 결과가 없습니다.' : '메모가 없습니다. 새 메모를 만들어보세요!'}
              </Alert>
            </Col>
          ) : (
            filteredMemos.map(memo => (
              <Col key={memo.id} xs={12} sm={6} lg={4} className="mb-4">
                <MemoItem
                  memo={memo}
                  onUpdate={handleUpdateMemo}
                  onDelete={handleDeleteMemo}
                  onEdit={handleEditMode}
                  onSave={handleSaveMemo}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
