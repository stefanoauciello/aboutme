import {motion} from "framer-motion";
import containerVariants from "../components/utils";

const keyConcepts = [
    {
        title: "Event Producers",
        description:
            "Services that detect a change or user action and publish an event (e.g., via Amazon SNS).",
    },
    {
        title: "Event Brokers",
        description:
            "Systems like Amazon SNS (publish-subscribe) or Amazon SQS (message queues) that route and deliver events.",
    },
    {
        title: "Event Consumers",
        description:
            "Services that subscribe to queues or notifications and perform actions in response to events.",
    },
    {
        title: "Event",
        description:
            "An immutable message that describes something that happened in the system.",
    },
    {
        title: "Event Channel",
        description:
            "A medium like an SNS topic or an SQS queue used to transmit events.",
    },
    {
        title: "Event Store",
        description:
            "A storage system for persisting events, useful for replay or audit purposes.",
    },
    {
        title: "Event Schema",
        description:
            "Defines the structure and required fields of an event message, typically in JSON.",
    },
];

const benefits = [
    "Loosely coupled architecture that scales independently.",
    "Improved real-time responsiveness and user experience.",
    "Higher fault tolerance due to asynchronous communication.",
    "Easier to integrate heterogeneous systems over time.",
];

const EventDrivenArchitecture = () => {
    return (
        <motion.section
            className="h-[100dvh] md:h-auto overflow-y-auto
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg text-center
                 max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Event-Driven Architecture
                </h2>

                <div className="my-6 flex justify-center">
                    <img
                        src={`${import.meta.env.BASE_URL}eda-architecture.png`}
                        alt="Event-Driven Architecture Diagram"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
                    />
                </div>

                <p className="text-base sm:text-lg">
                    Event-Driven Architecture (EDA) is a design pattern where decoupled
                    services communicate asynchronously through events, improving
                    scalability and system responsiveness.
                </p>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {keyConcepts.map((concept, index) => (
                            <li key={index}>
                                <strong>{concept.title}:</strong> {concept.description}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Practical Example: User Registration Flow
                    </h3>
                    <p>
                        Here's a real-world example of how an event-driven architecture
                        works using Amazon SNS, SQS, and SES:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <strong>User:</strong> submits a signup form on the website.
                        </li>
                        <li>
                            <strong>User Service (Producer):</strong> processes the
                            registration and publishes a <code>UserRegistered</code> event to
                            an SNS topic.
                        </li>
                        <li>
                            <strong>Amazon SNS (Broker):</strong> fans out the event to
                            multiple subscribed SQS queues.
                        </li>
                        <li>
                            <strong>Email Queue (SQS):</strong> receives the event and
                            triggers the <strong>Email Service</strong> running on ECS to send
                            a welcome email via <strong>SES</strong>.
                        </li>
                        <li>
                            <strong>Analytics Queue (SQS):</strong> receives the same event
                            and triggers the <strong>Analytics Service</strong> to log the
                            registration.
                        </li>
                    </ul>

                    <p className="mt-4">
                        <strong>Event payload example:</strong>
                    </p>
                    <div className="overflow-x-auto">
            <pre className="bg-gray-100 text-sm p-4 rounded-md w-full whitespace-pre-wrap break-words">
{`{
  "eventType": "UserRegistered",
  "timestamp": "2025-04-12T12:00:00Z",
  "payload": {
    "userId": "abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}`}
            </pre>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default EventDrivenArchitecture;
