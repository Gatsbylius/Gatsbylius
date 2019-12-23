import styled from "styled-components"
import { Link } from "gatsby"

export const Logo = styled(Link)`
  font-size: 1.3rem;
  color: #0fbf9c;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
`

export const NavList = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
`

export const NavItem = styled.li`
  padding: 0 1rem;
  text-transform: uppercase;
`

export const NavLink = styled(Link)`
  color: rgb(36, 36, 40);
  transition: color 0.3s;
  &:hover,
  &.active {
    color: #0fbf9c;
  }
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`