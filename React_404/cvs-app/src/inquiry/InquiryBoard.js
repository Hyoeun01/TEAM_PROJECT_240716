import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import './InquiryBoard.css';

const InquiryBoard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

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

    const handleItemClick = (id) => {
        navigate(`/inquiries/${id}`);
    };

    return (
        <StyledContainer>
            <motion.h1 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inquiry-board-header"
            >
                문의사항
            </motion.h1>
            <StyledButton 
                className="mb-4 inquiry-board-button"
                onClick={handleShow}
            >
                문의하기
            </StyledButton>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ListGroup>
                    {inquiries.map((inquiry) => (
                        <motion.div
                            key={inquiry.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <StyledListGroupItem onClick={() => handleItemClick(inquiry.id)}>
                                <StyledLink>{inquiry.title}</StyledLink>
                            </StyledListGroupItem>
                        </motion.div>
                    ))}
                </ListGroup>
            </motion.div>
            
            <StyledModal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>문의 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>제목</Form.Label>
                            <StyledFormControl 
                                type="text" 
                                placeholder="제목을 입력하세요" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="inquiry-board-form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>내용</Form.Label><br/>
                            <StyledFormControl 
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
                    <StyledButton onClick={createInquiry}>
                        작성
                    </StyledButton>
                </Modal.Footer>
            </StyledModal>
        </StyledContainer>
    );
};

export default InquiryBoard;

const StyledContainer = styled(Container)`
    .inquiry-board-header {
        color: #93278F;
        text-align: center;
        margin-bottom: 20px;
    }
`;

const StyledButton = styled(Button)`
    background-color: #93278F;
    border: none;
    &:hover {
        background-color: #8CC63F;
    }
`;

const StyledListGroupItem = styled(ListGroup.Item)`
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background-color: #F0F0F0;
    }
`;

const StyledLink = styled.span`
    color: #93278F;
    text-decoration: none;
`;

const StyledFormControl = styled(Form.Control)`
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #93278F;
    width: 100%;
    &:focus {
        border-color: #8CC63F;
        box-shadow: 0 0 0 0.2rem rgba(140, 198, 63, 0.25);
    }
`;

const StyledModal = styled(Modal)`
    .modal-dialog {
        max-width: 800px;
    }
    .modal-content {
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    .modal-header, .modal-footer {
        border: none;
        justify-content: center;
    }
    .modal-body {
        padding: 20px;
    }
`;
