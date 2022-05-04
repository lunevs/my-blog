import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const UserEdit = (user) => {

    const saveUserHandler = (event) => {
        event.preventDefault()
        console.log('save user:', event.target)
    }

    return (
        <div className='pageBody'>
            <Form onSubmit={saveUserHandler}>
                <Form.Control hidden type="text" name='id' value={user.id} />
                <Form.Group as={Row} className="mb-3" controlId="editFormUsername">
                    <Form.Label column sm="3">Имя пользователя:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" placeholder={user.username} name='username' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormName">
                    <Form.Label column sm="3">Ваше имя:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder={user.name} name='name' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormSurname">
                    <Form.Label column sm="3">Ваша фамилия:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder="Фамилия" name='surname' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormName">
                    <Form.Label column sm="3">Ваш телефон</Form.Label>
                    <Col sm="9">
                        <Form.Control type="tel" placeholder="+7 (999) 123-45-67" name='phone' pattern="\+[0-9]{1} \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" />
                        <Form.Text className="text-muted">
                            Формат номера телефона: +7 (999) 123-45-67
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormSex">
                    <Form.Label column sm="3">Ваш пол</Form.Label>
                    <Col sm="9">
                        <Form.Check inline label="муж" name="sex" type='radio' id='manRadio' />
                        <Form.Check inline label="жен" name="sex" type='radio' id='womanRadio' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="editFormChurchStatus">
                    <Form.Label column sm="3">Отношение к МЦЦ</Form.Label>
                    <Col sm="9">
                        <Form.Check label="ищущий (гость)" name="churchStatus" type='radio' id='guestStatus' />
                        <Form.Check label="прихожанин (регулярно бываю)" name="churchStatus" type='radio' id='regularStatus' />
                        <Form.Check label="член ценки (принял крещение либо готовлюсь)" name="churchStatus" type='radio' id='memberStatus' />
                        <Form.Check label="служитель (принял крещение и активно тружусь)" name="churchStatus" type='radio' id='liderStatus' />
                    </Col>
                </Form.Group>

                <Button type="submit">Сохранить изменения</Button>

            </Form>
        </div>
    )
}


export default UserEdit