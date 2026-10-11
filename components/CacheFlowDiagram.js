import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

const steps = [
  { title: 'Mutation succeeds', detail: 'Mock server changes the record.' },
  { title: 'Relevant tag is invalidated', detail: 'Only Event:{id} is marked stale.' },
  { title: 'Active queries refetch', detail: 'Collection and matching detail both provide that tag.' },
  { title: 'List and detail synchronize', detail: 'Both read the updated server record.' },
];

export default function CacheFlowDiagram() {
  return (
    <View style={styles.flowCard}>
      <Text style={styles.sectionEyebrow}>WRITE → CACHE SYNCHRONIZATION</Text>
      <Text style={styles.flowTitle}>How invalidation moves new server state to the UI</Text>
      {steps.map((step, index) => (
        <View key={step.title} style={styles.flowStepWrap}>
          <View style={styles.flowStep}>
            <View style={styles.flowNumber}><Text style={styles.flowNumberText}>{index + 1}</Text></View>
            <View style={styles.flowTextBlock}>
              <Text style={styles.flowStepTitle}>{step.title}</Text>
              <Text style={styles.flowStepDetail}>{step.detail}</Text>
            </View>
          </View>
          {index < steps.length - 1 ? <Text style={styles.flowArrow}>↓</Text> : null}
        </View>
      ))}
      <Text style={styles.tagNote}>getEvents provides Event:{'{id}'} for each row. getEvent(id) provides Event:{'{id}'}. updateEvent(id) invalidates that same entity tag—no broad cache flush.</Text>
    </View>
  );
}
