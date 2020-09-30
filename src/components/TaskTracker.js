import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Card, Container, Row, Col, CardDeck } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCALSTORAGE_KEYS } from '../util/constants';
import taskData from '../resources/taskData.json';
import tempTaskData from '../resources/tempTaskData.json';
import { Form } from "../../node_modules/react-bootstrap/esm/index";

export default function TaskTracker() {
    const [totalPoints, setTotalPoints] = useLocalStorage(LOCALSTORAGE_KEYS.TOTAL_POINTS, 0);
    const [taskStatus, setTaskStatus] = useLocalStorage(LOCALSTORAGE_KEYS.TASKS, {});

    const columns = [
        {
            "dataField": "done",
            "text": "✓",
            "isDummyField": true,
            "headerStyle": { width: '5%' },
            "formatter": completedFormatter,
        },
        {
            "dataField": "name",
            "text": "Task",
            "sort": true,
            "filter": textFilter({ placeholder: "Filter..." })
        },
        {
            "dataField": "difficulty",
            "text": "Points",
            "formatter": pointsFormatter,
            "sort": true
        },
        {
            "dataField": "difficulty",
            "text": "Difficulty",
            "sort": true,
            "filter": selectFilter({
                "placeholder": "(all)",
                "options": taskData.difficulties
            })
        },
        {
            "dataField": "area",
            "text": "Area",
            "sort": true,
            "filter": selectFilter({
                "placeholder": "(all)",
                "options": taskData.areas
            })
        },
        {
            "dataField": "skill",
            "text": "Skill",
            "sort": true,
            "filter": selectFilter({
                "placeholder": "(all)",
                "options": taskData.skills
            })
        },
        {
            "dataField": "category",
            "text": "Category",
            "sort": true,
            "filter": selectFilter({
                "placeholder": "(all)",
                "options": taskData.categories
            })
        },
    ];

    const todoColumns = [
        {
            "dataField": "done",
            "text": "✓",
            "isDummyField": true,
            "headerStyle": { width: '10%' },
            "formatter": completedFormatter,
        },
        {
            "dataField": "name",
            "text": "Task",
            "sort": true,
        },
    ];

    const pageButtonRenderer = ({
        page,
        active,
        disable,
        title,
        onPageChange
    }) => {
        const handleClick = (e) => {
            e.preventDefault();
            onPageChange(page);
        };
        const activeStyle = {
            'padding': '6px 12px'
        };
        if (active) {
            activeStyle.backgroundColor = '#484e53';
            activeStyle.color = 'white';
        } else {
            activeStyle.backgroundColor = ' #343a40';
            activeStyle.color = 'white';
        }
        return (
            <li >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" onClick={handleClick} style={activeStyle}>{page}</a>
            </li>
        );
    };

    return (
        <Card bg='dark' text='white' className="mt-3">
            <h1 className="m-3 text-center">Tasks Completed: 100 / 1000 (10%)</h1>

            <Container style={{ 'maxWidth': '35rem' }}>
                <Row>
                    <Col>
                        By difficulty:
                        <ul>
                            <li>Easy: 60 / 500 (12%)</li>
                            <li>Medium: 30 / 300 (10%)</li>
                            <li>Hard: 5 / 200 (2%)</li>
                        </ul>
                    </Col>
                    <Col>
                        By area:
                        <ul>
                            <li>Misthalin: 70 / 250 (28%)</li>
                            <li>Karamja: 15 / 250 (6%)</li>
                            <li>Asgarnia: 10 / 250 (4%)</li>
                            <li>Tirannwn: 5 / 250 (2%)</li>
                            <li>Fremennik: 0 / 250 (0%)</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className='d-flex justify-content-around' style={{ margin: '1rem' }}>
                <Card bg='dark' text='white' style={{ width: '30rem', marginRight: '1rem' }}>
                    <h3 className="mt-2 light-text text-center">To-Do List</h3>
                    <div className="m-3 text-center">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={tempTaskData.tasks}
                            columns={todoColumns}
                            bordered={false}
                            classes="light-text"
                            filter={filterFactory()}
                            filterPosition="top"
                        // pagination={paginationFactory({
                        //     pageButtonRenderer,
                        //     sizePerPage: 20,
                        //     hideSizePerPage: true,
                        //     hidePageListOnlyOnePage: true
                        // })}
                        />
                    </div>
                </Card>
                <Card bg='dark' text='white' style={{ width: '60rem' }}>
                    <h3 className="mt-2 light-text text-center">All Tasks</h3>
                    <div className="m-3 text-center">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={taskData.tasks}
                            columns={columns}
                            bordered={false}
                            classes="light-text"
                            filter={filterFactory()}
                            filterPosition="top"
                            pagination={paginationFactory({
                                pageButtonRenderer,
                                sizePerPage: 20,
                                hideSizePerPage: true,
                                hidePageListOnlyOnePage: true
                            })}
                        />
                    </div>
                </Card>
            </div>
        </Card>
    );
}

function completedFormatter(cell, row, rowIndex) {
    return (
        <Form.Check />
    );
}

function pointsFormatter(cell, row, rowIndex) {
    switch (cell) {
        case 'easy':
            return 10;
        case 'medium':
            return 50;
        case 'hard':
            return 100;
        case 'elite':
            return 250;
        case 'master':
            return 500;
        default:
            return 0;
    };
}