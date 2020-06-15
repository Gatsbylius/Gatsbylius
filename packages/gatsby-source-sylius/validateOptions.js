module.exports = ({ reporter }, options) => {
  if (!options.syliusUrl) {
    reporter.panic(
      "Problem with gatsby-source-sylius options: syliusUrl is mandatory"
    );
  }

  if (!options.mainTaxonCode) {
    reporter.panic(
      "Problem with gatsby-source-sylius options: mainTaxonCode is mandatory"
    );
  }
};
