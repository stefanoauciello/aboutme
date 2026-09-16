import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUser,
    FaServer,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowRight,
    FaCode,
    FaKey,
    FaShieldAlt,
    FaLock,
    FaFingerprint,
    FaExchangeAlt,
    FaLaptopCode,
    FaUserCheck,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const userAuthFlow = [
    {
        stepNumber: "01",
        name: "Redirect & PKCE Challenge",
        shortName: "PKCE Challenge",
        tech: "Browser / SPA / Mobile",
        icon: FaLaptopCode,
        color: "text-blue-500",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        badge: "Authorization Code",
        tagline: "Generates high-entropy code_verifier and SHA256 code_challenge",
        role: "The browser client redirects the user to the Identity Provider (IdP) `/authorize` endpoint, presenting a hashed `code_challenge`. This eliminates the need for hardcoded client secrets in frontend apps.",
        specs: [
            { label: "Protocol", value: "OAuth 2.1 / OIDC Core" },
            { label: "Security Guard", value: "PKCE (RFC 7636) prevents code interception" },
            { label: "Secret Exposure", value: "Zero static credentials stored in browser" },
        ],
    },
    {
        stepNumber: "02",
        name: "Identity Proof & MFA",
        shortName: "IdP Verification",
        tech: "Passkeys / WebAuthn / TOTP",
        icon: FaFingerprint,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Human Identity",
        tagline: "Authenticates human subject and issues ephemeral one-time auth code",
        role: "The IdP prompts the human user for credentials, hardware passkeys, or biometric MFA. Upon consent, the IdP returns a short-lived authorization code (30s TTL) back to the client callback URL.",
        specs: [
            { label: "Authentication Factor", value: "FIDO2 / WebAuthn / Passkeys / MFA" },
            { label: "Auth Code TTL", value: "30 seconds (single-use)" },
            { label: "Consent Registry", value: "Explicit user-approved permission scopes" },
        ],
    },
    {
        stepNumber: "03",
        name: "Code-Verifier Swap",
        shortName: "Token Exchange",
        tech: "BFF / Backend API",
        icon: FaExchangeAlt,
        color: "text-purple-500",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        badge: "Cryptographic Proof",
        tagline: "Exchanges one-time authorization code with raw code_verifier",
        role: "The client backend (or Backend-For-Frontend proxy) calls the IdP `/oauth2/token` endpoint directly, submitting the authorization code and original plaintext `code_verifier` for cryptographic validation.",
        specs: [
            { label: "Transport", value: "Direct back-channel HTTPS POST" },
            { label: "Verification", value: "SHA256(verifier) === code_challenge" },
            { label: "Replay Defense", value: "Codes are immediately invalidated on use" },
        ],
    },
    {
        stepNumber: "04",
        name: "Dual Token Issuance",
        shortName: "Token Minting",
        tech: "Signed RS256 / Ed25519 JWTs",
        icon: FaKey,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "ID & Access Tokens",
        tagline: "Issues signed ID Token for UI profile and Access Token for APIs",
        role: "The IdP issues an ID Token (profile claims: name, email, roles) and a short-lived Access Token (API authorization scopes). Optionally returns a secure Refresh Token stored in an HttpOnly cookie.",
        specs: [
            { label: "ID Token", value: "Identity assertion for client UI (JWT)" },
            { label: "Access Token", value: "Authorization proof for Resource Servers" },
            { label: "Access Token TTL", value: "Short-lived: 5 - 15 minutes" },
        ],
    },
    {
        stepNumber: "05",
        name: "Resource Server Verification",
        shortName: "API Gateway",
        tech: "JWKS / OPA / Envoy",
        icon: FaShieldAlt,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "Stateless Verification",
        tagline: "Validates digital signature, audience, and expiry locally via JWKS",
        role: "Downstream API Gateways validate the access token locally using cached JSON Web Key Sets (JWKS) public keys. Checks expiration (`exp`), audience (`aud`), and permissions (`scope`) with zero latency.",
        specs: [
            { label: "Validation Model", value: "Stateless local signature verification" },
            { label: "Key Discovery", value: "Cached RFC 7517 JWKS endpoint" },
            { label: "Enforcement", value: "Role-Based & Attribute-Based Access Control" },
        ],
    },
];

