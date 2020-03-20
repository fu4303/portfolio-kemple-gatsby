import React from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import styled from '@emotion/styled'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const Post = props => {
  const { post, background, previous, next } = props
  const HeaderStyles = styled.div`
    & a {
      background: ${background};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: underline;
    }
  `

  return (
    <HeaderStyles>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <h1
        style={
          {
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'flex-start',
          }
        }
      >
        {post.frontmatter.bloomed ? (
          <span
            style={{
              marginBottom: '16px',
              fontSize: '24px',
              background: `${background}`,
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            title="This post has fully bloomed"
          >
            <span
              style={{
                borderRadius: '50%',
                background: 'white',
                width: '38px',
                height: '38px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '2px',
              }}
            >
              {' 🌸'}
            </span>
          </span>
        ) : (
          <span
            style={{
              marginBottom: '16px',
              fontSize: '24px',
              background: `${background}`,
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            title="This post is still growing"
          >
            <span
              style={{
                borderRadius: '50%',
                background: 'white',
                width: '38px',
                height: '38px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '2px',
              }}
            >
              {' 🌱'}
            </span>
          </span>
        )}
        {post.frontmatter.title}
      </h1>
      <MDXRenderer>{post.code.body}</MDXRenderer>
      <hr
        style={{
          background,
        }}
      />
      <Bio background={background} />
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {previous && (
          <li>
            <Link
              style={{
                background,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              to={previous.fields.slug}
              rel="prev"
            >
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link
              style={{
                background,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              to={next.fields.slug}
              rel="next"
            >
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    </HeaderStyles>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Post post={post} previous={previous} next={next} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        bloomed
      }
      code {
        body
      }
    }
  }
`
