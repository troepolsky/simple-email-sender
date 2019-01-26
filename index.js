import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form, Icon, Input, Button, Alert
} from 'antd';
import * as emailjs from 'emailjs-com';

class App extends React.Component {
    sendEmail(values){
        emailjs.send(
            "gmail",
            "template_MUwOM7s0",
            {
                "email":values.email,
                "name":values.name,
                "message":values.message,
                "ejs_dashboard__test_template":true
            },
            "user_s7axissKdemENUL9Zkvv8"
        )
        .then(function(response){
            ReactDOM.render(
                <Alert message="Email Sent" type="success" />,
                document.getElementById('msg')
            );

        }, function (err){
            console.log(err);
            ReactDOM.render(
                <Alert message="Oops" type="error" />,
                document.getElementById('msg')
            );
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ReactDOM.render(
                    <Alert message="Processing..." type="info" />,
                    document.getElementById('msg')
                );
                this.sendEmail(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input receipient\'s name!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type: 'email', message: 'Please input valid email!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input the message!' }],
                    })(
                        <TextArea rows={6} placeholder="Message" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(App);
ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));