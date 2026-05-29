import { motion } from "framer-motion";
import {
    FaUser,
    FaServer,
    FaCheckCircle,
    FaKey,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

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
    "Always validate aud, exp, signature, and rotate signing keys automatically.",
    "Issue short-lived access tokens: 5–15 min for users, 15–60 min for services.",
    "Decouple policy checks into central tools (OPA, Cedar) and log sub, act & jti values.",
    "Prefer cryptographic workload identities (IAM, SPIFFE) over static clients secrets.",
];

const tokenTypes = [
    {
        label: "ID Token",
        description: "Cryptographic proof of authentication containing profile claims for user interfaces.",
    },
    {
        label: "Access Token",
        description: "Authorizes resource server API calls, conveying permissions scope directly to a target service.",
    },
    {
        label: "Refresh Token",
        description: "Long-lived credentials used to exchange and obtain new access tokens without requiring MFA prompt.",
    },
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
        <PageLayout 
            title="User Auth vs Machine-to-Machine" 
            subtitle="Understand differences in OIDC interactive login vs workload client credentials."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero Diagram */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={HERO_IMAGE}
                        alt="User vs M2M Auth flow diagram"
                        className="w-full max-w-xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Identity Providers Token Exchange & Client Credentials Routing
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        Separating user authentication from service-to-service communication enables granular <strong>least privilege policies</strong> and cleaner backend coding in microservices architectures.
                    </p>
                    <p>
                        While users authorize applications via browser redirects and MFA checks, services authenticate autonomously in the background. Understanding how to manage tokens for both paths prevents credential leakage and simplifies compliance audits.
                    </p>
                </div>

                {/* Table Section */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Quick Comparison
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-250/40 dark:border-slate-800/40">
                        <table className="min-w-[650px] w-full text-left border-collapse text-sm sm:text-base">
                            <thead>
                                <tr className="bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-100">
                                    <th className="p-3 font-bold">Property</th>
                                    <th className="p-3 font-bold">
                                        <FaUser className="inline mr-2 text-primary-500" size={14} /> User Auth (OIDC)
                                    </th>
                                    <th className="p-3 font-bold">
                                        <FaServer className="inline mr-2 text-secondary-500" size={14} /> M2M Auth
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-850/20 text-slate-650 dark:text-slate-350">
                                {comparisonRows.map(([label, user, m2m]) => (
                                    <tr key={label} className="hover:bg-slate-100/20 dark:hover:bg-slate-800/10 transition-colors">
                                        <td className="p-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap bg-slate-50/20 dark:bg-slate-950/10">
                                            {label}
                                        </td>
                                        <td className="p-3">{user}</td>
                                        <td className="p-3">{m2m}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Flow 1: User Auth */}
                <div className="glass-card p-6 border border-slate-200/35 dark:border-slate-800/35 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-500" /> User Flow: OIDC + PKCE
                    </h3>
                    <ol className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-4 text-sm sm:text-base">
                        <li>
                            <strong className="text-slate-800 dark:text-slate-200 block">1. Redirect Challenge</strong>
                            <span className="text-slate-600 dark:text-slate-450 block mt-0.5">
                                User acts on a website. The client browser redirects to <code>/authorize</code> endpoint, presenting a hashed <em>code_challenge</em> query.
                            </span>
                        </li>
                        <li>
                            <strong className="text-slate-800 dark:text-slate-200 block">2. Identity Authentication</strong>
                            <span className="text-slate-600 dark:text-slate-450 block mt-0.5">
                                Identity Provider (IdP) prompts user credentials (and MFA keys), recording validation consent before redirecting back with a temporary authorization code.
                            </span>
                        </li>
                        <li>
                            <strong className="text-slate-800 dark:text-slate-200 block">3. Code-Verifying Swap</strong>
                            <span className="text-slate-600 dark:text-slate-450 block mt-0.5">
                                The client backend intercepts the code and calls the IdP token endpoint directly, presenting the original raw <em>code_verifier</em> to obtain access and ID tokens.
                            </span>
                        </li>
                    </ol>
                </div>

                {/* Flow 2: Token Exchange */}
                <div className="glass-card p-6 border border-slate-200/35 dark:border-slate-800/35 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-secondary-500" /> M2M Flow: Token Exchange
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1">
                            Scenario: Service A receives a user JWT, but must invoke Service B with a token narrowed to payments scope.
                        </p>
                    </div>

                    <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-900 shadow-inner font-mono text-xs sm:text-sm p-4 text-left">
                        <pre className="text-violet-400 leading-relaxed">
                            <span className="text-slate-405">curl -X POST</span> <span className="text-amber-300">https://idp.example.com/oauth2/token</span> <span className="text-slate-500">\\</span>
                            <br />
                            {`  `}
                            <span className="text-slate-405">-d</span> <span className="text-emerald-300">'grant_type=urn:ietf:params:oauth:grant-type:token-exchange'</span> <span className="text-slate-500">\\</span>
                            <br />
                            {`  `}
                            <span className="text-slate-405">-d</span> <span className="text-emerald-300">"subject_token=$USER_JWT"</span> <span className="text-slate-500">\\</span>
                            <br />
                            {`  `}
                            <span className="text-slate-405">-d</span> <span className="text-emerald-300">'requested_token_type=access_token'</span> <span className="text-slate-500">\\</span>
                            <br />
                            {`  `}
                            <span className="text-slate-405">-d</span> <span className="text-emerald-300">'audience=service-b'</span> <span className="text-slate-500">\\</span>
                            <br />
                            {`  `}
                            <span className="text-slate-405">-d</span> <span className="text-emerald-300">'scope=payments.read'</span> <span className="text-slate-500">\\</span>
                            <br />
                            {`  `}
                            <span className="text-slate-405">-u</span> <span className="text-emerald-300">'service-a:&lt;client_secret&gt;'</span>
                        </pre>
                    </div>

                    <div className="space-y-2 pt-2 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                        <p>The Authorization Server exchanges the payload and returns a token asserting:</p>
                        <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 flex-shrink-0" size={14} /><span><code>sub = user‑123</code> (delegating subject)</span></li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 flex-shrink-0" size={14} /><span><code>act = service‑a</code> (delegating actor)</span></li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 flex-shrink-0" size={14} /><span><code>aud = service‑b</code> (restricted target)</span></li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 flex-shrink-0" size={14} /><span><code>scope = payments.read</code> (narrowed scope)</span></li>
                        </ul>
                    </div>
                </div>

                {/* Token Types */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        OAuth2 Token Types
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {tokenTypes.map((tok) => (
                            <div 
                                key={tok.label} 
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3"
                            >
                                <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl w-fit">
                                    <FaKey size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                        {tok.label}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                                        {tok.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best Practices */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Security Best Practices
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {bestPractices.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-450 mt-1 flex-shrink-0" size={16} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
};

export default Auth;
