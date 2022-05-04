import React from 'react'
import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { statusChange } from "../reducers/statusReducer";
import { useDispatch } from "react-redux";
import userService from '../services/user'

const RegPage = () => {

    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch()

    const regFormSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            const newUser = {
                username: event.target.username.value,
                password: event.target.password.value,
                name: event.target.name.value,
                surname: event.target.surname.value,
                phone: event.target.phone.value,
                sex: event.target.sex.value,
                churchStatus: event.target.churchStatus.value
            }
            console.log(newUser)
            //document.getElementById('regForm').reset()

            try {
                const user = await userService.register(newUser)
                dispatch(statusChange({message: `Пользователь ${user.username} успешно зарегистрирован`, type: 'success'}))
                setTimeout(() => dispatch(statusChange({})), 3000)

                setValidated(false);
                event.target.reset()

            } catch(e) {
                console.log('error', e)
                dispatch(statusChange({message: 'Этот Username уже занят. Попробуйте еще раз', type: 'danger'}))
                setTimeout(() => dispatch(statusChange({})), 5000)

                setValidated(true);
            }

        }
    }

    return (
        <div className='pageBody'>
            <Form noValidate validated={validated} onSubmit={regFormSubmit} id="regForm">
                <Form.Group as={Row} className="mb-3" controlId="regFormUsername">
                    <Form.Label column sm="3">Имя пользователя:</Form.Label>
                    <Col sm="9">
                        <Form.Control required type="text" placeholder="Login" name='username' />
                        <Form.Text className="text-muted">
                            Имя пользователя состоит из латинских букв
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormPassword">
                    <Form.Label column sm="3">Пароль:</Form.Label>
                    <Col sm="9">
                        <Form.Control required type="text" placeholder="Password" name='password' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormName">
                    <Form.Label column sm="3">Ваше имя:</Form.Label>
                    <Col sm="9">
                        <Form.Control required type="text" placeholder="Имя" name='name' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormSurname">
                    <Form.Label column sm="3">Ваша фамилия:</Form.Label>
                    <Col sm="9">
                        <Form.Control required type="text" placeholder="Фамилия" name='surname' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormName">
                    <Form.Label column sm="3">Ваш телефон</Form.Label>
                    <Col sm="9">
                       <Form.Control required type="tel" placeholder="+7 (999) 123-45-67" name='phone' pattern="\+[0-9]{1} \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" />
                        <Form.Text className="text-muted">
                            Формат номера телефона: +7 (999) 123-45-67
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormSex">
                    <Form.Label column sm="3">Ваш пол</Form.Label>
                    <Col sm="9">
                        <Form.Check required inline label="муж" name="sex" type='radio' id='manRadio' value='man' />
                        <Form.Check required inline label="жен" name="sex" type='radio' id='womanRadio' value='woman' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormChurchStatus">
                    <Form.Label column sm="3">Отношение к МЦЦ</Form.Label>
                    <Col sm="9">
                        <Form.Check required label="ищущий (гость)" name="churchStatus" type='radio' id='guestStatus' value='guest' />
                        <Form.Check required label="прихожанин (регулярно бываю)" name="churchStatus" type='radio' id='regularStatus' value='regular' />
                        <Form.Check required label="член ценки (принял крещение либо готовлюсь)" name="churchStatus" type='radio' id='memberStatus' value='member' />
                        <Form.Check required label="служитель (принял крещение и активно тружусь)" name="churchStatus" type='radio' id='liederStatus' value='lieder' />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Согласен с условиями хранения и обработки моих персональных данных"
                        feedback="Вам необходимо дать свое согласие"
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Зарегистрироваться</Button>

            </Form>
        </div>
    )
}

export default RegPage

