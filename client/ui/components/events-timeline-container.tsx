import React, { useCallback, useEffect } from 'react';
import { EventsTimeline } from '../components/events-timeline';
import { RootState } from '../redux/types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { fetchEvents } from '../redux/actions/events';
import { eventSelector } from '../redux/selectors';

export interface EventsTimelineContainerProps {
  eventListId: 'all';
}

export const EventsTimelineContainer = (
  props: EventsTimelineContainerProps,
) => {
  const { eventListId } = props;

  const mapState = useCallback(
    (state: RootState) => ({
      events: state.eventLists[eventListId].map(id => eventSelector(state, id)),
    }),
    [eventListId],
  );

  const { events } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleFetchEvents = useCallback(() => {
    dispatch(fetchEvents());
  }, [events]);

  useEffect(() => {
    handleFetchEvents();
  }, []);

  return <EventsTimeline events={events} />;
};