import styled from 'styled-components'

const $Spinner = styled.div<LoaderProps>`
  display: inline-block;
  position: relative;
  min-width: ${(props) => (props.size ? 80 * props.size : 80)}px;
  min-height: ${(props) => (props.size ? 80 * props.size : 80)}px;
  > div {
    position: absolute;
    min-width: ${(props) => (props.size ? 6 * props.size : 6)}px;
    min-height: ${(props) => (props.size ? 6 * props.size : 6)}px;
    background: ${(props) => (props.color ? props.color : props.theme.palette.pink)};
    border-radius: 50%;
    animation: 'lds-default' 1.2s linear infinite;
  }
  > #first-dot {
    animation-delay: 0s;
    top: ${(props) => (props.size ? 37 * props.size : 37)}px;
    left: ${(props) => (props.size ? 66 * props.size : 66)}px;
  }
  > #second-dot {
    animation-delay: -0.1s;
    top: ${(props) => (props.size ? 22 * props.size : 22)}px;
    left: ${(props) => (props.size ? 62 * props.size : 62)}px;
  }
  > #third-dot {
    animation-delay: -0.2s;
    top: ${(props) => (props.size ? 11 * props.size : 11)}px;
    left: ${(props) => (props.size ? 52 * props.size : 52)}px;
  }
  > #fourth-dot {
    animation-delay: -0.3s;
    top: ${(props) => (props.size ? 7 * props.size : 7)}px;
    left: ${(props) => (props.size ? 37 * props.size : 37)}px;
  }
  > #fifth-dot {
    animation-delay: -0.4s;
    top: ${(props) => (props.size ? 11 * props.size : 11)}px;
    left: ${(props) => (props.size ? 22 * props.size : 22)}px;
  }
  > #sixth-dot {
    animation-delay: -0.5s;
    top: ${(props) => (props.size ? 22 * props.size : 22)}px;
    left: ${(props) => (props.size ? 11 * props.size : 11)}px;
  }
  > #seventh-dot {
    animation-delay: -0.6s;
    top: ${(props) => (props.size ? 37 * props.size : 37)}px;
    left: ${(props) => (props.size ? 7 * props.size : 7)}px;
  }
  > #eight-dot {
    animation-delay: -0.7s;
    top: ${(props) => (props.size ? 52 * props.size : 52)}px;
    left: ${(props) => (props.size ? 11 * props.size : 11)}px;
  }
  > #nine-dot {
    animation-delay: -0.8s;
    top: ${(props) => (props.size ? 62 * props.size : 62)}px;
    left: ${(props) => (props.size ? 22 * props.size : 22)}px;
  }
  > #tenth-dot {
    animation-delay: -0.9s;
    top: ${(props) => (props.size ? 66 * props.size : 66)}px;
    left: ${(props) => (props.size ? 37 * props.size : 37)}px;
  }
  > #eleventh-dot {
    animation-delay: -1s;
    top: ${(props) => (props.size ? 62 * props.size : 62)}px;
    left: ${(props) => (props.size ? 52 * props.size : 52)}px;
  }
  > #twelve-dot {
    animation-delay: -1.1s;
    top: ${(props) => (props.size ? 52 * props.size : 52)}px;
    left: ${(props) => (props.size ? 62 * props.size : 62)}px;
  }
  @keyframes lds-default {
    0%,
    100% {
      transform: scale(0.5);
      filter: opacity(0);
    }
    10% {
      transform: scale(1.5);
      filter: opacity(100%);
    }
  }
`

interface LoaderProps {
  size?: number
  color?: string
}

export const Loader = ({ size, color }: LoaderProps): React.ReactElement => {
  return (
    <$Spinner className="lds-default" size={size} color={color}>
      <div id="first-dot" />
      <div id="second-dot" />
      <div id="third-dot" />
      <div id="fourth-dot" />
      <div id="fifth-dot" />
      <div id="sixth-dot" />
      <div id="seventh-dot" />
      <div id="eight-dot" />
      <div id="nine-dot" />
      <div id="tenth-dot" />
      <div id="eleventh-dot" />
      <div id="twelve-dot" />
    </$Spinner>
  )
}
