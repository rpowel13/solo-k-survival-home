
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, List, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, 
  Heading1, Heading2, Link as LinkIcon
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageClick: () => void;
}

export const RichTextEditor = ({ content, onChange, onImageClick }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Handle formatting commands
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };
  
  // Handle link insertion
  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleFormat('createLink', url);
    }
  };
  
  // Update content after any change
  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  // Sync editor content when external content prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);
  
  // Handle paste to allow plaintext and limited HTML
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Get pasted content as text and HTML
    const text = e.clipboardData.getData('text/plain');
    const html = e.clipboardData.getData('text/html');
    
    // Try to use HTML if it's available and looks reasonable (not too complex)
    if (html && !html.includes('<style') && !html.includes('<script')) {
      document.execCommand('insertHTML', false, html);
    } else {
      document.execCommand('insertText', false, text);
    }
    
    updateContent();
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('formatBlock', '<h1>')}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('formatBlock', '<h2>')}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('insertUnorderedList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('justifyRight')}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleLink}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onImageClick}
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <div
        ref={editorRef}
        className="p-4 min-h-[200px] prose max-w-none"
        contentEditable
        onInput={updateContent}
        onPaste={handlePaste}
        onBlur={updateContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