const m2mAuthFlow = [
    {
        stepNumber: "01",
        name: "Workload Identification",
        shortName: "Workload Identity",
        tech: "SPIFFE / mTLS / IAM Role",
        icon: FaServer,
        color: "text-rose-500",
        border: "border-rose-500/30",
        bg: "bg-rose-500/10",
        badge: "Zero Secret Leaks",
        tagline: "Uses cryptographic identity instead of static long-lived credentials",
        role: "Service A needs to communicate autonomously with Service B. Rather than hardcoding static client secrets, it leverages Kubernetes Workload Identity, SPIFFE X.509 certificates, or private key JWT assertions.",
        specs: [
            { label: "Identity Mechanism", value: "X.509 SVID / AWS IAM / Private Key JWT" },
            { label: "Secret Exposure", value: "Zero static API keys stored in source code" },
            { label: "Lifecycle", value: "Automatically rotated ephemeral certificates" },
        ],
    },
    {
        stepNumber: "02",
        name: "Client Credentials Grant",
        shortName: "OAuth2 Token POST",
        tech: "Auth Server / Keycloak / Okta",
        icon: FaLock,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Machine Trust",
        tagline: "Requests an audience-restricted access token directly from auth server",
        role: "Service A executes `grant_type=client_credentials` against the Authorization Server, strictly requesting the target service audience (`aud=orders-service`) and minimal required machine scopes.",
        specs: [
            { label: "Grant Type", value: "RFC 6749 Client Credentials" },
            { label: "Audience Binding", value: "Strict target audience limitation" },
            { label: "Scope Boundary", value: "Coarse machine permissions (e.g. read:orders)" },
        ],
    },
    {
        stepNumber: "03",
        name: "Token Exchange & Delegation",
        shortName: "RFC 8693 Exchange",
        tech: "OAuth Token Exchange",
        icon: FaExchangeAlt,
        color: "text-purple-500",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        badge: "Actor & Subject",
        tagline: "Narrows permissions and maintains audit trail across microservices",
        role: "When Service A acts on behalf of an end-user, it executes an RFC 8693 Token Exchange. It mints an internal token embedding both the original subject (`sub=user_123`) and the delegating actor (`act=service_a`).",
        specs: [
            { label: "Specification", value: "RFC 8693 OAuth 2.0 Token Exchange" },
            { label: "Audit Trace", value: "Preserves user subject & caller service identity" },
            { label: "Scope Attenuation", value: "Downscopes broad user token to single task" },
        ],
    },
    {
        stepNumber: "04",
        name: "Mutual TLS Transport",
        shortName: "mTLS Pipe",
        tech: "Istio / Linkerd / Envoy",
        icon: FaShieldAlt,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Zero-Trust Wire",
        tagline: "Encrypted wire encryption and bi-directional cryptographic verification",
        role: "Service A connects to Service B over Mutual TLS (mTLS). Both client and server authenticate each other's certificates at the network layer, preventing Man-in-the-Middle eavesdropping and network spoofing.",
        specs: [
            { label: "Network Layer", value: "Mutual TLS (X.509 bi-directional)" },
            { label: "Mesh Integration", value: "Envoy Sidecar automatic proxying" },
            { label: "Encryption", value: "Full wire encryption in transit" },
        ],
    },
    {
        stepNumber: "05",
        name: "Fine-Grained Authorization",
        shortName: "Target Service",
        tech: "Open Policy Agent (OPA) / Cedar",
        icon: FaUserCheck,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "ABAC / RBAC Policy",
        tagline: "Enforces least privilege based on tenant, actor, and caller identity",
        role: "Service B validates the M2M token signature and delegates policy enforcement to an embedded authorization engine (OPA/Cedar). Verifies tenant boundaries and actor permissions before executing the action.",
        specs: [
            { label: "Authorization Model", value: "Decoupled Attribute-Based Access Control" },
            { label: "Token TTL", value: "15 to 60 minutes" },
            { label: "Audit Log", value: "Logs caller service, actor claim, and correlation ID" },
        ],
    },
];

