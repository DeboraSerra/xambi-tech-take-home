import "../styles/App.css";
import { EditForm } from "./EditForm";

const editEntries = [
  {
    type: "Text",
    isRequired: true,
    attribute: "name",
    attributeName: "Name",
    subName: "First and Last Name",
    validations: "UserName",
    info: "Please enter your full name.",
  },
  {
    type: "Date",
    isRequired: true,
    attribute: "dob",
    attributeName: "Dar of Birth",
    subName: "YYYY-MM-DD",
    validations: "Date",
  },
  {
    type: "Text",
    isRequired: true,
    attribute: "email",
    attributeName: "Email",
    validations: "Email",
    info: "Please enter your email address.",
  },
  {
    type: "Select",
    isRequired: false,
    attribute: "country",
    attributeName: "Country",
  },
  {
    type: "MultipleSelect",
    isRequired: false,
    attribute: "languages",
    attributeName: "Languages",
    options: [
      {
        value: "English",
        isSelected: false,
      },
      {
        value: "Spanish",
        isSelected: false,
      },
      {
        value: "French",
        isSelected: false,
      },
      {
        value: "German",
        isSelected: false,
      },
      {
        value: "Chinese",
        isSelected: false,
      },
      {
        value: "Japanese",
        isSelected: false,
      },
      {
        value: "Korean",
        isSelected: false,
      },
      {
        value: "Russian",
        isSelected: false,
      },
      {
        value: "Arabic",
        isSelected: false,
      },
      {
        value: "Hindi",
        isSelected: false,
      },
      {
        value: "Bengali",
        isSelected: false,
      },
      {
        value: "Portuguese",
        isSelected: false,
      },
      {
        value: "Indonesian",
        isSelected: false,
      },
      {
        value: "Urdu",
        isSelected: false,
      },
      {
        value: "Turkish",
        isSelected: false,
      },
      {
        value: "Italian",
        isSelected: false,
      },
      {
        value: "Dutch",
        isSelected: false,
      },
      {
        value: "Polish",
        isSelected: false,
      },
      {
        value: "Vietnamese",
        isSelected: false,
      },
      {
        value: "Thai",
        isSelected: false,
      },
      {
        value: "Swedish",
        isSelected: false,
      },
      {
        value: "Greek",
        isSelected: false,
      },
      {
        value: "Romanian",
        isSelected: false,
      },
      {
        value: "Hungarian",
        isSelected: false,
      },
      {
        value: "Czech",
        isSelected: false,
      },
      {
        value: "Finnish",
        isSelected: false,
      },
      {
        value: "Norwegian",
        isSelected: false,
      },
      {
        value: "Danish",
        isSelected: false,
      },
      {
        value: "Slovak",
        isSelected: false,
      },
      {
        value: "Croatian",
        isSelected: false,
      },
      {
        value: "Bulgarian",
        isSelected: false,
      },
      {
        value: "Serbian",
        isSelected: false,
      },
      {
        value: "Lithuanian",
        isSelected: false,
      },
      {
        value: "Slovenian",
        isSelected: false,
      },
      {
        value: "Latvian",
        isSelected: false,
      },
      {
        value: "Estonian",
        isSelected: false,
      },
      {
        value: "Maltese",
        isSelected: false,
      },
      {
        value: "Icelandic",
        isSelected: false,
      },
      {
        value: "Albanian",
        isSelected: false,
      },
      {
        value: "Macedonian",
        isSelected: false,
      },
    ],
  },
];

function App() {
  return (
    <div className='App'>
      <EditForm
        title='Edit Entity'
        description='This is a form for editing an entity.'
        editEntries={editEntries}
        entityObj={{
          name: "John Doe",
          dob: "1980-01-01",
          email: "john.doe@email.com",
          country: "Canada",
        }}
        onSubmitSuccess={() => console.log("Form submitted successfully.")}
      />
    </div>
  );
}

export default App;
