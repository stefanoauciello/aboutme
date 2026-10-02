import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaFingerprint,
  FaGithub,
  FaKey,
  FaLock,
  FaShieldAlt,
} from 'react-icons/fa';
import PageLayout from '../layouts/page-layout.jsx';

const initialHashMessage = 'Small changes create a different digest.';
const initialPlaintext = 'A secret message for this browser demo.';

function getSubtleCrypto() {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      'Web Crypto requires a modern browser and a secure context (HTTPS or localhost).'
    );
  }

  return globalThis.crypto.subtle;
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

function bytesToBase64(bytes) {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''));
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function tamperBase64(value) {
  const bytes = base64ToBytes(value);
  bytes[0] ^= 1;
  return bytesToBase64(bytes);
}

function getErrorMessage(error) {
  if (error?.name === 'OperationError') {
    return 'Decryption failed: the ciphertext was modified or does not match this key.';
  }

  return error instanceof Error
    ? error.message
    : 'An unexpected error occurred.';
}

function Cryptography() {
  const [hashMessage, setHashMessage] = useState(initialHashMessage);
  const [digest, setDigest] = useState('');
  const [hashError, setHashError] = useState('');
  const [plaintext, setPlaintext] = useState(initialPlaintext);
  const [encrypted, setEncrypted] = useState(null);
  const [tampered, setTampered] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState(null);
  const [encryptionError, setEncryptionError] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function calculateDigest() {
      try {
        const subtle = getSubtleCrypto();
        const hash = await subtle.digest(
          'SHA-256',
          new TextEncoder().encode(hashMessage)
        );

        if (!cancelled) {
          setDigest(bytesToHex(new Uint8Array(hash)));
          setHashError('');
        }
      } catch (error) {
        if (!cancelled) {
          setDigest('');
          setHashError(getErrorMessage(error));
        }
      }
    }

    calculateDigest();

    return () => {
      cancelled = true;
    };
  }, [hashMessage]);

  async function encryptMessage() {
    setIsEncrypting(true);
    setEncryptionError('');
    setDecryptedMessage(null);

    try {
      const subtle = getSubtleCrypto();
      const key = await subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
      const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
      const ciphertext = await subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        new TextEncoder().encode(plaintext)
      );

      setEncrypted({
        key,
        iv,
        ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
      });
      setTampered(false);
    } catch (error) {
      setEncryptionError(getErrorMessage(error));
    } finally {
      setIsEncrypting(false);
    }
  }

  async function decryptMessage() {
    if (!encrypted) {
      return;
    }

    setIsDecrypting(true);
    setEncryptionError('');
    setDecryptedMessage(null);

    try {
      const subtle = getSubtleCrypto();
      const ciphertext = tampered
        ? tamperBase64(encrypted.ciphertext)
        : encrypted.ciphertext;
      const decrypted = await subtle.decrypt(
        { name: 'AES-GCM', iv: encrypted.iv },
        encrypted.key,
        base64ToBytes(ciphertext)
      );

      setDecryptedMessage(new TextDecoder().decode(decrypted));
    } catch (error) {
      setEncryptionError(getErrorMessage(error));
    } finally {
      setIsDecrypting(false);
    }
  }

  return (
    <PageLayout
      title="Cryptography"
      subtitle="Understand the building blocks behind confidentiality, integrity, and trust."
    >
      <div className="mb-8">
        <Link
          to="/devcorner"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
        >
          <FaArrowLeft size={12} aria-hidden />
          Back to Dev Corner
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {[
          {
            icon: FaFingerprint,
            title: 'Hashing',
            text: 'A one-way fingerprint for detecting changes.',
          },
          {
            icon: FaLock,
            title: 'Encryption',
            text: 'Keep data confidential with a key.',
          },
          {
            icon: FaShieldAlt,
            title: 'Integrity',
            text: 'Detect tampering before trusting data.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <Icon size={18} aria-hidden />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="hash-demo-title"
          className="glass-card p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <FaFingerprint size={18} aria-hidden />
            </div>
            <h2
              id="hash-demo-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              SHA-256 hash
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Edit the message and watch its fixed-length digest change. Hashing
            is one-way; it does not encrypt or hide the original text.
          </p>

          <label
            htmlFor="hash-message"
            className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2"
          >
            Message
          </label>
          <textarea
            id="hash-message"
            value={hashMessage}
            onChange={(event) => setHashMessage(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-300/70 dark:border-slate-700 bg-white/70 dark:bg-slate-950/40 p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              SHA-256 digest
            </h3>
            {hashError ? (
              <p
                role="alert"
                className="text-sm text-rose-600 dark:text-rose-400"
              >
                {hashError}
              </p>
            ) : (
              <output
                aria-live="polite"
                className="block break-all rounded-xl bg-slate-950/[0.04] dark:bg-white/[0.04] p-3 font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300"
              >
                {digest || 'Calculating…'}
              </output>
            )}
          </div>
        </section>

        <section
          aria-labelledby="encryption-demo-title"
          className="glass-card p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-500">
              <FaKey size={18} aria-hidden />
            </div>
            <h2
              id="encryption-demo-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              AES-GCM encryption
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Encrypt a message with a temporary key, then decrypt it. Try
            tampering with the ciphertext to see authenticated encryption reject
            it.
          </p>

          <label
            htmlFor="encryption-message"
            className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2"
          >
            Message
          </label>
          <textarea
            id="encryption-message"
            value={plaintext}
            onChange={(event) => setPlaintext(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-300/70 dark:border-slate-700 bg-white/70 dark:bg-slate-950/40 p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              onClick={encryptMessage}
              disabled={isEncrypting || isDecrypting}
              className="btn btn-primary disabled:opacity-60"
            >
              {isEncrypting ? 'Encrypting…' : 'Encrypt with a new key'}
            </button>
            <button
              type="button"
              onClick={decryptMessage}
              disabled={!encrypted || isEncrypting || isDecrypting}
              className="btn btn-secondary disabled:opacity-60"
            >
              {isDecrypting ? 'Decrypting…' : 'Decrypt'}
            </button>
            {encrypted && (
              <button
                type="button"
                onClick={() => {
                  setTampered((value) => !value);
                  setDecryptedMessage(null);
                  setEncryptionError('');
                }}
                disabled={isEncrypting || isDecrypting}
                className="btn btn-secondary disabled:opacity-60"
              >
                {tampered ? 'Restore ciphertext' : 'Tamper with ciphertext'}
              </button>
            )}
          </div>

          {encrypted && (
            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {tampered
                  ? 'Modified ciphertext (Base64)'
                  : 'Ciphertext (Base64)'}
              </h3>
              <output className="block break-all rounded-xl bg-slate-950/[0.04] dark:bg-white/[0.04] p-3 font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {tampered
                  ? tamperBase64(encrypted.ciphertext)
                  : encrypted.ciphertext}
              </output>
            </div>
          )}

          {encryptionError && (
            <p
              role="alert"
              className="mt-4 text-sm text-rose-600 dark:text-rose-400"
            >
              {encryptionError}
            </p>
          )}
          {decryptedMessage !== null && (
            <p
              aria-live="polite"
              className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-800 dark:text-emerald-300"
            >
              <span className="font-bold">Decrypted message:</span>{' '}
              {decryptedMessage}
            </p>
          )}
        </section>
      </div>

      <section aria-labelledby="why-cryptography-title" className="mt-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
            The theory behind the tools
          </p>
          <h2
            id="why-cryptography-title"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
          >
            What is cryptography for?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Cryptography uses mathematical techniques and secret keys to help
            protect information as it is stored or exchanged. It helps keep data
            confidential, reveal unwanted changes, and prove who created or
            approved a message. It does not make a system secure by itself:
            correct protocols, key management, and implementation matter just as
            much.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Confidentiality',
              text: 'Encryption makes readable data unintelligible without the required key.',
            },
            {
              title: 'Integrity',
              text: 'Authenticated encryption, hashes, and signatures can help detect changes.',
            },
            {
              title: 'Authentication',
              text: 'A verified signature or message authentication code can help establish origin.',
            },
            {
              title: 'Non-repudiation',
              text: 'A digital signature can provide evidence that a key signed data, assuming the key is controlled and trusted.',
            },
          ].map(({ title, text }) => (
            <article key={title} className="glass-card p-5">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="cryptography-types-title" className="mt-16">
        <div className="mb-8">
          <h2
            id="cryptography-types-title"
            className="text-2xl font-bold text-slate-900 dark:text-white"
          >
            The main building blocks
          </h2>
          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Real systems combine these techniques. For example, a secure
            connection can use public-key cryptography to authenticate peers and
            establish shared secrets, then use fast symmetric encryption for the
            conversation.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              number: '01',
              title: 'Symmetric encryption',
              subtitle: 'One shared secret key',
              text: 'The same secret key encrypts and decrypts data. It is efficient for large amounts of information, but the key must be shared and stored securely. Authenticated modes such as AES-GCM also detect tampering.',
              example:
                'In the interactive lab, AES-GCM uses a temporary key generated in your browser. The Python project demonstrates Fernet, which also provides authenticated encryption.',
            },
            {
              number: '02',
              title: 'Asymmetric cryptography',
              subtitle: 'A public and a private key',
              text: 'The public key can be shared, while the private key must be protected. A public-key encryption scheme can protect a short secret for its recipient; digital signatures use a private key to sign and the corresponding public key to verify. They are different operations, and signatures do not hide message contents.',
              example:
                'The Python project demonstrates RSA-OAEP for encrypting a short message and RSA-PSS for signing and verifying one.',
            },
            {
              number: '03',
              title: 'Cryptographic hashes',
              subtitle: 'A fixed-size, one-way digest',
              text: 'A hash maps input of any length to a fixed-length digest. It can help compare data and detect accidental or deliberate changes, but it cannot be decrypted and, by itself, does not prove who produced the data. A plain fast hash such as SHA-256 is not suitable for storing passwords.',
              example:
                'The project shows SHA-256 and SHA-512 digests and how a small input change produces a different digest.',
            },
            {
              number: '04',
              title: 'Digital signatures',
              subtitle: 'Integrity and proof of key ownership',
              text: 'A sender signs data with a private key; a recipient verifies the signature with the corresponding public key. This can establish that the signed data has not changed and that it was signed by the holder of that key. A signature is not encryption and does not keep the data secret.',
              example:
                'The RSA-PSS example in the project verifies the original message and rejects a modified one.',
            },
            {
              number: '05',
              title: 'Hashes in a blockchain',
              subtitle: 'Linking records together',
              text: 'A block can include the previous block’s hash, so changing earlier data also changes the links that follow. This makes tampering detectable when the chain is checked, but hashes alone do not provide consensus, decentralization, or a secure blockchain.',
              example:
                'The project builds a small local chain, validates it, then changes a block to demonstrate detection.',
            },
          ].map(({ number, title, subtitle, text, example }) => (
            <article
              key={number}
              className="glass-card p-5 sm:p-6 grid gap-4 sm:grid-cols-[3.5rem_1fr] items-start"
            >
              <span className="font-mono text-sm font-bold text-primary-600 dark:text-primary-400">
                {number}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {subtitle}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-650 dark:text-slate-300">
                  {text}
                </p>
                <p className="mt-3 border-l-2 border-primary-500/50 pl-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    In the project:
                  </span>{' '}
                  {example}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-500/[0.07] p-5 sm:p-6">
        <h2 className="font-bold text-slate-900 dark:text-white">
          Educational demo only
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-650 dark:text-slate-300">
          These examples run locally in your browser. The AES key is generated
          in memory, is not exportable, and is lost when the page is closed. Do
          not enter personal or secret data or use this demo to protect real
          information. This browser example uses AES-GCM; the linked Python
          project demonstrates Fernet and other concepts, so the implementations
          are related but not identical.
        </p>
      </aside>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Explore the standalone Python examples for symmetric and asymmetric
          encryption, hashes, digital signatures, and a demonstration
          blockchain.
        </p>
        <a
          href="https://github.com/stefanoauciello/cryptography"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary gap-2 inline-flex"
        >
          <FaGithub size={14} aria-hidden />
          View the Cryptography Project
        </a>
      </div>
    </PageLayout>
  );
}

export default Cryptography;
