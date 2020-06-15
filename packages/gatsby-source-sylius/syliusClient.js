const got = require("got");

const flattenCategories = (rootCategory, level = 0, parent = null) => {
  return rootCategory.reduce((acc, category) => {
    return acc
      .concat({
        ...category,
        parent,
        level,
        children: category.children.map(({ code }) => code),
      })
      .concat(flattenCategories(category.children, level + 1, category.code));
  }, []);
};

const getAllProductsData = async syliusUrl => {
  if (!syliusUrl) {
    return require("./__fixtures__/product-latest.json");
  }

  return got(`${syliusUrl}/shop-api/product-latest/?limit=100000`, {
    json: true,
  }).then(response => response.body);
};

const getAllCategoryData = async (syliusUrl, mainTaxonCode) => {
  if (!syliusUrl) {
    return require("./__fixtures__/category.json").self;
  }

  return got(`${syliusUrl}/shop-api/taxons/${mainTaxonCode}`, {
    json: true,
  })
    .then(response => response.body.self)
    .then(({ children }) => flattenCategories(children));
};

module.exports = { getAllProductsData, getAllCategoryData };
