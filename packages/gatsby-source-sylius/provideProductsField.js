module.exports = ({ node, getNode, createNodeId, createNodeField }) => {
  if (
    node &&
    node.internal &&
    node.internal.type === "Product" &&
    node.taxons &&
    node.taxons.main
  ) {
    const categoryNode = getNode(createNodeId(`category-${node.taxons.main}`));

    let categoryNodeValue = [node.code];
    if (categoryNode && categoryNode.fields && categoryNode.fields.products) {
      categoryNodeValue = [
        ...categoryNode.fields.products,
        ...categoryNodeValue,
      ];
    }

    createNodeField({
      node: categoryNode,
      name: "products",
      value: categoryNodeValue,
    });
  }
};
