import React, {Component} from 'react'


class Activities extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div>我是动态啊</div>
    )
  }
}
export default Activities