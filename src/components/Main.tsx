import { Stack, StackProps } from '@chakra-ui/core'

import React from 'react'

export const Main: React.FC<StackProps> = (props) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    pt="8rem"
    px="1rem"
    {...props}
  />
)
