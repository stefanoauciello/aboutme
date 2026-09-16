import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCloud,
    FaCubes,
    FaCodeBranch,
    FaCheckCircle,
    FaArrowRight,
    FaCode,
    FaShieldAlt,
    FaSyncAlt,
    FaTerminal,
    FaLock,
    FaLayerGroup,
    FaCube,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const iacLifecycleStages = [
    {
        id: "definition",
        stepNumber: "01",
        name: "Declarative Code & Constructs",
        shortName: "Code Definition",
        tech: "HCL / TypeScript / Python",
        icon: FaCode,
        color: "text-sky-500",
        border: "border-sky-500/30",
        bg: "bg-sky-500/10",
        badge: "Version Controlled",
        tagline: "Define cloud topologies as modular, testable code checked into Git",
        role: "Engineers declare cloud resources, network topologies, and IAM policies in code rather than clicking through cloud consoles. Terraform leverages HashiCorp Configuration Language (HCL) for pure declarative specs, while AWS CDK uses real programming languages (TypeScript, Python) to compose multi-resource constructs.",
        specs: [
            { label: "Authoring Syntax", value: "Declarative (HCL) or Imperative Constructs (TypeScript)" },
            { label: "Source of Truth", value: "Git repository with peer code review" },
            { label: "Modularity", value: "Reusable Terraform Modules or CDK Construct Libraries" },
        ],
    },
    {
        id: "synthesis",
        stepNumber: "02",
        name: "Synthesis & Graph Compilation",
        shortName: "Synthesis & Graph",
        tech: "cdk synth / terraform validate",
        icon: FaLayerGroup,
        color: "text-indigo-500",
        border: "border-indigo-500/30",
        bg: "bg-indigo-500/10",
        badge: "DAG Resolution",
        tagline: "Compiles code into a Directed Acyclic Graph (DAG) of resource dependencies",
        role: "The IaC engine parses declarations and builds a dependency graph. CDK executes high-level constructs and synthesizes raw AWS CloudFormation JSON/YAML templates. Terraform evaluates variables, providers, and resource references to construct an execution DAG.",
        specs: [
            { label: "Compilation Output", value: "CloudFormation template (CDK) or Resource Graph (Terraform)" },
            { label: "Dependency Model", value: "Explicit & implicit Directed Acyclic Graph (DAG)" },
            { label: "Type Checking", value: "Static compiler verification & syntax validation" },
        ],
    },
    {
        id: "diff",
        stepNumber: "03",
        name: "Drift Audit & Speculative Diff",
        shortName: "Plan & Diff",
        tech: "terraform plan / cdk diff",
        icon: FaTerminal,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Zero-Surprise Execution",
        tagline: "Generates an exact execution plan comparing desired state against live state",
        role: "Before touching live cloud infrastructure, the engine queries cloud provider APIs and current state to compute a dry-run delta. It highlights precisely which resources will be created (+), modified (~), or destroyed (-), preventing accidental outages and configuration drift.",
        specs: [
            { label: "Terraform Command", value: "`terraform plan -out=tfplan`" },
            { label: "AWS CDK Command", value: "`cdk diff`" },
            { label: "Drift Detection", value: "Discrepancies between remote reality and state logged" },
        ],
    },
    {
        id: "provisioning",
        stepNumber: "04",
        name: "Atomic Engine Execution",
        shortName: "Cloud Provisioning",
        tech: "terraform apply / cdk deploy",
        icon: FaCloud,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Idempotent Mutation",
        tagline: "Applies mutations against cloud APIs concurrently respecting the dependency graph",
        role: "The engine authenticates against cloud provider endpoints (AWS, Azure, GCP) and initiates parallel creation and updates. CDK hands off the synthesized template to the AWS CloudFormation orchestration engine, while Terraform directly calls provider SDKs with state locking.",
        specs: [
            { label: "Execution Engine", value: "Direct Provider APIs (Terraform) vs CloudFormation (CDK)" },
            { label: "Concurrency", value: "Parallel deployment along graph edges" },
            { label: "Rollback Strategy", value: "Automatic CFn rollback (CDK) or targeted undo (Terraform)" },
        ],
    },
    {
        id: "state",
        stepNumber: "05",
        name: "State Ledger & Locking",
        shortName: "State & Lock",
        tech: "S3 + DynamoDB / CloudFormation State",
        icon: FaLock,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "Distributed Concurrency",
        tagline: "Records immutable resource metadata and prevents conflicting runs",
        role: "Maintains a distributed mapping between declared code and physical cloud resource IDs. Terraform uses a remote state file (`.tfstate`) secured in Amazon S3 with DynamoDB distributed mutex locks. CDK delegates state persistence directly to the managed CloudFormation backend.",
        specs: [
            { label: "State Backend", value: "Remote object store (S3/GCS) or Cloud Service Ledger" },
            { label: "Concurrency Lock", value: "DynamoDB distributed lock to prevent race conditions" },
            { label: "Encryption", value: "KMS server-side encryption at rest + TLS in transit" },
        ],
    },
];

