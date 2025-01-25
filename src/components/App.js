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
    type: "Multiselect",
    isRequired: false,
    attribute: "languages",
    attributeName: "Languages",
    options: [
      {
        value: "English",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Spanish",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "French",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "German",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Chinese",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Japanese",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Korean",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Russian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Arabic",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Hindi",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Bengali",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Portuguese",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Indonesian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Urdu",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Turkish",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Italian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Dutch",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Polish",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Vietnamese",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Thai",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Swedish",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Greek",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Romanian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Hungarian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Czech",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Finnish",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Norwegian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Danish",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Slovak",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Croatian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Bulgarian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Serbian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Lithuanian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Slovenian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Latvian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Estonian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Maltese",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Icelandic",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Albanian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
      },
      {
        value: "Macedonian",
        isSelected: false,
        id: new Date().getTime() * Math.random(),
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
