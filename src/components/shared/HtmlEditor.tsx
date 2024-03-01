import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export const HtmlEditor = ({ onChange, value, field }: any) => {
  const handleEditorChange = (editor: any) => onChange(editor);
  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
        {...field}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, }",
        }}
      />

      {/* <hr /> */}
      {/* <pre>{field.value}</pre> */}
    </>
  );
};

// export default function App() {
//   const methods = useForm<FormData>();

//   const onSubmit = methods.handleSubmit((data) => console.log(data));

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={onSubmit}>
//         <HtmlEditor name="test" />
//       </form>
//     </FormProvider>
//   );
// }
