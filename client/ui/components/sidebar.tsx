import React from 'react';
import { styled } from '../styles';
import { Event } from '../../../shared/entities/event';
import { EventCard } from './event-card';
import { Trans } from 'react-i18next';
import dayjs from 'dayjs';

export interface SidebarProps {
  events: Event[];
}

const Wrapper = styled.aside`
  width: 300px;
  padding: 18px;
  background-color: ${({ theme }) => theme.backgroundDark};
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
`;

const Title = styled.h2`
  font-size: 16px;
  & > strong {
    color: ${({ theme }) => theme.highlightNormal};
    font-size: 21px;
  }
`;

export const Sidebar = (props: SidebarProps) => {
  const { events } = props;
  const upcomingEvents = events.filter(
    event => dayjs(event.end_date).valueOf() > dayjs().valueOf(),
  );
  const streamingEvents = events.filter(
    event =>
      dayjs(event.start_date).valueOf() <= dayjs().valueOf() &&
      dayjs(event.end_date).valueOf() > dayjs().valueOf(),
  );

  return (
    <Wrapper>
      <Title>
        <Trans i18nKey="sidebar.title" count={streamingEvents.length}>
          <strong>{{ count: streamingEvents.length }}</strong> streamings now on
          air
        </Trans>
      </Title>

      {upcomingEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </Wrapper>
  );
};