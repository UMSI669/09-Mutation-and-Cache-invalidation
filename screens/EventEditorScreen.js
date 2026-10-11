import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { useGetEventQuery, useGetEventsQuery } from '../services/eventsApi';
import EventList from '../components/EventList';
import EventDetail from '../components/EventDetail';
import CacheFlowDiagram from '../components/CacheFlowDiagram';
import { styles } from '../styles';

export default function EventEditorScreen() {
  const [selectedEventId, setSelectedEventId] = useState('1');
  const collectionQuery = useGetEventsQuery();
  const detailQuery = useGetEventQuery(selectedEventId, { skip: !selectedEventId });
  const events = collectionQuery.data || [];
  const selectedEvent = detailQuery.currentData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>RTK QUERY · MUTATION + INVALIDATION</Text>
          <Text style={styles.heroTitle}>Edit an event</Text>
          <Text style={styles.heroCopy}>
            Update a server-backed record, invalidate the cache entries that depend on it, and watch active views synchronize.
          </Text>
        </View>

        <View style={styles.serverBanner}>
          <View style={styles.serverDot} />
          <View style={styles.serverBannerText}>
            <Text style={styles.serverBannerTitle}>Session-backed local mock server</Text>
            <Text style={styles.serverBannerCopy}>Reads and writes share module memory, so successful edits appear in subsequent queries.</Text>
          </View>
        </View>

        <View style={styles.masterDetail}>
          <EventList
            events={events}
            selectedEventId={selectedEventId}
            isLoading={collectionQuery.isLoading}
            isFetching={collectionQuery.isFetching}
            isError={collectionQuery.isError}
            error={collectionQuery.error}
            onSelect={setSelectedEventId}
            onRetry={collectionQuery.refetch}
          />
          <EventDetail
            event={selectedEvent}
            selectedEventId={selectedEventId}
            isLoading={detailQuery.isLoading}
            isFetching={detailQuery.isFetching}
            isError={detailQuery.isError}
            error={detailQuery.error}
            onRetry={detailQuery.refetch}
            isSyncing={collectionQuery.isFetching || detailQuery.isFetching}
          />
        </View>

        <CacheFlowDiagram />

        <View style={styles.scopeCard}>
          <Text style={styles.sectionEyebrow}>CORE VERSION SCOPE</Text>
          <Text style={styles.scopeTitle}>Mutation → invalidation → refetch</Text>
          <Text style={styles.scopeCopy}>No optimistic updates or manual cache writes here. The mock server is authoritative; invalidation asks active queries to read the changed record again.</Text>
          <Text style={styles.scopeExtensions}>Advanced extensions: optimistic updates · offline queues · token refresh · WebSockets</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
