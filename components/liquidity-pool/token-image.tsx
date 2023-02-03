import { StakedToken, StakingToken } from '../../types'
import { useEffect, useState } from 'react'
import { getImageSrc } from '../../utils/transactions.utils'
import Image from 'next/image'
import { $TokenImage } from './pool-element'
import dummyImage from '../../public/images/test/dummy-image.svg'

interface TokenImageProps {
  place: number
  token: StakingToken | StakedToken
  size?: number
  mobileSize?: number
}

export const TokenImage = ({ size, mobileSize, token, place }: TokenImageProps): React.ReactElement => {
  const [imageSrc, setImageSrc] = useState('/images/test/dummy-image.svg')

  const imageGetter = async (interestToken?: StakingToken): Promise<void> => {
    let imageReturned = imageSrc
    try {
      interestToken
        ? (imageReturned = await getImageSrc(interestToken.network, interestToken.address))
        : (imageReturned = await getImageSrc(token.network, token.address))
      setImageSrc(imageReturned)
    } catch (e) {
      console.log(e)
      setImageSrc(dummyImage)
    }
  }

  useEffect(() => {
    token.type === 'interest-bearing' ? token.tokens?.map((element) => imageGetter(element)) : imageGetter()
  }, [])
  return (
    <$TokenImage key={token.address} place={place} size={size} mobileSize={mobileSize}>
      <Image src={imageSrc} layout="fill" />
    </$TokenImage>
  )
}
