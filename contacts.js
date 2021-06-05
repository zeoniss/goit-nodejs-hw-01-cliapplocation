const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("./db/contacts.json");
const v4 = require("uuid-v4");
console.log(contactsPath);

async function listContacts() {
  try {
    const listContact = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(listContact);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}
module.exports = { listContacts };
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
module.exports = { addContact };

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
module.exports = { getContactById };

async function removeContact(contactId) {
  try {
    const removeById = await fs.readFile(contactsPath, "utf-8");
    const removeCont = JSON.parse(removeById).filter(
      (item) => item.id !== contactId //Возращяем объекты,которые не равны id.
    );
    console.table(removeCont);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { removeContact };