const comparisonData = [
    {
        dimension: "Subject Principal (sub)",
        user: "Human user identity (e.g. user_uuid, email)",
        m2m: "Machine workload / Service account identifier (e.g. orders-worker)",
    },
    {
        dimension: "Target Audience (aud)",
        user: "Frontend API gateway or general application realm",
        m2m: "Strictly bound to downstream microservice (e.g. payment-svc)",
    },
    {
        dimension: "Primary OAuth Flow",
        user: "Authorization Code + PKCE (RFC 7636)",
        m2m: "Client Credentials (RFC 6749) or Token Exchange (RFC 8693)",
    },
    {
        dimension: "Credentials & Factors",
        user: "Passkeys, WebAuthn, Passwords, Biometrics, TOTP MFA",
        m2m: "mTLS X.509 certs, SPIFFE SVIDs, Private-Key JWTs, IAM Roles",
    },
    {
        dimension: "Token Lifetime & Refresh",
        user: "Short-lived (5-15m) paired with rotating Refresh Tokens",
        m2m: "Short-lived (15-60m) refreshed automatically by workload engine",
    },
    {
        dimension: "Delegation & Provenance",
        user: "User acts directly; no intermediate actor",
        m2m: "Explicit actor claim ('act') recording which service acts on user's behalf",
    },
    {
        dimension: "Threat Model & Attacks",
        user: "Phishing, credential stuffing, session hijacking, XSS",
        m2m: "Hardcoded secret leaks in Git, SSRF token theft, over-privileged scopes",
    },
];

const sampleTokens = {
    userIdToken: {
        title: "User ID Token (OIDC Claims)",
        desc: "Minted for the client application to display user identity, roles, and verified authentication methods without querying backend databases.",
        code: `{
  "iss": "https://auth.company.com",
  "sub": "usr_99812401-bc8e",
  "aud": "frontend-web-app",
  "exp": 1789551300,
  "iat": 1789550400,
  "auth_time": 1789550395,
  "nonce": "n-0S6_WzA2Mj",
  "name": "Stefano Auciello",
  "email": "stefano@example.com",
  "email_verified": true,
  "amr": ["pwd", "fido2", "mfa"],
  "roles": ["engineer", "admin"]
}`,
    },
    m2mToken: {
        title: "Machine-to-Machine Scoped Access Token",
        desc: "Issued via Client Credentials or SPIFFE federation. Strictly bound to the target service audience with least-privilege machine permissions.",
        code: `{
  "iss": "https://auth.company.com",
  "sub": "svc_order_processor",
  "aud": "https://api.company.com/v1/payments",
  "exp": 1789554000,
  "iat": 1789550400,
  "jti": "jwt_m2m_881923019",
  "client_id": "service_order_processor",
  "token_type": "Bearer",
  "scope": "payments:charge payments:refund",
  "tenant_id": "tenant_enterprise_01"
}`,
    },
    tokenExchange: {
        title: "RFC 8693 Token Exchange (Delegation with Actor Claim)",
        desc: "Allows Service A to invoke Service B on behalf of an end-user. Contains both the original human subject and the delegating service actor in the 'act' claim.",
        code: `{
  "iss": "https://auth.company.com",
  "sub": "usr_99812401-bc8e",
  "aud": "https://api.company.com/v1/inventory",
  "exp": 1789551300,
  "iat": 1789550400,
  "scope": "inventory:reserve",
  "act": {
    "sub": "svc_order_processor",
    "iss": "https://auth.company.com"
  },
  "client_id": "service_order_processor",
  "delegation_chain": ["frontend-bff", "svc_order_processor"]
}`,
    },
};