const codeExamples = {
    terraform: {
        title: "Terraform (HCL) — Declarative Infrastructure",
        desc: "Declarative syntax specifying the desired end-state. Terraform reconciles this against the state ledger to create a secure, encrypted S3 bucket with strict public access blocks.",
        filename: "main.tf",
        language: "hcl",
        code: `# Configure AWS Provider with default tags
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "corp-terraform-state-prod"
    key            = "services/data-lake/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Project     = "DataPlatform"
    }
  }
}

# S3 Bucket with Server-Side KMS Encryption
resource "aws_s3_bucket" "data_lake" {
  bucket        = "corp-analytics-datalake-\${var.environment}"
  force_destroy = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "kms_encryption" {
  bucket = aws_s3_bucket.data_lake.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = var.kms_key_arn
      sse_algorithm     = "aws:kms"
    }
  }
}

# Block all public ingress access
resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.data_lake.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# IAM Policy Document granting least-privilege read
data "aws_iam_policy_document" "read_policy" {
  statement {
    actions   = ["s3:GetObject", "s3:ListBucket"]
    resources = [
      aws_s3_bucket.data_lake.arn,
      "\${aws_s3_bucket.data_lake.arn}/*"
    ]
  }
}`,
    },
    cdk: {
        title: "AWS CDK (TypeScript) — Imperative Constructs & Type Safety",
        desc: "Full software engineering capabilities (classes, loops, auto-completion, tests) synthesizing declarative CloudFormation under the hood with intelligent high-level (L2) defaults.",
        filename: "data-lake-stack.ts",
        language: "typescript",
        code: `import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DataLakeStackProps extends cdk.StackProps {
  readonly environment: 'dev' | 'staging' | 'prod';
  readonly kmsKeyArn: string;
}

export class DataLakeStack extends cdk.Stack {
  public readonly bucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: DataLakeStackProps) {
    super(scope, id, props);

    // Import centralized KMS Key
    const encryptionKey = kms.Key.fromKeyArn(this, 'DataLakeKmsKey', props.kmsKeyArn);

    // L2 Construct: Sensible secure defaults out-of-the-box
    this.bucket = new s3.Bucket(this, 'AnalyticsDataLake', {
      bucketName: \`corp-analytics-datalake-\${props.environment}\`,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: encryptionKey,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: props.environment === 'prod',
      removalPolicy: props.environment === 'prod' 
        ? cdk.RemovalPolicy.RETAIN 
        : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: props.environment !== 'prod',
    });

    // CDK least-privilege helper: automatically generates minimal IAM statements!
    const processingRole = new iam.Role(this, 'DataProcessingRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      description: 'IAM role for processing workers reading from the data lake',
    });

    // In CDK, 1 line replaces 20 lines of raw JSON IAM policy
    this.bucket.grantRead(processingRole);

    // Stack output
    new cdk.CfnOutput(this, 'DataLakeBucketArn', {
      value: this.bucket.bucketArn,
      exportName: \`\${props.environment}-datalake-arn\`,
    });
  }
}`,
    },
    workflow: {
        title: "CLI Execution Workflow Comparison",
        desc: "Side-by-side terminal lifecycle commands showing how developers inspect, diff, test, and release infrastructure changes in CI/CD pipelines.",
        filename: "terminal-lifecycle.sh",
        language: "bash",
        code: `========================================================================
1. TERRAFORM LIFECYCLE (Provider Engine + State File)
========================================================================
# Initialize provider plugins and remote S3 backend
$ terraform init -backend-config="backend.tfvars"

# Validate syntax and configuration integrity
$ terraform validate

# Generate a deterministic execution plan & inspect drift
$ terraform plan -out=production.tfplan

# Apply the approved plan atomically with state locking
$ terraform apply "production.tfplan"

# Query live outputs or force drift detection
$ terraform refresh
$ terraform state list


========================================================================
2. AWS CDK LIFECYCLE (CloudFormation Synthesis & Deploy)
========================================================================
# Compile TypeScript and synthesize CloudFormation template
$ cdk synth DataLakeStack-prod

# Compare deployed CloudFormation stack against local constructs
$ cdk diff DataLakeStack-prod

# Run automated unit and assertion tests (Jest / cdk-nag)
$ npm test

# Deploy change set through CloudFormation with rollback protection
$ cdk deploy DataLakeStack-prod --require-approval broadening

# Inspect synthesized CloudFormation assets
$ ls -la cdk.out/`,
    },
};

