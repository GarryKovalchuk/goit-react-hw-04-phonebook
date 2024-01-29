import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

export const App = () => {
  const initialContacts = () => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  };

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('renewed contacts');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExists = contacts.some(
      i => i.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExists) {
      alert(`${name} or ${number} is already in contacts`);
      return;
    }
    setContacts([contact, ...contacts]);
  };

  const changeFilterInput = e => {
    setFilter(e.target.value);
  };

  const findContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} changeFilterInput={changeFilterInput} />
      <ContactList contacts={findContacts()} deleteContact={deleteContact} />
    </section>
  );
};