const securityPillars = [
    {
        icon: FaShieldAlt,
        title: "Automated JWKS Public Key Rotation",
        description: "Resource servers cache JSON Web Key Sets (JWKS) locally and rotate signing keys automatically without requiring code deployments or scheduled downtime.",
        tech: "RFC 7517 JWKS + In-Memory Caching",
    },
    {
        icon: FaExchangeAlt,
        title: "Downscoped Token Exchange (RFC 8693)",
        description: "Never forward wide-scope user tokens deep into microservice graphs. Exchange broad tokens for narrowed, audience-bound tokens asserting specific 'act' actor claims.",
        tech: "RFC 8693 OAuth 2.0 Token Exchange",
    },
    {
        icon: FaLock,
        title: "Zero Static Secrets with SPIFFE / mTLS",
        description: "Replace hardcoded static client secrets in config files with cryptographically verifiable workload identities (SPIFFE SVIDs) injected directly into container runtimes.",
        tech: "SPIFFE / SPIRE + Istio Mutual TLS",
    },
    {
        icon: FaServer,
        title: "Decoupled Authorization (OPA / Cedar)",
        description: "Separate identity tokens from business authorization logic. Microservices validate token claims and delegate policy evaluation to Open Policy Agent (OPA) or Cedar.",
        tech: "Open Policy Agent (OPA) / AWS Cedar",
    },
];

const ecosystemTools = [
    {
        category: "Identity Providers & Auth Servers",
        tools: "Keycloak, Okta, Auth0, Zitadel, AWS Cognito, Ory Hydra / Kratos",
    },
    {
        category: "Workload Identity & Service Mesh",
        tools: "SPIFFE / SPIRE, Istio (mTLS), Linkerd, HashiCorp Consul, AWS IAM Roles for Service Accounts (IRSA)",
    },
    {
        category: "Policy Engines & Fine-Grained Auth",
        tools: "Open Policy Agent (OPA / Rego), AWS Cedar, OpenFGA, Permit.io, Cerbos",
    },
    {
        category: "Standards & Specifications",
        tools: "OAuth 2.1, OIDC Core 1.0, RFC 7636 (PKCE), RFC 8693 (Token Exchange), RFC 7519 (JWT)",
    },
];

