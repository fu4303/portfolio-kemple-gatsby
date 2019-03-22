import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from '@emotion/styled'

const ProfilePic = styled(Image)`
  overflow: hidden;
  border-radius: 50%;
  margin-right: 24px;
`

const Container = styled(`div`)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Container>
            {/* <ProfilePic
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
            /> */}
            <p>
              Written by <strong>{author}</strong> who lives and works in
              Virginia Beach, VA.
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>
                You should follow him on Twitter
              </a>
            </p>
          </Container>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
