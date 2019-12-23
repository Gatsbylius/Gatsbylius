import styled from "styled-components"

export default styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;

  .product-grid {
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-basis: 20%;
      padding: 1rem;
      margin: 1rem;
      background-color: #fff;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

      :last-child {
        margin-right: auto;
      }
    }

    &__item-link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      align-items: center;

      img {
        transition: all 0.4s !important;
      }

      &:hover img {
        transform: scale(1.2);
      }
    }
  }
`
