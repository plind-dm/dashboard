import styled from 'styled-components'

const $Checkbox = styled.input`
  /* input[type='checkbox'] {} => It's for when you are targeting a children*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* create custom checkbox appearance */
  display: inline-block;
  width: 25px;
  height: 25px;
  padding: 6px;
  /* background-color only for content */
  background-clip: content-box;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  background-color: #e7e6e7;
  margin-left: 15px;
  margin-right: 15px;

  &:checked {
    background-color: #ff0000;
  }

  &:focus {
    outline: none !important;
  }
`

interface CustomCheckboxPropsInterface {
  children: React.ReactText
}

export const CustomCheckbox = ({ children }: CustomCheckboxPropsInterface): React.ReactElement => {
  return <$Checkbox type={'checkbox'}>{children}</$Checkbox>
}
