/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../style.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery($code: String) {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }

      category(code: { eq: $code }) {
        code
        slug
        name
      }

      allCategory(filter: { level: { eq: 0 } }) {
        edges {
          node {
            id
            code
            slug
            name
          }
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:600|Roboto:300,300i,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header
        menuLinks={data.allCategory.edges}
        siteTitle={data.site.siteMetadata.title}
      />

      <Main>
        <Container>{children}</Container>
      </Main>

      <Footer>
        <Container>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          <span> & </span>
          <a href="https://sylius.com/">Sylius</a>
        </Container>
      </Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