const iacPillars = [
    {
        icon: FaCodeBranch,
        title: "Version Control & Peer Review",
        description: "Every VPC route, database cluster, and DNS record is tracked in Git. Changes undergo Pull Request reviews, linters, and architectural scrutiny before reaching production.",
        tech: "GitOps / Pull Request Gates",
    },
    {
        icon: FaSyncAlt,
        title: "Zero-Drift Idempotency",
        description: "Executing the same IaC configuration multiple times yields the exact same environment state. The engine continuously detects and corrects out-of-band manual drift.",
        tech: "Continuous Drift Detection",
    },
    {
        icon: FaShieldAlt,
        title: "Shift-Left Security & Compliance",
        description: "Static security analyzers (tfsec, checkov, cdk-nag) inspect templates before provisioning, enforcing encryption at rest, private subnets, and least-privilege IAM.",
        tech: "Policy as Code (cdk-nag / OPA)",
    },
    {
        icon: FaCubes,
        title: "Modular Abstractions",
        description: "Package repetitive distributed architectures—such as HA multi-AZ microservice VPCs—into versioned modules or object-oriented classes reusable across company squads.",
        tech: "Terraform Modules / CDK Constructs",
    },
    {
        icon: FaLock,
        title: "Distributed State Governance",
        description: "State backends map cloud reality to code definitions with distributed locks (DynamoDB or CloudFormation engine), eliminating simultaneous conflicting writes.",
        tech: "S3 Backends & Distributed Mutex",
    },
    {
        icon: FaCube,
        title: "Disposable & Ephemeral Environments",
        description: "Spin up complete clone environments for staging, load testing, or PR previews in minutes, then tear them down with a single command to save cloud costs.",
        tech: "Automated Ephemeral Stacks",
    },
];

const comparisonData = [
    {
        dimension: "Primary Paradigm",
        terraform: "Declarative Domain-Specific Language (HCL)",
        cdk: "Imperative Programming Languages (TypeScript, Python, Go)",
    },
    {
        dimension: "Cloud Portability",
        terraform: "Multi-cloud agnostic (AWS, Azure, GCP, Kubernetes, Datadog)",
        cdk: "AWS first (synthesizes CloudFormation); CDK for Terraform exists (CDKTF)",
    },
    {
        dimension: "Abstraction Layers",
        terraform: "1:1 Cloud Provider Resource Mapping (L1/L2 via Modules)",
        cdk: "L1 (Cfn primitives), L2 (Sensible defaults), L3 (High-level patterns)",
    },
    {
        dimension: "State Management",
        terraform: "Explicit remote `.tfstate` file (requires S3 + DynamoDB locking)",
        cdk: "Managed natively by AWS CloudFormation state engine",
    },
    {
        dimension: "IAM Policy Ergonomics",
        terraform: "Verbose JSON/HCL policy documents with manual ARN plumbing",
        cdk: "Fluent helper methods (e.g., `bucket.grantReadWrite(taskRole)`)",
    },
    {
        dimension: "Testing & Verification",
        terraform: "Terratest (Go), `terraform test`, tfsec, Checkov",
        cdk: "Standard unit tests (Jest, PyTest), `@aws-cdk/assertions`, `cdk-nag`",
    },
    {
        dimension: "Developer Experience",
        terraform: "Fast learning curve; explicit, simple, and transparent syntax",
        cdk: "Full IDE power: type safety, refactoring tools, loops, inheritance",
    },
    {
        dimension: "Ecosystem Hub",
        terraform: "Terraform Registry (thousands of verified community providers)",
        cdk: "Construct Hub (reusable L2/L3 cloud components and patterns)",
    },
];

const toolingList = [
    {
        category: "Engines & Orchestrators",
        tools: "HashiCorp Terraform, OpenTofu, AWS Cloud Development Kit (CDK v2), Pulumi, AWS CloudFormation",
    },
    {
        category: "Linting, Validation & Policy",
        tools: "TFLint, tfsec, Checkov, Trivy, cdk-nag, Open Policy Agent (OPA) / Rego",
    },
    {
        category: "Testing & Contract Verification",
        tools: "AWS CDK Assertions, Jest / PyTest, Terratest (Go), LocalStack (offline cloud emulator)",
    },
    {
        category: "CI/CD & GitOps Automation",
        tools: "Atlantis (PR automation), Spacelift, Terraform Cloud, GitHub Actions, AWS CodePipeline",
    },
];

