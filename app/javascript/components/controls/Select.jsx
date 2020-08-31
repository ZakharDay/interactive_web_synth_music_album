import classnames from 'classnames'
import React, { PureComponent } from 'react'
import Button from './Button'

export default class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      opened: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  handleClick() {
    this.setState({
      opened: !this.state.opened
    })
  }

  handleOptionClick(name, property, option) {
    let { handleValueChange } = this.props
    this.handleClick()
    handleValueChange(name, property, option)
  }

  renderOptions() {
    let { name, property, set, value } = this.props
    let options = []

    set.forEach((option, i) => {
      options.push(
        <Button
          name={name}
          property={property}
          option={option}
          current={value}
          handleClick={this.handleOptionClick}
          key={i}
        />
      )
    })

    return (
      <div className="options">
        <div className="wrapper">{options}</div>
      </div>
    )
  }

  render() {
    const { value } = this.props
    const { opened } = this.state

    const classes = classnames({
      Select: true,
      opened: opened
    })

    return (
      <div className={classes}>
        <div className="current" onClick={this.handleClick}>
          {value}
        </div>

        {opened ? this.renderOptions() : ''}
      </div>
    )
  }
}
