import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useUpdateEventMutation } from '../services/eventsApi';
import { simulateNextUpdateFailure } from '../api/mockServer';
import MutationStatus from './MutationStatus';
import { styles } from '../styles';

export default function EditEventForm({ event, isSyncing }) {
  const [title, setTitle] = useState(event.title);
  const [updateEvent, mutation] = useUpdateEventMutation();
  const attemptedTitleRef = useRef(event.title);
  const submissionInFlightRef = useRef(false);
  const [failureArmed, setFailureArmed] = useState(false);

  useEffect(() => {
    setTitle(event.title);
  }, [event.id, event.title]);

  async function submitTitle(titleToSubmit = title) {
    if (mutation.isLoading || submissionInFlightRef.current) return;
    const normalizedTitle = titleToSubmit.trim();
    if (!normalizedTitle) return;
    submissionInFlightRef.current = true;
    attemptedTitleRef.current = normalizedTitle;
    mutation.reset();
    setFailureArmed(false);
    try {
      await updateEvent({ id: event.id, changes: { title: normalizedTitle } }).unwrap();
    } catch (_error) {
      // The mutation hook exposes the error state for the user and retry control.
    } finally {
      submissionInFlightRef.current = false;
    }
  }

  function armFailure() {
    simulateNextUpdateFailure();
    setFailureArmed(true);
    mutation.reset();
  }

  return (
    <View style={styles.editForm}>
      <Text style={styles.formLabel}>EDIT TITLE · CLIENT SUBMITS A SERVER WRITE</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        editable={!mutation.isLoading}
        accessibilityLabel="Event title"
        placeholder="Enter an event title"
        style={styles.titleInput}
      />
      <View style={styles.formActions}>
        <Pressable
          onPress={() => submitTitle()}
          disabled={mutation.isLoading || !title.trim()}
          style={[styles.submitButton, (mutation.isLoading || !title.trim()) && styles.buttonDisabled]}
        >
          <Text style={styles.submitButtonText}>{mutation.isLoading ? 'Saving…' : 'Save title'}</Text>
        </Pressable>
        <Pressable onPress={armFailure} disabled={mutation.isLoading} style={styles.simulateButton}>
          <Text style={styles.simulateButtonText}>{failureArmed ? 'Next save will fail' : 'Simulate failure'}</Text>
        </Pressable>
      </View>
      <MutationStatus
        isLoading={mutation.isLoading}
        isSuccess={mutation.isSuccess}
        isError={mutation.isError}
        error={mutation.error}
        isSyncing={isSyncing}
        onRetry={() => submitTitle(attemptedTitleRef.current)}
      />
    </View>
  );
}
