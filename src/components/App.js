import "../styles/App.css";
import { EditForm } from "./EditForm";

const editEntries = [
  {
    type: "Text",
    required: true,
    attribute: "name",
    attributeName: "Name",
  },
  {
    type: "Date",
    required: true,
    attribute: "dob",
    attributeName: "Date of Birth",
  },
  {
    type: "Text",
    required: true,
    attribute: "email",
    attributeName: "Email",
  },
  {
    type: "Select",
    required: false,
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
        entityObj={{}}
        onSubmitSuccess={() => console.log("Form submitted successfully.")}
      />
    </div>
  );
}

export default App;
