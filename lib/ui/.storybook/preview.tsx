import type { Preview } from '@storybook/react';

import '../src/lib/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'app',
      values: [
        {
          name: 'app',
          value: '#0c0e12',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          padding: '1.5rem',
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)',
          backgroundColor: 'var(--color-bg-0)',
          backgroundImage: `
            radial-gradient(ellipse 120% 80% at 10% -20%, rgba(94, 234, 212, 0.12), transparent),
            radial-gradient(ellipse 80% 60% at 100% 0%, rgba(129, 140, 248, 0.1), transparent),
            linear-gradient(180deg, var(--color-bg-1) 0%, var(--color-bg-0) 45%)
          `,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