export default function Auth() {
    const [authMode, setAuthMode] = useState("user"); // "user" | "m2m"
    const [selectedStageIndex, setSelectedStageIndex] = useState(0);
    const [activeTokenTab, setActiveTokenTab] = useState("tokenExchange");

    const currentFlow = authMode === "user" ? userAuthFlow : m2mAuthFlow;
    const activeStage = currentFlow[selectedStageIndex] || currentFlow[0];

    const handleModeSwitch = (mode) => {
        setAuthMode(mode);
        setSelectedStageIndex(0);
    };

    return (
        <PageLayout 
            title="User Auth vs. Machine-to-Machine (M2M)" 
            subtitle="Master modern authentication: OIDC interactive flows with PKCE vs. zero-trust workload identities and token exchange."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero / Dual-Mode Interactive Architecture Topology */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                                Interactive Identity Topology
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                {authMode === "user" ? "User Authentication Flow (OIDC + PKCE)" : "Workload Identity & M2M Flow (mTLS / Token Exchange)"}
                            </h3>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60 w-fit">
                            <button
                                onClick={() => handleModeSwitch("user")}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    authMode === "user"
                                        ? "bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                }`}
                            >
                                <FaUser size={12} />
                                <span>User (OIDC)</span>
                            </button>
                            <button
                                onClick={() => handleModeSwitch("m2m")}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    authMode === "m2m"
                                        ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                }`}
                            >
                                <FaServer size={12} />
                                <span>Workload (M2M)</span>
                            </button>
                        </div>
                    </div>

                    {/* Pipeline Stage Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {currentFlow.map((stage, idx) => {
                            const Icon = stage.icon;
                            const isSelected = selectedStageIndex === idx;
                            return (
                                <button
                                    key={stage.stepNumber}
                                    onClick={() => setSelectedStageIndex(idx)}
                                    className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                                        isSelected
                                            ? authMode === "user" 
                                                ? "bg-primary-500/15 border-primary-500 shadow-md shadow-primary-500/10 ring-1 ring-primary-500/40"
                                                : "bg-rose-500/15 border-rose-500 shadow-md shadow-rose-500/10 ring-1 ring-rose-500/40"
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-xs font-mono font-bold ${authMode === "user" ? "text-primary-500 dark:text-primary-400" : "text-rose-500 dark:text-rose-400"}`}>
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${authMode === "user" ? "bg-primary-400" : "bg-rose-400"}`}></span>
                                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${authMode === "user" ? "bg-primary-500" : "bg-rose-500"}`}></span>
                                                </span>
                                            )}
                                        </div>
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${stage.bg} ${stage.color}`}>
                                            <Icon size={16} />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                                            {stage.shortName}
                                        </h4>
                                    </div>
                                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 truncate">
                                        {stage.tech}
                                    </p>

                                    {/* Arrow connector for large screens */}
                                    {idx < currentFlow.length - 1 && (
                                        <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-600 pointer-events-none">
                                            <FaArrowRight size={10} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Stage Detail Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${authMode}-${activeStage.stepNumber}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="p-5 sm:p-6 rounded-xl bg-slate-100/60 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 space-y-4"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800/60 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-lg ${activeStage.bg} ${activeStage.color}`}>
                                        <activeStage.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                                            {activeStage.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {activeStage.tagline}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${
                                    authMode === "user" 
                                        ? "text-primary-600 dark:text-primary-400 bg-primary-500/10 border-primary-500/20" 
                                        : "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
                                }`}>
                                    {activeStage.badge}
                                </span>
                            </div>

                            <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                                {activeStage.role}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                {activeStage.specs.map((spec) => (
                                    <div 
                                        key={spec.label}
                                        className="p-3 rounded-lg bg-white/70 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50"
                                    >
                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                                            {spec.label}
                                        </p>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Main Narrative */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        In distributed microservices, confusing <strong>User Authentication</strong> with <strong>Machine-to-Machine (M2M) Authorization</strong> is one of the most pervasive sources of credential leakage and architectural security debt.
                    </p>
                    <p>
                        <strong>User Authentication (OIDC)</strong> is designed around human interactions: validating physical identity factors (passwords, WebAuthn passkeys, biometric MFA) and establishing temporary session contexts via secure browser redirects. Conversely, <strong>Machine-to-Machine (M2M)</strong> operates in zero-trust backend environments where microservices, background daemons, and IoT devices authenticate autonomously using cryptographic workload identities (SPIFFE, mTLS, or private-key JWTs) with zero human intervention.
                    </p>
                </div>

                {/* Comparison Section: User Auth vs M2M */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest bg-secondary-500/10 px-3 py-1 rounded-full border border-secondary-500/20">
                            Identity Protocol Matrix
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            User Authentication (OIDC) vs. Machine-to-Machine (M2M)
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-800/50 glass-card">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                    <th className="p-4 font-bold text-slate-900 dark:text-white w-1/4">Evaluation Dimension</th>
                                    <th className="p-4 font-bold text-primary-600 dark:text-primary-400 w-3/8">
                                        <FaUser className="inline mr-1.5" size={13} />
                                        User Auth (OIDC + PKCE)
                                    </th>
                                    <th className="p-4 font-bold text-rose-600 dark:text-rose-400 w-3/8">
                                        <FaServer className="inline mr-1.5" size={13} />
                                        Machine-to-Machine (M2M)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                                {comparisonData.map((item) => (
                                    <tr key={item.dimension} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                                            {item.dimension}
                                        </td>
                                        <td className="p-4 text-slate-650 dark:text-slate-350">
                                            {item.user}
                                        </td>
                                        <td className="p-4 text-slate-650 dark:text-slate-350 font-medium">
                                            {item.m2m}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Token Delegation & RFC 8693 Section */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6 bg-gradient-to-br from-slate-50/70 to-slate-100/40 dark:from-slate-900/50 dark:to-slate-950/40">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 dark:text-rose-400 mt-1">
                            <FaExchangeAlt size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                                Delegation & Provenance
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Secure Delegation: Avoiding Wide-Scope Token Forwarding
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        A critical vulnerability in microservices is <strong>token forwarding</strong>: when Service A receives an end-user JWT and forwards that exact same token downstream to Service B and Service C. This violates least privilege and allows compromised internal services to impersonate the user across all system domains.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                                <FaTimesCircle size={15} />
                                <span>The Dangerous Pass-Through Antipattern</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Frontend calls Order Service with a broad user token. Order Service forwards that token to Payment Service and Inventory Service. If Inventory Service is compromised, an attacker uses the forwarded user token to trigger unauthorized refunds.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                <FaCheckCircle size={15} />
                                <span>The RFC 8693 Token Exchange Fix</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                                Order Service calls the Auth Server via <strong>Token Exchange</strong>. It downscopes the token strictly for the Inventory target (`aud=inventory`), embedding an actor claim (<code className="text-emerald-500 font-mono text-xs">act: &#123;sub: &quot;order-service&quot;&#125;</code>) to preserve full zero-trust provenance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Token Claims Inspector */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Decoded JWT Claims Inspector
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Inspecting Token Payloads & Security Claims
                            </h3>
                        </div>

                        {/* Artifact Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                            {Object.keys(sampleTokens).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTokenTab(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        activeTokenTab === key
                                            ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                                >
                                    {key === "userIdToken" ? "User ID Token" : key === "m2mToken" ? "M2M Scoped Token" : "Token Exchange (act)"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {sampleTokens[activeTokenTab].title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                            {sampleTokens[activeTokenTab].desc}
                        </p>
                    </div>

                    {/* Code Display */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-300/40 dark:border-slate-800/80 bg-slate-950 font-mono text-xs text-slate-200 p-4 shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <FaCode size={13} className="text-rose-400" />
                                <span>jwt-payload: {activeTokenTab}.json</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                application/jwt
                            </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 font-mono text-[11px] sm:text-xs">
                            {sampleTokens[activeTokenTab].code}
                        </pre>
                    </div>
                </div>

                {/* Security Best Practices Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Production Security Best Practices
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {securityPillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div 
                                    key={pillar.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all"
                                >
                                    <div className="space-y-2.5">
                                        <div className="p-2.5 bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-xl w-fit">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 bg-rose-500/5 px-2.5 py-1 rounded border border-rose-500/15 w-fit">
                                        {pillar.tech}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Modern Ecosystem & Tooling */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Modern Identity & Access Ecosystem
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {ecosystemTools.map((tech) => (
                            <div 
                                key={tech.category} 
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex items-start gap-3.5"
                            >
                                <div className="p-2 bg-secondary-500/10 text-secondary-500 dark:text-secondary-400 rounded-lg mt-0.5">
                                    <FaServer size={14} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                        {tech.category}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-0.5 leading-relaxed font-mono">
                                        {tech.tools}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Takeaway Card */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-4 text-center bg-gradient-to-b from-rose-500/5 to-transparent">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            Zero-Trust Identity Architecture
                        </h3>
                        <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                            Combining OIDC with PKCE on the frontend and workload identity federation (SPIFFE, mTLS, Token Exchange) on the backend ensures that every human request is authenticated securely, and every microservice interaction operates with verified, least-privilege provenance.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
                            {["OIDC", "OAuth 2.1 PKCE", "mTLS", "SPIFFE/SPIRE", "RFC 8693 Token Exchange", "Open Policy Agent"].map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-350 border border-slate-300/40 dark:border-slate-700/40"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
