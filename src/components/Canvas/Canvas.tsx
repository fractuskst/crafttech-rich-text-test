import { memo, useCallback, useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Shape from '../Shape/Shape';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import styles from './Canvas.module.scss';

type Props = {
  tool: string;
  stageRef: React.RefObject<Konva.Stage>;
};

export type Figure = {
  id: string;
  width: number;
  height: number;
  type: string;
  x: number;
  y: number;
  text: string;
};

const Canvas = memo((props: Props) => {
  const { tool, stageRef } = props;

  const [figures, setFigures] = useState<Figure[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const stage = stageRef.current;
      if (stage) {
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stageRef]);

  const handleOnClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (tool === 'cursor') return;

      const stage = e.target.getStage();
      if (!stage) return;

      const point = stage.getPointerPosition();
      if (!point) return;

      const stageOffset = stage.absolutePosition();
      setFigures((prev: Figure[]) => [
        ...prev,
        {
          id: Date.now().toString(36),
          width: 100,
          height: 100,
          type: 'rect',
          x: point.x - stageOffset.x,
          y: point.y - stageOffset.y,
          text: '',
        },
      ]);
    },
    [tool],
  );

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === 'cursor'}
      onClick={handleOnClick}
      ref={stageRef}
      className={styles.stage}
    >
      <Layer>
        {figures.map((figure: Figure) => {
          return <Shape key={figure.id} {...figure} tool={tool} />;
        })}
      </Layer>
    </Stage>
  );
});

export default Canvas;
