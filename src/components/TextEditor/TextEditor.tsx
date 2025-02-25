import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { memo, useEffect, useRef } from 'react';
import styles from './TextEditor.module.scss';

type Props = {
  initialValue: string;
  onSave: (html: string) => void;
  onClose: () => void;
};

const TextEditor: React.FC<Props> = memo(({ initialValue, onSave, onClose }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: [1, 2, 3, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
          ],
        },
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const delta = quillRef.current.clipboard.convert({ html: initialValue });
      quillRef.current.setContents(delta, 'silent');
    }
  }, [initialValue]);

  const handleSave = () => {
    if (quillRef.current) {
      const html = quillRef.current.root.innerHTML;
      const isEmpty = html === '<p><br></p>' || html.trim() === '';
      onSave(isEmpty ? '' : html);
    }
    onClose();
  };

  return (
    <div className={styles.container}>
      <div ref={editorRef} className={styles.editor} />
      <button onClick={handleSave} className={styles.saveButton}>
        Сохранить
      </button>
      <button onClick={onClose} className={styles.cancelButton}>
        Отмена
      </button>
    </div>
  );
});

export default TextEditor;
