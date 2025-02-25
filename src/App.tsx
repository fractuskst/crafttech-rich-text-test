import { useRef, useState } from 'react';

import Canvas from './components/Canvas/Canvas';
import Control from './components/Control/Control';
import Konva from 'konva';

const App = () => {
  const [tool, setTool] = useState('cursor');
  const stageRef = useRef<Konva.Stage>(null);
  return (
    <div>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </div>
  );
};

export default App;
