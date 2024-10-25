import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapTable from '@tiptap/extension-table'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TableHeader from '@tiptap/extension-table-header'
import TipTapTableRow from '@tiptap/extension-table-row'
import TipTapTableCell from '@tiptap/extension-table-cell'


const TipTapEditor = (content) => {
  const editor = useEditor({
    extensions: [
      Underline,
      TableHeader,
      TipTapTableRow,
      TipTapTableCell,
      TipTapTable.configure({resizable: true}),
      Highlight.configure({ multicolor: true }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: content
  })
  return editor
}

export default TipTapEditor