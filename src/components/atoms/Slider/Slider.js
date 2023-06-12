import PropTypes from 'prop-types';

import { EMPTY_STRING, _noop } from "../../../app.constants";

function Slider(props) {
    const {
        value,
        onChange,
        className,
    } = props;

    return (
        <input type="range" min="0" max="100" value={value} onChange={onChange} className={className} />
    )

}

Slider.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
};
  
Slider.defaultProps = {
    value: 0,
    onChange: _noop,
    className: EMPTY_STRING,
};

export default Slider;