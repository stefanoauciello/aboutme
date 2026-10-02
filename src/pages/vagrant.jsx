import { FaGithub, FaLayerGroup, FaSyncAlt, FaTerminal } from 'react-icons/fa';
import PageLayout from '../layouts/page-layout.jsx';
import BackButton from '../components/back-button.jsx';

const projectUrl =
  'https://github.com/stefanoauciello/elementary_aucix_vagrant_env';

function Vagrant() {
  return (
    <PageLayout
      title="Vagrant: Reproducible Development Environments"
      subtitle="Use code to create, configure, and share a consistent virtual machine."
    >
      <BackButton />

      <article className="space-y-10">
        <section className="glass-card p-6 sm:p-8">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Setting up a development machine by hand can be slow and
            inconsistent. Vagrant helps define a virtual machine in a
            version-controlled configuration, so the environment can be
            recreated with a small set of commands. Instead of documenting each
            setup step for someone to repeat manually, you describe the
            machine&apos;s base image, resources, and provisioning.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaLayerGroup className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">What Vagrant does</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Vagrant coordinates a virtual machine through a provider such as
            VirtualBox. A <code>Vagrantfile</code> specifies the box (the
            machine&apos;s base image), provider settings, and provisioning
            steps. Vagrant can then create the VM and apply its configuration
            consistently on each setup.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaSyncAlt className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Provisioning with Ansible</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Provisioning automates the software installation after the VM is
            created. In this project, Vagrant invokes Ansible locally inside
            the VM and runs a playbook to install development tools and desktop
            applications. Keeping those steps in configuration makes the setup
            easier to review, repeat, and adapt.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4">An Elementary OS example</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
            I created a Vagrant environment based on the{' '}
            <code>aucix/elementary_aucix</code> box. It configures VirtualBox
            with a graphical desktop, 4 CPUs, and 8 GB of memory, then uses
            Ansible to install tools such as Git, build-essential, htop, GIMP,
            LibreOffice, and Chromium.
          </p>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2 inline-flex"
          >
            <FaGithub aria-hidden />
            View elementary_aucix_vagrant_env
          </a>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FaTerminal className="text-primary-500" aria-hidden />
            <h2 className="text-2xl font-bold">Getting started</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            With Vagrant and VirtualBox installed, clone the repository and
            start the environment:
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
            <code>{`git clone ${projectUrl}.git
cd elementary_aucix_vagrant_env
vagrant up`}</code>
          </pre>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
            The first run downloads the box and provisions the machine. Later,
            use <code>vagrant halt</code> to stop it, <code>vagrant up</code>{' '}
            to start it again, and <code>vagrant destroy</code> when you no
            longer need the VM. The project expects a machine with at least 8
            GB of available RAM and 4 CPU cores for its configured resources.
          </p>
        </section>

        <section className="border-l-4 border-primary-500 pl-5">
          <h2 className="text-xl font-bold mb-2">When this approach helps</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Vagrant is useful when you want an isolated, repeatable environment
            that behaves similarly across machines, especially for onboarding,
            demos, or legacy tools. It does require a compatible virtualization
            provider and enough host resources, so it is worth documenting
            those requirements alongside the configuration.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}

export default Vagrant;
