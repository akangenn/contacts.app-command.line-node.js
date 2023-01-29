const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { constants } = require('buffer');

// membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file json jika belum ada
const dataPath = 'data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    
    const contacts = loadContact();

    if (nama === "") {
        console.log(chalk.red.inverse.bold('Nama tidak boleh kosong!'));
        return false
    } else if(contacts.find((contact) => contact.nama === nama)){
        console.log(chalk.red.inverse.bold('Nama sudah terdaftar, gunakan nama lain!'));
        return false
    } else if (email === "") {
        console.log(chalk.red.inverse.bold('Email tidak boleh kosong!'));
        return false
    } else if (!validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold('Email tidak Valid!'));
        return false
    } else if(contacts.find((contact) => contact.email === email)){
        console.log(chalk.red.inverse.bold('Email sudah terdaftar, gunakan email lain!'));
        return false
    } else if (email.length < 10) {
        console.log(chalk.red.inverse.bold('Email harus lebih dari 10 karakter!'));
        return false
    } else if (noHP === "") {
        console.log(chalk.red.inverse.bold('No HP tidak boleh kosong!'));
        return false
    } else if (!validator.isMobilePhone(noHP , 'id-ID')) {
        console.log(chalk.red.inverse.bold('Nomor HP tidak Valid!'));
        return false
    } else if(contacts.find((contact) => contact.noHP === noHP)){
        console.log(chalk.red.inverse.bold('Nomor HP sudah terdaftar, gunakan nomor HP lain!'));
        return false
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Terima kasih sudah memasukan data.'))
}

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar kontak : '))
    contacts.forEach(( contact, i ) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.email} - ${contact.noHP}`)
    })
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }
    
    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.email);
    console.log(contact.noHP);
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) =>  contact.nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus`))
}

module.exports = { simpanContact, listContact, detailContact, deleteContact }