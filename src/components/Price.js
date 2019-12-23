import React from "react"
import PropTypes from "prop-types"

const Price = (props) => <p><strong>{props.price.current / 100} {props.price.currency}</strong></p>

Price.propTypes = {
  price: PropTypes.shape({
    current: PropTypes.number.isRequired,
    currency: PropTypes.oneOf(['USD', 'EUR'])
  })
}

export default Price
