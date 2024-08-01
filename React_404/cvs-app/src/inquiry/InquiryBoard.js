import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, ListGroup, Modal, Form } from 'react-bootstrap';

const InquiryBoard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        fetchInquiries();
        fetchNickname();
    }, []);

    const fetchInquiries = async () => {
        const response = await axios.get('/api/inquiries');
        setInquiries(response.data);
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

    return (
        <Container className="mt-5">
            <h1>문의사항 게시판</h1>
            <Button variant="primary" className="mb-4" onClick={handleShow}>
                문의하기
            </Button>
            <ListGroup>
                {inquiries.map((inquiry) => (
                    <ListGroup.Item key={inquiry.id}>
                        <Link to={`/inquiries/${inquiry.id}`}>{inquiry.title}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <Modal show={show} onHide={handleClose}>
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
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="내용을 입력하세요"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
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
