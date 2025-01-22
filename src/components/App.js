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
