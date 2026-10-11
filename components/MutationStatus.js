import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

export default function MutationStatus({ isLoading, isSuccess, isError, error, isSyncing, onRetry }) {
  if (isLoading) {
    return (
      <View style={styles.mutationStatus}>
        <ActivityIndicator size="small" color="#4b63dd" />
        <Text style={styles.mutationLoadingText}>Writing the title to the mock server…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.mutationStatus, styles.mutationError]}>
        <View style={styles.mutationMessage}>
          <Text style={styles.mutationErrorTitle}>Save failed · no success reported</Text>
          <Text style={styles.mutationErrorText}>{error?.error || 'The update could not be saved.'}</Text>
        </View>
        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={[styles.mutationStatus, styles.mutationSuccess]}>
        <Text style={styles.mutationSuccessMark}>✓</Text>
        <View style={styles.mutationMessage}>
          <Text style={styles.mutationSuccessTitle}>Mutation succeeded</Text>
          <Text style={styles.mutationSuccessText}>
            {isSyncing ? 'The update is saved; active list and detail queries are refetching.' : 'The server write succeeded. Active query subscribers are synchronizing from the mock server.'}
          </Text>
        </View>
      </View>
    );
  }

  return null;
}
