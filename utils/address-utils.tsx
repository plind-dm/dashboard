export const parseAddress = (walletAddress: string): string => {
  return walletAddress.substring(5, 0) + '...' + walletAddress.substring(walletAddress.length - 4)
}
