import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';
import { Point } from '../prop-types';
import { GraphText } from './shapes';
import {
  HealthyIcon,
  theme,
  InstancesIcon,
  InstancesIconLight
} from 'joyent-ui-toolkit';

const StyledInstancesIcon = styled(InstancesIcon)`
  fill: ${theme.secondary};

  ${isNot('active')`
    fill: ${theme.secondary};
  `};
`;

const StyledHealthyIcon = styled(HealthyIcon)`
  fill: ${theme.orange};

  ${is('healthy')`
    fill: ${theme.green};
  `};

  ${isNot('healthy')`
    fill: ${theme.orange};
  `};
`;

const GraphNodeInfo = ({ data, pos, primaryColor, secondaryColor }) => {
  const {
    instances,
    instanceStatuses,
    instancesHealthy,
    instancesActive,
    transitionalStatus,
    status,
    isConsul,
    reversed
  } = data;
  const reverse = isConsul || reversed;

  const { x, y } = pos;

  const statuses = transitionalStatus ? (
    <GraphText
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      consul={reverse}
      active={instancesActive}
    >
      {status.toLowerCase()}
    </GraphText>
  ) : (
    (instanceStatuses || []).map((instanceStatus, index) => (
      <GraphText
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        key={index}
        index={index}
        consul={reverse}
        active={instancesActive}
      >
        {`${instanceStatus.count}
            ${instanceStatus.status.toLowerCase()}`}
      </GraphText>
    ))
  );

  const healthy = (
    <StyledHealthyIcon
      healthy={
        instancesHealthy && instancesHealthy.total === instancesHealthy.healthy
      }
    />
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`translate(0, 0)`}>{healthy}</g>
      <g transform={'translate(30, 4.5)'}>
        {reverse ? (
          <StyledInstancesIcon active={instancesActive} />
        ) : (
          <InstancesIconLight />
        )}
      </g>
      <GraphText
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        x={54}
        y={14}
        consul={reverse}
        active={instancesActive}
      >
        {`${(instances || instanceStatuses || []).length} inst.`}
      </GraphText>
      <g transform={'translate(54, 36)'} height="200">
        {statuses}
      </g>
    </g>
  );
};

GraphNodeInfo.propTypes = {
  data: PropTypes.object.isRequired,
  pos: Point.isRequired
};

export default GraphNodeInfo;
