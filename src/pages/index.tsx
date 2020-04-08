import { Editor } from 'components/Editor'
import { Layout } from 'components/Layout'
import { UiContainer } from 'containers/UiContainer'
import React from 'react'

const Index = () => (
  <Layout>
    <UiContainer.Provider>
      <Editor />
    </UiContainer.Provider>
  </Layout>
)

export default Index
