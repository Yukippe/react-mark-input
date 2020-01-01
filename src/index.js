import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import Input from './ReactMarkInput'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
//props
const sourceData = [
  'taibei',
  'tokyo',
  'tt',
  'tk',
  'tn',
  'tc',
  'ts',
  'tktktkt',
  'tjdnsds',
  'tk-in',
  'abd',
  'bcd',
  'cds',
  'ddd',
  'eop',
  'father',
  'hallo',
  'io',
  'jeap',
  'kapi',
  'loop',
  'mouse',
  'noise',
  'ooop',
  'people',
  'qaut',
  'react',
  'sass',
  'wto',
  'zero',
]
const onTagsChanged = value => {
  console.log(value)
}
const props = {
  sourceData,
  onTagsChanged,
}

render(
  <Container>
    <Input {...props} />
  </Container>,
  document.querySelector('#root')
)
