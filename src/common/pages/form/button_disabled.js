import React from 'react';
import { } from 'antd';
import { Link } from 'react-router'
import {
    Form, Icon, Input, Button,Row,Col
} from 'antd';

function hasErrors(fieldsError) {
    console.log(fieldsError)//当有错误的时候fieldsError才会有数据，
    return Object.keys(fieldsError).some(field => fieldsError[field]);//3,当表单数据有都有的时候，也就是灭有错误，也就是该函数只会返回false
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();//1，获取表单数据的方法自动执行，去判断所有输入框
        console.log(this.props.location.state)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Row style={{paddingTop:200}} type="flex" justify="center" align="cent">
                    <Form.Item
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                    >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}//2,自动获取表单数据后，立即执行该函数获取错误的表单数据
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        );
    }
}
const button_disabled = Form.create()(HorizontalLoginForm);
export  default  button_disabled

