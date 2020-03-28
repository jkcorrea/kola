import {
  Link as ChakraLink,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/core'

import { CTA } from 'components/CTA'
import { Container } from 'components/Container'
import { Footer } from 'components/Footer'
import { Hero } from 'components/Hero'
import { Main } from 'components/Main'
import React from 'react'

const Index = () => (
  <Container height="100vh" paddingTop="40vh">
    <Hero />

    <Main>
      <Text>
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.
      </Text>

      <List spacing={3} my={0}>
        <ListItem>
          <ListIcon icon="check-circle" color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <Icon name="external-link" mx="2px" />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon icon="check-circle" color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <Icon name="external-link" mx="2px" />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <Footer>
      <Text>
        Next{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>{' '}
        Chakra
      </Text>
    </Footer>

    <CTA />
  </Container>
)

export default Index
