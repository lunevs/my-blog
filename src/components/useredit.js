import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import userService from '../services/user'
import { statusChange } from "../reducers/statusReducer";
import { useDispatch, useSelector } from "react-redux";

const UserEdit = () => {

    const dispatch = useDispatch()
    const id = useParams().id
    const currentUser = useSelector(state => state.user)

    const [validated, setValidated] = useState(false);
    const [editedUser, setEditedUser] = useState({
        username: '',
        name: '',
        surname: '',
        phone: '',
        sex: '',
        churchStatus: '',
        status: ''
    })
    const sexRadio = [
        {label: 'муж', value: 'man'},
        {label: 'жен', value: 'woman'}
    ]
    const churchStatusRadio = [
        {label: 'ищущий (гость)', value: 'guest'},
        {label: 'прихожанин (регулярно бываю)', value: 'regular'},
        {label: 'член Церкви (принял крещение либо готовлюсь)', value: 'member'},
        {label: 'служитель (принял крещение и активно тружусь)', value: 'lieder'}
    ]

    useEffect(() => {
        userService
            .getOne(id)
            .then(response => {
                setEditedUser(response)
                console.log('edited user:', response)
                return response
            })

    }, [])

    const saveUserHandler = async (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            const updatedUser = {
                username: event.target.username.value,
                name: event.target.name.value,
                surname: event.target.surname.value,
                phone: event.target.phone.value,
                sex: event.target.sex.value,
                churchStatus: event.target.churchStatus.value,
                status: event.target.status.value
            }

            try {
                await userService.update(id, updatedUser)
                dispatch(statusChange({message: `Пользователь ${updatedUser.username} успешно обновлен`, type: 'success'}))
                setTimeout(() => dispatch(statusChange({})), 3000)
                setValidated(false);

            } catch(e) {
                console.log('error', e)
                dispatch(statusChange({message: 'Ошибка обновления. Проверьте корректность полей. Попробуйте еще раз', type: 'danger'}))
                setTimeout(() => dispatch(statusChange({})), 5000)
                setValidated(true);
            }
        }
    }

    const removeUserHandler = () => {
        console.log('delete user:', id)
    }

    return (
        <div className='pageBody'>
            <Form noValidate validated={validated} onSubmit={saveUserHandler}>
                <Form.Group as={Row} className="mb-3" controlId="editFormUsername">
                    <Form.Label column sm="3">Имя пользователя:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" value={editedUser.username} name='username' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormName">
                    <Form.Label column sm="3">Ваше имя:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            value={editedUser.name}
                            name='name'
                            onChange={(e) => setEditedUser({...editedUser, name: e.currentTarget.value})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormSurname">
                    <Form.Label column sm="3">Ваша фамилия:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            value={editedUser.surname}
                            name='surname'
                            onChange={(e) => setEditedUser({...editedUser, surname: e.currentTarget.value})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormName">
                    <Form.Label column sm="3">Ваш телефон</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="tel"
                            value={editedUser.phone}
                            name='phone'
                            pattern="\+[0-9]{1} \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
                            onChange={(e) => setEditedUser({...editedUser, phone: e.currentTarget.value})}
                        />
                        <Form.Text className="text-muted">
                            Формат номера телефона: +7 (999) 123-45-67
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormSex">
                    <Form.Label column sm="3">Ваш пол</Form.Label>
                    <Col sm="9">
                        {sexRadio.map(el => (
                            <Form.Check
                                inline
                                key={el.value}
                                label={el.label}
                                name="sex"
                                type='radio'
                                id={`${el.value}Radio`}
                                value={el.value}
                                checked={editedUser.sex === el.value}
                                onChange={(e) => setEditedUser({...editedUser, sex: e.currentTarget.value})}
                            />
                        ))}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormChurchStatus">
                    <Form.Label column sm="3">Отношение к МЦЦ</Form.Label>
                    <Col sm="9">
                        {churchStatusRadio.map(el => (
                            <Form.Check
                                key={el.value}
                                label={el.label}
                                name="churchStatus"
                                type='radio'
                                id={`${el.value}Status`}
                                value={el.value}
                                checked={editedUser.churchStatus === el.value}
                                onChange={(e) => setEditedUser({...editedUser, churchStatus: e.currentTarget.value})}
                            />
                        ))}
                    </Col>
                </Form.Group>

                {
                    (currentUser.status && currentUser.status === 'admin')
                    ? <Form.Group as={Row} className="mb-3" controlId="editFormStatus">
                            <Form.Label column sm="3">Статус пользователя</Form.Label>
                            <Col sm="9">
                                <Form.Select
                                    name='status'
                                    value={editedUser.status}
                                    onChange={(e) => setEditedUser({...editedUser, status: e.currentTarget.value})}
                                >
                                    <option value='undefined' key='1'>...</option>
                                    <option value="new" key='2'>Необработанная заявка</option>
                                    <option value="normal" key='3'>Зарегистрированный пользователь</option>
                                    <option value="admin" key='4'>Администратор</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    :   <Form.Group as={Row} className="mb-3" controlId="editFormStatus">
                            <Form.Control
                                hidden={true}
                                type="text"
                                value={editedUser.status}
                                name='status'
                                onChange={(e) => setEditedUser({...editedUser, status: e.currentTarget.value})}
                            />
                        </Form.Group>

                }

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