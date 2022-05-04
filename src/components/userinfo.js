import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";

const UserInfo = () => {

    const user = useSelector(state => state.user)
    let id = useParams().id
    if (id === null) {
        id = user.id
    }

    return (
        <div className='pageBody'>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="regFormUsername">
                    <Form.Label column sm="3">Имя пользователя:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" placeholder={user.username} name='username' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormName">
                    <Form.Label column sm="3">Ваше имя:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" placeholder={user.name} name='name' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormSurname">
                    <Form.Label column sm="3">Ваша фамилия:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" placeholder="Фамилия" name='surname' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormName">
                    <Form.Label column sm="3">Ваш телефон</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="tel" placeholder="+7 (999) 123-45-67" name='phone' pattern="\+[0-9]{1} \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" />
                        <Form.Text className="text-muted">
                            Формат номера телефона: +7 (999) 123-45-67
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormSex">
                    <Form.Label column sm="3">Ваш пол</Form.Label>
                    <Col sm="9">
                        <Form.Check disabled inline label="муж" name="sex" type='radio' id='manRadio' />
                        <Form.Check disabled inline label="жен" name="sex" type='radio' id='womanRadio' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormChurchStatus">
                    <Form.Label column sm="3">Отношение к МЦЦ</Form.Label>
                    <Col sm="9">
                        <Form.Check disabled label="ищущий (гость)" name="churchStatus" type='radio' id='guestStatus' />
                        <Form.Check disabled label="прихожанин (регулярно бываю)" name="churchStatus" type='radio' id='regularStatus' />
                        <Form.Check disabled label="член ценки (принял крещение либо готовлюсь)" name="churchStatus" type='radio' id='memberStatus' />
                        <Form.Check disabled label="служитель (принял крещение и активно тружусь)" name="churchStatus" type='radio' id='liderStatus' />
                    </Col>
                </Form.Group>

                <Button type="submit">Сохранить изменения</Button>

            </Form>
        </div>
    )
}


export default UserInfo