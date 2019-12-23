import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Img from "gatsby-image"

const Category = props => {
  const category = props.data.category
  const products = category.fields && category.fields.products
  const subCategories = category.childrenCategory

  return (
    <Layout>
      <h1>{category.name}</h1>

      <p>{category.description}</p>

      {subCategories && subCategories.length > 0 && (
        <section>
          <h2>Sub categories</h2>
          <ul>
            {subCategories.map(subCategory => {
              return (
                <li key={subCategory.code}>
                  <Link to={`/categories/${subCategory.code}`}>
                    {subCategory.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {products && products.length > 0 && (
        <section>
          <h2>Products</h2>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products.map(product => {
              return (
                <li key={product.slug}>
                  <Link to={`product/${product.slug}`}>
                    <Img fixed={product.localImage.childImageSharp.fixed} />{" "}
                    <br />
                    {product.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </Layout>
  )
}

export default Category

export const query = graphql`
  query CategoryPageQuery($code: String) {
    category(code: { eq: $code }) {
      code
      slug
      name
      description
      fields {
        products {
          id
          name
          slug
          localImage {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
      childrenCategory {
        id
        code
        slug
        name
      }
    }
  }
`
