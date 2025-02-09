import { motion } from "framer-motion";
import { useState } from "react";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const skills = [
  { src: "/spring.png", alt: "Spring", label: "Spring", description: "Esperienza nella creazione di microservizi e API RESTful con Java e Spring Boot. Utilizzo di JPA, Hibernate e Kafka per la gestione dei dati e la comunicazione asincrona in architetture distribuite." },
  { src: "/node.png", alt: "Node", label: "NodeJS", description: "Utilizzo di Node.js per la creazione di AWS Lambda e backend scalabili con framework come Express e NestJS. Esperienza nella progettazione di API serverless e microservizi su AWS." },
  { src: "/mongo.png", alt: "MongoDB", label: "MongoDB", description: "Esperienza nell'uso di MongoDB per la gestione di entità come documenti, sfruttando la flessibilità dei database NoSQL per applicazioni scalabili e ad alte prestazioni." },
  { src: "/oracle.png", alt: "Oracle", label: "Oracle", description: "Conoscenza dell'ottimizzazione delle query in Oracle DB, con analisi del costo delle operazioni per migliorare le performance. Esperienza anche con Oracle GoldenGate per la replica e la sincronizzazione dei dati in ambienti distribuiti." },
  { src: "/aws.png", alt: "AWS", label: "AWS", description: "Esperienza nello sviluppo di applicazioni serverless con AWS Lambda in diversi linguaggi. Conoscenza di Aurora DB e DynamoDB per la gestione dei dati. Utilizzo di servizi asincroni come SQS, SNS, EventBridge e S3 per garantire integrazione e scalabilità. Familiarità con ECS e Amazon EKS per il deployment e l’orchestrazione di applicazioni containerizzate. Certificazione AWS Certified Developer - Associate." },
  { src: "/kafka.png", alt: "Kafka", label: "Kafka", description: "Conoscenza di Apache Kafka, con esperienza nella gestione di Change Data Capture (CDC) per la propagazione e sincronizzazione dei dati in sistemi distribuiti. Lavoro su architetture basate su event-driven per garantire affidabilità e scalabilità nella gestione dei flussi di dati." },
  { src: "/mysql.png", alt: "MySQL", label: "MySQL", description: "Esperienza nell’uso di MySQL, principalmente in progetti open source personali, con focus sulla modellazione dei dati, ottimizzazione delle query e gestione delle relazioni tra entità." },
];

const Skill = () => {
  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex flex-col items-center mt-8">
        {skills.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-8 w-full max-w-4xl mb-6"
          >
            <img
              src={import.meta.env.BASE_URL + item.src}
              alt={item.alt}
              className="w-16 h-16 object-contain flex-shrink-0"
            />
            <div className="flex-1">
              <span className="text-gray-400 text-lg font-bold block text-left">{item.label}</span>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed text-left">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skill;
