import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{a as t,i as n,o as r,r as i}from"./framer-motion-B5zhaYrU.js";import{B as a,I as o,Q as s,X as c,d as l,et as u,l as d,m as f,n as p,p as m,v as h,y as g}from"./index-DH2fcaQa.js";import{n as _,t as v}from"./page-layout-DmIfn0h8.js";import{t as y}from"./back-button-CF4u-l4X.js";var b=e(r(),1),x=t(),S=[{id:`definition`,stepNumber:`01`,name:`Declarative Code & Constructs`,shortName:`Code Definition`,tech:`HCL / TypeScript / Python`,icon:m,color:`text-sky-500`,border:`border-sky-500/30`,bg:`bg-sky-500/10`,badge:`Version Controlled`,tagline:`Define cloud topologies as modular, testable code checked into Git`,role:`Engineers declare cloud resources, network topologies, and IAM policies in code rather than clicking through cloud consoles. Terraform leverages HashiCorp Configuration Language (HCL) for pure declarative specs, while AWS CDK uses real programming languages (TypeScript, Python) to compose multi-resource constructs.`,specs:[{label:`Authoring Syntax`,value:`Declarative (HCL) or Imperative Constructs (TypeScript)`},{label:`Source of Truth`,value:`Git repository with peer code review`},{label:`Modularity`,value:`Reusable Terraform Modules or CDK Construct Libraries`}]},{id:`synthesis`,stepNumber:`02`,name:`Synthesis & Graph Compilation`,shortName:`Synthesis & Graph`,tech:`cdk synth / terraform validate`,icon:o,color:`text-indigo-500`,border:`border-indigo-500/30`,bg:`bg-indigo-500/10`,badge:`DAG Resolution`,tagline:`Compiles code into a Directed Acyclic Graph (DAG) of resource dependencies`,role:`The IaC engine parses declarations and builds a dependency graph. CDK executes high-level constructs and synthesizes raw AWS CloudFormation JSON/YAML templates. Terraform evaluates variables, providers, and resource references to construct an execution DAG.`,specs:[{label:`Compilation Output`,value:`CloudFormation template (CDK) or Resource Graph (Terraform)`},{label:`Dependency Model`,value:`Explicit & implicit Directed Acyclic Graph (DAG)`},{label:`Type Checking`,value:`Static compiler verification & syntax validation`}]},{id:`diff`,stepNumber:`03`,name:`Drift Audit & Speculative Diff`,shortName:`Plan & Diff`,tech:`terraform plan / cdk diff`,icon:u,color:`text-amber-500`,border:`border-amber-500/30`,bg:`bg-amber-500/10`,badge:`Zero-Surprise Execution`,tagline:`Generates an exact execution plan comparing desired state against live state`,role:`Before touching live cloud infrastructure, the engine queries cloud provider APIs and current state to compute a dry-run delta. It highlights precisely which resources will be created (+), modified (~), or destroyed (-), preventing accidental outages and configuration drift.`,specs:[{label:`Terraform Command`,value:"`terraform plan -out=tfplan`"},{label:`AWS CDK Command`,value:"`cdk diff`"},{label:`Drift Detection`,value:`Discrepancies between remote reality and state logged`}]},{id:`provisioning`,stepNumber:`04`,name:`Atomic Engine Execution`,shortName:`Cloud Provisioning`,tech:`terraform apply / cdk deploy`,icon:l,color:`text-emerald-500`,border:`border-emerald-500/30`,bg:`bg-emerald-500/10`,badge:`Idempotent Mutation`,tagline:`Applies mutations against cloud APIs concurrently respecting the dependency graph`,role:`The engine authenticates against cloud provider endpoints (AWS, Azure, GCP) and initiates parallel creation and updates. CDK hands off the synthesized template to the AWS CloudFormation orchestration engine, while Terraform directly calls provider SDKs with state locking.`,specs:[{label:`Execution Engine`,value:`Direct Provider APIs (Terraform) vs CloudFormation (CDK)`},{label:`Concurrency`,value:`Parallel deployment along graph edges`},{label:`Rollback Strategy`,value:`Automatic CFn rollback (CDK) or targeted undo (Terraform)`}]},{id:`state`,stepNumber:`05`,name:`State Ledger & Locking`,shortName:`State & Lock`,tech:`S3 + DynamoDB / CloudFormation State`,icon:a,color:`text-cyan-500`,border:`border-cyan-500/30`,bg:`bg-cyan-500/10`,badge:`Distributed Concurrency`,tagline:`Records immutable resource metadata and prevents conflicting runs`,role:"Maintains a distributed mapping between declared code and physical cloud resource IDs. Terraform uses a remote state file (`.tfstate`) secured in Amazon S3 with DynamoDB distributed mutex locks. CDK delegates state persistence directly to the managed CloudFormation backend.",specs:[{label:`State Backend`,value:`Remote object store (S3/GCS) or Cloud Service Ledger`},{label:`Concurrency Lock`,value:`DynamoDB distributed lock to prevent race conditions`},{label:`Encryption`,value:`KMS server-side encryption at rest + TLS in transit`}]}],C={terraform:{title:`Terraform (HCL) — Declarative Infrastructure`,desc:`Declarative syntax specifying the desired end-state. Terraform reconciles this against the state ledger to create a secure, encrypted S3 bucket with strict public access blocks.`,filename:`main.tf`,language:`hcl`,code:`# Configure AWS Provider with default tags
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
}`},cdk:{title:`AWS CDK (TypeScript) — Imperative Constructs & Type Safety`,desc:`Full software engineering capabilities (classes, loops, auto-completion, tests) synthesizing declarative CloudFormation under the hood with intelligent high-level (L2) defaults.`,filename:`data-lake-stack.ts`,language:`typescript`,code:`import * as cdk from 'aws-cdk-lib';
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
}`},workflow:{title:`CLI Execution Workflow Comparison`,desc:`Side-by-side terminal lifecycle commands showing how developers inspect, diff, test, and release infrastructure changes in CI/CD pipelines.`,filename:`terminal-lifecycle.sh`,language:`bash`,code:`========================================================================
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
$ ls -la cdk.out/`}},w=[{icon:f,title:`Version Control & Peer Review`,description:`Every VPC route, database cluster, and DNS record is tracked in Git. Changes undergo Pull Request reviews, linters, and architectural scrutiny before reaching production.`,tech:`GitOps / Pull Request Gates`},{icon:s,title:`Zero-Drift Idempotency`,description:`Executing the same IaC configuration multiple times yields the exact same environment state. The engine continuously detects and corrects out-of-band manual drift.`,tech:`Continuous Drift Detection`},{icon:c,title:`Shift-Left Security & Compliance`,description:`Static security analyzers (tfsec, checkov, cdk-nag) inspect templates before provisioning, enforcing encryption at rest, private subnets, and least-privilege IAM.`,tech:`Policy as Code (cdk-nag / OPA)`},{icon:g,title:`Modular Abstractions`,description:`Package repetitive distributed architectures—such as HA multi-AZ microservice VPCs—into versioned modules or object-oriented classes reusable across company squads.`,tech:`Terraform Modules / CDK Constructs`},{icon:a,title:`Distributed State Governance`,description:`State backends map cloud reality to code definitions with distributed locks (DynamoDB or CloudFormation engine), eliminating simultaneous conflicting writes.`,tech:`S3 Backends & Distributed Mutex`},{icon:h,title:`Disposable & Ephemeral Environments`,description:`Spin up complete clone environments for staging, load testing, or PR previews in minutes, then tear them down with a single command to save cloud costs.`,tech:`Automated Ephemeral Stacks`}],T=[{dimension:`Primary Paradigm`,terraform:`Declarative Domain-Specific Language (HCL)`,cdk:`Imperative Programming Languages (TypeScript, Python, Go)`},{dimension:`Cloud Portability`,terraform:`Multi-cloud agnostic (AWS, Azure, GCP, Kubernetes, Datadog)`,cdk:`AWS first (synthesizes CloudFormation); CDK for Terraform exists (CDKTF)`},{dimension:`Abstraction Layers`,terraform:`1:1 Cloud Provider Resource Mapping (L1/L2 via Modules)`,cdk:`L1 (Cfn primitives), L2 (Sensible defaults), L3 (High-level patterns)`},{dimension:`State Management`,terraform:"Explicit remote `.tfstate` file (requires S3 + DynamoDB locking)",cdk:`Managed natively by AWS CloudFormation state engine`},{dimension:`IAM Policy Ergonomics`,terraform:`Verbose JSON/HCL policy documents with manual ARN plumbing`,cdk:"Fluent helper methods (e.g., `bucket.grantReadWrite(taskRole)`)"},{dimension:`Testing & Verification`,terraform:"Terratest (Go), `terraform test`, tfsec, Checkov",cdk:"Standard unit tests (Jest, PyTest), `@aws-cdk/assertions`, `cdk-nag`"},{dimension:`Developer Experience`,terraform:`Fast learning curve; explicit, simple, and transparent syntax`,cdk:`Full IDE power: type safety, refactoring tools, loops, inheritance`},{dimension:`Ecosystem Hub`,terraform:`Terraform Registry (thousands of verified community providers)`,cdk:`Construct Hub (reusable L2/L3 cloud components and patterns)`}],E=[{category:`Engines & Orchestrators`,tools:`HashiCorp Terraform, OpenTofu, AWS Cloud Development Kit (CDK v2), Pulumi, AWS CloudFormation`},{category:`Linting, Validation & Policy`,tools:`TFLint, tfsec, Checkov, Trivy, cdk-nag, Open Policy Agent (OPA) / Rego`},{category:`Testing & Contract Verification`,tools:`AWS CDK Assertions, Jest / PyTest, Terratest (Go), LocalStack (offline cloud emulator)`},{category:`CI/CD & GitOps Automation`,tools:`Atlantis (PR automation), Spacelift, Terraform Cloud, GitHub Actions, AWS CodePipeline`}];function D(){let[e,t]=(0,b.useState)(S[2]),[r,a]=(0,b.useState)(`terraform`),o=e.icon;return(0,x.jsx)(v,{title:`Infrastructure as Code (IaC)`,subtitle:`Architecting resilient, reproducible cloud infrastructure with Terraform and AWS CDK.`,children:(0,x.jsxs)(`div`,{className:`max-w-4xl mx-auto space-y-12`,children:[(0,x.jsx)(`div`,{children:(0,x.jsx)(y,{fallbackTo:`/devcorner`})}),(0,x.jsxs)(`div`,{className:`glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35`,children:[(0,x.jsxs)(`div`,{className:`text-center mb-6`,children:[(0,x.jsx)(`span`,{className:`text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20`,children:`The IaC Delivery Pipeline`}),(0,x.jsx)(`h3`,{className:`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2`,children:`From Code Commit to Running Cloud Topology`}),(0,x.jsx)(`p`,{className:`text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1`,children:`Click any stage to inspect its operational mechanism, tools, and guarantees.`})]}),(0,x.jsx)(`div`,{className:`grid gap-3 sm:grid-cols-5`,children:S.map(n=>{let r=n.icon,i=e.id===n.id;return(0,x.jsxs)(`button`,{type:`button`,onClick:()=>t(n),className:`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${i?`${n.bg} ${n.border} shadow-md scale-[1.02]`:`bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 hover:border-sky-500/30`}`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,x.jsx)(`span`,{className:`text-xs font-mono font-extrabold text-slate-400 dark:text-slate-500`,children:n.stepNumber}),i&&(0,x.jsx)(`span`,{className:`w-2 h-2 rounded-full bg-sky-500 animate-pulse`})]}),(0,x.jsx)(`div`,{className:`w-9 h-9 rounded-lg ${n.bg} ${n.color} flex items-center justify-center mb-2.5`,children:(0,x.jsx)(r,{size:16})}),(0,x.jsx)(`h4`,{className:`font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight`,children:n.shortName})]}),(0,x.jsx)(`span`,{className:`text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-mono`,children:n.tech.split(` / `)[0]})]},n.id)})}),(0,x.jsx)(n,{mode:`wait`,children:(0,x.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.25},className:`mt-6 p-5 sm:p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 space-y-4`,children:[(0,x.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-3`,children:[(0,x.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,x.jsx)(`div`,{className:`p-2.5 rounded-xl ${e.bg} ${e.color}`,children:(0,x.jsx)(o,{size:20})}),(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,x.jsx)(`h4`,{className:`text-base sm:text-lg font-bold text-slate-900 dark:text-white`,children:e.name}),(0,x.jsx)(`span`,{className:`text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20`,children:e.badge})]}),(0,x.jsxs)(`p`,{className:`text-xs text-slate-500 dark:text-slate-400 font-mono`,children:[`Core Tooling: `,e.tech]})]})]}),(0,x.jsxs)(`span`,{className:`text-xs font-semibold text-slate-650 dark:text-slate-350 italic`,children:[`“`,e.tagline,`”`]})]}),(0,x.jsx)(`p`,{className:`text-sm text-slate-700 dark:text-slate-300 leading-relaxed`,children:e.role}),(0,x.jsx)(`div`,{className:`grid gap-3 sm:grid-cols-3 pt-2`,children:e.specs.map(e=>(0,x.jsxs)(`div`,{className:`p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/40 dark:border-slate-700/40`,children:[(0,x.jsx)(`span`,{className:`text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1`,children:e.label}),(0,x.jsx)(`span`,{className:`text-xs font-semibold text-slate-800 dark:text-slate-200`,children:e.value})]},e.label))})]},e.id)})]}),(0,x.jsxs)(`div`,{className:`space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed`,children:[(0,x.jsxs)(`p`,{children:[`In the early days of cloud computing, infrastructure was provisioned via "ClickOps"—engineers manually navigating web management consoles or writing fragile, ad-hoc shell scripts. This manual approach inevitable led to `,(0,x.jsx)(`strong`,{children:`configuration drift, undocumented tribal knowledge, snowflake servers, and catastrophic deployment regressions`}),` between development and production environments.`]}),(0,x.jsxs)(`p`,{children:[(0,x.jsx)(`strong`,{children:`Infrastructure as Code (IaC)`}),` fundamentally transformed modern software engineering by applying software development rigor to infrastructure management. With IaC, every cloud asset—networks, serverless functions, database clusters, and security policies—is defined as source code, checked into Git, subjected to automated testing, and deployed through deterministic CI/CD pipelines.`]}),(0,x.jsxs)(`p`,{children:[`Today, two dominant paradigms lead the IaC landscape: `,(0,x.jsx)(`strong`,{children:`Terraform`}),`, representing the declarative, multi-cloud Domain-Specific Language (HCL) approach; and `,(0,x.jsx)(`strong`,{children:`AWS Cloud Development Kit (CDK)`}),`, representing the modern programming language construct model that synthesizes battle-tested CloudFormation templates.`]})]}),(0,x.jsxs)(`div`,{className:`space-y-4`,children:[(0,x.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3`,children:[(0,x.jsxs)(`h3`,{className:`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2`,children:[(0,x.jsx)(m,{className:`text-sky-500`}),` Declarative HCL vs. Imperative Constructs`]}),(0,x.jsxs)(`div`,{className:`flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60 w-fit`,children:[(0,x.jsx)(`button`,{type:`button`,onClick:()=>a(`terraform`),className:`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${r===`terraform`?`bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm`:`text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200`}`,children:`Terraform (HCL)`}),(0,x.jsx)(`button`,{type:`button`,onClick:()=>a(`cdk`),className:`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${r===`cdk`?`bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm`:`text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200`}`,children:`AWS CDK (TypeScript)`}),(0,x.jsx)(`button`,{type:`button`,onClick:()=>a(`workflow`),className:`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${r===`workflow`?`bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm`:`text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200`}`,children:`CLI Workflow`})]})]}),(0,x.jsxs)(`div`,{className:`glass-card overflow-hidden border border-slate-200/40 dark:border-slate-800/40`,children:[(0,x.jsxs)(`div`,{className:`p-4 sm:p-5 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h4`,{className:`font-bold text-slate-900 dark:text-white text-sm sm:text-base`,children:C[r].title}),(0,x.jsx)(`p`,{className:`text-xs text-slate-550 dark:text-slate-400 mt-0.5`,children:C[r].desc})]}),(0,x.jsx)(`span`,{className:`text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300`,children:C[r].filename})]}),(0,x.jsx)(`div`,{className:`p-4 bg-slate-950 text-slate-100 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed`,children:(0,x.jsx)(`pre`,{children:(0,x.jsx)(`code`,{children:C[r].code})})})]})]}),(0,x.jsxs)(`div`,{className:`space-y-4`,children:[(0,x.jsx)(`h3`,{className:`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white`,children:`Core Pillars of Modern IaC Engineering`}),(0,x.jsx)(i.div,{className:`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,variants:_.gridVariants,initial:`hidden`,animate:`visible`,children:w.map(e=>{let t=e.icon;return(0,x.jsxs)(i.div,{variants:_.cardVariants,className:`glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between hover:-translate-y-1 transition-all`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`p-2.5 bg-sky-500/10 text-sky-500 dark:text-sky-400 rounded-xl w-fit mb-3`,children:(0,x.jsx)(t,{size:18})}),(0,x.jsx)(`h4`,{className:`font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug`,children:e.title}),(0,x.jsx)(`p`,{className:`text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-2 leading-relaxed`,children:e.description})]}),(0,x.jsx)(`div`,{className:`mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40`,children:(0,x.jsx)(`span`,{className:`text-[11px] font-mono font-medium text-sky-600 dark:text-sky-400`,children:e.tech})})]},e.title)})})]}),(0,x.jsxs)(`div`,{className:`space-y-4`,children:[(0,x.jsx)(`div`,{className:`flex items-center justify-between`,children:(0,x.jsx)(`h3`,{className:`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white`,children:`Architectural Comparison: Terraform vs. AWS CDK`})}),(0,x.jsx)(`div`,{className:`glass-card overflow-hidden border border-slate-200/30 dark:border-slate-800/30`,children:(0,x.jsx)(`div`,{className:`overflow-x-auto`,children:(0,x.jsxs)(`table`,{className:`w-full text-left text-sm`,children:[(0,x.jsx)(`thead`,{children:(0,x.jsxs)(`tr`,{className:`border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50`,children:[(0,x.jsx)(`th`,{className:`py-3 px-4 font-semibold text-slate-700 dark:text-slate-300`,children:`Dimension`}),(0,x.jsx)(`th`,{className:`py-3 px-4 font-semibold text-sky-600 dark:text-sky-400`,children:`HashiCorp Terraform`}),(0,x.jsx)(`th`,{className:`py-3 px-4 font-semibold text-indigo-600 dark:text-indigo-400`,children:`AWS CDK`})]})}),(0,x.jsx)(`tbody`,{className:`divide-y divide-slate-200/40 dark:divide-slate-800/40`,children:T.map(e=>(0,x.jsxs)(`tr`,{className:`hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors`,children:[(0,x.jsx)(`td`,{className:`py-3 px-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap`,children:e.dimension}),(0,x.jsx)(`td`,{className:`py-3 px-4 text-slate-600 dark:text-slate-400`,children:e.terraform}),(0,x.jsx)(`td`,{className:`py-3 px-4 text-slate-800 dark:text-slate-200 font-medium`,children:e.cdk})]},e.dimension))})]})})})]}),(0,x.jsxs)(`div`,{className:`space-y-4`,children:[(0,x.jsx)(`h3`,{className:`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white`,children:`The IaC Toolchain & Production Ecosystem`}),(0,x.jsx)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:E.map(e=>(0,x.jsxs)(`div`,{className:`glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 space-y-2`,children:[(0,x.jsx)(`span`,{className:`text-xs font-bold text-sky-500 uppercase tracking-wider`,children:e.category}),(0,x.jsx)(`p`,{className:`text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200`,children:e.tools})]},e.category))})]}),(0,x.jsxs)(`div`,{className:`space-y-4`,children:[(0,x.jsx)(`h3`,{className:`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white`,children:`Why High-Performing Teams Mandate IaC`}),(0,x.jsx)(`ul`,{className:`grid gap-3 sm:grid-cols-1 text-left`,children:[`Zero manual console drift: All mutations go through version-controlled pull requests with automated linting.`,`Disaster recovery in minutes: Spin up an identical duplicate region or entire cloud account from fresh state.`,`Self-documenting architectures: The codebase serves as living, accurate documentation of current cloud assets.`,`Fine-grained IAM governance: Policy-as-code audits verify least-privilege security before resource provisioning.`,`Cost optimization: Automated lifecycle rules and ephemeral preview environments prevent orphaned cloud spend.`].map(e=>(0,x.jsxs)(`li`,{className:`flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350`,children:[(0,x.jsx)(d,{className:`text-sky-500 mt-1 flex-shrink-0`,size:16}),(0,x.jsx)(`span`,{children:e})]},e))})]}),(0,x.jsxs)(`div`,{className:`grid gap-6 sm:grid-cols-2`,children:[(0,x.jsxs)(`div`,{className:`glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-3 bg-sky-500/5`,children:[(0,x.jsxs)(`div`,{className:`flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-lg`,children:[(0,x.jsx)(l,{}),` When to Choose Terraform`]}),(0,x.jsxs)(`ul`,{className:`space-y-2 text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed`,children:[(0,x.jsxs)(`li`,{className:`flex items-start gap-2`,children:[(0,x.jsx)(p,{className:`text-sky-500 mt-1 flex-shrink-0`,size:12}),(0,x.jsxs)(`span`,{children:[(0,x.jsx)(`strong`,{children:`Multi-Cloud Stacks:`}),` Orchestrating AWS, Azure, GCP, Cloudflare, and Datadog within unified workflows.`]})]}),(0,x.jsxs)(`li`,{className:`flex items-start gap-2`,children:[(0,x.jsx)(p,{className:`text-sky-500 mt-1 flex-shrink-0`,size:12}),(0,x.jsxs)(`span`,{children:[(0,x.jsx)(`strong`,{children:`Dedicated Platform Teams:`}),` Clean declarative boundaries that prevent application teams from introducing complex procedural logic.`]})]}),(0,x.jsxs)(`li`,{className:`flex items-start gap-2`,children:[(0,x.jsx)(p,{className:`text-sky-500 mt-1 flex-shrink-0`,size:12}),(0,x.jsxs)(`span`,{children:[(0,x.jsx)(`strong`,{children:`Extensive Community Modules:`}),` Leveraging thousands of battle-tested modules in the Terraform Registry.`]})]})]})]}),(0,x.jsxs)(`div`,{className:`glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-3 bg-indigo-500/5`,children:[(0,x.jsxs)(`div`,{className:`flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg`,children:[(0,x.jsx)(g,{}),` When to Choose AWS CDK`]}),(0,x.jsxs)(`ul`,{className:`space-y-2 text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed`,children:[(0,x.jsxs)(`li`,{className:`flex items-start gap-2`,children:[(0,x.jsx)(p,{className:`text-indigo-500 mt-1 flex-shrink-0`,size:12}),(0,x.jsxs)(`span`,{children:[(0,x.jsx)(`strong`,{children:`AWS-First Serverless & Microservices:`}),` Deeply integrated with Lambda, ECS, EventBridge, and DynamoDB.`]})]}),(0,x.jsxs)(`li`,{className:`flex items-start gap-2`,children:[(0,x.jsx)(p,{className:`text-indigo-500 mt-1 flex-shrink-0`,size:12}),(0,x.jsxs)(`span`,{children:[(0,x.jsx)(`strong`,{children:`Full-Stack TypeScript / Python Teams:`}),` Engineers manage infrastructure using the same languages and testing tools (Jest, PyTest) as application code.`]})]}),(0,x.jsxs)(`li`,{className:`flex items-start gap-2`,children:[(0,x.jsx)(p,{className:`text-indigo-500 mt-1 flex-shrink-0`,size:12}),(0,x.jsxs)(`span`,{children:[(0,x.jsx)(`strong`,{children:`High-Level L2/L3 Constructs:`})," Automatic IAM generation (e.g., `grantRead`), metric alarms, and security defaults out-of-the-box."]})]})]})]})]}),(0,x.jsxs)(`div`,{className:`glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-4 text-left bg-sky-500/5`,children:[(0,x.jsxs)(`h3`,{className:`text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2`,children:[(0,x.jsx)(l,{className:`text-sky-500`}),` Infrastructure as Code in the Modern Cloud Era`]}),(0,x.jsx)(`p`,{className:`text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed`,children:`Whether adopting the declarative elegance of Terraform or the expressive type safety of AWS CDK, Infrastructure as Code is the indispensable foundation for cloud scalability, resilience, and security. By treating environments as disposable, version-controlled artifacts, organizations achieve high deployment velocity while eliminating the risks of manual human error.`})]})]})})}export{D as default};