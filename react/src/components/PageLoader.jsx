import { Row, Col, Spinner } from 'react-bootstrap';
import React from 'react';

export default function PageLoader()
{
    return (
        <Row>
            <Col className="h-100v d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        </Row>
    )
}