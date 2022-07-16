import React from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'isomorphic-dompurify'
import 'highlight.js/styles/github-dark-dimmed.css'
import { Box, Code, createStyles } from '@mantine/core'

import { ICreatePost } from 'components/atoms/post'

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: (code: string, lang: string) => {
    return hljs.highlightAuto(code, [lang]).value
  },
})

const useStyles = createStyles((theme) => ({
  background: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '20px',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
  contentBox: {
    padding: '0 5px',
    overflowX: 'auto',
  },
}))

interface IProps {
  data: ICreatePost[]
}

export const SingleSectionRender: React.FC<{ data: string }> = ({ data }) => {
  return (
    <Box style={{ padding: '0 5px', overflowX: 'auto' }}>
      <Box
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(data)),
        }}
      />
    </Box>
  )
}

const ShowRender: React.FC<IProps> = ({ data }) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.background}>
      {data.map((section) => {
        const render = (
          <Box
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(section.content || '')),
            }}
          />
        )

        if (section?.type === 'code') {
          return (
            <Code
              key={section.id}
              style={{
                padding: '10px 5px',
                marginTop: '10px',
                marginBottom: '10p',
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'auto',
              }}
            >
              {render}
            </Code>
          )
        } else if (section?.type === 'text') {
          return (
            <Box key={section.id} className={classes.contentBox}>
              {render}
            </Box>
          )
        } else return null
      })}
    </Box>
  )
}

export default ShowRender