export default function InfrastructureAsCode() {
    const [selectedStage, setSelectedStage] = useState(iacLifecycleStages[2]);
    const [activeTab, setActiveTab] = useState("terraform");

    const SelectedIcon = selectedStage.icon;

    return (
        <PageLayout
            title="Infrastructure as Code (IaC)"
            subtitle="Architecting resilient, reproducible cloud infrastructure with Terraform and AWS CDK."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Interactive Lifecycle Stages / Stepper */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35">
                    <div className="text-center mb-6">
                        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                            The IaC Delivery Pipeline
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            From Code Commit to Running Cloud Topology
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Click any stage to inspect its operational mechanism, tools, and guarantees.
                        </p>
                    </div>

                    {/* Step Cards Grid */}
                    <div className="grid gap-3 sm:grid-cols-5">
                        {iacLifecycleStages.map((stage) => {
                            const Icon = stage.icon;
                            const isSelected = selectedStage.id === stage.id;
                            return (
                                <button
                                    key={stage.id}
                                    type="button"
                                    onClick={() => setSelectedStage(stage)}
                                    className={`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                                        isSelected
                                            ? `${stage.bg} ${stage.border} shadow-md scale-[1.02]`
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 hover:border-sky-500/30"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-extrabold text-slate-400 dark:text-slate-500">
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                            )}
                                        </div>
                                        <div className={`w-9 h-9 rounded-lg ${stage.bg} ${stage.color} flex items-center justify-center mb-2.5`}>
                                            <Icon size={16} />
                                        </div>
                                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                                            {stage.shortName}
                                        </h4>
                                    </div>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                                        {stage.tech.split(" / ")[0]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Stage Detail Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedStage.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 space-y-4"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${selectedStage.bg} ${selectedStage.color}`}>
                                        <SelectedIcon size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                {selectedStage.name}
                                            </h4>
                                            <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                                                {selectedStage.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                                            Core Tooling: {selectedStage.tech}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-slate-650 dark:text-slate-350 italic">
                                    &ldquo;{selectedStage.tagline}&rdquo;
                                </span>
                            </div>

                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {selectedStage.role}
                            </p>

                            <div className="grid gap-3 sm:grid-cols-3 pt-2">
                                {selectedStage.specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/40 dark:border-slate-700/40"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                                            {spec.label}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Main Narrative / Introduction */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        In the early days of cloud computing, infrastructure was provisioned via &quot;ClickOps&quot;—engineers manually navigating web management consoles or writing fragile, ad-hoc shell scripts. This manual approach inevitable led to <strong>configuration drift, undocumented tribal knowledge, snowflake servers, and catastrophic deployment regressions</strong> between development and production environments.
                    </p>
                    <p>
                        <strong>Infrastructure as Code (IaC)</strong> fundamentally transformed modern software engineering by applying software development rigor to infrastructure management. With IaC, every cloud asset—networks, serverless functions, database clusters, and security policies—is defined as source code, checked into Git, subjected to automated testing, and deployed through deterministic CI/CD pipelines.
                    </p>
                    <p>
                        Today, two dominant paradigms lead the IaC landscape: <strong>Terraform</strong>, representing the declarative, multi-cloud Domain-Specific Language (HCL) approach; and <strong>AWS Cloud Development Kit (CDK)</strong>, representing the modern programming language construct model that synthesizes battle-tested CloudFormation templates.
                    </p>
                </div>

                {/* Code Examples & Tabs (Terraform vs CDK vs CLI Workflow) */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FaCode className="text-sky-500" /> Declarative HCL vs. Imperative Constructs
                        </h3>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60 w-fit">
                            <button
                                type="button"
                                onClick={() => setActiveTab("terraform")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeTab === "terraform"
                                        ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                }`}
                            >
                                Terraform (HCL)
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("cdk")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeTab === "cdk"
                                        ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                }`}
                            >
                                AWS CDK (TypeScript)
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("workflow")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeTab === "workflow"
                                        ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                }`}
                            >
                                CLI Workflow
                            </button>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden border border-slate-200/40 dark:border-slate-800/40">
                        <div className="p-4 sm:p-5 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                                    {codeExamples[activeTab].title}
                                </h4>
                                <p className="text-xs text-slate-550 dark:text-slate-400 mt-0.5">
                                    {codeExamples[activeTab].desc}
                                </p>
                            </div>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                                {codeExamples[activeTab].filename}
                            </span>
                        </div>
                        <div className="p-4 bg-slate-950 text-slate-100 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                            <pre>
                                <code>{codeExamples[activeTab].code}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Core Architectural Pillars */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Core Pillars of Modern IaC Engineering
                    </h3>
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {iacPillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div
                                    key={pillar.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between hover:-translate-y-1 transition-all"
                                >
                                    <div>
                                        <div className="p-2.5 bg-sky-500/10 text-sky-500 dark:text-sky-400 rounded-xl w-fit mb-3">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-2 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40">
                                        <span className="text-[11px] font-mono font-medium text-sky-600 dark:text-sky-400">
                                            {pillar.tech}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Detailed Comparison Matrix: Terraform vs AWS CDK */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            Architectural Comparison: Terraform vs. AWS CDK
                        </h3>
                    </div>
                    <div className="glass-card overflow-hidden border border-slate-200/30 dark:border-slate-800/30">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                        <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Dimension</th>
                                        <th className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">HashiCorp Terraform</th>
                                        <th className="py-3 px-4 font-semibold text-indigo-600 dark:text-indigo-400">AWS CDK</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                                    {comparisonData.map((row) => (
                                        <tr key={row.dimension} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                                                {row.dimension}
                                            </td>
                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                {row.terraform}
                                            </td>
                                            <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                                                {row.cdk}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Tooling & Standards Ecosystem */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        The IaC Toolchain & Production Ecosystem
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {toolingList.map((item) => (
                            <div
                                key={item.category}
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 space-y-2"
                            >
                                <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">
                                    {item.category}
                                </span>
                                <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                                    {item.tools}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Benefits Checklist */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Why High-Performing Teams Mandate IaC
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-1 text-left">
                        {[
                            "Zero manual console drift: All mutations go through version-controlled pull requests with automated linting.",
                            "Disaster recovery in minutes: Spin up an identical duplicate region or entire cloud account from fresh state.",
                            "Self-documenting architectures: The codebase serves as living, accurate documentation of current cloud assets.",
                            "Fine-grained IAM governance: Policy-as-code audits verify least-privilege security before resource provisioning.",
                            "Cost optimization: Automated lifecycle rules and ephemeral preview environments prevent orphaned cloud spend.",
                        ].map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={16} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Deep Dive: When to Choose Terraform vs CDK */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-3 bg-sky-500/5">
                        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-lg">
                            <FaCloud /> When to Choose Terraform
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <FaArrowRight className="text-sky-500 mt-1 flex-shrink-0" size={12} />
                                <span><strong>Multi-Cloud Stacks:</strong> Orchestrating AWS, Azure, GCP, Cloudflare, and Datadog within unified workflows.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaArrowRight className="text-sky-500 mt-1 flex-shrink-0" size={12} />
                                <span><strong>Dedicated Platform Teams:</strong> Clean declarative boundaries that prevent application teams from introducing complex procedural logic.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaArrowRight className="text-sky-500 mt-1 flex-shrink-0" size={12} />
                                <span><strong>Extensive Community Modules:</strong> Leveraging thousands of battle-tested modules in the Terraform Registry.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-3 bg-indigo-500/5">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                            <FaCubes /> When to Choose AWS CDK
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <FaArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={12} />
                                <span><strong>AWS-First Serverless & Microservices:</strong> Deeply integrated with Lambda, ECS, EventBridge, and DynamoDB.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={12} />
                                <span><strong>Full-Stack TypeScript / Python Teams:</strong> Engineers manage infrastructure using the same languages and testing tools (Jest, PyTest) as application code.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={12} />
                                <span><strong>High-Level L2/L3 Constructs:</strong> Automatic IAM generation (e.g., `grantRead`), metric alarms, and security defaults out-of-the-box.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Conclusion & Strategic Vision */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-4 text-left bg-sky-500/5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FaCloud className="text-sky-500" /> Infrastructure as Code in the Modern Cloud Era
                    </h3>
                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed">
                        Whether adopting the declarative elegance of Terraform or the expressive type safety of AWS CDK, Infrastructure as Code is the indispensable foundation for cloud scalability, resilience, and security. By treating environments as disposable, version-controlled artifacts, organizations achieve high deployment velocity while eliminating the risks of manual human error.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
