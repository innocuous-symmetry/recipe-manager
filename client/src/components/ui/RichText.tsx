import { Editor } from "@tinymce/tinymce-react";
import { FC, useEffect, useState } from "react";

interface RichTextProps {
    id: string
    initialValue?: string
    getState: (toSend: string) => void
}

const RichText: FC<RichTextProps> = ({ id, initialValue, getState }) => {
    const [text, setText] = useState<any>();
    const [editorState, setEditorState] = useState<any>();

    useEffect(() => {
        getState(text);
    }, [text])

    const handleChange = (txt: string, editor: any) => {
        setText(txt);
        setEditorState(editor);
    }

    return (
        <Editor
            onEditorChange={(txt, editor) => handleChange(txt, editor)}
            initialValue={initialValue || '<p></p>'}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
}

export default RichText;