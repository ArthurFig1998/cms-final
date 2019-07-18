var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');


function getContacts(req, res) {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
        message: 'Contacts fetched successfully',
        contacts: contacts
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
}

router.get('/', (req, res, next) => {
  getContacts(req, res);
});


function saveContact(res, contact) {
  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
}

router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    group: req.body.group
  });

  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }
  saveContact(res, contact);
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({
      id: req.params.id
    })
    .then(contact => {
      contact.name = req.body.name;
      contact.description = req.body.description;
      contact.url = req.body.url;

      Contact.updateOne({
          id: req.params.id
        }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: {
          contact: 'Contact not found'
        }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({
      id: req.params.id
    })
    .then(contact => {
      Contact.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
