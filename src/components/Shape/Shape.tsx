import html2canvas from 'html2canvas';
import Konva from 'konva';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Group, Rect, Image } from 'react-konva';
import { Html } from 'react-konva-utils';
import HtmlText from '../HtmlText/HtmlText';
import { Figure } from '../Canvas/Canvas';
import TextEditor from '../TextEditor/TextEditor';

type Props = Figure & {
  tool: string;
};

const Shape = memo((props: Props) => {
  const { x, y, width, height, tool, text, id } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const renderImage = useCallback(async () => {
    if (!htmlRef.current) return;

    try {
      const canvas = await html2canvas(htmlRef.current, {
        backgroundColor: 'rgba(0,0,0,0)',
        width: width,
        height: height,
      });
      const img = new window.Image();
      img.src = canvas.toDataURL();
      img.onload = () => setImage(img);
    } catch (error) {
      console.error('Ошибка рендеринга изображения:', error);
      setImage(null);
    }
  }, [width, height]);

  useEffect(() => {
    if (htmlRef.current) {
      htmlRef.current.innerHTML = value;
    }
    renderImage();
  }, [value, renderImage]);

  const handleClick = () => {
    if (tool === 'shape' || isEditing) return;
    setIsEditing((prev) => !prev);
  };

  const handleSave = (html: string) => {
    const sanitizedHtml = html.trim() === '' || html === '<p><br></p>' ? '' : html;
    setValue(sanitizedHtml);
    setIsEditing(false);
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect stroke={'black'} width={width} height={height} />
        {image && <Image image={image} x={0} y={0} width={width} height={height} ref={imageRef} />}
      </Group>
      {isEditing && (
        <Html>
          <TextEditor initialValue={value} onSave={handleSave} onClose={() => setIsEditing(false)} />
        </Html>
      )}

      <Html>
        <HtmlText ref={htmlRef} html={value} id={id} width={width} />
      </Html>
    </>
  );
});

export default Shape;
