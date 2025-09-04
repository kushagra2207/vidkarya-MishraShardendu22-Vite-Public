import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const DescriptionModal = ({ tempDescription, setTempDescription, onSave, onCancel, editorRef }) => {
  const handleEditorChange = (newContent, _editor) => {
    setTempDescription(newContent);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onCancel}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: color.orange }}>
          Edit Description
        </h2>
        <Editor
          apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={tempDescription}
          init={{
            height: 500,
            branding: false,
            menubar: true,
            placeholder: 'Enter the full job description...',
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
              'codesample',
            ],
            toolbar:
              'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | link image media | codesample',
            content_style: `
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&display=swap');
              body { font-family: 'Roboto', sans-serif; font-size: 16px; color: #374151; }
              h1, h2, h3, h4, h5, h6 { font-family: 'Merriweather', serif; margin-top: 1.5em; margin-bottom: 0.5em; line-height: 1.2; }
              h1 { font-size: 2.5em; }
              h2 { font-size: 2em; }
              h3 { font-size: 1.75em; }
              h4 { font-size: 1.5em; }
              h5 { font-size: 1.25em; }
              h6 { font-size: 1em; }
            `,
            codesample_languages: [
              { text: 'HTML/XML', value: 'markup' },
              { text: 'JavaScript', value: 'javascript' },
              { text: 'CSS', value: 'css' },
              { text: 'PHP', value: 'php' },
              { text: 'Ruby', value: 'ruby' },
              { text: 'Python', value: 'python' },
              { text: 'Java', value: 'java' },
              { text: 'C', value: 'c' },
              { text: 'C#', value: 'csharp' },
              { text: 'C++', value: 'cpp' },
            ],
            file_picker_types: 'file image media',
            file_picker_callback: (callback, _value, _meta) => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*,video/*,audio/*');
              input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();
                reader.onload = function () {
                  const id = 'blobid' + new Date().getTime();
                  const blobCache = editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  callback(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            },
          }}
          onEditorChange={handleEditorChange}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSave}
            className="mr-2 px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: color.green }}
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: color.orange }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
