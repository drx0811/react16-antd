import React from 'react'
export default class KeLiHua extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidMount() {
    function isType(type) {
      return function (value) {
        return Object.prototype.toString.call(value)===`[object ${type}]`;
      }
    }
    isType("Array")([])
  }

  render() {
    return (
      <div>
        函数柯里化，就是把一个函数细分，
      </div>
    );
  }


}