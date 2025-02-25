import { memo } from 'react';
import styles from './Control.module.scss';

type Props = {
  tool: string;
  setTool: (tool: string) => void;
};

const Control = memo((props: Props) => {
  const { tool, setTool } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.radioGroup}>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === 'cursor'}
          onChange={handleOnChange}
        />
        <label htmlFor="cursor" className={styles.radioLabel}>
          Взаимодействие
        </label>

        <input type="radio" id="shape" name="control" value="shape" checked={tool === 'shape'} onChange={handleOnChange} />
        <label htmlFor="shape" className={styles.radioLabel}>
          Добавление
        </label>
      </div>
    </div>
  );
});

export default Control;
