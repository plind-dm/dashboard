import styled from 'styled-components'
import Switch from 'react-switch'
import { paletteColors } from '../../styles/colors'

const $NetworkSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  .react-switch-bg {
    border: 1px solid ${(props) => props.theme.palette.paleGrey};
  }
  .react-switch-handle {
    border: 1px solid ${(props) => props.theme.palette.palidPink} !important;
  }
`

interface SwitchComponentProps {
  onChange: () => void
  checked: boolean
}

export const SwitchComponent = ({ onChange, checked }: SwitchComponentProps): React.ReactElement => {
  return (
    <$NetworkSwitchContainer>
      <Switch
        onChange={onChange}
        checked={checked}
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        height={16}
        width={36}
        offColor={paletteColors.lightGrey}
        onColor={paletteColors.black}
        onHandleColor={paletteColors.pink}
        offHandleColor={paletteColors.pink}
        activeBoxShadow={'0 0 0 transparent'}
        className="network-switch"
      />
    </$NetworkSwitchContainer>
  )
}
