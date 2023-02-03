import { createGlobalStyle } from 'styled-components'
import { Devices } from './constants/devices'

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Neuzeit Grotesk';
			src: url('/fonts/neuzeit-grotesk/NeuzeitGro-Lig.ttf') format('truetype');
			font-weight: 300;
			font-style: normal;
		}
	@font-face {
		font-family: 'Neuzeit Grotesk';
		src: url('/fonts/neuzeit-grotesk/NeuzeitGro-Reg.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'Neuzeit Grotesk';
		src: url('/fonts/neuzeit-grotesk/NeuzeitGro-Bol.ttf') format('truetype');
		font-weight: bold;
		font-style: normal;
	}
	@font-face {
		font-family: 'Neuzeit Grotesk';
		src: url('/fonts/neuzeit-grotesk/NeuzeitGroExt-Bla.ttf') format('truetype');
		font-weight: 500;
		font-style: normal;
	}
	@font-face {
		font-family: 'Neuzeit Grotesk';
		src: url('/fonts/neuzeit-grotesk/NeuzeitGroCon-Bla.ttf') format('truetype');
		font-weight: 600;
		font-style: normal;
	}
	@font-face {
		font-family: 'Neuzeit Grotesk';
		src: url('/fonts/neuzeit-grotesk/NeuzeitGro-Bla.ttf') format('truetype');
		font-weight: 900;
		font-style: normal;
	}
	@font-face {
		font-family: 'Montserrat';
		src: url('/fonts/montserrat/Montserrat-Regular.ttf') format('truetype');
		font-weight: 700;
		font-style: normal;
	}

	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		margin: 0 auto;
		@media ${Devices.laptop}{
			margin: auto;
			position: relative;
		}
	}

	body {
		color: ${(props) => props.theme.dark.text};
		background-color:${(props) => props.theme.dark.background};
		padding: 0;
		margin: auto;
		font-family: 'Neuzeit Grotesk', 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
			Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		font-size: 16px;
		max-width: 1440px;
    }

	a {
		color: inherit;
		text-decoration: none;
		width: inherit;
	}

	img {
		max-width: 100%;
	}
	
	pre{
		font-family: 'Neuzeit Grotesk';
		font-weight: 900;
		font-style: normal;
		font-size: .9rem;
		line-height: 1rem;
	}

	p{
		font-family: 'Neuzeit Grotesk';
		font-weight: 900;
		font-style: normal;
		font-size: .9rem;
		line-height: 1rem;
	}
	
	
	a{
		font-family: 'Neuzeit Grotesk';
		font-weight: 900;
		font-style: normal;
		font-size: .9rem;
		line-height: 1rem;
	}

	// CSS Variables
	:root {
	}

	.__react_component_tooltip.show {
		max-width: 275px;
		background-color: ${(props) => props.theme.palette.defaultGrey};
		padding: 10px 20px;
		border-radius: 8px;
		line-height: 13.92px;
		font-weight: 400;
		font-size: 12px;
	}	


	.bn-onboard-custom .bn-onboard-modal-content {
    background-color: ${({ theme }) => theme.palette.background};
    border: ${({ theme }) => theme.palette.primary};
    height: fit-content;
		& h3, span, p, div, a{
			font-family: 'Neuzeit Grotesk' !important;
		}
		& p {
			font-style: 900 !important;
			font-size: 1rem !important;
			line-height: 1.375rem !important;
			@media ${Devices.laptop} {
				font-size: 1.1rem !important;
				line-height: 1.725rem !important;
			}
		}
  }

`

export default GlobalStyle
