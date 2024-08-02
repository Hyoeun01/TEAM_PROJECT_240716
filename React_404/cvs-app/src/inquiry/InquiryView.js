import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './InquiryView.css';

const InquiryView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [reply, setReply] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchInquiry();
    }, [id]);

    const fetchInquiry = async () => {
        try {
            const response = await axios.get(`/api/inquiries/${id}`);
            setInquiry(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setReply(response.data.reply || ''); // Initialize reply with existing data or empty string
            
        } catch (error) {
            console.error('Error fetching inquiry:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/inquiries/${id}`, { title, content }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsEditing(false);
            fetchInquiry();
        } catch (error) {
            console.error('Error updating inquiry:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/inquiries/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/api/inquiries');
        } catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    };

    const handleReply = async () => {
        try {
            await axios.post(`/api/inquiries/${id}/reply`, { reply }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setReply(''); // Clear reply input after submitting
            fetchInquiry();
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };

    const formatDateString = (dateString) => {
        // Ensure dateString is a string and replace space with 'T' for correct parsing
        if (typeof dateString !== 'string') {
            console.error('Date string is not of type string:', dateString);
            return '';
        }
    
        const formattedDateString = dateString.replace(' ', 'T'); // Replace space with 'T'
        const date = new Date(formattedDateString);
    
        if (isNaN(date.getTime())) {
            console.error('Invalid date format:', formattedDateString);
            return '';
        }
    
        // Subtract one month
        date.setMonth(date.getMonth() - 1);
    
        // Format date as locale string
        return date.toLocaleString();
    };
    if (!inquiry) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="styled-container">
            <div className="header-section">
                {isEditing ? (
                    <Form.Control 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="styled-form-control"
                    />
                ) : (
                    <h2 className="title">{inquiry.title}</h2>
                )}
            </div>
            <div className="content-section">
                {isEditing ? (
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="styled-form-control"
                    />
                ) : (
                    <p className="content">{inquiry.content}</p>
                )}
                <hr className="divider" />
                <div className="metadata">
                {/* 작성일: {formatDateString(inquiry.createdAt)} <br /> */}
                    작성일: {new Date(...inquiry.createdAt).toLocaleString()} <br />
                    작성자: {inquiry.nickname} <br />
                </div>
                {user?.role === 'ADMIN' ? (
                    <>
                        <Form.Group className="mt-3">
                            <Form.Label>답장 작성</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                className="styled-form-control"
                            />
                        </Form.Group>
                        <div className="button-container">
                            <Button variant="primary" onClick={handleReply} className="styled-button">
                                답장 보내기
                            </Button>
                            <Button variant="danger" onClick={handleDelete} className="styled-button">
                                삭제
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="content">관리자 답장<br/>{inquiry.reply}</p>
                )}
            </div>
            <div className="footer-section">
                {inquiry.nickname === user?.nickname && (
                    <div className="button-container">
                        {isEditing ? (
                            <Button variant="primary" onClick={handleUpdate} className="styled-button">
                                저장
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={() => setIsEditing(true)} className="styled-button">
                                수정
                            </Button>
                        )}
                        <Button variant="danger" onClick={handleDelete} className="styled-button">
                            삭제
                        </Button>
                    </div>
                )}
                <Button as={Link} to="/api/inquiries" className="back-button styled-button">
                    목록으로 돌아가기
                </Button>
            </div>
        </Container>
    );
};

export default InquiryView;
