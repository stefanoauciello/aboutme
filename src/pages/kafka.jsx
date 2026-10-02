import {
  FaBalanceScale,
  FaGithub,
  FaLayerGroup,
  FaPaperPlane,
  FaUsers,
} from 'react-icons/fa';
import PageLayout from '../layouts/page-layout.jsx';
import BackButton from '../components/back-button.jsx';

const projectUrl = 'https://github.com/stefanoauciello/kafka-java';

function Kafka() {
  return (
    <PageLayout
      title="Apache Kafka: Event Streaming in Practice"
      subtitle="Understand topics, partitions, producers, and consumers through a small Spring Boot example."
    >
      <BackButton />

      <article className="space-y-10">
        <section className="glass-card p-6 sm:p-8">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Apache Kafka is a distributed event streaming platform. Applications
            use it to publish events and let other applications process them
            independently. Instead of calling every downstream service
            directly, a producer writes an event to Kafka and consumers read it
            when they are ready.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaLayerGroup className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Topics and partitions</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Events are written to named topics. A topic is split into
            partitions, which Kafka stores as ordered logs. Each record gets an
            offset within its partition, so a consumer can track its progress
            and resume reading from a known position. Partitioning also lets
            consumers process different parts of a topic in parallel.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaPaperPlane className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Producers and consumers</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A producer publishes records to a topic; a consumer subscribes and
            processes them. Kafka stores records independently from consumers,
            allowing a consumer to catch up after downtime or replay earlier
            events, subject to the topic&apos;s retention settings. This
            separation helps services evolve without requiring the producer to
            know which consumers exist.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaUsers className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Consumer groups</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Consumers that share a group ID coordinate to divide a topic&apos;s
            partitions among themselves. Within a group, a partition is
            assigned to one consumer at a time; adding consumers can increase
            parallelism up to the number of partitions. Different groups each
            receive their own view of the stream, which makes it possible for
            separate applications to react to the same events independently.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <FaBalanceScale className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Kafka or a traditional queue?</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Both can decouple services, but Kafka is especially useful when
            events need to be retained and read by multiple independent
            consumers, or when a stream must be replayed. A traditional work
            queue is often a simpler fit when each task should be handled once
            by one worker. The right choice depends on retention, ordering,
            throughput, and delivery requirements.
          </p>
        </section>

        <section className="border-l-4 border-primary-500 pl-5">
          <h2 className="text-xl font-bold mb-2">Try the project</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
            I put these ideas into practice in a small Java project using Spring
            Boot and Kafka. Docker Compose starts both services; a REST endpoint
            publishes a message to a topic, and a background listener consumes
            it and writes it to the application logs.
          </p>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2 inline-flex"
          >
            <FaGithub aria-hidden />
            View the kafka-java project
          </a>
        </section>
      </article>
    </PageLayout>
  );
}

export default Kafka;
