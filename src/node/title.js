import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphTitle } from './shapes';

const GraphNodeTitle = ({
  data,
  onTitleClick,
  primaryColor,
  secondaryColor
}) => (
  <g>
    <GraphTitle
      x={Constants.paddingLeft}
      y={30}
      onClick={onTitleClick}
      onKeyDown={onTitleClick}
      consul={data.isConsul || data.reversed}
      active={data.instancesActive}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      clipPath="url(#clip1)"
    >
      {data.name}
    </GraphTitle>
    <clipPath id="clip1">
      <rect x={Constants.paddingLeft} y="5" width="120" height="40" />
    </clipPath>
  </g>
);

GraphNodeTitle.propTypes = {
  data: PropTypes.object.isRequired,
  onTitleClick: PropTypes.func
};

export default GraphNodeTitle;
