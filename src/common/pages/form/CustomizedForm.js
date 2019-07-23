import { Form, Input } from 'antd';

const Demo = Form.create({
    name: 'global_state',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.username.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
            <Form.Item label="Username">
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Username is required!' }],
                })(<Input />)}
            </Form.Item>
        </Form>
    );
});

export default class CustomizedForm extends React.Component {
    state = {
        fields: {
            username: {
                value: 'benjycui',
            },
        },
    };

    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({//setState接收一个函数
            fields: { ...fields, ...changedFields },
        }));
    }

    render() {
        const fields = this.state.fields;
        return (
            <div>
                <Demo {...fields} onChange={this.handleFormChange} />
                <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
            </div>
        );
    }
}