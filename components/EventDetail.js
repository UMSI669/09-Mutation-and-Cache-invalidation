import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import EditEventForm from './EditEventForm';
import { styles } from '../styles';

export default function EventDetail({ event, selectedEventId, isLoading, isFetching, isError, error, onRetry, isSyncing }) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>DETAIL QUERY · getEvent(id)</Text>
          <Text style={styles.panelTitle}>Event detail</Text>
        </View>
        {isFetching ? <ActivityIndicator size="small" color="#4b63dd" /> : null}
      </View>

      {!selectedEventId ? (
        <View style={styles.emptyPanel}><Text style={styles.emptyText}>Choose an event to load its detail.</Text></View>
      ) : null}

      {isLoading && !event ? (
        <View style={styles.loadingPanel}>
          <ActivityIndicator size="large" color="#4b63dd" />
          <Text style={styles.loadingText}>Loading event {selectedEventId}…</Text>
        </View>
      ) : null}

      {isFetching && event ? (
        <View style={styles.refreshingBanner}>
          <ActivityIndicator size="small" color="#4b63dd" />
          <Text style={styles.refreshingText}>Syncing cached detail with the mock server…</Text>
        </View>
      ) : null}

      {isError ? (
        <View style={styles.errorPanel}>
          <Text style={styles.errorTitle}>{event ? 'Detail refresh failed · cached data remains' : 'Could not load this event'}</Text>
          <Text style={styles.errorText}>{error?.error || `Event ${selectedEventId} could not be loaded.`}</Text>
          <Pressable onPress={onRetry} style={styles.retryButton}><Text style={styles.retryText}>Retry detail</Text></Pressable>
        </View>
      ) : null}

      {event ? (
        <View style={styles.detailRecord}>
          <View style={styles.detailMetaRow}>
            <Text style={styles.detailTime}>{event.time}</Text>
            <Text style={styles.detailTrack}>{event.track.toUpperCase()}</Text>
            <Text style={styles.detailAttendance}>{event.attendance}</Text>
          </View>
          <Text style={styles.detailTitle}>{event.title}</Text>
          <Text style={styles.detailSpeaker}>Speaker · {event.speaker}</Text>
          <EditEventForm key={event.id} event={event} isSyncing={isSyncing} />
        </View>
      ) : null}
    </View>
  );
}
