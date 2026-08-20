import { Link } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MermaidDiagram from '../../../../components/mermaidDiagram';
import useGlobalState from '../../../../stores/useGlobalState';

const markdownModules = import.meta.glob('./*/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const loadProjectMarkdown = async (projectId: string, lang: string) => {
  const normalizedLang = lang.split('-')[0];
  const candidates = [`./${projectId}/${normalizedLang}.md`, `./${projectId}/en.md`];

  for (const candidate of candidates) {
    const loader = markdownModules[candidate];
    if (loader) {
      return await loader();
    }
  }

  return '# Placeholder\n\nDescription coming soon.';
};

const headingBaseStyle = {
  margin: '0.75rem 0 0.5rem',
  lineHeight: 1.4,
  fontWeight: 600,
  color: 'inherit',
} as const;

const ProjectDescription = ({
  className,
  projectId,
}: {
  className?: string;
  projectId: string;
}) => {
  const { lang } = useGlobalState();
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const nextContent = await loadProjectMarkdown(projectId, lang);
      if (!cancelled) {
        setContent(nextContent);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [lang, projectId]);

  if (!content) {
    return <div>Loading description...</div>;
  }

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 style={{ ...headingBaseStyle, fontSize: '1.75rem' }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ ...headingBaseStyle, fontSize: '1.5rem' }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ ...headingBaseStyle, fontSize: '1.25rem', margin: '0.25rem 0' }}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 style={{ ...headingBaseStyle, fontSize: '1.1rem', margin: '0.25rem 0' }}>
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 style={{ ...headingBaseStyle, fontSize: '1rem', margin: '0' }}>{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 style={{ ...headingBaseStyle, fontSize: '0.95rem', margin: '0' }}>{children}</h6>
          ),
          p: ({ children }) => <p style={{ margin: '0.5rem 0', lineHeight: 1.6 }}>{children}</p>,
          ul: ({ children }) => (
            <ul style={{ margin: '0.5rem 0 0.5rem 1.25rem', padding: 0, listStyleType: 'disc' }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ margin: '0.5rem 0 0.5rem 1.25rem', padding: 0, listStyleType: 'decimal' }}>
              {children}
            </ol>
          ),
          li: ({ children }) => <li style={{ padding: '0.25rem' }}>{children}</li>,
          span: ({ children }) => (
            <span style={{ margin: '0.5rem 0', lineHeight: 1.6 }}>{children}</span>
          ),
          code: ({ className, children, ...props }) => {
            const isMermaid = /language-mermaid/.test(className ?? '');
            if (isMermaid) {
              return <MermaidDiagram chart={String(children).trim()} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          a: ({ href, children }) => <Link href={href ?? ''}>{children}</Link>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ProjectDescription;
