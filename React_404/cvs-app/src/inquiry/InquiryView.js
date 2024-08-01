import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

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
            console.log(response.data);
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

    if (!inquiry) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    {isEditing ? (
                        <Form.Control 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <h2>{inquiry.title}</h2>
                    )}
                </Card.Header>
                <Card.Body>
                    {isEditing ? (
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    ) : (
                        <Card.Text>{inquiry.content}</Card.Text>
                    )}
                    <hr />
                    {user?.role === 'ADMIN' ? (
                        <>
                            <Form.Group className="mt-3">
                                <Form.Label>답장 작성</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" className="mt-3" onClick={handleReply}>
                                답장 보내기
                            </Button>
                            <Button variant="danger" className="mt-3 ms-2" onClick={handleDelete}>
                                삭제
                            </Button>
                        </>
                    ) : (
                        <Card.Text>관리자 답장<br/>{inquiry.reply}</Card.Text>
                    )}
                </Card.Body>
                <Card.Footer className="text-muted">
                    작성일: {new Date(inquiry.createdAt).toLocaleString()} <br />
                    작성자: {inquiry.nickname} <br />
                </Card.Footer>
            </Card>
            {inquiry.nickname === user?.nickname && (
                <>
                    {isEditing ? (
                        <Button variant="primary" className="mt-3" onClick={handleUpdate}>
                            저장
                        </Button>
                    ) : (
                        <Button variant="secondary" className="mt-3" onClick={() => setIsEditing(true)}>
                            수정
                        </Button>
                    )}
                    <Button variant="danger" className="mt-3 ms-2" onClick={handleDelete}>
                        삭제
                    </Button>
                </>
            )}
            <Button variant="primary" className="mt-3 ms-2" as={Link} to="/api/inquiries">
                목록으로 돌아가기
            </Button>
        </Container>
    );
};

export default InquiryView;
