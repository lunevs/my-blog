import React from 'react'
import { loginUser } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()
        const reqUser = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        dispatch(loginUser(reqUser))
    }

    return (
        <div className='pageBody'>
            <Card>
                <Card.Header>Для доступа необходима авторизация</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control type="text" id='username' placeholder="Укажите имя пользователя" name='username' />
                            <Form.Text className="text-muted">
                                Имя пользователя состоит из латинских букв
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" id='password' placeholder="Password" name='password' />
                        </Form.Group>

                        <Button variant='primary' id='login-button' type='submit'>Войти</Button>
                    </Form>
                    <br />
                    <br />
                    <Card.Text>
                        Если у вас еще нет логина и пароля в систему, то вам необходимо пройти регистрацию.
                        Для этого вам необходимо заполнить регистрационную форму по ссылке ниже.
                        Затем Администратор подтвердит форму и активизирует вашу учетную запись.
                        Это позволит вам получить доступ к сервисам в системе.
                    </Card.Text>
                    <Card.Link href='/reg'>Зарегистрироваться</Card.Link>
                </Card.Body>
            </Card>


        </div>
    )
}

export default LoginForm