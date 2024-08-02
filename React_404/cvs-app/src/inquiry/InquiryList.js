import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Pagination, Table } from 'react-bootstrap';

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchInquiries(currentPage);
    }, [currentPage]);

    const fetchInquiries = async (page) => {
        try {
            const response = await axios.get(`/api/inquiries`, {
                params: {
                    page: page,
                    size: 10,
                },
            });
            setInquiries(response.data.content);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container>
            <h2>문의사항 목록</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((inquiry) => (
                        <tr key={inquiry.id}>
                            <td>
                                <Link to={`/inquiries/${inquiry.id}`}>{inquiry.title}</Link>
                            </td>
                            <td>{inquiry.nickname}</td>
                            <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
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
        </Container>
    );
};

export default InquiryList;
