import { Flex, PseudoBox, PseudoBoxProps } from '@chakra-ui/core'
import React from 'react'

type Props = {
  children?: React.ReactNode
}

export const ListItemContainer: React.FC<Props & PseudoBoxProps> = ({
  children,
  ...props
}) => (
  <PseudoBox py="8px" my="0" display="flex" alignItems="center" {...props}>
    <Flex w="100%" alignItems="center">
      {children}
    </Flex>
  </PseudoBox>
)
