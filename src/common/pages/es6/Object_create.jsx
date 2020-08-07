import React from "react"
export default class Object_create extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    /*普通对象的继承------普通对象没有prototype属性*/
    let obj={
      name:"黎明",
      getName(){
        console.log(this.name);
      }
    };
    console.log(obj);
    let obj_new=Object.create(obj);
    console.log(obj_new);

  }

  render() {
    return(
      <div>
        Object_create
        <div>
          通过Object.create创建的对象（obj_new），会把源对象（obj）的属性 挂载到新对象的__pro__下面；

        </div>
      </div>
    )
  }
}

function Ff() {
  this.name="name1"
}
Ff.prototype.getName=function () {
  console.log(this.name);
}
function Cc(){
  this.height='12212'
}

function Dd(age){
  this.age=age;
  Ff.apply(this);//继承属性
  Cc.apply(this);//继承属性
}

Dd.prototype=Object.create(Ff.prototype);
Object.assign(Dd.prototype,Cc.prototype);// 实现多继承；
Dd.prototype.constructor=Dd;//继承方法
let dd=new Dd("1111");
// console.log(dd.name);
console.log(dd.getName());