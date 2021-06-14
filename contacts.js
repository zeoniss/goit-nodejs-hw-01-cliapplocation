const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("./db/contacts.json");
const v4 = require("uuid-v4");
console.log(contactsPath);

async function listContacts() {
 const getContactById = async (contactId) => {
   try {
     const [contactById] = contacts.filter(
       (contact) => contactId === contact.id
     )
     return contactById
   } catch (error) {
     console.error(error.message)
   }
 }
}
async function addContact(name, email, phone) {
  try {
    const file = await fs.readFile(contactsPath, "utf-8");
    const data = JSON.parse(file);
    const newContact = { name, email, phone, id: v4() };
    data.push(newContact);
    const dataString = JSON.stringify(data);
    fs.writeFile(contactsPath, dataString, "utf-8");
    console.table(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const getId = await fs.readFile(contactsPath, "utf-8");
    const searchId = JSON.parse(getId).find((item) => item.id == contactId);

    //метод фильтр возвращает массив
    //значений которые соответствуют критерию
    //Возращаем один объект из массива,
    // который соответствует переданному id.
    console.table(searchId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const removeById = await fs.readFile(contactsPath, "utf-8");
    const removeCont = JSON.parse(removeById).filter(
      (item) => item.id !== contactId //Возращяем объекты,которые не равны id.
    );

    console.table(removeCont);
    const newContacts = JSON.stringify(removeCont);
    await fs.writeFile("./contacts1.json", newContacts, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, removeContact, getContactById, addContact };
