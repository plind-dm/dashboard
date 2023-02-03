import { useMediaQuery } from 'react-responsive'

export type DeviceType = 'mobile' | 'desktop' | 'desktopXL'

const dimensions = {
  mobile: '768px',
  desktop: '1280px',
  desktopXL: '1536px'
}

const mobileQuery = `(min-width: ${dimensions.mobile})`
const desktopQuery = `(min-width: ${dimensions.desktop})`
const desktopXLQuery = `(min-width: ${dimensions.desktopXL})`

const devices: Map<DeviceType, string> = new Map()
devices.set('mobile', mobileQuery)
devices.set('desktop', desktopQuery)
devices.set('desktopXL', desktopXLQuery)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useDevices = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 })

  const isDesktop = useMediaQuery({
    query: devices.get('desktop')
  })

  const isDesktopXL = useMediaQuery({
    query: devices.get('desktopXL')
  })

  return {
    isMobile,
    isDesktop,
    isDesktopXL
  }
}

export { useDevices }
