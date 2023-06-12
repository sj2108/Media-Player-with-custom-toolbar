import React from 'react'
import PropTypes from 'prop-types'

import { EMPTY_STRING, _noop } from '../../../app.constants';

const Button = props => {
  const {
    path,
    onClick,
    className
  } = props;
  return (
    <img  className={className}  alt="play" src={process.env.PUBLIC_URL + path} onClick={onClick}  ></img>
  )
}

Button.propTypes = {
  path: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  path: EMPTY_STRING,
  onClick: _noop,
  className: EMPTY_STRING,
};

export default Button;
