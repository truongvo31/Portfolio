import { makeStyles, tokens } from '@fluentui/react-components';
import mermaid from 'mermaid';
import { useEffect, useId, useRef, useState } from 'react';
import { useSystemTheme } from '../stores/useSystemTheme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: `${tokens.spacingVerticalM} 0`,
    overflowX: 'auto',
  },
});

// Renders a mermaid diagram from its raw definition text (e.g. extracted from a ```mermaid code block).
const MermaidDiagram = ({ chart }: { chart: string }) => {
  const styles = useStyles();
  const id = useId().replace(/:/g, '');
  const systemTheme = useSystemTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      theme: systemTheme === 'dark' ? 'dark' : 'default',
      securityLevel: 'strict',
    });

    const render = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
        }
      } catch {
        if (!cancelled) {
          setSvg('');
        }
      }
    };

    void render();

    return () => {
      cancelled = true;
    };
  }, [chart, id, systemTheme]);

  if (!svg) {
    return null;
  }

  return (
    <div ref={containerRef} className={styles.root} dangerouslySetInnerHTML={{ __html: svg }} />
  );
};

export default MermaidDiagram;
