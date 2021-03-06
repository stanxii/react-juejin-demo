import React, {Component} from 'react';

import searchIcon from '../../images/search.svg'
import searchFocusIcon from '../../images/search-focus.svg'

import style from './style.scss'

class Search extends Component {
  constructor(){
    super()
    this.state = {text: '', isFocus: false}
  }
  handleOnFocus() {
    this.setState({isFocus: true})
  }
  handleOnBlur() {
    this.setState({isFocus: false})
  }
  handleOnChange(event) {
    this.setState({text: event.target.value})
  }
  render() {
    return (
      <div className={style.search}>
        <form className={style.searchForm}>
          <div className={style['input-group']}>
            <input 
              type="text" 
              placeholder="搜索掘金" 
              value={this.state.text} 
              onBlur={this.handleOnBlur.bind(this)} 
              onFocus={this.handleOnFocus.bind(this)}
              onChange={this.handleOnChange.bind(this)}/>
            <span className={style["input-group-btn"]}>
              <img src={this.state.isFocus ? searchFocusIcon:searchIcon} alt="搜索"/>
            </span>
          </div>
        </form>
      </div>
    )
  }
}
export default Search