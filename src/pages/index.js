import React from 'react'
import { graphql } from 'gatsby'
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
} from '../components'

const HomePage = ({data}) => {
  const {
    allAirtable:{nodes:projects},
    customers:{nodes}
  } = data;
  return (
    <Layout>
      <Hero />
      <About />
      <GridProjects projects={projects} title="latest projects" />
      <Survey />
      <Slider customers={nodes} />
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(
      filter: {table: {eq: "Projects"}}
      limit: 4
      sort: {fields: data___date, order: DESC}
    ) {
      nodes {
        data {
          name
          date
          type
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
              }
            }
          }
        }
        id
      }
    }
    customers: allAirtable(filter: {table: {eq: "Customers"}}) {
      nodes {
        id
        data {
          name
          quote
          title
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 150, height: 150, placeholder: TRACED_SVG)
              }
            }
          }
        }
      }
    }
  }
`

export default HomePage
