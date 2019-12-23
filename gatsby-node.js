/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const got = require("got")

const SYLIUS_URL = process.env.GATSBY_SYLIUS_URL

const getAllProductsData = async () => {
  if (!SYLIUS_URL) {
    return require("./__fixtures__/product-latest.json")
  }

  return got(`${SYLIUS_URL}/shop-api/product-latest/?limit=100000`, {
    json: true,
  }).then(response => response.body)
}

const getAllCategoryData = async () => {
  if (!SYLIUS_URL) {
    return require("./__fixtures__/category.json").self
  }

  return got(`${SYLIUS_URL}/shop-api/taxons/category`, {
    json: true,
  }).then(response => response.body.self)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const adaptCategory = originalCategory => {
    return {
      code: originalCategory.code,
      name: originalCategory.name,
      slug: originalCategory.slug,
      description: originalCategory.description,
      position: originalCategory.position,
      children: originalCategory.children,
      images: originalCategory.images,
    }
  }

  const adaptVariants = variants => {
    return Object.values(variants).map(({ name, price, code }) => {
      return {
        name: name,
        price: price,
        code: code,
      }
    })
  }

  const adaptProduct = originalProduct => {
    return {
      code: originalProduct.code,
      slug: originalProduct.slug,
      name: originalProduct.name,
      description: originalProduct.description,
      channelCode: originalProduct.channelCode,
      averageRating: originalProduct.averageRating,
      firstImage: originalProduct.images[0].cachedPath,
      variants: adaptVariants(originalProduct.variants),
      taxons: originalProduct.taxons,
    }
  }

  const createNodeFromCategory = (categoryData, level = 0) => {
    const nodeContent = JSON.stringify(categoryData)

    const childrenIds = categoryData.children.map(categoryData => {
      return createNodeFromCategory(categoryData, level + 1)
    })

    const nodeMeta = {
      id: createNodeId(`category-${categoryData.code}`),
      parent: null,
      children: childrenIds,
      internal: {
        type: `Category`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(categoryData),
      },
      level,
    }

    const node = Object.assign({}, categoryData, nodeMeta)
    createNode(node)

    return node.id
  }

  const createNodeFromProduct = async productData => {
    const nodeContent = JSON.stringify(productData)

    const nodeMeta = {
      id: createNodeId(`product-${productData.code}`),
      parent: null,
      children: [],
      internal: {
        type: `Product`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(productData),
      },
    }

    const node = Object.assign({}, productData, nodeMeta)
    return await createNode(node)
  }

  await getAllCategoryData().then(({ children }) => {
    return children.map(originalCategoryData => {
      const categoryData = adaptCategory(originalCategoryData)
      return createNodeFromCategory(categoryData)
    })
  })

  // Data can come from anywhere, but for now create it manually

  await getAllProductsData().then(({ items }) => {
    return Promise.all(
      items.map(originalProductData => {
        const productData = adaptProduct(originalProductData)
        return createNodeFromProduct(productData)
      })
    )
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/product.js`)
  const categoryTemplate = path.resolve(`src/templates/category.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query loadDataQuery {
        allProduct {
          nodes {
            code
            slug
          }
        }
        allCategory {
          edges {
            node {
              id
              code
              slug
              fields {
                products {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allCategory.edges.forEach(({ node }) => {
      createPage({
        // Path for this page — required
        path: `/categories/${node.code}`,
        component: categoryTemplate,
        context: {
          code: node.code,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })

    // Create product post pages.
    result.data.allProduct.nodes.forEach(node => {
      createPage({
        // Path for this page — required
        path: `/product/${node.slug}`,
        component: blogPostTemplate,
        context: {
          slug: node.slug,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
  })
}

// For function createNodeField
exports.onCreateNode = ({ node, getNode, createNodeId, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Product" && node.taxons) {
    let categoryNode = getNode(createNodeId(`category-${node.taxons.main}`))

    let categoryNodeValue = [node.id]
    if (categoryNode.fields && categoryNode.fields.products___NODE) {
      categoryNodeValue = [...categoryNode.fields.products___NODE, node.id]
    }

    createNodeField({
      node: categoryNode,
      name: "products___NODE",
      value: categoryNodeValue,
    })
  }
}
