import { forwardRef, memo } from 'react';
import styles from './HtmlText.module.scss';

type Props = {
  html: string;
  id: string;
  width: number;
};

const HtmlText = memo(
  forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { html, id, width } = props;
    return (
      <div
        id={`htmltext_${id}`}
        dangerouslySetInnerHTML={{ __html: html }}
        className={styles.container}
        ref={ref}
        style={{
          maxWidth: `${width}px`,
        }}
      />
    );
  }),
);

export default HtmlText;
