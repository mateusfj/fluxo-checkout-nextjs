import { Logo } from "@/components/@shared/logo/logo";
import { Github, Linkedin, Mail } from "lucide-react";

const data = {
  help: {
    home: "#home",
    about: "#about",
    project: "#project",
  },
  contact: {
    email: {
      text: "mateusfj8144@gmail.com",
      href: "mailto:mateusfj8144@gmail.com",
    },

    github: {
      text: "mateusfj",
      href: "https://github.com/mateusfj",
    },
    linkedin: {
      text: "/in/mateussousa",
      href: "https://www.linkedin.com/in/mateus-sousa-a9465325b/",
    },
  },
};

const helpfulLinks = [
  { text: "Home", href: data.help.home },
  { text: "Sobre", href: data.help.about },
  { text: "Produtos", href: data.help.project },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email.text, href: data.contact.email.href },
  {
    icon: Github,
    text: data.contact.github.text,
    href: data.contact.github.href,
  },
  {
    icon: Linkedin,
    text: data.contact.linkedin.text,
    href: data.contact.linkedin.href,
  },
];

export default function Footer() {
  return (
    <footer className="pt-8 w-full border-t mt-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-6 space-y-4 md:space-y-6 text-center md:text-left">
            <Logo />
            <p className="text-foreground/50 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              Teste técnico de implementação de um fluxo de checkout utilizando
              Next.js, TypeScript, React Hook Form, Zod e Zustand.
            </p>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-4 text-center md:text-left">
            <p className="font-medium text-sm md:text-base">Links</p>
            <ul className="mt-4 text-xs space-y-2 md:space-y-3">
              {helpfulLinks.map(({ text, href }) => (
                <li key={text}>
                  <p className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-4 text-center md:text-left">
            <p className="font-medium text-sm md:text-base">Contato</p>
            <ul className="mt-4 text-xs space-y-2 md:space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a
                    className="flex items-center justify-center gap-1.5 sm:justify-start text-muted-foreground hover:text-primary transition-colors text-sm"
                    href={href}
                    target="_blank"
                  >
                    <Icon className="size-5 shrink-0" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 mt:md-24 py-6 border-t">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-secondary-foreground/70 mt-4 text-sm transition sm:order-first sm:mt-0">
              &copy; 2025 Mateus Sousa | Front-end Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
