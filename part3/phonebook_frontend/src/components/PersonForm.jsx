const PersonForm = ({
  newName,
  newNumber,
  handleAddPerson,
  handleNewPerson,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        <h3>Add a new person to the Phonebook: </h3>
        Name: <input value={newName} onChange={handleNewPerson} />
        <br />
        Number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
