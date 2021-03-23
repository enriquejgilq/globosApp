
import React from 'react';
import { Link } from 'react-router-dom';

export default React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));