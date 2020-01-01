import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #f1f3f4;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Hind', sans-serif;
  font-weight: 400;
  /* border-radius: 20px; */
  padding: 10px;
  font-size: large;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  display: flex;
`

export const Tag = styled.span`
  float: left;
  background: #77b6ea;
  color: #69626d;
  border-radius: 5px;
  color: white;
  padding: 5px;
  margin: 0 5px 5px 0;
  letter-spacing: 1px;
  cursor: pointer;
`

export const Input = styled.input`
  background: #f1f3f4;
  border: none;
  /* border-radius: 3px; */
  outline: none;
  font-size: large;
  display: inline-block;
  flex: 1;
  color: #69626d;
  font-weight: 400;
  &::-webkit-input-placeholder {
    font-weight: 100;
    font-style: italic;
    color: #69626d;
  }
`

export const TagDelete = styled.span.attrs(props => ({
  'data-test': `tag-delete-${props.index}`,
}))`
  color: white;
  font-size: 1em;
  &:hover {
    color: gray;
  }
`

export const Select = styled.ul`
  list-style: none;
  margin: 0;
  background: #f1f3f4;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 45px;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;

  color: black;
  line-height: 25px;
  /* border: 1px #cfcfcf solid; */
  display: block;

  .item:hover {
    background: #bfbfbf;
  }

  li {
    list-style: none;
    padding: 0;
    margin: 2px 0 2px 10px;
  }
`
