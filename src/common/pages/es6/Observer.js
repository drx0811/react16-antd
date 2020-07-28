import React from 'react'
export default class ObserverObj extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        发布订阅
      </div>
    );
  }
}
class Observer {
  constructor(name) {
    this.name=name;
  }
  updata(baby){
    console.log(this.name+"你好，我店里新来好茶"+baby.state);
  }
}
class Subject {
  constructor(name,num) {
    this.observers=[];
    this.name=name;
    this.state=num
  }
  attach(obj){
    console.log('新来---->'+obj.name);
    this.observers.push(obj)
  }
  setState(newState){
    console.log('来新货了！');
    this.state=newState;
    this.observers.forEach(o=>o.updata(this))
  }
}
let observer1=new Observer('小明')
let observer2 =new Observer('小龙')
let subjectObj=new Subject('本店开张',0)
subjectObj.attach(observer1);
subjectObj.attach(observer2);
subjectObj.setState(100);