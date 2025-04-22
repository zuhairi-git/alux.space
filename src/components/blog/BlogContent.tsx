import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface BlogContentProps {
  content: string;
}

const components = {
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-2xl font-bold mt-10 mb-5 text-primary" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-xl font-semibold mt-8 mb-4 text-primary" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-6 text-lg text-theme leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => (
    <li className="text-theme" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="pl-4 border-l-4 border-primary italic my-6 text-lg text-theme" {...props} />
  ),
  code: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => {
    const match = /language-(\w+)/.exec(className || '');
    const isInline = !match;

    return isInline ? (
      <code className="bg-theme/20 px-1 py-0.5 rounded text-primary" {...props}>
        {children}
      </code>
    ) : (
      <div className="mb-6">
        <pre className="bg-theme/30 backdrop-blur-sm p-4 rounded-lg overflow-x-auto text-sm text-theme border border-primary/10">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
};

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote source={content} components={components} />
    </article>
  );
};

export default BlogContent;
