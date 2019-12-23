import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import ProductGrid from "../components/ProductGrid"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="The fastest shop on earth!" />
    <h1>Hello world</h1>

    <h2>Nos produits</h2>
    <ProductGrid>
      {data.allProduct.nodes.map(product => (
        <li key={product.slug} className="product-grid__item">
          <Link
            to={`/product/${product.slug}`}
            className="product-grid__item-link"
          >
            <Img
              fixed={product.localImage.childImageSharp.fixed}
              className="product-grid__item-image"
            />
            <br />
            {product.name}
          </Link>
        </li>
      ))}
    </ProductGrid>

    <h2>Nos catégories</h2>
    <ul>
      {data.allCategory.edges.map(({ node }) => {
        return (
          <li key={node.code}>
            <Link to={`/categories/${node.code}`}>{node.name}</Link>
          </li>
        )
      })}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    allCategory {
      edges {
        node {
          id
          code
          slug
          name
        }
      }
    }
    allProduct {
      nodes {
        slug
        name
        localImage {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed(width: 300, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
