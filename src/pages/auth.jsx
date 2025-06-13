import { motion } from "framer-motion";
import {
    FaUser,
    FaServer,
    FaCheckCircle,
} from "react-icons/fa";
import containerVariants from "../components/utils";
import BackButton from "../components/back-button.jsx";

const HERO_IMAGE = `${import.meta.env.BASE_URL}auth.png`;


const comparisonRows = [
    ["Subject (sub)", "Human user (user‑id)", "Workload / client (service‑id)"],
    ["Audience (aud)", "Front‑end API (frontend‑api)", "Target micro‑service (orders‑svc)"],
    ["Typical flow", "Auth‑Code + PKCE", "Client‑Credentials or Token‑Exchange"],
    ["Secret", "Password + MFA", "client_secret, mTLS cert, SPIFFE"],
    ["Token TTL", "5–15 min + refresh", "15–60 min (mesh/AS rotation)"],
    ["Delegation", "No (user acts directly)", "Yes: act claim (\"svc‑A on behalf\")"],
    ["Main use", "Web / mobile login", "Micro‑services, cronjobs, IoT"],
];

const bestPractices = [
    "Always validate aud, exp, signature and rotate keys.",
    "Short‑lived tokens: 5–15 min for users, 15–60 min for services.",
    "Centralise policy (OPA, Cedar) and log sub, act & jti.",
    "Prefer workload identity (IAM, SPIFFE) over static secrets.",
];

const tokenExchange = `curl -X POST https://idp.example.com/oauth2/token \\
  -d 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \\
  -d "subject_token=$USER_JWT" \\
  -d 'requested_token_type=access_token' \\
  -d 'audience=service-b' \\
  -d 'scope=payments.read' \\
  -u 'service-a:<client_secret>'`;

const Auth = () => {
    return (
        <motion.section
            className="min-h-screen p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
                <BackButton fallbackTo="/devcorner" />
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    User Authentication vs Machine‑to‑Machine
                </h2>

                <div className="my-6 flex justify-center">
                    <img
                        src={HERO_IMAGE}
                        alt="User vs Machine‑to‑Machine diagram"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
                    />
                </div>

                <p className="text-base sm:text-lg">
                    Separating human authentication from service authentication enables <strong>better
                    security</strong>, <strong>least privilege</strong> and <strong>cleaner code </strong>
                    in modern architectures. Below you’ll find a side‑by‑side comparison, flow diagrams and
                    best practices.
                </p>

                <div className="mt-8 space-y-4 overflow-x-auto">
                    <h3 className="text-2xl font-semibold text-blue-600">Quick Comparison</h3>
                    <table className="min-w-[600px] w-full border border-blue-200 text-sm sm:text-base">
                        <thead>
                        <tr className="bg-blue-100">
                            <th className="p-2 border border-blue-200"></th>
                            <th className="p-2 border border-blue-200">
                                <FaUser className="inline-block mr-1" /> User Auth (OIDC)
                            </th>
                            <th className="p-2 border border-blue-200">
                                <FaServer className="inline-block mr-1" /> M2M Auth
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {comparisonRows.map(([label, user, m2m]) => (
                            <tr key={label} className="odd:bg-white even:bg-blue-50">
                                <td className="p-2 border border-blue-200 font-medium whitespace-nowrap">
                                    {label}
                                </td>
                                <td className="p-2 border border-blue-200">{user}</td>
                                <td className="p-2 border border-blue-200">{m2m}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">User flow: OIDC + PKCE</h3>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Browser is redirected to <code>/authorize</code> with <em>scope</em> & <em>code_challenge</em>.</li>
                        <li>IdP authenticates user (password + MFA) and requests consent.</li>
                        <li>App swaps the code + <em>code_verifier</em> for ID Token and Access Token.</li>
                        <li>Access Token (Bearer) calls API (<code>aud=frontend-api</code>).</li>
                    </ol>
                </div>

                <div className="mt-8 space-y-4 bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-blue-600">M2M flow: Token Exchange</h3>
                    <p><strong>Scenario:</strong> Service A receives a user JWT but needs a token limited to <kbd>service‑B</kbd>.</p>
                    <pre className="bg-blue-50 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap"><code>{tokenExchange}</code></pre>
                    <p>Authorization Server returns a new JWT with:</p>
                    <ul className="space-y-1">
                        <li className="flex items-start"><FaCheckCircle className="text-green-600 mr-2 mt-1" /><span><code>sub = user‑123</code></span></li>
                        <li className="flex items-start"><FaCheckCircle className="text-green-600 mr-2 mt-1" /><span><code>act = service‑a</code> (actor claim)</span></li>
                        <li className="flex items-start"><FaCheckCircle className="text-green-600 mr-2 mt-1" /><span><code>aud = service‑b</code></span></li>
                        <li className="flex items-start"><FaCheckCircle className="text-green-600 mr-2 mt-1" /><span><code>scope = payments.read</code></span></li>
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Best practices</h3>
                    <ul className="space-y-2">
                        {bestPractices.map((item) => (
                            <li key={item} className="flex items-start">
                                <FaCheckCircle className="text-green-600 mr-2 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.section>
    );
};

export default Auth;
