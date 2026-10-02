import {
  FaBrain,
  FaDatabase,
  FaFileAlt,
  FaGithub,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa';
import PageLayout from '../layouts/page-layout.jsx';
import BackButton from '../components/back-button.jsx';

const projectUrl = 'https://github.com/stefanoauciello/rag';

function RAG() {
  return (
    <PageLayout
      title="Retrieval-Augmented Generation (RAG)"
      subtitle="Ground language-model answers in your documents with a retrieval pipeline."
    >
      <BackButton />

      <article className="space-y-10">
        <section className="glass-card p-6 sm:p-8">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A language model can produce fluent answers, but it does not
            automatically know the contents of your files or private knowledge
            base. Retrieval-Augmented Generation (RAG) combines document search
            with generation: it finds relevant passages first, then provides
            those passages as context to the model when answering a question.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Prepare and index documents</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Documents are extracted into text and split into smaller chunks.
            Each chunk is converted into an embedding, a numerical
            representation that captures aspects of its meaning. The vectors
            are stored in an index so the application can find passages related
            to a question without scanning every document from scratch.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaSearch className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Retrieve, then generate</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            When a user asks a question, the system searches the index for
            relevant chunks and adds them to the model&apos;s prompt. This gives
            the answer useful source material and can make it easier to trace
            responses back to documents. Retrieval quality depends on the
            source content, chunking strategy, embedding model, and search
            settings; RAG reduces unsupported answers but does not guarantee
            their absence.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <FaDatabase className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">A local document assistant</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            My RAG project indexes PDF, TXT, and Markdown documents with
            embeddings and FAISS. It provides both a web interface and a
            desktop application, supports Gemini and local Ollama models, and
            the web interface can also use BM25 for hybrid search when the
            optional package is installed. The web answers include retrieved
            passages as sources.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaBrain className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Choosing a model and search</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A local vector index does not necessarily mean that the entire
            workflow stays local. With Gemini, questions and retrieved text are
            sent to Google; with Ollama, generation runs through the configured
            local service. Choose a provider based on your privacy and
            operational needs, and check the project documentation before
            indexing sensitive material.
          </p>
        </section>

        <section className="border-l-4 border-primary-500 pl-5">
          <div className="flex items-center gap-3 mb-3">
            <FaShieldAlt className="text-primary-500" aria-hidden />
            <h2 className="text-xl font-bold">Run it locally</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
            The project is designed for local use and does not include
            authentication or authorization for its upload, delete, and query
            endpoints. Do not expose the server directly to the Internet
            without adding appropriate security controls.
          </p>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2 inline-flex"
          >
            <FaGithub aria-hidden />
            View the RAG project
          </a>
        </section>
      </article>
    </PageLayout>
  );
}

export default RAG;
