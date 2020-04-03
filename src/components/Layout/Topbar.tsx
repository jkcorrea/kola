import { Box, Flex, Heading, Icon, Link } from '@chakra-ui/core'

import React from 'react'

const topBorderPx = 3

export const Topbar: React.FC = () => {
  return (
    <Flex
      h="60px"
      w="100%"
      py="8px"
      flexDirection="column"
      justifyContent="center"
      bg="black"
      color="white"
      borderTop={`${topBorderPx}px solid`}
      borderTopColor="primary"
      zIndex={9999}
    >
      <Box maxW="1400px" mt={`${-topBorderPx}px`} p="0 20px">
        <Flex
          as="header"
          pos="relative"
          flexWrap="nowrap"
          flexDir="row"
          textAlign="left"
        >
          <Link
            href="/"
            alignItems="center"
            border={0}
            color="white"
            display="flex"
            flexDir="row"
            flexWrap="nowrap"
            height="34px"
            _hover={{ textDecor: 'none' }}
            zIndex={10000}
          >
            <Icon h="100%" mr="5px" name="logo" w="auto" />
            <Heading
              as="h2"
              m="0"
              pos="relative"
              size="lg"
              display="block"
              lineHeight="18px"
              zIndex={9999}
            >
              Kola
            </Heading>
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}
