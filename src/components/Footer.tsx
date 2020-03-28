import { Flex, FlexProps } from '@chakra-ui/core'

import React from 'react'

export const Footer: React.FC<FlexProps> = (props) => (
  <Flex as="footer" py="8rem" {...props} />
)
