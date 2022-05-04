import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import userService from '../services/user'

const UserEdit = () => {

    const id = useParams().id
    const [editedUser, setEditedUser] = useState({})

    useEffect(() => {
        userService
            .getOne(id)
            .then(response => {
                setEditedUser(response)
                console.log('edited user:', response)
                return response
            })

    }, [])

    const saveUserHandler = (event) => {
        event.preventDefault()
        console.log('save user:', event.target)
    }

    const removeUserHandler = () => {
        console.log('delete user:', id)
    }

    return (
        <div className='pageBody'>
            <Form onSubmit={saveUserHandler}>
                <Form.Control hidden type="text" name='id' value={editedUser.id} />
                <Form.Group as={Row} className="mb-3" controlId="editFormUsername">
                    <Form.Label column sm="3">Имя пользователя:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" value={editedUser.username} name='username' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormName">
                    <Form.Label column sm="3">Ваше имя:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={editedUser.name} name='name' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormSurname">
                    <Form.Label column sm="3">Ваша фамилия:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={editedUser.surname} name='surname' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormName">
                    <Form.Label column sm="3">Ваш телефон</Form.Label>
                    <Col sm="9">
                        <Form.Control type="tel" value={editedUser.phone} name='phone' pattern="\+[0-9]{1} \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" />
                        <Form.Text className="text-muted">
                            Формат номера телефона: +7 (999) 123-45-67
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormSex">
                    <Form.Label column sm="3">Ваш пол</Form.Label>
                    <Col sm="9">
                        <Form.Check inline label="муж" name="sex" type='radio' id='manRadio' checked={editedUser.sex === 'man'} />
                        <Form.Check inline label="жен" name="sex" type='radio' id='womanRadio' checked={editedUser.sex === 'woman'} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormChurchStatus">
                    <Form.Label column sm="3">Отношение к МЦЦ</Form.Label>
                    <Col sm="9">
                        <Form.Check
                            label="ищущий (гость)"
                            name="churchStatus"
                            type='radio'
                            id='guestStatus'
                            checked={editedUser.churchStatus === 'guest'}
                        />
                        <Form.Check
                            label="прихожанин (регулярно бываю)"
                            name="churchStatus"
                            type='radio'
                            id='regularStatus'
                            checked={editedUser.churchStatus === 'regular'}
                        />
                        <Form.Check
                            label="член ценки (принял крещение либо готовлюсь)"
                            name="churchStatus"
                            type='radio'
                            id='memberStatus'
                            checked={editedUser.churchStatus === 'member'}
                        />
                        <Form.Check
                            label="служитель (принял крещение и активно тружусь)"
                            name="churchStatus"
                            type='radio'
                            id='liederStatus'
                            checked={editedUser.churchStatus === 'lieder'}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormStatus">
                    <Form.Label column sm="3">Статус пользователя</Form.Label>
                    <Col sm="9">
                        <Form.Select aria-label="Default select example">
                            <option>...</option>
                            <option value="new" selected={editedUser.status === 'new'}>Необработанная заявка</option>
                            <option value="normal" selected={editedUser.status === 'normal'}>Зарегистрированный пользователь</option>
                            <option value="admin" selected={editedUser.status === 'admin'}>Администратор</option>
                        </Form.Select>                    </Col>
                </Form.Group>

                <Button variant="primary" size="sm" type='submit'>
                    Сохранить изменения
                </Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={removeUserHandler}>
                    Удалить пользователя
                </Button>

            </Form>
        </div>
    )
}


export default UserEdit