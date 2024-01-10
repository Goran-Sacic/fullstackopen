import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";
import SearchResults from "./components/SearchResults";
import personsServices from "./services/persons";
import Notification from "./components/Notification";
import Information from "./components/Information";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [notification, setNotification] = useState("This is some message.");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      setPeople(initialPersons);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const uniquePerson = people.find((p) => p.name === newName);

    if (
      uniquePerson &&
      confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      ) == true
    ) {
      const updatedPerson = { ...uniquePerson, number: newNumber };
      personsServices
        .update(uniquePerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPeople(
            people.map((p) => (p.id !== uniquePerson.id ? p : returnedPerson))
          );
        });
      setNotification(`${newPerson.name}'s number was altered.`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    if (!uniquePerson) {
      personsServices.create(newPerson).then((returnedPerson) => {
        setPeople(people.concat(returnedPerson));
      });
      setNotification(`Added ${newPerson.name} to the Phonebook!`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const searchResults = people.filter((x) =>
    x.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleDeleteEntry = (id, name) => {
    if (confirm("Are you sure you want to delete this entry?") == true) {
      personsServices
        .deleteEntry(id)
        .then((returnedData) => {
          console.log(returnedData);
          console.log(people.id);
          setPeople(people.filter((x) => x.id !== id));
        })
        .catch((error) => {
          setError(true);
          setNotification(
            `Information of ${name} has already been removed from the server.`
          );
          setPeople(people.filter((x) => x.id !== id));
          setTimeout(() => {
            setNotification(null);
            setError(false);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    personsServices.getInfo().then((initialInfo) => {
      setInfo(initialInfo);
    });
  }, [handleAddPerson, handleDeleteEntry]);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={notification} error={error} />
        <Information info={info} />
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleAddPerson={handleAddPerson}
          handleNewPerson={handleNewPerson}
          handleNewNumber={handleNewNumber}
        />
        <br />
        <SearchFilter query={query} handleSearch={handleSearch} />
      </div>
      <h3>Numbers:</h3>
      <SearchResults
        searchResults={searchResults}
        handleDeleteEntry={handleDeleteEntry}
      />
    </>
  );
};

export default App;

// a test comment
