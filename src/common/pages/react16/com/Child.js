import React from 'react';

class Child extends React.Component{
  static getDerivedStateFromProps(props, state) {
    if (props.list.length!==state.length) {
      return {
        list:props.list
      }
    }
    return null;
  }
  state={
    list:[
      {title:"1111",name:"11111"},
      {title:"2222",name:"2222"},
    ]
  }

  del=(ite)=>{
    this.props.callback(ite.name)
  }

  render() {
    const {list}=this.state;
    console.log(list);
    return (
      <div>
        {list.map(ite=>{
          return(
            <li onClick={()=>{this.del(ite)}}>{ite.name}</li>
          )
        })}
      </div>
    );
  }
}

export default Child;
