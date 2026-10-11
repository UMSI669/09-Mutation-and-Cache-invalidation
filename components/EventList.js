import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

export default function EventList({ events, selectedEventId, isLoading, isFetching, isError, error, onSelect, onRetry }) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>COLLECTION QUERY · getEvents()</Text>
          <Text style={styles.panelTitle}>Event list</Text>
        </View>
        {isFetching ? <ActivityIndicator size="small" color="#4b63dd" /> : null}
      </View>

      {isFetching && events.length > 0 ? (
        <View style={styles.refreshingBanner}>
          <ActivityIndicator size="small" color="#4b63dd" />
          <Text style={styles.refreshingText}>Refreshing · current records stay visible</Text>
        </View>
      ) : null}

      {isLoading && events.length === 0 ? (
        <View style={styles.loadingPanel}>
          <ActivityIndicator size="large" color="#4b63dd" />
          <Text style={styles.loadingText}>Loading events…</Text>
        </View>
      ) : null}

      {isError ? (
        <View style={styles.errorPanel}>
          <Text style={styles.errorTitle}>{events.length ? 'List refresh failed' : 'Could not load events'}</Text>
          <Text style={styles.errorText}>{error?.error || 'The collection request failed.'}</Text>
          <Pressable onPress={onRetry} style={styles.retryButton}><Text style={styles.retryText}>Retry list</Text></Pressable>
        </View>
      ) : null}

      {!isLoading && !isError && events.length === 0 ? (
        <View style={styles.emptyPanel}><Text style={styles.emptyText}>No events are available.</Text></View>
      ) : null}

      {events.map((event) => {
        const selected = selectedEventId === event.id;
        return (
          <Pressable key={event.id} onPress={() => onSelect(event.id)} style={[styles.eventRow, selected && styles.eventRowSelected]}>
            <View style={styles.eventRowText}>
              <Text style={styles.eventRowTime}>{event.time}  ·  {event.track}</Text>
              <Text style={styles.eventRowTitle}>{event.title}</Text>
              <Text style={styles.eventRowMeta}>{event.speaker} · {event.attendance}</Text>
            </View>
            <Text style={styles.eventRowArrow}>{selected ? '●' : '›'}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
