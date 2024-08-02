import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, ListGroup, Modal, Form, Pagination } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './InquiryBoard.css';

const InquiryBoard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInquiries(currentPage);
        fetchNickname();
    }, [currentPage]);

    const fetchInquiries = async (page) => {
        try {
            const response = await axios.get('/api/inquiries', {
                params: { page, size: 10 }  // 한 페이지당 10개씩 가져오기
            });
            setInquiries(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const fetchNickname = async () => {
        try {
            const response = await axios.get('/members/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNickname(response.data.nickname);
        } catch (error) {
            console.error('Error fetching nickname:', error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const createInquiry = async () => {
        const response = await axios.post('/api/inquiries', { title, content }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setInquiries([...inquiries, response.data]);
        setTitle('');
        setContent('');
        handleClose();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container className="inquiry-board-container mt-5">
            <div className="header-section">
                <h1 className="inquiry-board-header">문의사항</h1>
                <Button variant="primary" className="inquiry-board-button" onClick={handleShow}>
                    문의하기
                </Button>
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="list-group-container"
            >
                <ListGroup>
                    {inquiries.map((inquiry) => (
                        <motion.div
                            key={inquiry.id}
                            whileHover={{ scale: 1.02 }}  // 마우스 오버 시 효과를 작게 조정
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/inquiries/${inquiry.id}`)}
                        >
                            <div className="inquiry-board-list-group-item">
                                <Link to={`/inquiries/${inquiry.id}`} className="inquiry-title-link">{inquiry.title}</Link>
                            </div>
                        </motion.div>
                    ))}
                </ListGroup>
            </motion.div>
            <Pagination className="pagination-container">
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item 
                        key={page} 
                        active={page === currentPage} 
                        onClick={() => handlePageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={show} onHide={handleClose} className="inquiry-board-modal">
                <Modal.Header closeButton>
                    <Modal.Title>문의 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>제목</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="제목을 입력하세요" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="inquiry-board-form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                placeholder="내용을 입력하세요"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="inquiry-board-form-control"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={createInquiry}>
                        작성
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default InquiryBoard;
