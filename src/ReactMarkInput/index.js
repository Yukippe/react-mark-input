import React, { Component } from 'react'
import PropTypes from 'proptypes'
import { Input, Tag, TagDelete, Wrapper, Select } from './style'
import styled from 'styled-components'

export default class AutoMarkInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sourceData: props.sourceData,
      inputValue: '',
      blocked: false,
      selectedTags: [],
      selectItems: [],
    }
    this.input = React.createRef()
  }
  componentDidMount() {
    this.focusInput()
  }

  onClickSelectItem = value => {
    const { onTagsChanged } = this.props
    const addTag = () => {
      this.setState(
        state => ({
          selectedTags: [
            ...state.selectedTags,
            {
              index: state.selectedTags.length + 1,
              displayValue: value,
            },
          ],
        }),
        () => {
          const { selectedTags } = this.state

          this.clearInput()
          onTagsChanged(selectedTags)
        }
      )
    }
    addTag()
  }

  onInputKeyDown = e => {
    const { onTagsChanged } = this.props
    const deleteLastTag = () => {
      this.setState(
        state => ({
          selectedTags: state.selectedTags.splice(
            0,
            state.selectedTags.length - 1
          ),
        }),
        () => {
          const { selectedTags } = this.state
          onTagsChanged(selectedTags)
        }
      )
    }

    if (e.key === 'Backspace' && e.target.selectionStart === 0) {
      deleteLastTag()
    }
  }

  clearInput = () => {
    this.setState({
      inputValue: '',
      selectItems: [],
    })
  }

  focusInput = () => {
    this.input.focus()
  }

  onInputChanged = e => {
    const { value } = e.target
    if (value.length <= 0) {
      this.setState({
        selectItems: [],
        blocked: false,
        inputValue: value,
      })
      return
    }
    const selectItems = this.state.sourceData.filter(
      item => item.indexOf(value) === 0
    )
    this.setState({
      inputValue: selectItems.length > 0 ? value : this.state.inputValue,
      selectItems:
        selectItems.length > 0 ? selectItems : this.state.selectItems,
    })
  }

  renderSelect = () => {
    const { selectItems } = this.state
    return selectItems.length > 0 ? (
      <Select>
        {selectItems.map((item, index) => (
          <li
            className='item'
            key={`item${index}`}
            onClick={() => this.onClickSelectItem(item)}>
            {item}
          </li>
        ))}
      </Select>
    ) : null
  }

  removeTag = index => {
    this.setState(
      state => ({
        selectedTags: state.selectedTags.filter(tag => tag.index !== index),
      }),
      () => {
        const { selectedTags } = this.state
        const { onTagsChanged } = this.props
        onTagsChanged(selectedTags)
      }
    )
  }

  renderTags = () => {
    const { selectedTags } = this.state
    const TagComponent = this.getTagStyledComponent()
    const Delete = this.getTagDeleteComponent()
    const DeleteIcon = this.getDeleteIcon()

    return selectedTags.length > 0
      ? selectedTags.map((tag, index) => (
          <TagComponent key={index}>
            {tag.displayValue}
            <Delete index={tag.index} onClick={() => this.removeTag(tag.index)}>
              {DeleteIcon}
            </Delete>
          </TagComponent>
        ))
      : null
  }

  renderPlaceholder = () => {
    const { selectedTags } = this.state
    const { placeholder, hideInputPlaceholderTextIfTagsPresent } = this.props

    return hideInputPlaceholderTextIfTagsPresent && selectedTags.length > 0
      ? null
      : placeholder
  }

  getDeleteIcon = () => {
    const { tagDeleteIcon } = this.props
    return tagDeleteIcon || ' x'
  }

  getTagDeleteComponent = () => {
    const { tagDeleteStyle } = this.props

    return tagDeleteStyle
      ? styled(TagDelete)`
          ${tagDeleteStyle}
        `
      : TagDelete
  }

  getTagStyledComponent = () => {
    const { tagStyle } = this.props

    return tagStyle
      ? styled(Tag)`
          ${tagStyle}
        `
      : Tag
  }

  render() {
    const { inputStyle, wrapperStyle } = this.props
    const InputWrapper = wrapperStyle
      ? styled(Wrapper)`
          ${wrapperStyle}
        `
      : Wrapper
    const InputComponent = inputStyle
      ? styled(Input)`
          ${inputStyle}
        `
      : Input
    return (
      <InputWrapper onClick={this.focusInput}>
        {this.renderTags()}
        <InputComponent
          ref={el => (this.input = el)}
          onChange={this.onInputChanged}
          value={this.state.inputValue}
          placeholder={this.renderPlaceholder()}
          type='text'
          onKeyUp={this.onInputKeyUp}
          onKeyDown={this.onInputKeyDown}
        />
        {this.renderSelect()}
      </InputWrapper>
    )
  }
}
