import React from "react";
import PropTypes from "prop-types";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Header as StyleHeader,
  Logo,
  NavLink,
  NavList,
  NavItem,
} from "./styled";
import MiniCart from "./../../MiniCart/MiniCart";
import Container from "../Container";
import MiniCartButton from "./../../MiniCart/MiniCartButton";

const Header = ({ siteTitle = ``, menuLinks }) => (
  <Container>
    <StyleHeader>
      <Logo to="/">{siteTitle}</Logo>
      <nav>
        <NavList>
          {menuLinks.map(({ node }) => {
            return (
              <NavItem key={node.code}>
                <NavLink
                  activeClassName="active"
                  to={`/categories/${node.code}`}
                >
                  {node.name}
                </NavLink>
              </NavItem>
            );
          })}
          <MiniCartButton />
          <NavItem key={"user"}>
            <FontAwesomeIcon icon={faUser} />
          </NavItem>
        </NavList>
      </nav>
    </StyleHeader>
    <MiniCart />
  </Container>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.object.isRequired,
};

export default Header;
