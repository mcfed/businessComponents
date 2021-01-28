# Step 组件

## Usage

```jsx

    import {Step} from 'mcf-components';
    import FirstStep from "./firstStep";
    import SecondStep from "./secondStep";
    import ThirdStep from "./thirdStep";

    const steps = [
    {
        text: "第一步",
        description: "我是第一步",
        path: "first",
        component: FirstStep
    },
    {
        text: "第二步",
        description: "我是第二步",
        path: "second",
        component: SecondStep
    },
    {
        text: "第三步",
        description: "我是第三步",
        path: "third",
        component: ThirdStep
    }
    ];
    render(){
        return (
            <Step
                steps={steps}
                showCancel={true}
                cancelText="点击取消"
                // 传递router对象， 或者只传递localtion 和 push 方法
                {...props}
            />
        )
    }

    export withRouter(...)


    // firstep
    onSubmit = () => {
        if(true){
            // 跳转到第二步
            this.props.goToStep(2)
        }
    }

```

## Options

| 参数                    | 说明                       | 类型    | 默认值   |
| ----------------------- | -------------------------- | ------- | -------- |
| steps                   | 步骤组件数据               | array   | []       |
| showCancel              | 是否展示取消按钮           | boolean | true     |
| cancelText              | 取消按钮文字自定义         | string  | 取消     |
| finishText              | 最后一步完成按钮文字自定义 | string  | 完成     |
| showFinalLastStep       | 最后一步是否显示上一步按钮 | boolean | true     |
| finalSubmitFunctionName | 最后一步完成的响应方法名   | string  | onSubmit |
| backPath                | 取消按钮跳转的路由         | string  | /        |
